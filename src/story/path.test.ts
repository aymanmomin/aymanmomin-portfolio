import { describe, expect, it } from 'vitest'
import { STOP_COUNT } from './scrollMath'
import { CANADA_HEX, INDIA_HEX, hexToRgb, markerColor, mix, pathPoints, rgbToHex, threadColor } from './path'

describe('path', () => {
  it('has a point for the hero and for every stop', () => {
    expect(pathPoints).toHaveLength(STOP_COUNT + 1)
    for (const point of pathPoints) {
      for (const value of point) expect(Number.isFinite(value)).toBe(true)
    }
  })

  it('stretches the gap between stops 7 and 8', () => {
    const distances = pathPoints.slice(1).map((point, i) => pathPoints[i][2] - point[2])
    const others = distances.filter((_, i) => i !== 7)
    expect(distances[7]).toBeGreaterThan(Math.max(...others))
  })
})

describe('colours', () => {
  it('round-trips hex colours', () => {
    expect(rgbToHex(hexToRgb(INDIA_HEX))).toBe(INDIA_HEX)
    expect(rgbToHex(hexToRgb(CANADA_HEX))).toBe(CANADA_HEX)
  })

  it('mixes and clamps', () => {
    expect(mix([0, 0, 0], [1, 1, 1], 0.5)).toEqual([0.5, 0.5, 0.5])
    expect(mix([0, 0, 0], [1, 1, 1], 5)).toEqual([1, 1, 1])
  })

  it('runs warm, then dark across the crossing, then cool', () => {
    expect(threadColor(0)).toEqual(hexToRgb(INDIA_HEX))
    expect(threadColor(11)).toEqual(hexToRgb(CANADA_HEX))
    const brightness = (position: number) => threadColor(position).reduce((sum, v) => sum + v, 0)
    expect(brightness(7.6)).toBeLessThan(brightness(3))
    expect(brightness(7.6)).toBeLessThan(brightness(10))
  })

  it('marks stop 8 as the white turning point', () => {
    expect(markerColor(3)).toBe(INDIA_HEX)
    expect(markerColor(8)).toBe('#f4f4f5')
    expect(markerColor(10)).toBe(CANADA_HEX)
  })
})