import { useId, useState } from 'react'
import { currencyModes, figureFor, incomes, RATES_NOTE } from './currency'
import type { CurrencyMode } from './currency'

export default function CurrencyToggle() {
  const groupName = useId()
  const [mode, setMode] = useState<CurrencyMode>('inr')

  return (
    <fieldset className="mt-6">
      <legend className="text-sm font-medium text-fg">Agency income per year, shown in</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {currencyModes.map((option) => (
          <label key={option.id} className="cursor-pointer">
            <input
              type="radio"
              name={groupName}
              value={option.id}
              checked={mode === option.id}
              onChange={() => setMode(option.id)}
              className="peer sr-only"
            />
            <span className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-strong">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      <dl aria-live="polite" className="mt-4 space-y-3">
        {incomes.map((income) => (
          <div key={income.id}>
            <dt className="text-sm text-muted">{income.title}</dt>
            <dd className="font-display text-2xl font-semibold text-fg">{figureFor(income, mode).label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-muted">{RATES_NOTE}</p>
    </fieldset>
  )
}