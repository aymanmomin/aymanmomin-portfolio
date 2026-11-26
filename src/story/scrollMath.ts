import type { Act } from './types'

export const STOP_COUNT = 11

// Positions along the path: 0 is the hero, 1 to 11 are the stops.
export const ACT_RANGES: Record<Act, { start: number; end: number }> = {
  india: { start: 0, end: 7 },
  crossing: { start: 7, end: 8 },
  canada: { start: 8, end: 11 },
}

// Maps a scroll position to a fractional path position. Each element centre is a whole number,
// and positions between two centres are interpolated, so the camera stays tied to the content.
export function fractionalIndex(centers: number[], y: number): number {
  if (centers.length < 2 || centers.some((center) => !Number.isFinite(center))) return 0
  if (y <= centers[0]) return 0
  const last = centers.length - 1
  if (y >= centers[last]) return last
  for (let i = 0; i < last; i += 1) {
    const a = centers[i]
    const b = centers[i + 1]
    if (y >= a && y < b) {
      const span = b - a
      return span > 0 ? i + (y - a) / span : i
    }
  }
  return last
}

export function actAt(position: number): Act {
  const index = Math.round(position)
  if (index <= 7) return 'india'
  if (index === 8) return 'crossing'
  return 'canada'
}

export function actProgress(position: number, act: Act): number {
  const { start, end } = ACT_RANGES[act]
  return Math.min(1, Math.max(0, (position - start) / (end - start)))
}