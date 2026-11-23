# 3D Hero

## What it is
A slowly rotating network graph (nodes and edges) built with three.js through React Three Fiber.
The graph comes from `src/lib/graph.ts`, a seeded generator, so it is identical on every load.

## Behaviour
- Hero text and calls to action are plain HTML and render before any 3D code loads.
- `HeroScene` is lazy-loaded, so three.js is a separate chunk from the main bundle.
- The render loop is paused while the hero is scrolled off-screen (`useInView`).
- Narrow screens use a smaller graph (40 nodes instead of 72) and a lower pixel-ratio cap.
- The camera tilts slightly toward the pointer.

## Fallback
A static SVG of the same graph (`HeroFallback`) is shown when:
- WebGL is unavailable,
- the user prefers reduced motion,
- the 3D chunk is still loading, or
- the 3D scene throws (`SceneBoundary`).

## Measured (production build, Phase 4)
- Main bundle: 230.80 kB (72.86 kB gzipped)
- `HeroScene` chunk (three.js and scene): 919.49 kB (243.06 kB gzipped), loaded on demand

## Not yet measured
Frame rate, battery use and Lighthouse impact. These are covered in the QA phase.
Reducing the chunk size is a candidate task for the refinement phase.