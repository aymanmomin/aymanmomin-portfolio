// Scroll position lives outside React so the 3D loop can read it every frame without re-rendering.
export const scrollState = { progress: 0, pointerX: 0, pointerY: 0 }

let activeIndex = 0
const activeListeners = new Set<() => void>()
const progressListeners = new Set<(progress: number) => void>()

export function setProgress(progress: number): void {
  scrollState.progress = progress
  const next = Math.round(progress)
  if (next !== activeIndex) {
    activeIndex = next
    activeListeners.forEach((listener) => listener())
  }
  progressListeners.forEach((listener) => listener(progress))
}

export function getActiveIndex(): number {
  return activeIndex
}

export function subscribeActive(listener: () => void): () => void {
  activeListeners.add(listener)
  return () => {
    activeListeners.delete(listener)
  }
}

export function subscribeProgress(listener: (progress: number) => void): () => void {
  progressListeners.add(listener)
  return () => {
    progressListeners.delete(listener)
  }
}

export function resetScroll(): void {
  scrollState.progress = 0
  scrollState.pointerX = 0
  scrollState.pointerY = 0
  if (activeIndex !== 0) {
    activeIndex = 0
    activeListeners.forEach((listener) => listener())
  }
}