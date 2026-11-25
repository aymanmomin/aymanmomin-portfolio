# Project Status

- **Current phase:** story site rebuild, PR 2 (express route as a readable page)
- **Latest successful build:** CI `verify` passed on PR #10 (foundation); PR 2 result recorded after merge

## Completed
- Repository, `main` and `develop` branches, `main` protected (PR required, `verify` check required, no force-push, no deletion)
- Vite, React, TypeScript, ESLint, Tailwind, Vitest, GitHub Actions CI
- Standard layout: hero with 3D network graph, About, Skills, Experience, Projects, Contact (still the default; to be retired)
- Story foundation: content model, word budgets, dialog, media slot, claims register (PR #10)

## In progress
- Express route: all 11 stops written, currency toggle, SEO staircase, readable page at `/?story=1`

## Parked
- Local branch `feature/world-engine` (station-snapping prototype, never pushed or merged)

## Next
- PR 3: scroll engine, camera path, thread, progress bar
- PR 4: India scenes, then The Crossing and Canada
- PR 5: Detailed view, project pop-ups, case studies
- PR 6: hero and route chooser polish, mobile, performance, accessibility, deployment

## Blockers / missing information
- Items marked "Needs confirmation" in `docs/content/claims.md` (income figures, Nexus, Lemmer baseline, GA4 hours, research details, True North dates, permission for photos with named people)
- Photos and videos for every media slot, and captions for any video
- Screenshots, role and tech stack for the Ace SEO case study
- Contact form provider and endpoint (the form stays hidden until set)
- Financial dashboard screenshot approval

## Known bugs
- None known.
- The old contact test asserts the standard layout shows no email; revisit when the standard layout is retired.
- 3D chunk is 243 kB gzipped; size reduction planned.
- 3D frame rate, battery impact and accessibility audit (axe) not yet run.
- Favicon is still the Vite default; Open Graph tags not yet set.