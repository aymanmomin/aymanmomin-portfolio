import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { buttonClasses } from '../lib/buttonClasses'

interface StoryDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

// Native dialog: Esc handling, focus trap and focus return come from the browser.
// Esc, the Close button and a backdrop click all call onClose.
export default function StoryDialog({ open, onClose, title, children }: StoryDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    }
    if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close()
      else dialog.removeAttribute('open')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="m-auto max-h-[85svh] w-[min(42rem,calc(100%-2rem))] overflow-y-auto rounded-card border border-line bg-surface p-0 text-fg backdrop:bg-black/70"
    >
      {open && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-display text-2xl font-semibold tracking-tight">
              {title}
            </h2>
            <button type="button" onClick={onClose} className={buttonClasses('secondary')}>
              Close
            </button>
          </div>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
        </div>
      )}
    </dialog>
  )
}