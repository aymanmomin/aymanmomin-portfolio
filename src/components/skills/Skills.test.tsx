import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skills from './Skills'

describe('Skills', () => {
  it('renders a heading and one card per category', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { level: 2, name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Programming languages' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Databases' })).toBeInTheDocument()
  })

  it('states each skill level in text, not only by symbol', () => {
    render(<Skills />)
    expect(screen.getByText('Python').closest('li')).toHaveTextContent('Experienced with')
    expect(screen.getByText('Java').closest('li')).toHaveTextContent('Working knowledge')
    expect(screen.getByText('YOLOv8').closest('li')).toHaveTextContent('Project experience')
  })
})