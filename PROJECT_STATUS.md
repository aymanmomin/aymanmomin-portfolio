# Project Status

- **Current phase:** story site rebuild, PR 1 (foundation)
- **Latest successful build:** CI `verify` passed on the Contact PR; foundation result recorded after merge

## Completed
- Repository, `main` and `develop` branches, `main` protected (PR required, `verify` check required, no force-push, no deletion)
- Vite, React, TypeScript, ESLint, Tailwind, Vitest, GitHub Actions CI
- Design tokens, fonts, UI primitives, responsive navbar, 3D hero with static fallback
- About, Skills, Experience, Projects and Contact sections (the standard layout, to be retired)

## In progress
- Story foundation: content model, word budgets, dialog, media slot, claims register

## Parked
- Local branch `feature/world-engine` (station-snapping prototype, never pushed or merged)

## Next
- PR 2: Express route as a complete readable page
- PR 3: scroll engine, camera path, thread, progress bar
- PR 4: India scenes, then The Crossing and Canada
- PR 5: Detailed view, project pop-ups, case studies
- PR 6: hero and route chooser polish, mobile, performance, accessibility, deployment

## Blockers / missing information
- Items marked "Needs confirmation" in `docs/content/claims.md` (income figures, Nexus, Lemmer baseline, GA4 hours, research details, True North dates, permission for photos with named people)
- Photos and videos for every media slot, and captions for any video
- Screenshots and tech stack for the Ace SEO case study
- Contact form provider and endpoint (the form stays hidden until set)
- Financial dashboard screenshot approval

## Known bugs
- None known.
- 3D chunk is 243 kB gzipped; size reduction planned.
- 3D frame rate, battery impact and accessibility audit (axe) not yet run.
- Favicon is still the Vite default; Open Graph tags not yet set.