import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StoryPage from './StoryPage'

describe('StoryPage scroll layer', () => {
  it('has a hero anchor for the scroll measurements', () => {
    const { container } = render(<StoryPage />)
    expect(container.querySelector('#story-hero')).not.toBeNull()
  })

  it('shows the progress bar and a scroll cue', () => {
    render(<StoryPage />)
    expect(screen.getByRole('navigation', { name: 'Story progress' })).toBeInTheDocument()
    expect(screen.getAllByText(/Scroll to begin/).length).toBeGreaterThan(0)
  })

  it('renders no 3D canvas without WebGL, as in the test browser', () => {
    const { container } = render(<StoryPage />)
    expect(container.querySelector('canvas')).toBeNull()
  })
})