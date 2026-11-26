# Project Status

- **Current phase:** story site rebuild, PR 3 (scroll engine)
- **Latest successful build:** CI `verify` passed on PR #11 (express route); PR 3 result recorded after merge

## Completed
- Repository, `main` and `develop` branches, `main` protected (PR required, `verify` check required, no force-push, no deletion)
- Vite, React, TypeScript, ESLint, Tailwind, Vitest, GitHub Actions CI
- Story foundation: content model, word budgets, dialog, media slot, claims register (PR #10)
- Express route: eleven stops, currency toggle, SEO staircase, pop-ups; now the default view, with the earlier standard layout at `?story=0` (PR #11)

## In progress
- Scroll engine: fixed 3D scene, scroll-driven camera through a Mumbai, crossing and Calgary world, India / Crossing / Canada progress bar

## Parked
- Local branch `feature/world-engine` (station-snapping prototype, never pushed or merged)

## Next
- PR 4: India scenes, then The Crossing and Canada
- PR 5: Detailed view, project pop-ups, case studies
- PR 6: hero and route chooser polish, mobile, performance, accessibility, deployment
- Copy review: express on-page copy is 782 words against a 1,100 target

## Blockers / missing information
- Items marked "Needs confirmation" in `docs/content/claims.md` (income figures, Nexus, Lemmer baseline, GA4 hours, research details, True North dates, permission for photos with named people)
- Photos and videos for every media slot, and captions for any video
- Screenshots, role and tech stack for the Ace SEO case study
- Contact form provider and endpoint (the form stays hidden until set)

## Known bugs
- None known.
- 3D has not been run on a phone yet. Frame rate, battery use and backdrop blur cost are unmeasured.
- 3D chunk is about 243 kB gzipped; size reduction planned.
- Accessibility audit (axe) not yet run.
- Favicon is still the Vite default; Open Graph tags not yet set.