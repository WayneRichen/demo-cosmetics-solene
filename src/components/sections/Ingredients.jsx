import { useState } from 'react';
import { ingredients } from '../../data/ingredients';
import { products } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import BotanicalSketch from '../ui/BotanicalSketch';
import Icon from '../ui/Icon';
import './Ingredients.css';

export default function Ingredients() {
  const [activeId, setActiveId] = useState(ingredients[0].id);
  const { openQuickView } = useShop();
  const active = ingredients.find((i) => i.id === activeId);
  const foundIn = products.filter((p) => p.ingredients.includes(activeId));

  return (
    <section className="ingredients section" id="ingredients" aria-labelledby="ingredients-title">
      <BotanicalSketch variant="chamomile" className="ingredients__sketch ingredients__sketch--a" />
      <BotanicalSketch variant="fern" className="ingredients__sketch ingredients__sketch--b" />

      <div className="container">
        <header className="ingredients__head">
          <p className="eyebrow eyebrow--line" data-reveal>From the Garden</p>
          <h2 id="ingredients-title" className="section-title" data-reveal style={{ '--reveal-delay': '100ms' }}>
            Precious ingredients, <em>thoughtfully sourced.</em>
          </h2>
          <p className="lead" data-reveal style={{ '--reveal-delay': '200ms' }}>
            We travel to the source of every botanical — partnering with small growers who harvest by hand,
            at the moment each plant is at its most potent.
          </p>
        </header>

        <div className="ingredients__body">
          {/* Selector list */}
          <div className="ingredients__list" role="tablist" aria-label="Botanical ingredients" aria-orientation="vertical" data-reveal>
            {ingredients.map((ing, i) => (
              <button
                key={ing.id}
                role="tab"
                id={`ing-tab-${ing.id}`}
                aria-selected={ing.id === activeId}
                aria-controls="ing-panel"
                className={`ingredients__item ${ing.id === activeId ? 'is-active' : ''}`}
                onClick={() => setActiveId(ing.id)}
                onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActiveId(ing.id)}
              >
                <span className="ingredients__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ingredients__name">{ing.name}</span>
                <span className="ingredients__latin">{ing.latin}</span>
              </button>
            ))}
          </div>

          {/* Stage */}
          <div className="ingredients__stage" data-reveal="fade" style={{ '--reveal-delay': '150ms' }}>
            <div className="ingredients__images">
              {ingredients.map((ing) => (
                <img
                  key={ing.id}
                  src={ing.image}
                  alt={ing.id === activeId ? ing.name : ''}
                  className={ing.id === activeId ? 'is-active' : ''}
                  loading="lazy"
                />
              ))}
            </div>

            <div
              className="ingredients__card"
              id="ing-panel"
              role="tabpanel"
              aria-labelledby={`ing-tab-${activeId}`}
              key={activeId}
            >
              <p className="ingredients__benefit">{active.benefit}</p>
              <h3 className="serif">{active.name}</h3>
              <p className="ingredients__origin">
                <Icon name="leaf" size={14} /> Sourced from {active.origin}
              </p>
              <p className="ingredients__desc">{active.description}</p>

              {foundIn.length > 0 && (
                <div className="ingredients__found">
                  <p>Found in</p>
                  <ul>
                    {foundIn.map((p) => (
                      <li key={p.id}>
                        <button type="button" onClick={() => openQuickView(p.id)}>
                          <img src={p.images[0]} alt="" />
                          <span>{p.name}</span>
                          <Icon name="arrowRight" size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
