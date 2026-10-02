# Montpellier, dental and AI search visibility

Prepared with the SEO changes on 1 October 2026 and the selected-project showcase and final technical improvements on 2 October 2026. The changes are local; deployment, Search Console actions and live IndexNow submissions have not been performed.

## Your publication checklist

1. Deploy the complete production build, then open the homepage, Montpellier page, dentist page and project gallery on a phone and desktop. Check a project preview and the contact links. Confirm the new content is live before submitting anything.
2. In **Google Search Console → Sitemaps**, submit or check `https://optimutech.fr/sitemap.xml`. Its expected count is **54 canonical URLs**. An existing successful submission of the same sitemap does not need a new URL.
3. Use **URL Inspection → Test live URL** for the homepage, `/creation-site-web-montpellier/`, `/site-internet-dentiste/`, `/application-web-sur-mesure/` and the six affected URLs listed below. After successful tests, request indexing of these changed pages once. Then click **Validate fix** in the existing “Crawled — currently not indexed” report. Requests and validation do not force Google to index a page.
4. Add the domain in [Bing Webmaster Tools](https://www.bing.com/webmasters/) using **Import from Google Search Console**. Check that the same sitemap was imported. From this repository, run `npm run indexnow -- --submit` **after deployment**; this verifies the live pages and notifies participating search engines. Details and future-update commands are below.
5. Update your Google Business Profile with the actual business location and Montpellier service area, accurate services, recent project images and website links. Request honest reviews from clients. Confirm your public personal name and role before adding them to the website; no founder identity has been inferred from a social profile.
6. After recrawls, record which priority pages are indexed, relevant search impressions and clicks, and qualified enquiries. Revisit after two to four weeks for an initial comparison; this is a reporting interval, not a promised ranking timeline.

There is no special AI submission required by Google's AI search features, and OpenAI's publisher guidance focuses on public content and crawler access rather than an application for inclusion. These requirements are covered in the AI section below. No implementation can force every assistant to recommend a business.

## What the live audit established

The six URLs in the supplied Search Console screenshots returned HTTP 200, readable prerendered content, self-referencing canonical URLs and indexing directives. No HTTP `X-Robots-Tag` block was found. The live sitemap used the incorrect `https://www.sitemaps.org/schemas/sitemap/0.9` namespace; the standard namespace is `http://www.sitemaps.org/schemas/sitemap/0.9`.

These checks do not establish why Google declined to index the pages. Google-selected canonicals, crawl snapshots and account-level issues still need inspection inside Search Console. Repetitive service copy and brief articles were opportunities for improvement, rather than proven causes of exclusion.

## Search intents and destination pages

| Search intent | Main page |
| --- | --- |
| Optimum Tech, custom software, platforms and websites around Montpellier | `/` |
| création site web Montpellier / création site internet Montpellier | `/creation-site-web-montpellier/` |
| site internet dentiste Montpellier / site cabinet dentaire Hérault | `/site-internet-dentiste/` |
| création plateforme web / application web sur mesure Montpellier | `/application-web-sur-mesure/` |
| logiciel sur mesure Montpellier / outil métier | `/logiciel-sur-mesure/` |
| site internet entreprise / artisan / commerce Montpellier | `/site-internet-entreprise-locale/` |
| site internet médecin / cabinet médical | `/site-internet-medecin/` |
| how to compare an agency quote | `/blog/comment-choisir-son-agence-web-beziers-pieges/` |
| whether a custom application is worthwhile | `/blog/application-web-sur-mesure-rentable-entreprises/` |

The commercial pages use distinct examples, relevant portfolio links and practical FAQs. The website does not need separate pages for spelling variations such as “siteweb,” “site web” and “site internet.” Keep the main pages useful and avoid collections of nearly identical city pages.

The homepage hero leads with **“Logiciels et plateformes sur mesure”** and describes architecture, code, integrations and delivery. Software and platform links come first. Website creation, local and dental services remain in the visible supporting content, balanced page metadata and dedicated landing pages; the website offer is not hidden or removed. This positions the business for software projects while retaining the existing search destinations. Search performance should still be monitored after a positioning change; stable rankings cannot be promised.

## Sitemap coverage

The sitemap contains all 54 current indexable content pages: 6 core pages, 8 service pages, 5 local pages, 17 case studies, 5 sector portfolios and 13 articles. Administrative, noindex and redirect URLs are excluded. Public portfolio cards that link to client websites are not separate pages on this domain.

The sitemap now also describes 83 distinct content images through 174 page/image associations. A project screenshot can appear on its case study, a service page and the portfolio, so image references are not additional page URLs. These entries use Google's supported `image:image` extension inside the existing `sitemap.xml`; no additional sitemap submission is needed. The generator discovers local content images in the built pages, removes duplicates within each page, skips decorative images and fails if an included asset is missing. [Google image sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).

The useful way to expand coverage is to publish additional complete case studies or distinct answers to real client questions and link them from relevant pages. The shared route manifest and sitemap must include every new indexable page. Adding repeated URLs, query-string variants, external client websites or empty pages does not create useful new search results. A sitemap assists discovery and does not guarantee indexing. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

The extra links beneath a main Google result are called **sitelinks**. Google generates them automatically from site structure and relevance; there is no sitemap setting to force their number or appearance. [Google sitelinks guidance](https://developers.google.com/search/docs/appearance/sitelinks).

## Deployment checks

1. Run `npm run lint` and `npm run build`. The build generates HTML and the sitemap, then audits every indexable URL (54 with the ten selected projects). `npm run audit:seo` can rerun the audit against an existing build.
2. Publish the entire `dist` output through the existing hosting workflow. Publishing only source files or the root HTML will omit the prerendered landing pages. Generated files are largely ignored by Git; the production host must run the build.
3. On the public domain, verify the new Montpellier page, the dentist page, `/robots.txt` and `/sitemap.xml`. Check that the main content is present in the HTTP HTML without executing JavaScript.
4. Verify that an unknown URL returns HTTP 404 rather than homepage HTML. The Vercel configuration already specifies this; verify the behavior on the actual host as well.
5. Check public page access using Google URL Inspection and the relevant search crawlers. A robots allowance does not override a hosting firewall or bot challenge.

The audit checks unique titles and descriptions, one H1, canonicals, indexing directives, FAQ text matching the visible HTML, internal links, page assets, inbound links, sitemap consistency and crawler rules. No browser connection was available in this session, so visual and interactive browser QA remains a deployment check.

The homepage now uses optimized versions of the full 20-second hero video: a 540 × 960 portrait crop on mobile (2.1 MiB) and a 1280 × 720 desktop version (3.7 MiB), replacing the original 17.8 MiB download. Both use silent H.264, 24 fps and MP4 fast-start metadata. Responsive posters are approximately 24 KiB and 41 KiB. The video loads after the window finishes loading and an idle callback, with the poster visible until playback actually starts. Reduced-motion and supported data-saving/slow-connection modes require explicit playback; a play/pause control is available on mobile and desktop. Check playback on an actual iPhone and Android phone after deployment because browser autoplay policies can differ.

The About page describes the business, audience and service area directly, and project pages link to the corresponding commercial services. Structured data uses one consistent organization identity for the business, services and projects.

## Search Console after publication

Inspect the homepage, the new Montpellier page and the six affected URLs. Use **Test live URL**, review the HTML/screenshot, and examine Google's selected canonical in the indexed report. Confirm the corrected sitemap is readable in the Sitemaps report.

The six affected URLs from the screenshots are:

- `https://optimutech.fr/site-internet-entreprise-locale/`
- `https://optimutech.fr/blog/comment-choisir-son-agence-web-beziers-pieges/`
- `https://optimutech.fr/logiciel-sur-mesure/`
- `https://optimutech.fr/site-internet-dentiste/`
- `https://optimutech.fr/site-internet-medecin/`
- `https://optimutech.fr/blog/application-web-sur-mesure-rentable-entreprises/`

After publication and successful live tests, start **Validate fix** from the supplied report. The affected-page count can remain unchanged until Google recrawls and reassesses the URLs.

For substantially updated pages, an indexing request is optional after the new version is live and passes the live test. Do not repeatedly resubmit unchanged URLs. “Crawled — currently not indexed” records Google's indexing decision; **Validate fix** cannot force inclusion. Check again after Google has recrawled and compare crawl dates with the publication date. [Google's indexing report](https://support.google.com/webmasters/answer/7440203?hl=en), [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en).

## Bing, IndexNow and discovery

[Bing supports importing a verified Search Console property and its sitemaps](https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/). This is a separate owner action; the repository does not access either account. Bing's index also supports discovery in its AI search ecosystem, including Copilot. [Bing Webmaster Tools guidance](https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/).

The new script sends changed URLs to the public IndexNow endpoint. It is deliberately separate from the build so a local preview cannot submit unpublished pages.

```sh
# Preview the 54 canonical URLs; no network requests.
npm run indexnow

# Run once AFTER publishing this release.
npm run indexnow -- --submit

# For future releases, submit only the pages you actually changed.
npm run indexnow -- --submit /site-internet-dentiste/ /realisations/cabinet-dentaire-sete/
```

The script first checks the deployed public verification key, live sitemap and every selected page's HTTP status, canonical URL and indexing directives. It refuses to submit if these checks fail. The root `.txt` verification file is intentionally public and is copied into `dist` by the build; it is not an account password or private API credential.

An HTTP 200 means the notification was accepted. A 202 means verification is pending. Neither means the URLs are indexed. IndexNow participants share URL notifications; this is not a Google indexing API or a ChatGPT submission API. If preflight fails, fix the reported production URL before trying again. For future updates, avoid resubmitting unchanged URLs. [IndexNow protocol](https://www.indexnow.org/documentation), [Bing's IndexNow guidance](https://www.bing.com/indexnow/getstarted).

Run `node --test scripts/indexnow.test.mjs` to exercise the 22 offline safety checks. These use mocked responses and send no real notifications.

## Google Business Profile and local reputation

The supplied profile link is now linked from the site. It could not be opened or edited in this session. The public website emphasizes service in Montpellier; the structured physical locality remains Sète until an actual Montpellier base is confirmed. Keep address facts separate from service areas. The central fields are in `src/data/siteMeta.js`.

In the profile, verify the public business name, actual business location, phone, website, hours, relevant category and services. Describe site creation, platforms and the dental offer using normal language. Add recent project images and seek honest reviews from real clients. Ask clients whether they are willing to link to the agency credit or a relevant case study; do not invent reviews, results or Montpellier client locations. Google explains that local visibility depends on relevance, distance and prominence, including links and reviews. [Google's local ranking guidance](https://support.google.com/business/answer/7091?hl=en).

## AI search

`OAI-SearchBot` is explicitly allowed; the previous general allowance already permitted it. OpenAI identifies this crawler as the one used for ChatGPT search discovery. Search access is independent of GPTBot training access. This change does not guarantee a recommendation. [Official OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

OpenAI's publisher guidance says public websites can appear in ChatGPT search and should allow OAI-SearchBot for summaries and snippets. Keep the site public and ensure the hosting firewall does not challenge that crawler. You do not need to buy an “AI registration” service. Check analytics for `utm_source=chatgpt.com` on incoming search referrals; this can measure visits, not every mention. [OpenAI publishers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq).

The existing `llms.txt` directory now contains the Montpellier, dental and platform pages and real contact details. It is supplementary. Google states that its AI search features use ordinary SEO fundamentals and do not require a special AI file or schema. The useful work is accessible content, clear business facts, relevant internal links and externally corroborated projects. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Measure progress

Record a baseline in Search Console for Montpellier, dentist and platform queries and for the target pages. Review impressions, clicks, selected canonicals and indexing after recrawls. Compare equal periods and separate branded searches from service searches. Review real enquiries and their quality alongside traffic. AI-referral visits can be observed when a referrer is provided, but not every AI mention or visit can be attributed.

Use subsequent reviews to improve pages that attract relevant impressions but fail to explain the offer or generate enquiries. Add new case studies when evidence and publication permission exist. Neither first place for every search nor selection by an AI assistant can be guaranteed.
