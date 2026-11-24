# Story Site (planned direction)

Status: planned. Replaces the earlier station-snapping 3D prototype, which was never merged.

## Concept
A single-page, scroll-driven 3D journey: "Two countries, one thread." One continuous scroll, native
(no wheel hijacking). A fixed WebGL canvas sits behind the page and scroll position moves the camera
along a curve. One luminous thread links all 11 stops and changes character across three acts:
India (warm, dense), The Crossing (a stretched gap), Canada (cool, calmer).

## Structure
1. Hero: name, one-line hook, scroll cue
2. Route chooser: Express (about 5 minutes, about 1,100 words) or Detailed (about 9 minutes, about 2,000 words)
3. Eleven stops across the three acts, each with headline, short text, one key stat, one media slot
   and a Learn more pop-up
4. Extra material opens in pop-ups on top of the page, never separate pages

A progress indicator shows India / The Crossing / Canada with clickable stop dots, and the route
toggle keeps the reader's place.

## Technical decisions
- Content lives in one typed file with express and detailed text per stop. Tests fail if on-page
  copy exceeds the word budgets. Pop-up text is optional extra reading and is not counted.
- Pop-ups use the native dialog element (Esc to close, focus trap, focus returns to the trigger),
  plus a visible Close button and backdrop click.
- Media slots are labelled placeholders until a file path is added. A single flag hides empty slots.
  Videos will need captions before launch.
- Without WebGL, or with reduced motion, the same story renders as a plain readable page with a
  static SVG thread.
- Mobile: capped pixel ratio, fewer particles, render loop paused when off-screen or hidden.

## Build order
1. Foundation: content model, claims register, dialog, media slot
2. Express route as a complete readable page
3. Scroll engine, camera path, thread, progress bar
4. India scenes, then The Crossing and Canada
5. Detailed view, project pop-ups, case studies
6. Hero and route chooser polish, mobile, performance, accessibility, deployment