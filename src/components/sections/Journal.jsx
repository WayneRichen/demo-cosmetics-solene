import { articles } from '../../data/journal';
import Icon from '../ui/Icon';
import './Journal.css';

export default function Journal() {
  return (
    <section className="journal section" id="journal" aria-labelledby="journal-title">
      <div className="container">
        <header className="journal__head">
          <div>
            <p className="eyebrow eyebrow--line" data-reveal>The Journal</p>
            <h2 id="journal-title" className="section-title" data-reveal style={{ '--reveal-delay': '100ms' }}>
              Notes on <em>skin &amp; ritual</em>
            </h2>
          </div>
          <a href="#journal" className="link-underline" data-reveal>
            View all stories <Icon name="arrowRight" size={14} />
          </a>
        </header>

        <div className="journal__grid">
          {articles.map((a, i) => (
            <article key={a.id} className="jcard" data-reveal style={{ '--reveal-delay': `${i * 120}ms` }}>
              <div className="jcard__media">
                <img src={a.image} alt="" loading="lazy" />
                <span className="jcard__category">{a.category}</span>
              </div>
              <p className="jcard__meta">
                <time>{a.date}</time> · {a.readTime}
              </p>
              <h3 className="jcard__title">{a.title}</h3>
              <p className="jcard__excerpt">{a.excerpt}</p>
              <span className="jcard__more">
                Read the story <Icon name="arrowRight" size={14} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
