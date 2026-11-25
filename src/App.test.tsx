import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('App', () => {
  it('shows the story by default', async () => {
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: 'Ayman Momin' })).toBeInTheDocument()
    expect(await screen.findByText(/Two countries, one thread/)).toBeInTheDocument()
  })

  it('keeps the standard layout available with story=0', () => {
    window.history.replaceState(null, '', '/?story=0')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Ayman Momin' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
  })
})