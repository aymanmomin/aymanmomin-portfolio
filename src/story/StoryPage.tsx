import { useState } from 'react'
import Contact from '../components/contact/Contact'
import Container from '../components/layout/Container'
import ContactActions from './ContactActions'
import PopupBody from './PopupBody'
import StopSection from './StopSection'
import StoryDialog from './StoryDialog'
import { stops } from './stops'
import { acts } from './types'
import type { PopupContent, Route } from './types'

// The express route is the only route so far. The detailed route and a route chooser come in a later PR.
const route: Route = 'express'

export default function StoryPage() {
  const [popup, setPopup] = useState<PopupContent | null>(null)

  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to the story
      </a>

      <header className="py-20 sm:py-32">
        <Container>
          <p className="text-sm tracking-wide text-accent-strong">Express route, about 5 minutes</p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">Ayman Momin</h1>
          <p className="mt-4 text-xl text-fg sm:text-2xl">Two countries, one thread.</p>
          <p className="mt-3 max-w-xl text-muted">
            Computer Science co-op student at the University of Calgary, from Mumbai, now in Calgary.
          </p>
        </Container>
      </header>

      <main id="story">
        {acts.map((act) => (
          <section key={act.id} aria-labelledby={`${act.id}-title`}>
            <Container>
              <h2
                id={`${act.id}-title`}
                className="border-t border-line pt-10 font-display text-sm font-medium uppercase tracking-widest text-accent-strong"
              >
                {act.label}
              </h2>
            </Container>
            {stops
              .filter((stop) => stop.act === act.id)
              .map((stop) => (
                <StopSection
                  key={stop.id}
                  stop={stop}
                  route={route}
                  onOpenPopup={setPopup}
                  after={stop.id === 'whats-next' ? <ContactActions /> : undefined}
                />
              ))}
          </section>
        ))}
        <Contact />
      </main>

      <StoryDialog open={popup !== null} onClose={() => setPopup(null)} title={popup?.title ?? ''}>
        {popup && <PopupBody content={popup} />}
      </StoryDialog>
    </>
  )
}