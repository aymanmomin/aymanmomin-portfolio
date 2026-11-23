import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Contact from './Contact'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

function fillForm() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } })
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } })
}

describe('Contact without an endpoint', () => {
  it('hides the form and shows profile links', () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', '')
    render(<Contact />)
    expect(screen.queryByRole('form', { name: 'Contact form' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeInTheDocument()
  })

  it('does not publish an email address', () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', '')
    const { container } = render(<Contact />)
    expect(container.innerHTML).not.toMatch(/mailto:|@gmail|@ucalgary/i)
  })
})

describe('Contact with an endpoint', () => {
  it('sends the message and confirms success', async () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://example.com/form')
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)

    render(<Contact />)
    fillForm()
    fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))

    expect(await screen.findByText(/Thanks, your message was sent/)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('https://example.com/form')
    expect(String(fetchMock.mock.calls[0][1].body)).toContain('Ada')
  })

  it('shows an error when sending fails', async () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://example.com/form')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    render(<Contact />)
    fillForm()
    fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/Something went wrong/)
  })

  it('does not send when the honeypot field is filled', () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://example.com/form')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const { container } = render(<Contact />)
    fillForm()
    const trap = container.querySelector('input[name="company"]') as HTMLInputElement
    fireEvent.change(trap, { target: { value: 'Spam Inc' } })
    fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))

    expect(fetchMock).not.toHaveBeenCalled()
  })
})