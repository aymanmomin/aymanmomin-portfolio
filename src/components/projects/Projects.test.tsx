import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

describe('Projects', () => {
  it('renders the three featured projects', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: 'ChalkUp' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: "The Independent Student's Financial Reality" })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: 'Settlerr' })).toBeInTheDocument()
  })

  it('shows the In development label exactly once', () => {
    render(<Projects />)
    expect(screen.getAllByText('In development')).toHaveLength(1)
  })

  it('opens external links safely in a new tab', () => {
    render(<Projects />)
    const link = screen.getByRole('link', { name: /View on Devpost/ })
    expect(link).toHaveAttribute('href', 'https://devpost.com/software/settlerr')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows no buttons for projects without confirmed links', () => {
    render(<Projects />)
    expect(screen.queryByRole('link', { name: /Homeseek/ })).not.toBeInTheDocument()
    expect(screen.getByText('The source code is in a private repository.')).toBeInTheDocument()
  })
})