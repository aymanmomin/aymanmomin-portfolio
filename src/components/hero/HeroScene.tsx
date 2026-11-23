import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { generateGraph } from '../../lib/graph'

// These mirror the accent tokens in index.css (CSS variables are not readable inside WebGL).
const NODE_COLOR = '#9aa0ff'
const EDGE_COLOR = '#7c83ff'

interface GraphProps {
  compact: boolean
}

function NetworkGraph({ compact }: GraphProps) {
  const tilt = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)

  const graph = useMemo(() => generateGraph(compact ? 40 : 72), [compact])

  const linePositions = useMemo(() => {
    const positions = new Float32Array(graph.edges.length * 6)
    graph.edges.forEach((edge, index) => {
      const from = graph.nodes[edge.a]
      const to = graph.nodes[edge.b]
      positions.set([from.x, from.y, from.z, to.x, to.y, to.z], index * 6)
    })
    return positions
  }, [graph])

  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.03, 12, 12), [])
  const nodeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: NODE_COLOR }), [])

  useEffect(
    () => () => {
      nodeGeometry.dispose()
      nodeMaterial.dispose()
    },
    [nodeGeometry, nodeMaterial],
  )

  useFrame((state, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.1
    if (tilt.current) {
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, -state.pointer.y * 0.25, 3, delta)
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, state.pointer.x * 0.25, 3, delta)
    }
  })

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={EDGE_COLOR} transparent opacity={0.35} />
        </lineSegments>
        {graph.nodes.map((node) => (
          <mesh
            key={node.id}
            position={[node.x, node.y, node.z]}
            geometry={nodeGeometry}
            material={nodeMaterial}
          />
        ))}
      </group>
    </group>
  )
}

interface HeroSceneProps {
  active: boolean
  compact: boolean
}

export default function HeroScene({ active, compact }: HeroSceneProps) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ position: [0, 0, 3.4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <NetworkGraph compact={compact} />
    </Canvas>
  )
}