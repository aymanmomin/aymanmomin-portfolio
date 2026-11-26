import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getActiveIndex,
  resetScroll,
  scrollState,
  setProgress,
  subscribeActive,
  subscribeProgress,
} from './scrollStore'

afterEach(() => {
  resetScroll()
})

describe('scroll store', () => {
  it('tracks the fractional progress and the nearest stop', () => {
    setProgress(3.4)
    expect(scrollState.progress).toBeCloseTo(3.4)
    expect(getActiveIndex()).toBe(3)
    setProgress(3.6)
    expect(getActiveIndex()).toBe(4)
  })

  it('notifies active listeners only when the nearest stop changes', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeActive(listener)
    setProgress(1.1)
    setProgress(1.3)
    expect(listener).toHaveBeenCalledTimes(1)
    setProgress(2.2)
    expect(listener).toHaveBeenCalledTimes(2)
    unsubscribe()
    setProgress(5)
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('notifies progress listeners on every update until unsubscribed', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeProgress(listener)
    setProgress(1.1)
    setProgress(1.2)
    expect(listener).toHaveBeenCalledTimes(2)
    expect(listener).toHaveBeenLastCalledWith(1.2)
    unsubscribe()
    setProgress(1.3)
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('resets to the start', () => {
    setProgress(6)
    resetScroll()
    expect(scrollState.progress).toBe(0)
    expect(getActiveIndex()).toBe(0)
  })
})