import { useState } from 'react'
import { profile } from '../data/profile.js'
import { WEB3FORMS_ACCESS_KEY } from '../data/config.js'

function Contact() {
  // useState gives us a piece of state (`formData`) plus a function to
  // update it (`setFormData`). Calling setFormData triggers React to
  // re-render this component with the new values — that's what makes
  // typing into the inputs below show up on screen.
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // Tracks where we are in the submit process, so we can show the right
  // message/button state: 'idle' | 'sending' | 'success' | 'error'.
  const [status, setStatus] = useState('idle')

  // A single handler reused by all three inputs. `e.target.name` matches
  // the input's `name` attribute (e.g. "email"), so this updates just
  // that one field without touching the others.
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Runs when the form is submitted (button click or Enter key).
  const handleSubmit = async (e) => {
    // Forms normally reload the page on submit — this stops that so we
    // can handle it with JavaScript instead.
    e.preventDefault()

    // Honeypot spam check: real visitors never see or fill this field
    // (it's hidden via CSS), but simple spam bots often fill in every
    // field they find. If it's not empty, silently drop the submission.
    if (formData.botcheck) return

    setStatus('sending')

    try {
      // fetch() sends the form data to Web3Forms, which emails it to
      // whatever address owns the access key below. `await` pauses this
      // function until the network request finishes, without blocking
      // the rest of the page (that's what makes it "asynchronous").
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${formData.name} via portfolio site`,
          from_name: 'Portfolio Website',
          ...formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' }) // clear the form
      } else {
        setStatus('error')
      }
    } catch {
      // Network failure, Web3Forms down, etc.
      setStatus('error')
    }
  }

  return (
    <div>
      <h1>Contact</h1>
      <p>Feel free to reach out — I'm actively looking for opportunities.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* Honeypot field — hidden from real users via CSS (see
            .botcheck in index.css), left unhidden from screen readers
            being unlikely to reach it since it has no visible label. */}
        <input
          type="text"
          name="botcheck"
          className="botcheck"
          tabIndex="-1"
          autoComplete="off"
          value={formData.botcheck || ''}
          onChange={handleChange}
        />

        <button type="submit" className="button" disabled={status === 'sending'}>
          {status === 'sending' ? 'sending...' : 'send message'}
        </button>

        {status === 'success' && (
          <p className="form-status form-status-success">
            Thanks — your message has been sent. I'll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="form-status form-status-error">
            Something went wrong sending that. Try again, or email me directly below.
          </p>
        )}
      </form>

      <div className="contact-links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          {profile.github.replace('https://', '')}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          {profile.linkedin.replace('https://', '')}
        </a>
      </div>
    </div>
  )
}

export default Contact
