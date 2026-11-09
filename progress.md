Original prompt: Make Monaco Rush playable in the browser, with a version as near as the app as possible for friends testing on iPhones. Preserve the existing Android, Windows and Mac downloads.

2026-11-09
- Started from main 4a17d015 in an isolated checkout. Original game working tree is untouched.
- Reusing the verified current v15.4.0/ed3b0fe701 web build (same gameplay as native wrappers).
- Integrating /monaco-rush/play/ and existing home-screen/offline installer; native downloads retained.
- Pending: homepage/download links, host headers, offline size copy, build and browser/PWA QA, deploy and verify.

- Implemented browser play + installation links on homepage and beta landing; iPhone placeholder replaced with Safari home-screen guidance. Native artifact manifest/URLs unchanged.
- Copied current 15.4.0 game into public/monaco-rush/play/. Updated offline-size estimate to50MB and assigned coherent integration cache version ed3b0fe701-web-41b9f83bc3; gameplay/native source untouched.
- Added scoped no-cache/noindex headers and Vite dev routing for nested static indexes (observed default SPA fallback otherwise).
- Production build and54-page SEO audit passed. Required game skill client: actual platform movement/jump, screenshot/text-state inspected, no errors.
- Installer43 checks and PWA70 checks passed: all9stages cold-start offline at root/subpath; update/save/cache isolation tested.
- Responsive landing/homepage320/390/844/1280 screenshots inspected, links and iPhone detection passed.
- Actual WebKit iPhone-emulated gameplay/installer/SW checks passed. Offline test with QA-owned server shut down passed11checks including cold tabs, saved settings, platformer and race touch input. Playwright WebKit setOffline flag itself fails before SW and is not used as acceptance evidence.
- Physical iPhone Share-menu/Add-to-Home-Screen installation remains a device check; browser emulation does not prove that system action.
- Pending: publish via existing GitHub/Cloudflare pipeline; confirm production paths/version/assets and controls, then stop owned local preview.

- WebKit rotation verified after resize settled: portrait390x844 and landscape844x390, correctly resized canvas/HUD/touch controls in both orientations. Initial screenshot captured before async resize completed; no game change required.

2026-11-09 — Production Safari redirect fix
- First live deploy578362e4 passed game/title/touch checks but exposed Cloudflare Pages .html canonical redirects. WebKit rejected cached redirected responses during installer/game navigation.
- Fixed cached HTML navigation with a synthetic Response that clears redirect metadata and transport headers. Same fix applied to the original game's worker generator for future builds; no native binaries rebuilt.
- Bumped web cache revision to ed3b0fe701-web-41b9f83bc3-r2. Canonical-redirect regression reproduces all3baseline failures and fixed worker passes12checks including offline cold navigation. Full70PWA checks pass again.
- Preserved source font license verbatim; inherited trailing whitespace excluded from code whitespace check.
