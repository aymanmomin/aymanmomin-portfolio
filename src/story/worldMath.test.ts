import { describe, expect, it } from 'vitest'
import { hexToRgb } from './path'
import {
  CALGARY_X,
  CAMERA_X,
  CAMERA_Y,
  CAMERA_Z,
  LOOK_Y,
  MUMBAI_X,
  nightAt,
  planePoint,
  planeProgress,
  planeVisible,
  sampleTable,
  skyAt,
  sunAt,
} from './worldMath'

const brightness = (rgb: number[]) => rgb[0] + rgb[1] + rgb[2]

describe('camera tables', () => {
  it('have an entry for the hero and each of the eleven stops', () => {
    for (const table of [CAMERA_X, CAMERA_Y, CAMERA_Z, LOOK_Y]) expect(table).toHaveLength(12)
  })

  it('returns the table value exactly at each stop', () => {
    CAMERA_X.forEach((value, i) => expect(sampleTable(CAMERA_X, i)).toBeCloseTo(value))
  })

  it('eases through the middle and clamps outside the range', () => {
    expect(sampleTable(CAMERA_X, 7.5)).toBeCloseTo((CAMERA_X[7] + CAMERA_X[8]) / 2)
    expect(sampleTable(CAMERA_X, -3)).toBe(CAMERA_X[0])
    expect(sampleTable(CAMERA_X, 40)).toBe(CAMERA_X[11])
  })

  it('moves forward and never backwards', () => {
    let previous = sampleTable(CAMERA_X, 0)
    for (let p = 0.1; p <= 11; p += 0.1) {
      const x = sampleTable(CAMERA_X, p)
      expect(x).toBeGreaterThanOrEqual(previous)
      previous = x
    }
  })

  it('leaves open sky between Mumbai and Calgary', () => {
    expect(CALGARY_X[0] - MUMBAI_X[1]).toBeGreaterThanOrEqual(25)
  })
})

describe('colour grade', () => {
  it('is warm in India, dark at the crossing and cool in Canada', () => {
    expect(skyAt(0)).toEqual(hexToRgb('#c9682b'))
    expect(skyAt(11)).toEqual(hexToRgb('#2f4ac0'))
    expect(brightness(skyAt(8))).toBeLessThan(brightness(skyAt(0)))
    expect(brightness(skyAt(8))).toBeLessThan(brightness(skyAt(11)))
  })

  it('peaks the night at stop 8 and is gone well before and after', () => {
    expect(nightAt(8)).toBe(1)
    expect(nightAt(5)).toBe(0)
    expect(nightAt(11)).toBe(0)
  })

  it('sets the sun over the first half of the story', () => {
    expect(sunAt(0).opacity).toBe(1)
    expect(sunAt(8).opacity).toBe(0)
    expect(sunAt(6).y).toBeLessThan(sunAt(0).y)
  })
})

describe('flight arc', () => {
  it('flies from Mumbai to Calgary, rising in between', () => {
    const start = planePoint(0)
    const middle = planePoint(0.5)
    const end = planePoint(1)
    expect(start.x).toBe(46)
    expect(end.x).toBe(86)
    expect(middle.y).toBeGreaterThan(start.y)
    expect(start.angle).toBeGreaterThan(0)
    expect(end.angle).toBeLessThan(0)
  })

  it('is only visible around the crossing and peaks at stop 8', () => {
    expect(planeVisible(3)).toBe(false)
    expect(planeVisible(8)).toBe(true)
    expect(planeVisible(11)).toBe(false)
    expect(planeProgress(8)).toBeCloseTo(0.5)
    expect(planeProgress(0)).toBe(0)
    expect(planeProgress(11)).toBe(1)
  })
})