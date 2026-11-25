import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import EmailButton from './EmailButton'

describe('EmailButton', () => {
  it('keeps the address out of the page until clicked', () => {
    const { container } = render(<EmailButton onOpen={() => {}} />)
    expect(container.innerHTML).not.toMatch(/gmail|@/i)
  })

  it('reveals the address and opens the mail client on click', () => {
    const onOpen = vi.fn()
    render(<EmailButton onOpen={onOpen} />)
    fireEvent.click(screen.getByRole('button', { name: 'Email me' }))
    expect(screen.getByRole('status')).toHaveTextContent('aymanmomin.work@gmail.com')
    expect(onOpen).toHaveBeenCalledWith('mailto:aymanmomin.work@gmail.com')
  })
})