import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('links to every section', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    for (const label of ['Home', 'About', 'Projects', 'Experience', 'Skills', 'Contact']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('toggles the mobile menu and closes on Escape', () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})