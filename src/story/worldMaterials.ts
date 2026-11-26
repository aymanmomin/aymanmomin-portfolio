import * as THREE from 'three'
import { mix } from './path'
import type { Rgb } from './path'
import { farAt, nightAt, silhouetteAt, skyAt, sunAt } from './worldMath'

// Shared across the whole scene. Their colours are updated every frame from the scroll position.
export const nearMaterial = new THREE.MeshBasicMaterial({ color: '#3a1c0c' })
export const midMaterial = new THREE.MeshBasicMaterial({ color: '#3a1c0c' })
export const farMaterial = new THREE.MeshBasicMaterial({ color: '#783c19' })
export const sunMaterial = new THREE.MeshBasicMaterial({ color: '#ffd9a0', transparent: true, fog: false })
export const moonMaterial = new THREE.MeshBasicMaterial({
  color: '#f4f4f5',
  transparent: true,
  opacity: 0,
  fog: false,
})
export const planeMaterial = new THREE.MeshBasicMaterial({ color: '#f4f4f5', fog: false })
export const starMaterial = new THREE.PointsMaterial({
  size: 0.18,
  color: '#f4f4f5',
  transparent: true,
  opacity: 0,
  sizeAttenuation: true,
  fog: false,
})
export const arcMaterial = new THREE.PointsMaterial({
  size: 0.22,
  color: '#f4f4f5',
  transparent: true,
  opacity: 0.6,
  sizeAttenuation: true,
  fog: false,
})

export const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
export const coneGeometry = new THREE.ConeGeometry(1, 1, 5)
export const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 16)
export const sphereGeometry = new THREE.SphereGeometry(1, 24, 24)
export const domeGeometry = new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2)
export const planeShapeGeometry = new THREE.ConeGeometry(0.5, 1.6, 3)

// A simple arched gateway, extruded from one outline with the arch cut into the bottom edge.
function makeGatewayGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-4.5, 0)
  shape.lineTo(-1.8, 0)
  shape.lineTo(-1.8, 3.2)
  shape.absarc(0, 3.2, 1.8, Math.PI, 0, true)
  shape.lineTo(1.8, 0)
  shape.lineTo(4.5, 0)
  shape.lineTo(4.5, 8)
  shape.lineTo(-4.5, 8)
  shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 2.2, bevelEnabled: false, curveSegments: 16 })
  geometry.translate(0, 0, -1.1)
  return geometry
}

export const gatewayGeometry = makeGatewayGeometry()

function setColor(color: THREE.Color, rgb: Rgb): void {
  color.setRGB(rgb[0], rgb[1], rgb[2], THREE.SRGBColorSpace)
}

export function updateWorldColors(scene: THREE.Scene, p: number): void {
  const sky = skyAt(p)
  const silhouette = silhouetteAt(p)
  const far = farAt(p)

  setColor(nearMaterial.color, silhouette)
  setColor(midMaterial.color, mix(silhouette, far, 0.45))
  setColor(farMaterial.color, far)

  if (!(scene.background instanceof THREE.Color)) scene.background = new THREE.Color()
  setColor(scene.background, sky)
  if (scene.fog) setColor(scene.fog.color, sky)

  const night = nightAt(p)
  starMaterial.opacity = night
  moonMaterial.opacity = night
  sunMaterial.opacity = sunAt(p).opacity
}