import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PopupBody from './PopupBody'
import SeoStaircase from './SeoStaircase'

describe('SeoStaircase', () => {
  it('shows the three levels in order', () => {
    render(<SeoStaircase />)
    const list = screen.getByRole('list', { name: 'Three levels of service' })
    expect(list.querySelectorAll('li')).toHaveLength(3)
    expect(screen.getByText('Free scan')).toBeInTheDocument()
    expect(screen.getByText('Paid basic service')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
  })
})

describe('PopupBody', () => {
  it('renders paragraphs, bullets, links and the staircase diagram', () => {
    render(
      <PopupBody
        content={{
          title: 'Demo',
          paragraphs: ['Intro paragraph.'],
          bullets: ['First point', 'Second point'],
          diagram: 'seo-staircase',
          links: [{ label: 'Read more', url: 'https://example.com' }],
        }}
      />,
    )
    expect(screen.getByText('Intro paragraph.')).toBeInTheDocument()
    expect(screen.getByText('Second point')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Three levels of service' })).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /Read more/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows media slots and to-do notes while placeholders are enabled', () => {
    render(
      <PopupBody
        content={{
          title: 'Demo',
          paragraphs: [],
          media: [{ id: 'demo-shot', kind: 'photo', label: 'Screenshot: demo' }],
          todo: ['My role on the project'],
        }}
      />,
    )
    expect(screen.getByText('Screenshot: demo')).toBeInTheDocument()
    expect(screen.getByText('My role on the project')).toBeInTheDocument()
  })
})