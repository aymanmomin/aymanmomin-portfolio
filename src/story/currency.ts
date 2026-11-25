export const RUPEE = '\u20B9'

export type CurrencyMode = 'inr' | 'cad-then' | 'cad-ppp'

export const currencyModes: { id: CurrencyMode; label: string }[] = [
  { id: 'inr', label: 'INR' },
  { id: 'cad-then', label: 'CAD at the time' },
  { id: 'cad-ppp', label: 'CAD, same buying power' },
]

// Rupees per Canadian dollar, as stated by the owner. Both are estimates.
export const RATE_AT_THE_TIME = { low: 58, high: 60 }
export const RATE_BUYING_POWER = { low: 17, high: 20 }

export const RATES_NOTE = `A teenager running a business during the IB. These are my own estimates, converted at about ${RUPEE}58 to 60 per C$1 for what the money was worth then, and about ${RUPEE}17 to 20 per C$1 for the same buying power.`

export interface Figure {
  label: string
  min: number
  max: number
}

export interface Income {
  id: 'solo' | 'team'
  title: string
  inr: Figure
  then: Figure
  power: Figure
}

// For open-ended figures such as "3 lakh+", min and max are equal.
export const incomes: Income[] = [
  {
    id: 'solo',
    title: 'Solo, part-time',
    inr: { label: `${RUPEE}50,000 to 1 lakh a year`, min: 50000, max: 100000 },
    then: { label: 'about C$850 to 1,700 a year', min: 850, max: 1700 },
    power: { label: 'about C$2,500 to 5,500 a year', min: 2500, max: 5500 },
  },
  {
    id: 'team',
    title: 'With a hired team',
    inr: { label: `${RUPEE}3 lakh+ a year`, min: 300000, max: 300000 },
    then: { label: 'about C$5,100 a year', min: 5100, max: 5100 },
    power: { label: 'about C$15,000 to 17,000 a year', min: 15000, max: 17000 },
  },
]

export function figureFor(income: Income, mode: CurrencyMode): Figure {
  if (mode === 'cad-then') return income.then
  if (mode === 'cad-ppp') return income.power
  return income.inr
}