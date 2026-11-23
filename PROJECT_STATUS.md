# Project Status

- **Current phase:** 5, core content (batch D: Contact)
- **Latest successful build:** CI `verify` passed on the Projects PR; batch D result recorded after merge

## Completed
- Repository, `main` and `develop` branches, `main` protected (PR required, `verify` check required, no force-push, no deletion)
- Vite, React, TypeScript, ESLint, Tailwind, Vitest, GitHub Actions CI
- Design tokens, self-hosted fonts, UI primitives, responsive navbar, page shell
- Hero with lazy-loaded 3D network graph and static fallback
- About, Education and Skills sections
- Experience timeline
- Projects section: three featured cards and eight secondary cards

## In progress
- Contact section (form hidden until an endpoint is configured)

## Next
- Phase 6: case-study pages for ChalkUp, Financial Reality and Settlerr
- Phase 7: refinement (3D bundle size, SEO, Open Graph, favicon, accessibility audit)

## Blockers / missing information
- Nexus, Alberta Class 7 and the financial project repos are private (owner confirmed), so their repo buttons stay hidden unless made public
- Settlerr: owner confirmed the Gemini wording and linking the public repo; the card says contributed to, as the repo shows the Gemini code committed by a teammate
- ChalkUp: confirm the final technology stack (currently labelled planned and in-progress)
- Contact form provider and endpoint (the form is hidden until set)
- Coffee Energy Analysis: README not yet read, so it is excluded for now
- Atomic Habits, Timeliness dashboard and Ego Network card wording are short drafts
- Lemmer accuracy figure (baseline, metric, absolute or relative)
- Web version of the resume PDF (contact details removed), pending a decision
- Financial dashboard screenshot approval

## Known bugs
- None known.
- 3D chunk is 243 kB gzipped; size reduction planned for refinement.
- 3D frame rate, battery impact and accessibility audit (axe) not yet run.
- Favicon is still the Vite default; Open Graph tags not yet set.