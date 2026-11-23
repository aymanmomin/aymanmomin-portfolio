import About from './components/about/About'
import Hero from './components/hero/Hero'
import Section from './components/layout/Section'
import Navbar from './components/navigation/Navbar'
import Skills from './components/skills/Skills'

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
        <Hero />
        <About />

        <Section id="projects" title="Projects">
          <p>Content coming soon.</p>
        </Section>
        <Section id="experience" title="Experience">
          <p>Content coming soon.</p>
        </Section>
        <Skills />
        <Section id="contact" title="Contact">
          <p>Content coming soon.</p>
        </Section>
      </main>
    </>
  )
}