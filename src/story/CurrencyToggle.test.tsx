import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CurrencyToggle from './CurrencyToggle'

describe('CurrencyToggle', () => {
  it('offers three currency views and starts on INR', () => {
    render(<CurrencyToggle />)
    expect(screen.getByRole('group', { name: /Agency income per year/ })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(screen.getByRole('radio', { name: 'INR' })).toBeChecked()
    expect(screen.getByText(/50,000 to 1 lakh a year/)).toBeInTheDocument()
  })

  it('switches the displayed figures', () => {
    render(<CurrencyToggle />)
    fireEvent.click(screen.getByRole('radio', { name: 'CAD at the time' }))
    expect(screen.getByText('about C$850 to 1,700 a year')).toBeInTheDocument()
    expect(screen.getByText('about C$5,100 a year')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('radio', { name: 'CAD, same buying power' }))
    expect(screen.getByText('about C$15,000 to 17,000 a year')).toBeInTheDocument()
  })

  it('says the figures are estimates and states the rates', () => {
    render(<CurrencyToggle />)
    expect(screen.getByText(/my own estimates/)).toBeInTheDocument()
    expect(screen.getByText(/58 to 60 per C\$1/)).toBeInTheDocument()
  })
})