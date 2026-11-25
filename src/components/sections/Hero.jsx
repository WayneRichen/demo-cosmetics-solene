import { useEffect, useState } from 'react';
import { brand } from '../../data/site';
import Icon from '../ui/Icon';
import './Hero.css';

const features = [
  { icon: 'leaf', title: 'Plant-Derived', text: '98% natural origin' },
  { icon: 'flask', title: 'Clinically Considered', text: 'Dermatologist tested' },
  { icon: 'rabbit', title: 'Consciously Made', text: 'Vegan & cruelty-free' },
];

export default function Hero() {
  // start the entrance animation once the hero image has loaded (no half-loaded flash)
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = './images/hero-serum.webp';
    const done = () => setReady(true);
    if (img.complete) done();
    else img.onload = img.onerror = done;
    const fallback = setTimeout(done, 2500);
    return () => clearTimeout(fallback);
  }, []);

  const [line1, line2] = brand.slogan.split(' ');

  return (
    <section className={`hero ${ready ? 'is-ready' : ''}`} id="top" aria-label="Introduction">
      <div className="hero__media">
        <img
          className="hero__img"
          src="./images/hero-serum.webp"
          alt="SŌLÈNE Lumière Botanical Serum in an amber dropper bottle on a stone plinth"
          fetchPriority="high"
        />
        <div className="hero__light" aria-hidden="true" />
      </div>

      <div className="hero__content container">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--line hero__eyebrow">Botanical Skincare · Est. 2026</p>

          <h1 className="hero__title serif">
            <span className="hero__line">
              <span style={{ '--d': '250ms' }}>{line1}</span>
            </span>
            <span className="hero__line">
              <em style={{ '--d': '400ms' }}>{line2}</em>
            </span>
          </h1>

          <p className="hero__tagline">{brand.tagline}</p>

          <div className="hero__cta">
            <a href="#shop" className="btn">
              Shop the Collection <Icon name="arrowRight" size={16} />
            </a>
            <a href="#philosophy" className="btn btn--ghost">
              Our Philosophy
            </a>
          </div>
        </div>

        <ul className="hero__features">
          {features.map((f, i) => (
            <li key={f.title} style={{ '--d': `${1100 + i * 120}ms` }}>
              <Icon name={f.icon} size={22} strokeWidth={1} />
              <span>
                <strong>{f.title}</strong>
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <a href="#philosophy" className="hero__scroll" aria-label="Scroll to discover">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
