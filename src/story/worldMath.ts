import { hexToRgb, mix } from './path'
import type { Rgb } from './path'

// One entry per path position: 0 is the hero and 1 to 11 are the stops.
export const CAMERA_X = [0, 4, 10, 16, 22, 28, 34, 40, 62, 92, 106, 120]
export const CAMERA_Y = [4, 4, 4, 4, 4, 4, 4, 5, 14, 5, 4, 4]
export const CAMERA_Z = [15, 15, 15, 15, 15, 15, 15, 17, 21, 17, 15, 15]
export const LOOK_Y = [5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 7, 13, 6, 5.4, 5.4]

// Mumbai ends and Calgary begins with a stretch of open sky between them: the crossing.
export const MUMBAI_X: [number, number] = [-10, 50]
export const CALGARY_X: [number, number] = [78, 140]

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))

// Reads a table at a fractional position, easing between entries so the camera settles at each stop.
export function sampleTable(table: number[], p: number): number {
  const last = table.length - 1
  const clamped = Math.min(Math.max(p, 0), last)
  const i = Math.min(Math.floor(clamped), last - 1)
  const f = clamped - i
  const eased = f * f * (3 - 2 * f)
  return table[i] + (table[i + 1] - table[i]) * eased
}

interface Palette {
  india: Rgb
  night: Rgb
  canada: Rgb
}

const SKY: Palette = { india: hexToRgb('#c9682b'), night: hexToRgb('#0b0d2a'), canada: hexToRgb('#2f4ac0') }
const SILHOUETTE: Palette = { india: hexToRgb('#3a1c0c'), night: hexToRgb('#08091c'), canada: hexToRgb('#0c103c') }
const FAR: Palette = { india: hexToRgb('#783c19'), night: hexToRgb('#14163c'), canada: hexToRgb('#22348c') }

// Warm through India, night at stop 8, cool through Canada.
function paletteAt(p: number, palette: Palette): Rgb {
  if (p <= 6) return palette.india
  if (p <= 8) return mix(palette.india, palette.night, (p - 6) / 2)
  if (p <= 9.4) return mix(palette.night, palette.canada, (p - 8) / 1.4)
  return palette.canada
}

export const skyAt = (p: number): Rgb => paletteAt(p, SKY)
export const silhouetteAt = (p: number): Rgb => paletteAt(p, SILHOUETTE)
export const farAt = (p: number): Rgb => paletteAt(p, FAR)

// 1 at stop 8, fading to 0 about 1.6 stops either side.
export function nightAt(p: number): number {
  return clamp01(1 - Math.abs(p - 8) / 1.6)
}

export function sunAt(p: number): { opacity: number; y: number } {
  return { opacity: 1 - clamp01((p - 4.5) / 2), y: 14 - 12 * clamp01(p / 6.5) }
}

// The flight arc from Mumbai to Calgary, a quadratic curve. angle is the direction of travel.
export function planePoint(u: number): { x: number; y: number; angle: number } {
  const t = clamp01(u)
  const x0 = 46
  const y0 = 6
  const x1 = 66
  const y1 = 26
  const x2 = 86
  const y2 = 6
  const a = (1 - t) * (1 - t)
  const b = 2 * (1 - t) * t
  const c = t * t
  const dx = 2 * (1 - t) * (x1 - x0) + 2 * t * (x2 - x1)
  const dy = 2 * (1 - t) * (y1 - y0) + 2 * t * (y2 - y1)
  return { x: a * x0 + b * x1 + c * x2, y: a * y0 + b * y1 + c * y2, angle: Math.atan2(dy, dx) }
}

export const planeProgress = (p: number): number => clamp01((p - 7) / 2)
export const planeVisible = (p: number): boolean => p > 6.7 && p < 9.3