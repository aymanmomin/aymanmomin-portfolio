import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('./config', () => ({ SHOW_EMPTY_MEDIA_SLOTS: false }))

import MediaSlot from './MediaSlot'

describe('MediaSlot with empty slots hidden', () => {
  it('renders nothing for an empty slot', () => {
    const { container } = render(<MediaSlot media={{ id: 'x', kind: 'photo', label: 'Hidden' }} />)
    expect(container).toBeEmptyDOMElement()
  })
})