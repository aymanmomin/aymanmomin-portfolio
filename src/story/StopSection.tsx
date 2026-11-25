import type { ReactNode } from 'react'
import Container from '../components/layout/Container'
import { buttonClasses } from '../lib/buttonClasses'
import CurrencyToggle from './CurrencyToggle'
import MediaSlot from './MediaSlot'
import type { PopupContent, Route, Stop } from './types'
import { stopText } from './words'

interface StopSectionProps {
  stop: Stop
  route: Route
  onOpenPopup: (popup: PopupContent) => void
  after?: ReactNode
}

export default function StopSection({ stop, route, onOpenPopup, after }: StopSectionProps) {
  const text = stopText(stop, route)

  return (
    <article
      id={stop.id}
      aria-labelledby={`${stop.id}-title`}
      className="scroll-mt-16 border-t border-line py-14 sm:py-20"
    >
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <div>
            <p className="text-sm text-accent-strong">
              {String(stop.number).padStart(2, '0')} &middot; {stop.period}
            </p>
            <h3
              id={`${stop.id}-title`}
              className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {stop.headline}
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed sm:text-lg">
              {text.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {stop.special === 'currency' ? (
              <CurrencyToggle />
            ) : (
              <p className="mt-6">
                <span className="font-display text-4xl font-semibold text-fg">{stop.stat.value}</span>{' '}
                <span className="text-sm text-muted">{stop.stat.label}</span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => onOpenPopup(text.popup)}
                className={buttonClasses('secondary')}
              >
                Learn more<span className="sr-only"> about {stop.headline}</span>
              </button>
              {after}
            </div>
          </div>

          <MediaSlot media={stop.media} className="self-start" />
        </div>
      </Container>
    </article>
  )
}