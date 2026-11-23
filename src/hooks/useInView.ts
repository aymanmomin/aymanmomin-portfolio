import { useEffect, useRef, useState } from 'react'

// Reports whether the referenced element is on screen. Assumes visible until the observer says otherwise.
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) setInView(entry.isIntersecting)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, inView] as const
}