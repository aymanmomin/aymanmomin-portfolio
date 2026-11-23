import { describe, expect, it } from 'vitest'
import { experience, leadership } from './experience'

describe('experience data', () => {
  it('has unique ids and at least one highlight each', () => {
    const ids = experience.map((entry) => entry.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const entry of experience) {
      expect(entry.highlights.length).toBeGreaterThan(0)
    }
  })

  it('does not publish the unconfirmed Lemmer accuracy figure', () => {
    const text = JSON.stringify(experience).toLowerCase()
    expect(text).not.toContain('10%')
    expect(text).not.toContain('accuracy')
  })

  it('has leadership entries', () => {
    expect(leadership.length).toBeGreaterThan(0)
  })
})