import { useEffect, useRef, useState } from 'react';
import BotanicalSketch from '../ui/BotanicalSketch';
import Icon from '../ui/Icon';
import './Philosophy.css';

const principles = [
  {
    icon: 'leaf',
    title: 'Botanical First',
    text: 'Every formula begins in the garden — with plants chosen for proven efficacy, sourced from growers we know by name.',
  },
  {
    icon: 'flask',
    title: 'Refined by Science',
    text: 'Our Paris lab pairs time-honoured botanicals with modern actives, tested for gentleness on sensitive skin.',
  },
  {
    icon: 'drop',
    title: 'Quietly Conscious',
    text: 'Refillable amber glass, recycled paper and carbon-neutral shipping. Luxury that leaves a lighter trace.',
  },
];

const stats = [
  { value: 98, suffix: '%', label: 'Natural origin ingredients' },
  { value: 12, suffix: '', label: 'Botanicals per formula, on average' },
  { value: 0, suffix: '', label: 'Synthetic fragrances or parabens' },
];

/** Counts up from 0 when scrolled into view. */
function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Philosophy() {
  return (
    <section className="philosophy section" id="philosophy" aria-labelledby="philosophy-title">
      <div className="container philosophy__grid">
        <div className="philosophy__media" data-reveal="fade">
          <figure className="philosophy__img philosophy__img--main">
            <img src="./images/philosophy-olive.webp" alt="An olive branch in a glass bottle by a sunlit window" loading="lazy" />
          </figure>
          <figure className="philosophy__img philosophy__img--small">
            <img src="./images/philosophy-shadow.webp" alt="" loading="lazy" />
          </figure>
          <BotanicalSketch variant="olive" className="philosophy__sketch" />
          <p className="philosophy__caption">
            Olea europaea — <em>Andalusia</em>
          </p>
        </div>

        <div className="philosophy__copy">
          <p className="eyebrow eyebrow--line" data-reveal>Our Philosophy</p>
          <h2 id="philosophy-title" className="section-title" data-reveal style={{ '--reveal-delay': '100ms' }}>
            Where the garden meets the laboratory, <em>skin finds its calm.</em>
          </h2>
          <p className="lead" data-reveal style={{ '--reveal-delay': '200ms' }}>
            <span className="brand-word">SŌLÈNE</span> was born from a simple belief: that the most beautiful skin comes from a gentle
            dialogue between nature and science. We distil rare botanicals into quiet, effective
            rituals — nothing unnecessary, nothing rushed.
          </p>

          <ul className="philosophy__principles">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--reveal-delay': `${250 + i * 100}ms` }}>
                <span className="philosophy__icon">
                  <Icon name={p.icon} size={22} strokeWidth={1} />
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <dl className="philosophy__stats" data-reveal>
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="visually-hidden">{s.label}</dt>
              <dd className="philosophy__stat-value serif">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
              <dd className="philosophy__stat-label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
