import { createRandom } from '../lib/graph'

export interface Building {
  x: number
  z: number
  w: number
  d: number
  h: number
}

// A seeded row of buildings between xStart and xEnd, so the skyline is identical on every load.
export function generateBuildings(
  seed: number,
  count: number,
  xStart: number,
  xEnd: number,
  z: number,
  minHeight: number,
  maxHeight: number,
): Building[] {
  const random = createRandom(seed)
  const step = (xEnd - xStart) / Math.max(1, count)
  const buildings: Building[] = []
  for (let i = 0; i < count; i += 1) {
    buildings.push({
      x: xStart + step * (i + 0.5) + (random() - 0.5) * step * 0.3,
      z: z + (random() - 0.5) * 2,
      w: step * (0.7 + random() * 0.6),
      d: 2 + random() * 3,
      h: minHeight + random() * (maxHeight - minHeight),
    })
  }
  return buildings
}