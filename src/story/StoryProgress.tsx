import { useEffect, useRef, useSyncExternalStore } from 'react'
import Container from '../components/layout/Container'
import { CANADA_HEX, CROSSING_HEX, INDIA_HEX } from './path'
import { actAt, actProgress, STOP_COUNT } from './scrollMath'
import { getActiveIndex, scrollState, subscribeActive, subscribeProgress } from './scrollStore'
import { stops } from './stops'
import { acts } from './types'
import type { Act } from './types'

const actColors: Record<Act, string> = {
  india: INDIA_HEX,
  crossing: CROSSING_HEX,
  canada: CANADA_HEX,
}

export default function StoryProgress() {
  const activeIndex = useSyncExternalStore(subscribeActive, getActiveIndex, () => 0)
  const fills = useRef<Record<string, HTMLDivElement | null>>({})
  const activeAct = actAt(activeIndex)

  // The bar fills are updated directly so scrolling never re-renders the page.
  useEffect(() => {
    const apply = (progress: number) => {
      for (const act of acts) {
        const element = fills.current[act.id]
        if (element) element.style.width = `${(actProgress(progress, act.id) * 100).toFixed(1)}%`
      }
    }
    apply(scrollState.progress)
    return subscribeProgress(apply)
  }, [])

  return (
    <nav
      aria-label="Story progress"
      className="fixed inset-x-0 top-0 z-30 border-b border-line bg-bg/80 backdrop-blur"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <Container className="py-1.5">
        <div className="flex gap-3">
          {acts.map((act) => {
            const actStops = stops.filter((stop) => stop.act === act.id)
            const current = activeAct === act.id
            return (
              <div key={act.id} className="min-w-0 flex-1">
                <a
                  href={`#${actStops[0].id}`}
                  aria-current={current ? 'location' : undefined}
                  className={`block truncate py-1 text-xs transition-colors ${
                    current ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {act.label}
                </a>
                <div className="relative h-1 overflow-hidden rounded-full bg-line">
                  <div
                    ref={(element) => {
                      fills.current[act.id] = element
                    }}
                    data-fill={act.id}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: actColors[act.id] }}
                  />
                </div>
                <ol className="mt-0.5 hidden justify-between sm:flex">
                  {actStops.map((stop) => (
                    <li key={stop.id}>
                      <a
                        href={`#${stop.id}`}
                        aria-label={`Stop ${stop.number}: ${stop.headline}`}
                        aria-current={activeIndex === stop.number ? 'location' : undefined}
                        className="flex h-6 w-6 items-center justify-center"
                      >
                        <span
                          aria-hidden="true"
                          className={`block rounded-full transition-all duration-300 ${
                            activeIndex === stop.number ? 'h-2.5 w-2.5 bg-accent' : 'h-1.5 w-1.5 bg-muted/60'
                          }`}
                        />
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}
        </div>
        <p className="pb-0.5 text-[11px] text-muted sm:hidden">
          {activeIndex >= 1 ? `Stop ${activeIndex} of ${STOP_COUNT}` : 'Scroll to begin'}
        </p>
      </Container>
    </nav>
  )
}