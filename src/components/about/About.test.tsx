import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import About from './About'

describe('About', () => {
  it('renders the section heading and education details', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Education' })).toBeInTheDocument()
    expect(screen.getByText('University of Calgary')).toBeInTheDocument()
    expect(screen.getByText(/Final term ends December 2026/)).toBeInTheDocument()
  })

  it('lists the degree structure', () => {
    render(<About />)
    expect(screen.getByText('Major:')).toBeInTheDocument()
    expect(screen.getByText('Minor:')).toBeInTheDocument()
    expect(screen.getByText('Concentration:')).toBeInTheDocument()
  })
})