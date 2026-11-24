import { describe, expect, it } from 'vitest'
import type { Stop } from './types'
import { countWords, readingMinutes, routeWordCount, stopWordCount } from './words'

const stop: Stop = {
  id: 'demo',
  number: 1,
  act: 'india',
  period: '2020',
  headline: 'One two three',
  stat: { value: '52', label: 'experts featured' },
  media: { id: 'demo-photo', kind: 'photo', label: 'Demo' },
  express: {
    paragraphs: ['Four words in here.', 'Two more'],
    popup: { title: 'Popup title is ignored', paragraphs: ['ignored text in the popup'] },
  },
  detailed: {
    paragraphs: ['A much longer detailed paragraph with nine words total.'],
    popup: { title: 'Ignored', paragraphs: [] },
  },
}

describe('word counting', () => {
  it('counts words and ignores extra whitespace', () => {
    expect(countWords('')).toBe(0)
    expect(countWords('  a  b\nc ')).toBe(3)
  })

  it('counts on-page copy only, never pop-up text', () => {
    expect(stopWordCount(stop, 'express')).toBe(12)
    expect(stopWordCount(stop, 'detailed')).toBe(15)
  })

  it('adds up across stops', () => {
    expect(routeWordCount([stop, stop], 'express')).toBe(24)
  })

  it('turns words into reading minutes', () => {
    expect(readingMinutes(1100)).toBeCloseTo(5, 1)
    expect(readingMinutes(2000)).toBeCloseTo(9.1, 1)
  })
})