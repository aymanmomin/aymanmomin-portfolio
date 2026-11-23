import { afterEach, describe, expect, it, vi } from 'vitest'
import { getContactEndpoint, sendContactMessage } from './contact'

const message = { name: 'Ada', email: 'ada@example.com', message: 'Hello there' }

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('getContactEndpoint', () => {
  it('returns null when unset or empty', () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', '')
    expect(getContactEndpoint()).toBeNull()
  })

  it('rejects non-https endpoints', () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'http://example.com/form')
    expect(getContactEndpoint()).toBeNull()
  })

  it('accepts and trims an https endpoint', () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', '  https://example.com/form  ')
    expect(getContactEndpoint()).toBe('https://example.com/form')
  })
})

describe('sendContactMessage', () => {
  it('posts JSON and reports success', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true })
    const ok = await sendContactMessage('https://example.com/form', message, fetcher as unknown as typeof fetch)
    expect(ok).toBe(true)
    expect(fetcher).toHaveBeenCalledWith(
      'https://example.com/form',
      expect.objectContaining({ method: 'POST', body: JSON.stringify(message) }),
    )
  })

  it('reports failure on a bad response or a network error', async () => {
    const bad = vi.fn().mockResolvedValue({ ok: false })
    expect(await sendContactMessage('https://example.com/form', message, bad as unknown as typeof fetch)).toBe(false)
    const broken = vi.fn().mockRejectedValue(new Error('offline'))
    expect(await sendContactMessage('https://example.com/form', message, broken as unknown as typeof fetch)).toBe(false)
  })
})