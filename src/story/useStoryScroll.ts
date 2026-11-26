import { useEffect } from 'react'
import { fractionalIndex } from './scrollMath'
import { setProgress } from './scrollStore'

// Measures where each anchor sits on the page and keeps the shared scroll progress up to date.
// Pass a stable array (a module-level constant) so the listeners are not re-attached on every render.
export function useStoryScroll(ids: string[]): void {
  useEffect(() => {
    let centers: number[] = []
    let frame = 0

    const measure = () => {
      centers = ids.map((id) => {
        const element = document.getElementById(id)
        if (!element) return Number.NaN
        const rect = element.getBoundingClientRect()
        return rect.top + window.scrollY + rect.height / 2
      })
    }

    const update = () => {
      frame = 0
      setProgress(fractionalIndex(centers, window.scrollY + window.innerHeight / 2))
    }

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }

    const remeasure = () => {
      measure()
      schedule()
    }

    measure()
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(remeasure)
    observer?.observe(document.body)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      observer?.disconnect()
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [ids])
}