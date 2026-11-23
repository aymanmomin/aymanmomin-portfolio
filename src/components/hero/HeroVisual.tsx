import { lazy, Suspense, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { hasWebGL } from '../../lib/webgl'
import HeroFallback from './HeroFallback'
import SceneBoundary from './SceneBoundary'

// Loaded on demand so three.js stays out of the initial bundle.
const HeroScene = lazy(() => import('./HeroScene'))

export default function HeroVisual() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const compact = useMediaQuery('(max-width: 767px)')
  const [webgl] = useState(hasWebGL)
  const [ref, inView] = useInView<HTMLDivElement>()

  const show3D = webgl && !reducedMotion

  return (
    <div ref={ref} aria-hidden="true" className="relative h-72 w-full sm:h-96 lg:h-[34rem]">
      {show3D ? (
        <SceneBoundary fallback={<HeroFallback />}>
          <Suspense fallback={<HeroFallback />}>
            <HeroScene active={inView} compact={compact} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <HeroFallback />
      )}
    </div>
  )
}