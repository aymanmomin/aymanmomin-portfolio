import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { resetScroll, setProgress } from './scrollStore'
import StoryProgress from './StoryProgress'

afterEach(() => {
  resetScroll()
})

describe('StoryProgress', () => {
  it('labels the three acts and links each to its first stop', () => {
    render(<StoryProgress />)
    expect(screen.getByRole('navigation', { name: 'Story progress' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'India' })).toHaveAttribute('href', '#tech-guy')
    expect(screen.getByRole('link', { name: 'The Crossing' })).toHaveAttribute('href', '#two-weeks')
    expect(screen.getByRole('link', { name: 'Canada' })).toHaveAttribute('href', '#from-scratch')
  })

  it('has a link for each of the eleven stops', () => {
    render(<StoryProgress />)
    expect(screen.getAllByRole('link')).toHaveLength(14)
    expect(screen.getByRole('link', { name: 'Stop 3: A web agency, alongside the IB' })).toHaveAttribute(
      'href',
      '#agency',
    )
  })

  it('marks the current act and stop as the reader scrolls, and fills the bars', () => {
    const { container } = render(<StoryProgress />)
    act(() => {
      setProgress(8)
    })
    expect(screen.getByRole('link', { name: 'The Crossing' })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('link', { name: 'India' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Stop 8: Two weeks to decide' })).toHaveAttribute(
      'aria-current',
      'location',
    )
    const fill = (id: string) =>
      parseFloat((container.querySelector(`[data-fill="${id}"]`) as HTMLElement).style.width)
    expect(fill('india')).toBe(100)
    expect(fill('crossing')).toBe(100)
    expect(fill('canada')).toBe(0)
  })
})