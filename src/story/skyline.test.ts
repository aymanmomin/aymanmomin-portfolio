import { describe, expect, it } from 'vitest'
import { generateBuildings } from './skyline'

describe('generateBuildings', () => {
  it('creates the requested number of buildings within the height range', () => {
    const buildings = generateBuildings(3, 20, -10, 50, 0, 3, 10)
    expect(buildings).toHaveLength(20)
    for (const building of buildings) {
      expect(building.h).toBeGreaterThanOrEqual(3)
      expect(building.h).toBeLessThanOrEqual(10)
      expect(building.w).toBeGreaterThan(0)
    }
  })

  it('stays close to the requested span', () => {
    const buildings = generateBuildings(4, 20, -10, 50, 0, 3, 10)
    for (const building of buildings) {
      expect(building.x).toBeGreaterThan(-10 - 3)
      expect(building.x).toBeLessThan(50 + 3)
    }
  })

  it('is deterministic for a seed and different for another', () => {
    expect(generateBuildings(5, 12, 0, 40, 0, 2, 8)).toEqual(generateBuildings(5, 12, 0, 40, 0, 2, 8))
    expect(generateBuildings(5, 12, 0, 40, 0, 2, 8)).not.toEqual(generateBuildings(6, 12, 0, 40, 0, 2, 8))
  })

  it('handles an empty row', () => {
    expect(generateBuildings(1, 0, 0, 10, 0, 1, 2)).toEqual([])
  })
})