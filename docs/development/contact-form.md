# Contact Form

The contact form is optional. It only renders when `VITE_CONTACT_FORM_ENDPOINT` is set to an
`https://` URL at build time. Without it, the Contact section shows LinkedIn and GitHub links only.

## Status
Not configured. No form provider has been chosen yet.

## Setup
1. Create a form with a provider that accepts JSON posts (for example Formspree or Web3Forms).
2. Copy its endpoint URL. It is a public URL, not a secret.
3. Locally, put it in `.env` (never committed): `VITE_CONTACT_FORM_ENDPOINT=https://...`
4. For deployment, add it as a GitHub Actions repository variable and pass it to the build step.
   Vite embeds the value at build time, so a rebuild is required after changing it.

## Behaviour
- The form posts JSON with `name`, `email` and `message`.
- A hidden honeypot field (`company`) silently drops bot submissions.
- Success and error messages are announced to screen readers.
- No email address is published anywhere on the site.