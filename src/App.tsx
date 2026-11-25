import { lazy, Suspense } from 'react'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Experience from './components/experience/Experience'
import Hero from './components/hero/Hero'
import Navbar from './components/navigation/Navbar'
import Projects from './components/projects/Projects'
import Skills from './components/skills/Skills'

// The scroll-driven story is being built behind ?story=1.
// The standard layout stays the default until the story is ready.
const StoryPage = lazy(() => import('./story/StoryPage'))

export default function App() {
  if (new URLSearchParams(window.location.search).get('story') === '1') {
    return (
      <Suspense fallback={<div className="min-h-svh bg-bg" />}>
        <StoryPage />
      </Suspense>
    )
  }

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
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  )
}