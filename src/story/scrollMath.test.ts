import { describe, expect, it } from 'vitest'
import { actAt, actProgress, fractionalIndex } from './scrollMath'

describe('fractionalIndex', () => {
  const centers = [100, 300, 700]

  it('is whole numbers at the element centres', () => {
    expect(fractionalIndex(centers, 100)).toBe(0)
    expect(fractionalIndex(centers, 300)).toBe(1)
    expect(fractionalIndex(centers, 700)).toBe(2)
  })

  it('interpolates between centres', () => {
    expect(fractionalIndex(centers, 200)).toBeCloseTo(0.5)
    expect(fractionalIndex(centers, 500)).toBeCloseTo(1.5)
  })

  it('clamps outside the range', () => {
    expect(fractionalIndex(centers, 10)).toBe(0)
    expect(fractionalIndex(centers, 900)).toBe(2)
  })

  it('returns 0 when measurements are missing or unusable', () => {
    expect(fractionalIndex([], 50)).toBe(0)
    expect(fractionalIndex([100], 50)).toBe(0)
    expect(fractionalIndex([100, Number.NaN, 700], 400)).toBe(0)
    expect(fractionalIndex([0, 0, 0], 0)).toBe(0)
  })
})

describe('acts', () => {
  it('names the act for a path position', () => {
    expect(actAt(0)).toBe('india')
    expect(actAt(7.4)).toBe('india')
    expect(actAt(7.6)).toBe('crossing')
    expect(actAt(8.4)).toBe('crossing')
    expect(actAt(8.6)).toBe('canada')
    expect(actAt(11)).toBe('canada')
  })

  it('reports how far through each act the reader is', () => {
    expect(actProgress(3.5, 'india')).toBeCloseTo(0.5)
    expect(actProgress(7, 'crossing')).toBe(0)
    expect(actProgress(7.5, 'crossing')).toBeCloseTo(0.5)
    expect(actProgress(8, 'canada')).toBe(0)
    expect(actProgress(20, 'canada')).toBe(1)
    expect(actProgress(-2, 'india')).toBe(0)
  })
})