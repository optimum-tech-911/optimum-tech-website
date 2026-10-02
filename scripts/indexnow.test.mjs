import assert from 'node:assert/strict';
import test from 'node:test';
import { INDEXNOW_KEY, runIndexNow, selectUrls } from './indexnow.mjs';
import { indexableRoutes } from '../src/data/prerenderRoutes.js';
import { buildCanonicalUrl } from '../src/data/schema.js';

const origin = 'https://optimutech.fr';
const endpoint = 'https://api.indexnow.org/indexnow';
const keyLocation = `${origin}/${INDEXNOW_KEY}.txt`;
const home = buildCanonicalUrl('/');
const html = (url) => `<html><head><link href='${url}' rel='canonical'><meta content='index, follow' name='robots'></head><body>Page</body></html>`;
const page = (body = html(home), headers = {}) => new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8', ...headers } });

function fixture(overrides = {}) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, ...init });
    if (overrides[url]) return overrides[url](url, init);
    if (url === keyLocation) return new Response(INDEXNOW_KEY);
    if (url === `${origin}/sitemap.xml`) {
      return new Response(`<urlset>${indexableRoutes.map((route) => `<url><loc>${buildCanonicalUrl(route)}</loc></url>`).join('')}</urlset>`);
    }
    if (url === endpoint) return new Response('', { status: 200 });
    assert.ok(selectUrls([]).urls.includes(url), `Unexpected URL: ${url}`);
    return page(html(url));
  };
  return { calls, fetchImpl, log: () => {} };
}

test('dry run selects the shared canonical routes and never accesses the network', async () => {
  const options = fixture();
  await runIndexNow([], options);
  assert.deepEqual(selectUrls([]).urls, indexableRoutes.map(buildCanonicalUrl));
  assert.deepEqual(selectUrls(['/services/', '/services']).urls, [buildCanonicalUrl('/services')]);
  assert.equal(options.calls.length, 0);
});

test('unknown, noindex, external and malformed routes fail before any request', async () => {
  for (const route of ['/admin', '/jobs', '/does-not-exist', 'https://example.com/', '//example.com', '/services?x=1', '/services#x', '/services//', '--typo']) {
    const options = fixture();
    await assert.rejects(runIndexNow(['--submit', route], options), /Unknown/);
    assert.equal(options.calls.length, 0);
  }
});

test('failed live verification never sends a POST', async (t) => {
  const cases = [
    ['key mismatch', keyLocation, () => new Response(`${INDEXNOW_KEY}\n`), /exactly match/],
    ['key returns 404', keyLocation, () => new Response('', { status: 404 }), /HTTP 200/],
    ['missing sitemap URL', `${origin}/sitemap.xml`, () => new Response('<urlset></urlset>'), /sitemap is missing/],
    ['SPA fallback for sitemap', `${origin}/sitemap.xml`, () => page(), /URL set/],
    ['non-200 page', home, () => new Response('', { status: 503 }), /HTTP 200/],
    ['non-HTML page', home, () => new Response(html(home)), /HTML Content-Type/],
    ['wrong canonical', home, () => page(html(`${origin}/services/`)), /matching canonical/],
    ['duplicate canonical', home, () => page(html(home).replace('</head>', `<link rel="canonical" href="${home}"></head>`)), /matching canonical/],
    ['script is not a canonical', home, () => page(`<head><script>const tag = '<link rel="canonical" href="${home}">';</script></head>`), /matching canonical/],
    ['header noindex', home, () => page(html(home), { 'X-Robots-Tag': 'bingbot: noindex' }), /prohibits indexing/],
    ['meta noindex', home, () => page(html(home).replace('index, follow', 'NOINDEX, FOLLOW')), /prohibits indexing/],
    ['bot-specific none', home, () => page(html(home).replace("name='robots'", "name='googlebot'").replace('index, follow', 'none')), /prohibits indexing/],
    ['external redirect', home, () => new Response(null, { status: 302, headers: { Location: 'https://example.com/' } }), /outside the canonical site/],
    ['HTTP downgrade', home, () => new Response(null, { status: 302, headers: { Location: 'http://optimutech.fr/' } }), /outside the canonical site/],
    ['redirect loop', home, () => new Response(null, { status: 302, headers: { Location: home } }), /too many redirects/],
  ];
  for (const [name, url, response, message] of cases) {
    await t.test(name, async () => {
      const options = fixture({ [url]: response });
      await assert.rejects(runIndexNow(['--submit', '/'], options), message);
      assert.equal(options.calls.filter((call) => call.method === 'POST').length, 0);
      assert.ok(options.calls.every((call) => new URL(call.url).origin === origin));
    });
  }
});

test('valid submission POSTs the exact payload once and reports 200 / 202 accurately', async () => {
  for (const status of [200, 202]) {
    const options = fixture({ [endpoint]: () => new Response('', { status }) });
    const messages = [];
    options.log = (message) => messages.push(message);
    assert.equal(await runIndexNow(['--submit', '/', '/services'], options), status);
    const posts = options.calls.filter((call) => call.method === 'POST');
    assert.equal(posts.length, 1);
    assert.equal(posts[0].url, endpoint);
    assert.equal(posts[0].redirect, 'manual');
    assert.deepEqual(JSON.parse(posts[0].body), {
      host: 'optimutech.fr', key: INDEXNOW_KEY, keyLocation,
      urlList: [home, buildCanonicalUrl('/services')],
    });
    assert.match(messages.at(-1), /Acceptance does not mean pages are indexed/);
    if (status === 202) assert.match(messages.at(-1), /key validation is pending/);
  }
});

test('IndexNow errors and redirects fail without retrying the POST', async () => {
  for (const status of [301, 400, 403, 422, 429, 500]) {
    const options = fixture({ [endpoint]: () => new Response('', { status, headers: { Location: 'https://example.com/' } }) });
    await assert.rejects(runIndexNow(['--submit', '/'], options), status === 301 ? /refusing to resend/ : new RegExp(`HTTP ${status}`));
    assert.equal(options.calls.filter((call) => call.method === 'POST').length, 1);
  }
});

test('a stalled request is aborted and no POST is sent', async () => {
  const options = fixture({
    [keyLocation]: (_, { signal }) => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }),
  });
  await assert.rejects(runIndexNow(['--submit', '/'], { ...options, timeoutMs: 10 }), /timed out/);
  assert.equal(options.calls.filter((call) => call.method === 'POST').length, 0);
});

test('page preflight concurrency never exceeds four, and all pages precede the POST', async () => {
  let active = 0;
  let peak = 0;
  let checked = 0;
  const overrides = Object.fromEntries(indexableRoutes.map((route) => {
    const url = buildCanonicalUrl(route);
    return [url, async () => {
      active++;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 2));
      active--;
      checked++;
      return page(html(url));
    }];
  }));
  overrides[endpoint] = () => {
    assert.equal(checked, indexableRoutes.length);
    assert.equal(active, 0);
    return new Response('', { status: 200 });
  };
  const options = fixture(overrides);
  await runIndexNow(['--submit'], options);
  assert.equal(peak, Math.min(4, indexableRoutes.length));
  assert.equal(options.calls.filter((call) => call.method === 'POST').length, 1);
});
