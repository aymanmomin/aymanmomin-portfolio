import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import StoryDialog from './StoryDialog'

describe('StoryDialog', () => {
  it('stays closed and renders no content until opened', () => {
    const { container } = render(
      <StoryDialog open={false} onClose={() => {}} title="Awards">
        <p>Details</p>
      </StoryDialog>,
    )
    expect(container.querySelector('dialog')?.hasAttribute('open')).toBe(false)
    expect(screen.queryByText('Details')).not.toBeInTheDocument()
  })

  it('opens with an accessible name and its content', () => {
    render(
      <StoryDialog open onClose={() => {}} title="Awards">
        <p>Details</p>
      </StoryDialog>,
    )
    expect(screen.getByRole('dialog', { name: 'Awards' })).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('closes from the Close button', () => {
    const onClose = vi.fn()
    render(
      <StoryDialog open onClose={onClose} title="Awards">
        <p>Details</p>
      </StoryDialog>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes on the cancel event that Esc triggers', () => {
    const onClose = vi.fn()
    render(
      <StoryDialog open onClose={onClose} title="Awards">
        <p>Details</p>
      </StoryDialog>,
    )
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes on a backdrop click but not on a content click', () => {
    const onClose = vi.fn()
    render(
      <StoryDialog open onClose={onClose} title="Awards">
        <p>Details</p>
      </StoryDialog>,
    )
    fireEvent.click(screen.getByText('Details'))
    expect(onClose).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks page scroll while open and restores it afterwards', () => {
    const { rerender } = render(
      <StoryDialog open onClose={() => {}} title="Awards">
        <p>Details</p>
      </StoryDialog>,
    )
    expect(document.body.style.overflow).toBe('hidden')
    rerender(
      <StoryDialog open={false} onClose={() => {}} title="Awards">
        <p>Details</p>
      </StoryDialog>,
    )
    expect(document.body.style.overflow).toBe('')
  })
})