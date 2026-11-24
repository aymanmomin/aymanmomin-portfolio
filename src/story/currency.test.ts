import { describe, expect, it } from 'vitest'
import { RATE_AT_THE_TIME, RATE_BUYING_POWER, figureFor, incomes } from './currency'

describe('agency income figures', () => {
  it('keeps the stated CAD figures inside the range the stated rates imply', () => {
    for (const income of incomes) {
      expect(income.then.min).toBeGreaterThanOrEqual(income.inr.min / RATE_AT_THE_TIME.high)
      expect(income.then.max).toBeLessThanOrEqual(income.inr.max / RATE_AT_THE_TIME.low)
      expect(income.power.min).toBeGreaterThanOrEqual(income.inr.min / RATE_BUYING_POWER.high)
      expect(income.power.max).toBeLessThanOrEqual(income.inr.max / RATE_BUYING_POWER.low)
    }
  })

  it('picks the figure for each mode', () => {
    const solo = incomes[0]
    expect(figureFor(solo, 'inr')).toBe(solo.inr)
    expect(figureFor(solo, 'cad-then')).toBe(solo.then)
    expect(figureFor(solo, 'cad-ppp')).toBe(solo.power)
  })
})