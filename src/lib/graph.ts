export interface GraphNode {
  id: number
  x: number
  y: number
  z: number
}

export interface GraphEdge {
  a: number
  b: number
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

// Small seeded PRNG so the graph is identical on every load and in tests.
function createRandom(seed: number): () => number {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function generateGraph(nodeCount: number, neighbours = 2, seed = 7): Graph {
  const count = Math.max(2, Math.floor(nodeCount))
  const random = createRandom(seed)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  const nodes: GraphNode[] = []
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    const spread = 0.75 + random() * 0.5
    nodes.push({
      id: i,
      x: Math.cos(theta) * ring * spread,
      y: y * spread,
      z: Math.sin(theta) * ring * spread,
    })
  }

  const seen = new Set<string>()
  const edges: GraphEdge[] = []
  for (const node of nodes) {
    const nearest = nodes
      .filter((other) => other.id !== node.id)
      .map((other) => ({
        id: other.id,
        distance:
          (other.x - node.x) ** 2 + (other.y - node.y) ** 2 + (other.z - node.z) ** 2,
      }))
      .sort((p, q) => p.distance - q.distance)
      .slice(0, neighbours)

    for (const { id } of nearest) {
      const a = Math.min(node.id, id)
      const b = Math.max(node.id, id)
      const key = `${a}-${b}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push({ a, b })
      }
    }
  }

  return { nodes, edges }
}