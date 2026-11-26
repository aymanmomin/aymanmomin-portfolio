# Story scroll and 3D world

## How it works
- Native scrolling. Nothing intercepts the wheel or touch input.
- `useStoryScroll` measures the centre of the hero and each stop and turns the scroll position into a
  path position: 0 is the hero and 1 to 11 are the stops, interpolated in between (`scrollMath.ts`).
- The position lives in a small store (`scrollStore.ts`), outside React, so the 3D loop reads it every
  frame without re-rendering the page. Only the nearest-stop number is exposed to React.
- `StoryCanvas` (lazy-loaded) draws a fixed full-screen world behind the content: a warm dusk Mumbai
  skyline with a dome building and an arched gateway, an open night sky for the crossing with a plane
  flying a dotted arc, and a cool Calgary skyline with mountains and the tower.
- Camera position and look-at height are tables indexed by path position (`worldMath.ts`), eased so
  the camera settles at each stop. The colour grade (warm, night at stop 8, cool) is applied to shared
  materials every frame (`worldMaterials.ts`). Buildings come from a seeded generator (`skyline.ts`)
  and are drawn as instanced meshes.
- `StoryProgress` shows India / The Crossing / Canada with a fill per act and a link per stop.

## Fallbacks
- No WebGL, or reduced motion: no canvas is created and the same story renders as the plain page.
- If the 3D scene throws, `SceneBoundary` removes it and the page keeps working.
- Over the 3D scene, text sits on a translucent panel so it stays readable.

## Mobile
Pixel ratio capped at 1.5, no antialiasing and a lighter skyline on narrow screens. The progress
bar hides per-stop dots on phones and shows "Stop n of 11".

## Not yet measured
Frame rate, battery use, and the cost of the backdrop blur on phones. To be measured in the QA phase.