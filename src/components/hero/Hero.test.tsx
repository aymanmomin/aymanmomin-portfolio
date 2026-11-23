import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('identifies the owner and field', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: 'Ayman Momin' })).toBeInTheDocument()
    expect(screen.getByText(/Computer Science \| Data & AI \| Software Engineering/)).toBeInTheDocument()
    expect(screen.getByText(/graduating February 2027/)).toBeInTheDocument()
  })

  it('offers both calls to action', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Explore My Work' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '#contact')
  })

  it('shows GitHub and LinkedIn links when configured', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/aymanmomin')
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument()
  })
})