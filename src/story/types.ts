export type Act = 'india' | 'crossing' | 'canada'
export type Route = 'express' | 'detailed'

export const acts: { id: Act; label: string }[] = [
  { id: 'india', label: 'India' },
  { id: 'crossing', label: 'The Crossing' },
  { id: 'canada', label: 'Canada' },
]

export interface MediaSpec {
  id: string
  kind: 'photo' | 'video'
  label: string
  caption?: string
  src?: string
  alt?: string
}

export interface PopupLink {
  label: string
  url: string
}

export interface PopupContent {
  title: string
  paragraphs: string[]
  bullets?: string[]
  media?: MediaSpec[]
  links?: PopupLink[]
}

export interface Stat {
  value: string
  label: string
}

export interface StopText {
  paragraphs: string[]
  popup: PopupContent
}

export interface Stop {
  id: string
  number: number
  act: Act
  period: string
  headline: string
  stat: Stat
  media: MediaSpec
  express: StopText
  detailed: StopText & { extras?: PopupContent[] }
}