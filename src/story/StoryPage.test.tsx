import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StoryPage from './StoryPage'

describe('StoryPage', () => {
  it('shows the title, the three acts and eleven stops', () => {
    render(<StoryPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Ayman Momin' })).toBeInTheDocument()
    for (const act of ['India', 'The Crossing', 'Canada']) {
      expect(screen.getByRole('heading', { level: 2, name: act })).toBeInTheDocument()
    }
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(11)
  })

  it('offers a Learn more pop-up on every stop', () => {
    render(<StoryPage />)
    expect(screen.getAllByRole('button', { name: /Learn more/ })).toHaveLength(11)
  })

  it('opens a pop-up with its title and closes it again', () => {
    render(<StoryPage />)
    fireEvent.click(screen.getAllByRole('button', { name: /Learn more/ })[0])
    expect(screen.getByRole('dialog', { name: 'Awards and recognition' })).toBeInTheDocument()
    expect(screen.getByText('Star Child award')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByText('Star Child award')).not.toBeInTheDocument()
  })

  it('shows the currency toggle on the agency stop', () => {
    render(<StoryPage />)
    expect(screen.getByRole('group', { name: /Agency income per year/ })).toBeInTheDocument()
  })

  it('ends with a contact action and keeps the email out of the page', () => {
    const { container } = render(<StoryPage />)
    expect(screen.getByRole('button', { name: 'Email me' })).toBeInTheDocument()
    expect(container.innerHTML).not.toMatch(/gmail|mailto:/i)
  })

  it('marks every empty media slot as a placeholder', () => {
    const { container } = render(<StoryPage />)
    expect(container.querySelectorAll('[data-media-slot]')).toHaveLength(11)
  })
})