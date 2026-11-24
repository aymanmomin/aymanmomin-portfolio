import { describe, expect, it } from 'vitest'
import type { Stop } from './types'
import { stopText, stopWordCount } from './words'

const expressOnly: Stop = {
  id: 'demo',
  number: 1,
  act: 'india',
  period: '2020',
  headline: 'One two',
  stat: { value: '3', label: 'things' },
  media: { id: 'demo-photo', kind: 'photo', label: 'Demo' },
  express: {
    paragraphs: ['Four words right here.'],
    popup: { title: 'Ignored', paragraphs: [] },
  },
}

describe('stopText', () => {
  it('falls back to the express text when no detailed text exists', () => {
    expect(stopText(expressOnly, 'detailed')).toBe(expressOnly.express)
    expect(stopWordCount(expressOnly, 'detailed')).toBe(stopWordCount(expressOnly, 'express'))
  })

  it('prefers detailed text when it exists', () => {
    const withDetailed: Stop = {
      ...expressOnly,
      detailed: { paragraphs: ['A longer detailed paragraph.'], popup: { title: 'Ignored', paragraphs: [] } },
    }
    expect(stopText(withDetailed, 'detailed').paragraphs[0]).toBe('A longer detailed paragraph.')
    expect(stopText(withDetailed, 'express').paragraphs[0]).toBe('Four words right here.')
  })
})