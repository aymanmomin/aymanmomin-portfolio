import type { ReactNode } from 'react'
import Container from './Container'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-16 border-t border-line py-20 sm:py-28"
    >
      <Container>
        <h2
          id={`${id}-title`}
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <div className="mt-6 text-muted">{children}</div>
      </Container>
    </section>
  )
}