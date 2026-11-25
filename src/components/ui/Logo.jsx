import './Logo.css';

export default function Logo({ className = '' }) {
  return (
    <a href="#top" className={`logo ${className}`} aria-label="SŌLÈNE — back to top">
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="18.5" />
        <path d="M20 30V13" />
        <path d="M20 22c-4-1.3-6-4.6-6-8.6 4 .4 6 3.3 6 8.6Z" />
        <path d="M20 19.4c3.5-.8 5.6-3.7 5.6-7.4-3.6.4-5.6 3-5.6 7.4Z" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">SŌLÈNE</span>
        <span className="logo__descriptor">Botanical Skincare</span>
      </span>
    </a>
  );
}
