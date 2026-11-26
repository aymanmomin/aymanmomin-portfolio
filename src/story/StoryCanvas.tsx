import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createRandom } from '../lib/graph'
import { markerColor, pathPoints, threadColor } from './path'
import { STOP_COUNT } from './scrollMath'
import { scrollState } from './scrollStore'

const BACKGROUND = '#0a0a0c'
const TUBE_SEGMENTS = 480
const TUBE_RADIAL = 6

function makeCurve() {
  return new THREE.CatmullRomCurve3(pathPoints.map(([x, y, z]) => new THREE.Vector3(x, y, z)))
}

// The camera rides slightly behind and above the thread, looking a little way ahead of itself.
function CameraRig() {
  const curve = useMemo(() => makeCurve(), [])
  const goal = useRef(new THREE.Vector3())
  const lookGoal = useRef(new THREE.Vector3())
  const look = useRef(new THREE.Vector3())
  const started = useRef(false)

  useFrame((state, delta) => {
    const position = scrollState.progress
    const cameraT = THREE.MathUtils.clamp((position - 0.45) / STOP_COUNT, 0, 1)
    const lookT = THREE.MathUtils.clamp((position + 0.55) / STOP_COUNT, 0, 1)

    curve.getPoint(cameraT, goal.current)
    goal.current.x += scrollState.pointerX * 0.5
    goal.current.y += 0.7 + scrollState.pointerY * 0.3
    goal.current.z += 2.2
    curve.getPoint(lookT, lookGoal.current)

    const camera = state.camera
    if (!started.current) {
      camera.position.copy(goal.current)
      look.current.copy(lookGoal.current)
      started.current = true
    } else {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, goal.current.x, 4, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, goal.current.y, 4, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, goal.current.z, 4, delta)
      look.current.x = THREE.MathUtils.damp(look.current.x, lookGoal.current.x, 5, delta)
      look.current.y = THREE.MathUtils.damp(look.current.y, lookGoal.current.y, 5, delta)
      look.current.z = THREE.MathUtils.damp(look.current.z, lookGoal.current.z, 5, delta)
    }
    camera.lookAt(look.current)
  })

  return null
}

// One tube along the whole path. Vertex colours give the warm-to-cool change and the dark crossing.
function Thread() {
  const geometry = useMemo(() => {
    const curve = makeCurve()
    const tube = new THREE.TubeGeometry(curve, TUBE_SEGMENTS, 0.04, TUBE_RADIAL, false)
    const count = tube.attributes.position.count
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const ring = Math.floor(i / (TUBE_RADIAL + 1))
      // The tube is sampled by arc length, while path positions are by control point, so convert.
      const t = curve.getUtoTmapping(ring / TUBE_SEGMENTS, 0)
      colors.set(threadColor(t * STOP_COUNT), i * 3)
    }
    tube.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return tube
  }, [])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </mesh>
  )
}

// A scatter of faint points across the dark stretch between stops 7 and 8.
function CrossingDust() {
  const positions = useMemo(() => {
    const curve = makeCurve()
    const random = createRandom(5)
    const count = 90
    const out = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const point = curve.getPoint((7.15 + random() * 0.9) / STOP_COUNT)
      out[i * 3] = point.x + (random() - 0.5) * 0.9
      out[i * 3 + 1] = point.y + (random() - 0.5) * 0.9
      out[i * 3 + 2] = point.z + (random() - 0.5) * 0.9
    }
    return out
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#8f9bff" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function Stars({ compact }: { compact: boolean }) {
  const positions = useMemo(() => {
    const random = createRandom(11)
    const count = compact ? 300 : 700
    const depth = Math.abs(pathPoints[pathPoints.length - 1][2]) + 16
    const out = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      out[i * 3] = (random() - 0.5) * 32
      out[i * 3 + 1] = (random() - 0.5) * 18
      out[i * 3 + 2] = 6 - random() * depth
    }
    return out
  }, [compact])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#aab0ff" transparent opacity={0.45} sizeAttenuation />
    </points>
  )
}

// A glowing node at the hero and at each stop. The one the reader is near swells up.
function Markers() {
  const groups = useRef<(THREE.Group | null)[]>([])
  const sphere = useMemo(() => new THREE.SphereGeometry(0.11, 16, 16), [])
  const ring = useMemo(() => new THREE.TorusGeometry(0.3, 0.014, 8, 48), [])

  useEffect(
    () => () => {
      sphere.dispose()
      ring.dispose()
    },
    [sphere, ring],
  )

  useFrame(() => {
    const position = scrollState.progress
    groups.current.forEach((group, i) => {
      if (!group) return
      const near = Math.max(0, 1 - Math.abs(position - i))
      group.scale.setScalar(0.7 + near * 1.1)
    })
  })

  return (
    <>
      {pathPoints.map((point, i) => (
        <group
          key={i}
          position={point}
          ref={(element) => {
            groups.current[i] = element
          }}
        >
          <mesh geometry={sphere}>
            <meshBasicMaterial color={markerColor(i)} toneMapped={false} />
          </mesh>
          <mesh geometry={ring}>
            <meshBasicMaterial color={markerColor(i)} transparent opacity={0.6} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  )
}

export default function StoryCanvas({ compact }: { compact: boolean }) {
  // The canvas does not receive pointer events, so the pointer is read from the window for a slight parallax.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      scrollState.pointerX = (event.clientX / window.innerWidth) * 2 - 1
      scrollState.pointerY = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      scrollState.pointerX = 0
      scrollState.pointerY = 0
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, compact ? 1.5 : 2]}
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 140 }}
        gl={{ antialias: !compact, alpha: true, powerPreference: 'low-power' }}
      >
        <fog attach="fog" args={[BACKGROUND, 10, 45]} />
        <Stars compact={compact} />
        <Thread />
        <CrossingDust />
        <Markers />
        <CameraRig />
      </Canvas>
    </div>
  )
}