import Container from './components/layout/Container'
import Section from './components/layout/Section'
import Navbar from './components/navigation/Navbar'
import { personalName, personalTagline } from './data/personal'
import { buttonClasses } from './lib/buttonClasses'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <section
          id="home"
          aria-labelledby="home-title"
          className="flex min-h-[calc(100svh-4rem)] items-center"
        >
          <Container>
            <h1
              id="home-title"
              className="font-display text-5xl font-semibold tracking-tight sm:text-7xl"
            >
              {personalName}
            </h1>
            <p className="mt-4 text-lg text-muted sm:text-xl">{personalTagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={buttonClasses('primary')}>
                Explore My Work
              </a>
              <a href="#contact" className={buttonClasses('secondary')}>
                Get in Touch
              </a>
            </div>
          </Container>
        </section>

        <Section id="about" title="About">
          <p>Content coming soon.</p>
        </Section>
        <Section id="projects" title="Projects">
          <p>Content coming soon.</p>
        </Section>
        <Section id="experience" title="Experience">
          <p>Content coming soon.</p>
        </Section>
        <Section id="skills" title="Skills">
          <p>Content coming soon.</p>
        </Section>
        <Section id="contact" title="Contact">
          <p>Content coming soon.</p>
        </Section>
      </main>
    </>
  )
}