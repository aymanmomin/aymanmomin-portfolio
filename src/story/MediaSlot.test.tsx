import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MediaSlot from './MediaSlot'

describe('MediaSlot', () => {
  it('shows a labelled placeholder when no file is set', () => {
    const { container } = render(
      <MediaSlot media={{ id: 'stop-1-photo', kind: 'photo', label: 'Sports day at school' }} />,
    )
    expect(screen.getByText('Sports day at school')).toBeInTheDocument()
    expect(screen.getByText('photo slot')).toBeInTheDocument()
    expect(container.querySelector('[data-media-slot="stop-1-photo"]')).not.toBeNull()
  })

  it('renders a lazy image with alt text once a file is set', () => {
    render(<MediaSlot media={{ id: 'a', kind: 'photo', label: 'Sports day', src: '/media/a.jpg' }} />)
    const image = screen.getByRole('img', { name: 'Sports day' })
    expect(image).toHaveAttribute('src', '/media/a.jpg')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('prefers explicit alt text over the label', () => {
    render(
      <MediaSlot
        media={{ id: 'b', kind: 'photo', label: 'Label', alt: 'A descriptive alt', src: '/media/b.jpg' }}
      />,
    )
    expect(screen.getByRole('img', { name: 'A descriptive alt' })).toBeInTheDocument()
  })

  it('renders a video with controls', () => {
    const { container } = render(
      <MediaSlot media={{ id: 'v', kind: 'video', label: 'Demo', src: '/media/v.mp4' }} />,
    )
    const video = container.querySelector('video')
    expect(video).not.toBeNull()
    expect(video).toHaveAttribute('controls')
  })
})