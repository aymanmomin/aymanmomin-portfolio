export interface ContactMessage {
  name: string
  email: string
  message: string
}

// The form endpoint is a public URL from a form service (for example Formspree), not a secret.
// Only https endpoints are accepted. Anything else means the form stays hidden.
export function getContactEndpoint(): string | null {
  const value: unknown = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.startsWith('https://') ? trimmed : null
}

export async function sendContactMessage(
  endpoint: string,
  data: ContactMessage,
  fetcher: typeof fetch = fetch,
): Promise<boolean> {
  try {
    const response = await fetcher(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    return response.ok
  } catch {
    return false
  }
}