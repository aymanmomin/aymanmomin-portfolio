# Architecture Overview (plan)

Status: planned, not yet implemented.

## Stack
Vite, React, TypeScript, Tailwind CSS, React Router, React Three Fiber (Three.js), lucide-react.
Tooling: ESLint, Vitest, Playwright with axe. Deployment target: GitHub Pages via GitHub Actions.

## Routes
- `/` single page: Hero, About, Featured Projects, Other Projects, Experience, Skills, Education, Contact
- `/projects/chalkup`, `/projects/financial-reality`, `/projects/settlerr`
- 404 page, with a redirect shim so direct links work on GitHub Pages

## 3D
Hero: slowly rotating network graph, lightweight, lazy-loaded, paused off-screen.
Fallback: static SVG when WebGL is unavailable or reduced motion is requested.
Cards: CSS 3D tilt only. No other WebGL scenes.

## Content model
Typed data files (`personal`, `projects`, `experience`, `skills`). Missing links are `null`,
and the UI hides their buttons. Unverified claims are not published.