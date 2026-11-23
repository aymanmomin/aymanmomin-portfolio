import { describe, expect, it } from 'vitest'
import { generateGraph } from './graph'

describe('generateGraph', () => {
  it('creates the requested number of nodes', () => {
    expect(generateGraph(40).nodes).toHaveLength(40)
  })

  it('is deterministic for the same seed', () => {
    expect(generateGraph(30, 2, 3)).toEqual(generateGraph(30, 2, 3))
  })

  it('differs for different seeds', () => {
    expect(generateGraph(30, 2, 3)).not.toEqual(generateGraph(30, 2, 4))
  })

  it('creates only valid, unique edges without self-loops', () => {
    const { nodes, edges } = generateGraph(50)
    const keys = new Set<string>()
    for (const edge of edges) {
      expect(edge.a).not.toBe(edge.b)
      expect(edge.a).toBeGreaterThanOrEqual(0)
      expect(edge.b).toBeLessThan(nodes.length)
      keys.add(`${edge.a}-${edge.b}`)
    }
    expect(keys.size).toBe(edges.length)
  })
})