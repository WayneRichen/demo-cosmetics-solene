import { useId, useState } from 'react';
import Icon from '../ui/Icon';
import './Newsletter.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter form (front-end only).
 * status: idle → submitting → success, with inline validation errors.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const uid = useId();

  const validate = () => {
    if (!email.trim()) return 'Please enter your email address.';
    if (!EMAIL_RE.test(email.trim())) return 'That email doesn’t look quite right.';
    if (!consent) return 'Please agree to receive our emails to continue.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = validate();
    setError(message);
    if (message) return;
    setStatus('submitting');
    // simulate a network request — there is no backend in this portfolio build
    setTimeout(() => setStatus('success'), 1200);
  };

  return (
    <section className="newsletter" aria-labelledby={`${uid}-title`}>
      <div className="newsletter__bg" aria-hidden="true" />
      <div className="container newsletter__inner">
        <div className="newsletter__copy" data-reveal>
          <p className="eyebrow">The Ritual Letter</p>
          <h2 id={`${uid}-title`} className="section-title">
            Join the <em>quiet ritual.</em>
          </h2>
          <p>
            Seasonal rituals, ingredient stories and early access to new formulas — delivered gently, twice a month.
            Enjoy 10% off your first order.
          </p>
        </div>

        <div className="newsletter__form-wrap" data-reveal style={{ '--reveal-delay': '150ms' }}>
          {status === 'success' ? (
            <div className="newsletter__success" role="status">
              <span className="newsletter__check">
                <Icon name="check" size={26} />
              </span>
              <p className="serif">Welcome to the ritual.</p>
              <p>
                A welcome note is on its way to <strong>{email}</strong>. Use code <code>SOLENE10</code> at checkout.
              </p>
            </div>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
              <div className={`newsletter__field ${error ? 'has-error' : ''}`}>
                <label htmlFor={`${uid}-email`} className="visually-hidden">
                  Email address
                </label>
                <input
                  id={`${uid}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${uid}-error` : undefined}
                  disabled={status === 'submitting'}
                />
                <button type="submit" className="newsletter__submit" disabled={status === 'submitting'} aria-label="Subscribe">
                  {status === 'submitting' ? <span className="bag-btn__spinner" /> : <Icon name="arrowRight" size={20} />}
                </button>
              </div>

              <label className="newsletter__consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (error) setError('');
                  }}
                />
                <span className="newsletter__box" aria-hidden="true">
                  <Icon name="check" size={12} strokeWidth={2} />
                </span>
                <span>
                  I agree to receive emails from <span className="brand-word">SŌLÈNE</span> and accept the privacy policy.
                </span>
              </label>

              <p id={`${uid}-error`} className="newsletter__error" role="alert">
                {error}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
