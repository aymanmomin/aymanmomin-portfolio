import { useState } from 'react'
import { buttonClasses } from '../lib/buttonClasses'

// Built from parts so the address is not in the page until someone asks for it.
// This is light protection only: the address is still in the public repository.
const EMAIL_PARTS = ['aymanmomin.work', 'gmail.com'] as const

interface EmailButtonProps {
  onOpen?: (url: string) => void
}

export default function EmailButton({
  onOpen = (url) => {
    window.location.href = url
  },
}: EmailButtonProps) {
  const [address, setAddress] = useState<string | null>(null)

  function reveal() {
    const email = EMAIL_PARTS.join('@')
    setAddress(email)
    onOpen(`mailto:${email}`)
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button type="button" onClick={reveal} className={buttonClasses('primary')}>
        Email me
      </button>
      {address && (
        <span role="status" className="text-sm text-fg">
          {address}
        </span>
      )}
    </span>
  )
}