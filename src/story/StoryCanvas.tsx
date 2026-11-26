import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createRandom } from '../lib/graph'
import { scrollState } from './scrollStore'
import { generateBuildings } from './skyline'
import type { Building } from './skyline'
import {
  CALGARY_X,
  CAMERA_X,
  CAMERA_Y,
  CAMERA_Z,
  LOOK_Y,
  MUMBAI_X,
  planePoint,
  planeProgress,
  planeVisible,
  sampleTable,
  sunAt,
} from './worldMath'
import {
  arcMaterial,
  boxGeometry,
  coneGeometry,
  cylinderGeometry,
  domeGeometry,
  farMaterial,
  gatewayGeometry,
  midMaterial,
  moonMaterial,
  nearMaterial,
  planeMaterial,
  planeShapeGeometry,
  sphereGeometry,
  starMaterial,
  sunMaterial,
  updateWorldColors,
} from './worldMaterials'

// Moves the camera along the world as the reader scrolls, and grades the colours from warm to night to cool.
function Director() {
  const look = useRef(new THREE.Vector3(4, 3.4, 0))
  const started = useRef(false)

  useFrame((state, delta) => {
    const p = scrollState.progress
    const cameraX = sampleTable(CAMERA_X, p)
    const goalX = cameraX + scrollState.pointerX * 0.8
    const goalY = sampleTable(CAMERA_Y, p) + scrollState.pointerY * 0.4
    const goalZ = sampleTable(CAMERA_Z, p)
    const lookX = cameraX + 4
    const lookY = sampleTable(LOOK_Y, p)

    const camera = state.camera
    if (!started.current) {
      camera.position.set(goalX, goalY, goalZ)
      look.current.set(lookX, lookY, 0)
      started.current = true
    } else {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, goalX, 4, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, goalY, 4, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, goalZ, 4, delta)
      look.current.x = THREE.MathUtils.damp(look.current.x, lookX, 5, delta)
      look.current.y = THREE.MathUtils.damp(look.current.y, lookY, 5, delta)
    }
    camera.lookAt(look.current)
    updateWorldColors(state.scene, p)
  })

  return null
}

// The sun sets over India, a moon rises for the crossing, and the plane flies the arc.
function Celestials() {
  const sun = useRef<THREE.Mesh>(null)
  const moon = useRef<THREE.Mesh>(null)
  const plane = useRef<THREE.Mesh>(null)

  useFrame(() => {
    const p = scrollState.progress
    const cameraX = sampleTable(CAMERA_X, p)
    if (sun.current) sun.current.position.set(cameraX + 16, sunAt(p).y, -60)
    if (moon.current) moon.current.position.set(cameraX - 14, 18, -60)
    const mesh = plane.current
    if (mesh) {
      mesh.visible = planeVisible(p)
      const point = planePoint(planeProgress(p))
      mesh.position.set(point.x, point.y, 0)
      mesh.rotation.z = point.angle - Math.PI / 2
    }
  })

  return (
    <>
      <mesh ref={sun} geometry={sphereGeometry} material={sunMaterial} scale={5} />
      <mesh ref={moon} geometry={sphereGeometry} material={moonMaterial} scale={2.5} />
      <mesh ref={plane} geometry={planeShapeGeometry} material={planeMaterial} />
    </>
  )
}

function Stars({ compact }: { compact: boolean }) {
  const positions = useMemo(() => {
    const random = createRandom(11)
    const count = compact ? 220 : 480
    const out = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      out[i * 3] = 30 + random() * 70
      out[i * 3 + 1] = random() * 40
      out[i * 3 + 2] = -70 + random() * 60
    }
    return out
  }, [compact])

  return (
    <points material={starMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
    </points>
  )
}

// A dotted line showing the route the plane takes from Mumbai to Calgary.
function FlightArc() {
  const positions = useMemo(() => {
    const steps = 48
    const out = new Float32Array((steps + 1) * 3)
    for (let i = 0; i <= steps; i += 1) {
      const point = planePoint(i / steps)
      out[i * 3] = point.x
      out[i * 3 + 1] = point.y
      out[i * 3 + 2] = 0
    }
    return out
  }, [])

  return (
    <points material={arcMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
    </points>
  )
}

// One row of buildings drawn as a single instanced mesh.
function Buildings({ buildings, material }: { buildings: Building[]; material: THREE.Material }) {
  const ref = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const scale = new THREE.Vector3()
    const rotation = new THREE.Quaternion()
    buildings.forEach((building, i) => {
      position.set(building.x, building.h / 2, building.z)
      scale.set(building.w, building.h, building.d)
      matrix.compose(position, rotation, scale)
      mesh.setMatrixAt(i, matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [buildings])

  return <instancedMesh ref={ref} args={[boxGeometry, material, buildings.length]} frustumCulled={false} />
}

function Mumbai({ compact }: { compact: boolean }) {
  const rows = useMemo(() => {
    const k = compact ? 0.6 : 1
    const [x0, x1] = MUMBAI_X
    return {
      near: generateBuildings(3, Math.round(22 * k), x0, x1, 0, 3, 10),
      mid: generateBuildings(4, Math.round(26 * k), x0, x1, -9, 4, 14),
      far: generateBuildings(5, Math.round(20 * k), x0, x1, -20, 6, 18),
    }
  }, [compact])

  return (
    <>
      <Buildings buildings={rows.far} material={farMaterial} />
      <Buildings buildings={rows.mid} material={midMaterial} />
      <Buildings buildings={rows.near} material={nearMaterial} />

      <mesh geometry={boxGeometry} material={nearMaterial} position={[8, 1.75, -3]} scale={[7, 3.5, 5]} />
      <mesh geometry={domeGeometry} material={nearMaterial} position={[8, 3.5, -3]} scale={2.6} />
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`${sx}${sz}`}
            geometry={cylinderGeometry}
            material={nearMaterial}
            position={[8 + sx * 3.2, 3, -3 + sz * 2]}
            scale={[0.25, 6, 0.25]}
          />
        )),
      )}

      <mesh geometry={gatewayGeometry} material={nearMaterial} position={[26, 0, -4]} />
      <mesh geometry={boxGeometry} material={nearMaterial} position={[22.1, 9.1, -4]} scale={[1, 2.2, 1.4]} />
      <mesh geometry={boxGeometry} material={nearMaterial} position={[29.9, 9.1, -4]} scale={[1, 2.2, 1.4]} />
    </>
  )
}

function Calgary({ compact }: { compact: boolean }) {
  const rows = useMemo(() => {
    const k = compact ? 0.6 : 1
    const [x0, x1] = CALGARY_X
    return {
      near: generateBuildings(13, Math.round(22 * k), x0, x1, 0, 4, 14),
      mid: generateBuildings(14, Math.round(24 * k), x0, x1, -9, 5, 18),
      far: generateBuildings(15, Math.round(18 * k), x0, x1, -20, 6, 22),
    }
  }, [compact])

  return (
    <>
      <Buildings buildings={rows.far} material={farMaterial} />
      <Buildings buildings={rows.mid} material={midMaterial} />
      <Buildings buildings={rows.near} material={nearMaterial} />

      <mesh geometry={cylinderGeometry} material={nearMaterial} position={[104, 11, -3]} scale={[0.5, 22, 0.5]} />
      <mesh geometry={cylinderGeometry} material={nearMaterial} position={[104, 22.8, -3]} scale={[2.4, 1.4, 2.4]} />
      <mesh geometry={cylinderGeometry} material={nearMaterial} position={[104, 26.5, -3]} scale={[0.12, 6, 0.12]} />
    </>
  )
}

const MOUNTAINS = [
  { x: 84, r: 16, h: 20 },
  { x: 98, r: 20, h: 28 },
  { x: 114, r: 18, h: 22 },
  { x: 128, r: 22, h: 30 },
  { x: 142, r: 16, h: 18 },
  { x: 106, r: 14, h: 16 },
  { x: 122, r: 14, h: 18 },
]

function Mountains() {
  return (
    <>
      {MOUNTAINS.map((mountain, i) => (
        <mesh
          key={mountain.x}
          geometry={coneGeometry}
          material={farMaterial}
          position={[mountain.x, mountain.h / 2, -50 - (i % 3) * 6]}
          rotation={[0, i * 0.7, 0]}
          scale={[mountain.r, mountain.h, mountain.r]}
        />
      ))}
    </>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[60, 0, -30]} material={nearMaterial}>
      <planeGeometry args={[260, 140]} />
    </mesh>
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
        flat
        dpr={[1, compact ? 1.5 : 2]}
        camera={{ position: [0, 4, 15], fov: 55, near: 0.1, far: 240 }}
        gl={{ antialias: !compact, powerPreference: 'low-power' }}
      >
        <fog attach="fog" args={['#c9682b', 45, 170]} />
        <Director />
        <Celestials />
        <Stars compact={compact} />
        <FlightArc />
        <Ground />
        <Mountains />
        <Mumbai compact={compact} />
        <Calgary compact={compact} />
      </Canvas>
    </div>
  )
}