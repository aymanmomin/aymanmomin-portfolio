import { describe, expect, it } from 'vitest'
import { stops } from './stops'
import { EXPRESS_WORD_BUDGET, countWords, readingMinutes, routeWordCount } from './words'

const everything = JSON.stringify(stops)

// Facts that belong only in the detailed view, never in the express route.
const detailedOnly = [
  'Scratch',
  'CAS website',
  '200+',
  '30%',
  '60%',
  'Souvenir',
  'programmerinjokes',
  'Upkey',
  'OWN Academy',
  '4.6',
  'Nigeria',
  'Calculus',
  'YOLO',
  'OpenCV',
  'Raspberry',
  'Arduino',
  'neurodivergent',
  'Meta Quest',
]

describe('story stops', () => {
  it('has eleven numbered stops with unique ids across the three acts', () => {
    expect(stops.map((stop) => stop.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    expect(new Set(stops.map((stop) => stop.id)).size).toBe(11)
    expect(stops.filter((stop) => stop.act === 'india')).toHaveLength(7)
    expect(stops.filter((stop) => stop.act === 'crossing')).toHaveLength(1)
    expect(stops.filter((stop) => stop.act === 'canada')).toHaveLength(3)
  })

  it('keeps the on-page express copy within the word budget', () => {
    const words = routeWordCount(stops, 'express')
    const popupWords = stops.reduce((sum, stop) => {
      const popup = stop.express.popup
      return sum + countWords([popup.title, ...popup.paragraphs, ...(popup.bullets ?? [])].join(' '))
    }, 0)
    console.info(`Express on-page words: ${words} (${readingMinutes(words)} min). Pop-up words: ${popupWords}.`)
    expect(words).toBeLessThanOrEqual(EXPRESS_WORD_BUDGET)
    expect(words).toBeGreaterThan(600)
  })

  it('gives every stop a unique media slot and a titled pop-up', () => {
    const slotIds = stops.flatMap((stop) => [stop.media.id, ...(stop.express.popup.media ?? []).map((m) => m.id)])
    expect(new Set(slotIds).size).toBe(slotIds.length)
    for (const stop of stops) {
      expect(stop.express.popup.title.length).toBeGreaterThan(0)
      expect(stop.express.paragraphs.length).toBeGreaterThan(0)
    }
  })

  it('keeps detailed-only material out of the express route', () => {
    for (const phrase of detailedOnly) {
      expect(everything, `found "${phrase}"`).not.toContain(phrase)
    }
  })

  it('follows the wording decisions in the claims register', () => {
    const byId = (id: string) => JSON.stringify(stops.find((stop) => stop.id === id))
    expect(byId('finding-data')).toContain('volunteer')
    expect(byId('leading')).toContain('featuring')
    expect(everything).not.toContain('for 52 experts')
    expect(everything).not.toContain('Lead Data Analyst')
    expect(everything).toContain('April 2024')
    expect(everything).not.toMatch(/A&W: May 2024/)
    expect(everything).not.toContain('Gemini')
    expect(everything).not.toContain('@')
    expect(stops.find((stop) => stop.id === 'real-work')?.stat.value).toBe('+10%')
    expect(stops.find((stop) => stop.id === 'agency')?.special).toBe('currency')
  })
})