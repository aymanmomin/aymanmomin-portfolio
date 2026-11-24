import type { Route, Stop } from './types'

export const EXPRESS_WORD_BUDGET = 1100
export const DETAILED_WORD_BUDGET = 2000

// About 220 words per minute of comfortable reading.
const WORDS_PER_MINUTE = 220

export function countWords(text: string): number {
  const trimmed = text.trim()
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length
}

// On-page copy only: headline, body paragraphs and the key stat. Pop-ups are optional extra reading.
export function stopWordCount(stop: Stop, route: Route): number {
  const text = route === 'express' ? stop.express : stop.detailed
  return (
    countWords(stop.headline) +
    countWords(`${stop.stat.value} ${stop.stat.label}`) +
    text.paragraphs.reduce((sum, paragraph) => sum + countWords(paragraph), 0)
  )
}

export function routeWordCount(stops: Stop[], route: Route): number {
  return stops.reduce((sum, stop) => sum + stopWordCount(stop, route), 0)
}

export function readingMinutes(words: number): number {
  return Math.round((words / WORDS_PER_MINUTE) * 10) / 10
}