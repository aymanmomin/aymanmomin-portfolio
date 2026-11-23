import { useMemo } from 'react'
import { generateGraph } from '../../lib/graph'

const ROTATION = 0.7

// Static SVG version of the same network graph. Used without WebGL, with reduced motion,
// while the 3D chunk loads, and if the 3D scene fails.
export default function HeroFallback() {
  const graph = useMemo(() => generateGraph(56), [])

  const points = useMemo(
    () =>
      graph.nodes.map((node) => {
        const x = node.x * Math.cos(ROTATION) + node.z * Math.sin(ROTATION)
        const z = -node.x * Math.sin(ROTATION) + node.z * Math.cos(ROTATION)
        const depth = Math.min(1, Math.max(0, (z + 1.3) / 2.6))
        return {
          id: node.id,
          cx: Number((50 + x * 34).toFixed(2)),
          cy: Number((50 + node.y * 34).toFixed(2)),
          depth,
        }
      }),
    [graph],
  )

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full text-accent"
      data-testid="hero-fallback"
    >
      {graph.edges.map((edge) => {
        const from = points[edge.a]
        const to = points[edge.b]
        return (
          <line
            key={`${edge.a}-${edge.b}`}
            x1={from.cx}
            y1={from.cy}
            x2={to.cx}
            y2={to.cy}
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="0.25"
          />
        )
      })}
      {points.map((point) => (
        <circle
          key={point.id}
          cx={point.cx}
          cy={point.cy}
          r={(0.8 + point.depth * 0.9).toFixed(2)}
          fill="currentColor"
          fillOpacity={(0.35 + point.depth * 0.65).toFixed(2)}
        />
      ))}
    </svg>
  )
}