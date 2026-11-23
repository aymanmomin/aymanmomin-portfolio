import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HeroVisual from './HeroVisual'

describe('HeroVisual', () => {
  it('shows the static fallback when WebGL is unavailable', () => {
    render(<HeroVisual />)
    expect(screen.getByTestId('hero-fallback')).toBeInTheDocument()
  })
})