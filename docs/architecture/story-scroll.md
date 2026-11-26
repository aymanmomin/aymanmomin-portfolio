# Story scroll and 3D scene

## How it works
- Native scrolling. Nothing intercepts the wheel or touch input.
- `useStoryScroll` measures the centre of the hero and each stop and turns the scroll position into a
  path position: 0 is the hero and 1 to 11 are the stops, interpolated in between (`scrollMath.ts`).
- The position lives in a small store (`scrollStore.ts`), outside React, so the 3D loop reads it every
  frame without re-rendering the page. Only the nearest-stop number is exposed to React.
- `StoryCanvas` (lazy-loaded) draws a fixed full-screen scene behind the content. The camera follows a
  Catmull-Rom curve through the path points (`path.ts`), looking slightly ahead, damped for smoothness,
  with a small pointer parallax.
- The thread is one tube with vertex colours: amber through India, dark across the crossing (stops 7
  to 8, where the path is stretched), blue-violet through Canada. The stop 8 marker is white.
- `StoryProgress` shows India / The Crossing / Canada with a fill per act and a link per stop.
  Fills are updated directly through the store, not through React state.

## Fallbacks
- No WebGL, or reduced motion: no canvas is created. The same story renders as the plain page and the
  progress bar still works.
- If the 3D scene throws, `SceneBoundary` removes it and the page keeps working.
- Over the 3D scene, text sits on a translucent panel so it stays readable.

## Mobile
Pixel ratio capped at 1.5, no antialiasing and fewer stars on narrow screens.
The progress bar hides per-stop dots on phones (touch targets) and shows "Stop n of 11".

## Not yet measured
Frame rate, battery use, and the cost of the backdrop blur on phones. To be measured in the QA phase.