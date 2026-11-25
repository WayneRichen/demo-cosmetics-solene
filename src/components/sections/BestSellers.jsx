import { useLayoutEffect, useRef, useState } from 'react';
import { categories, products } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../product/ProductCard';
import './BestSellers.css';

export default function BestSellers() {
  const { category, setCategory } = useShop();
  const tabsRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const visible = category === 'all' ? products : products.filter((p) => p.category === category);
  const countFor = (id) => (id === 'all' ? products.length : products.filter((p) => p.category === id).length);

  // slide the underline under the active filter
  useLayoutEffect(() => {
    const update = () => {
      const el = tabsRef.current?.querySelector('[aria-pressed="true"]');
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener('resize', update);
    document.fonts?.ready.then(update);
    return () => window.removeEventListener('resize', update);
  }, [category]);

  return (
    <section className="bestsellers section" id="shop" aria-labelledby="shop-title">
      <div className="container">
        <header className="bestsellers__head">
          <div>
            <p className="eyebrow eyebrow--line" data-reveal>The Collection</p>
            <h2 id="shop-title" className="section-title" data-reveal style={{ '--reveal-delay': '100ms' }}>
              Best <em>Sellers</em>
            </h2>
          </div>
          <p className="bestsellers__intro" data-reveal style={{ '--reveal-delay': '200ms' }}>
            Our most-loved formulas — each one a small, considered step in your daily ritual.
          </p>
        </header>

        <div className="filters" ref={tabsRef} role="group" aria-label="Filter products by category" data-reveal>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`filters__btn ${category === c.id ? 'is-active' : ''}`}
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
              <sup>{countFor(c.id)}</sup>
            </button>
          ))}
          <span className="filters__indicator" style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} aria-hidden="true" />
        </div>

        <p className="visually-hidden" aria-live="polite">
          Showing {visible.length} products
        </p>

        {/* `key` re-mounts the grid so cards replay their entrance on every filter change */}
        <div className="bestsellers__grid" key={category} data-reveal="fade">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} style={{ '--i': i }} />
          ))}
        </div>
      </div>
    </section>
  );
}
