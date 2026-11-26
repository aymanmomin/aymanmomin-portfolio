import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetScroll, scrollState } from './scrollStore'
import { useStoryScroll } from './useStoryScroll'

const hookIds = ['a', 'b', 'c']

function Harness({ present }: { present: string[] }) {
  useStoryScroll(hookIds)
  return (
    <div>
      {present.map((id, i) => (
        <section key={id} id={id} data-i={i} />
      ))}
    </div>
  )
}

function setViewport(scrollY: number, innerHeight: number) {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true, writable: true })
  Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true, writable: true })
}

beforeEach(() => {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const i = Number(this.getAttribute('data-i'))
    return { top: i * 1000 - window.scrollY, height: 100 } as DOMRect
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  setViewport(0, 768)
  resetScroll()
})

describe('useStoryScroll', () => {
  it('turns the scroll position into a path position', () => {
    setViewport(1100, 800)
    render(<Harness present={hookIds} />)
    expect(scrollState.progress).toBeCloseTo(1.45, 5)
  })

  it('stays at the start when an anchor is missing', () => {
    setViewport(1100, 800)
    render(<Harness present={['a', 'b']} />)
    expect(scrollState.progress).toBe(0)
  })
})