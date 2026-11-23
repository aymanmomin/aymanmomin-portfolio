import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Experience from './Experience'

describe('Experience', () => {
  it('renders a heading and one entry per role', () => {
    render(<Experience />)
    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument()
    for (const name of ['Lemmer Spray Systems', 'PropAll', 'A&W', 'Aga Khan Education Services']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument()
    }
  })

  it('shows the leadership and community list', () => {
    render(<Experience />)
    expect(screen.getByRole('heading', { level: 3, name: 'Leadership and community' })).toBeInTheDocument()
  })
})