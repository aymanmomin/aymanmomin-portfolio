import { useState } from 'react'
import type { FormEvent } from 'react'
import Section from '../layout/Section'
import { personalLinks } from '../../data/personal'
import { buttonClasses } from '../../lib/buttonClasses'
import { getContactEndpoint, sendContactMessage } from '../../lib/contact'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClasses =
  'mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-fg placeholder:text-muted'

export default function Contact() {
  const endpoint = getContactEndpoint()
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!endpoint || status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never see or fill this field.
    if (String(data.get('company') ?? '') !== '') {
      setStatus('sent')
      return
    }

    setStatus('sending')
    const ok = await sendContactMessage(endpoint, {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    })

    if (ok) {
      form.reset()
      setStatus('sent')
    } else {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-base leading-relaxed sm:text-lg">
        I am interested in data science and analytics, AI engineering, software engineering and
        full-stack roles.
        {endpoint
          ? ' Send me a message below, or find me on LinkedIn.'
          : ' The best way to reach me is on LinkedIn.'}
      </p>

      {endpoint && (
        <form aria-label="Contact form" onSubmit={handleSubmit} className="relative mt-8 max-w-xl space-y-4">
          <div>
            <label htmlFor="contact-name" className="text-sm text-fg">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm text-fg">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={150}
              autoComplete="email"
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-sm text-fg">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={2000}
              className={fieldClasses}
            />
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label>
              Company
              <input name="company" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className={`${buttonClasses('primary')} disabled:opacity-60`}
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>

          <p role="status" aria-live="polite" className="text-sm text-fg">
            {status === 'sent' ? 'Thanks, your message was sent.' : ''}
          </p>
          {status === 'error' && (
            <p role="alert" className="text-sm text-fg">
              Something went wrong. Please try again, or reach me on LinkedIn.
            </p>
          )}
        </form>
      )}

      {(personalLinks.linkedin || personalLinks.github || personalLinks.resume) && (
        <ul className="mt-8 flex flex-wrap gap-3">
          {personalLinks.linkedin && (
            <li>
              <a
                href={personalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses(endpoint ? 'secondary' : 'primary')}
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {personalLinks.github && (
            <li>
              <a
                href={personalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('secondary')}
              >
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {personalLinks.resume && (
            <li>
              <a href={personalLinks.resume} download className={buttonClasses('secondary')}>
                Download resume
              </a>
            </li>
          )}
        </ul>
      )}
    </Section>
  )
}