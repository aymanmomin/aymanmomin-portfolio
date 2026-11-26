import { STOP_COUNT } from './scrollMath'

export type Vec3 = [number, number, number]
export type Rgb = [number, number, number]

// The camera path: index 0 is the hero, 1 to 11 are the stops. The extra distance
// before index 8 is the crossing, so the thread visibly stretches between stops 7 and 8.
export const pathPoints: Vec3[] = Array.from({ length: STOP_COUNT + 1 }, (_, i): Vec3 => [
  Math.sin(i * 0.8) * 2.4,
  Math.cos(i * 0.6) * 0.9,
  -i * 6 - (i >= 8 ? 8 : 0),
])

export function hexToRgb(hex: string): Rgb {
  const value = parseInt(hex.replace('#', ''), 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

export function rgbToHex([r, g, b]: Rgb): string {
  const part = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${part(r)}${part(g)}${part(b)}`
}

export function mix(a: Rgb, b: Rgb, t: number): Rgb {
  const k = Math.min(1, Math.max(0, t))
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]
}

export const INDIA_HEX = '#f2a65a'
export const CANADA_HEX = '#8f9bff'
export const CROSSING_HEX = '#f4f4f5'
const GAP_HEX = '#2a2a3a'

const INDIA = hexToRgb(INDIA_HEX)
const GAP = hexToRgb(GAP_HEX)
const CANADA = hexToRgb(CANADA_HEX)

// Thread colour along the path: warm in India, dark across the crossing, cool in Canada.
export function threadColor(position: number): Rgb {
  if (position <= 6) return INDIA
  if (position <= 7.3) return mix(INDIA, GAP, (position - 6) / 1.3)
  if (position <= 8) return GAP
  if (position <= 9) return mix(GAP, CANADA, position - 8)
  return CANADA
}

// Stop 8 is the turning point, so its marker is white.
export function markerColor(index: number): string {
  if (index === 8) return CROSSING_HEX
  return index < 8 ? INDIA_HEX : CANADA_HEX
}