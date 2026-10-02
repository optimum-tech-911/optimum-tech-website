# Selected projects

The selection supplied by the owner on 2 October 2026 is used on the homepage and `/realisations/`. All ten public sites responded with HTTP 200 during review. The featured flags and catalogue order are derived from `homeFeaturedProjectIds` in `src/data/projects.js`; existing projects remain in the catalogue.

| Project | Public URL | Presentation |
| --- | --- | --- |
| The Porters | https://porters.fr/ | Corporate site, salary simulation and conversational assistant |
| Kabamana | https://kabamana.com/ | Transport marketplace |
| Krew Media | https://krew.media/fr/ | Creative agency, creator network and video |
| Orée Entreprises | https://oree.optimutech.fr/ | Company-creation platform, diagnostic and client workspace |
| STRUKTUR Grenoble | https://struktur-grenoble.pages.dev/ | E-commerce, streetwear collections and art direction |
| L’Écrin Sétois | https://lecrinsetois.fr/ | Hospitality, photography and direct booking |
| Nonails | https://nonails.click/ | Scroll-driven 3D nail scene, beauty studio and booking |
| Cabinet Dentaire Sète | https://cabinetdentairesete.fr/ | Dental care and patient information |
| UFSBD34 | https://ufsbd34.fr/ | Institutional health platform |
| Dr Souidi Dental | https://dr-souidi-dental.pages.dev/ | French/Arabic dental website |

## Images and interactions

Real screenshots of the live projects are stored in `public/projects/selected/`. Each project has a 1200 × 800 WebP and a 600 × 400 variant. Both variants combined for all ten projects total approximately 758 KiB. Images are hosted locally, responsive and loaded lazily; no screenshot service runs when a visitor opens the website.

Public screenshots were captured with Thum.io and checked individually. Some opening animations and WebGL scenes required multiple captures; the chosen Nonails image shows the rendered 3D nail rather than an empty canvas. The 3D implementation was also checked in the project's `ScrollNailHero` and `NailScene` source. Never substitute a loader or invent a rendered website image.

`FeaturedProjects` presents the selection in three groups: platforms and commerce; design, video and 3D; health and dentistry. It includes a native dialog to enlarge screenshots and separate links for the case study and live site. On case-study pages, interactive iframes are activated on demand. Opening the external project remains available when a site's embedding policy prevents an iframe preview.

Seven case-study routes were added for the newly documented projects. The ten selected projects have public case studies, modification dates and project-specific share images. The portfolio collection schema includes the visible selection as an ItemList.

## Updating the selection

1. Update the project data, its showcase group and `homeFeaturedProjectIds`.
2. Add a corresponding entry in `projectCaseStudies` when `caseStudy` is enabled.
3. Capture the live site after its opening animation completes. Save both WebP sizes with the same project ID. Preserve a screenshot from the real product; describe measured results only when evidence exists.
4. Run `npm run lint` and `npm run build`. The shared route manifest automatically includes case studies in the prerendered HTML and sitemap. The SEO audit checks both normal images and responsive image variants.

Lint, the production build and static SEO checks passed. DOM interaction checks covered category counts (10/3/4/3), project links, preview selection/closing state and activation of the 3D iframe. A browser connection was unavailable, so visual layout, native dialog focus/Escape and real iframe rendering still need checking in an actual browser.
