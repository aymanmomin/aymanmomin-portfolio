import Container from '../layout/Container'
import HeroVisual from './HeroVisual'
import { personalLinks, personalName, personalTagline } from '../../data/personal'
import { buttonClasses } from '../../lib/buttonClasses'

const intro =
  'Building data-driven applications, interactive experiences, and software that solves real-world problems.'

export default function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden">
      <Container className="grid min-h-[calc(100svh-4rem)] grid-cols-[minmax(0,1fr)] items-center gap-6 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
        <div>
          <p className="text-sm font-medium tracking-wide text-accent-strong">
            BSc Computer Science, University of Calgary · Final term, graduating February 2027
          </p>
          <h1
            id="home-title"
            className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-7xl"
          >
            {personalName}
          </h1>
          <p className="mt-4 text-lg text-fg sm:text-xl">{personalTagline}</p>
          <p className="mt-4 max-w-xl text-muted">{intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={buttonClasses('primary')}>
              Explore My Work
            </a>
            <a href="#contact" className={buttonClasses('secondary')}>
              Get in Touch
            </a>
          </div>

          {(personalLinks.github || personalLinks.linkedin) && (
            <ul className="mt-6 flex gap-5 text-sm text-muted">
              {personalLinks.github && (
                <li>
                  <a
                    href={personalLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-fg hover:underline"
                  >
                    GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              {personalLinks.linkedin && (
                <li>
                  <a
                    href={personalLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-fg hover:underline"
                  >
                    LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>

        <HeroVisual />
      </Container>
    </section>
  )
}