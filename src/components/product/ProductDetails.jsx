import { useEffect, useId, useState } from 'react';
import { categories } from '../../data/products';
import { formatPrice } from '../../utils/format';
import AddToBagButton from './AddToBagButton';
import Icon from '../ui/Icon';
import './ProductDetails.css';

const TABS = [
  { id: 'benefits', label: 'Benefits' },
  { id: 'use', label: 'How to Use' },
  { id: 'ingredients', label: 'Key Ingredients' },
];

/**
 * Product info panel: name, rating, price, size selector, quantity, tabs, add to bag.
 * Shared by the Quick View modal and the Signature (product detail) section.
 */
export default function ProductDetails({ product, as: Heading = 'h2', showEyebrow = true }) {
  const [size, setSize] = useState(product.sizes[0].label);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('benefits');
  const uid = useId();

  useEffect(() => {
    setSize(product.sizes[0].label);
    setQty(1);
    setTab('benefits');
  }, [product]);

  const price = product.sizes.find((s) => s.label === size)?.price ?? product.sizes[0].price;
  const categoryLabel = categories.find((c) => c.id === product.category)?.label;

  return (
    <div className="pdetails">
      {showEyebrow && <p className="eyebrow">{categoryLabel} · {product.tagline}</p>}
      <Heading className="pdetails__name serif">{product.name}</Heading>

      <div className="pdetails__meta">
        <span className="pdetails__rating" aria-label={`Rated ${product.rating} out of 5`}>
          {[...Array(5)].map((_, i) => (
            <Icon key={i} name="star" size={13} className={i < Math.round(product.rating) ? 'is-filled' : ''} />
          ))}
          <span>{product.rating}</span>
        </span>
        <span className="pdetails__reviews">{product.reviews} reviews</span>
      </div>

      <p className="pdetails__price">
        <span key={price} className="pdetails__price-value">{formatPrice(price)}</span>
        <span className="pdetails__size-note">/ {size}</span>
      </p>

      <p className="pdetails__desc">{product.description}</p>

      {/* Size selector */}
      <fieldset className="pdetails__field">
        <legend className="pdetails__label">Size</legend>
        <div className="pdetails__sizes">
          {product.sizes.map((s) => (
            <label key={s.label} className={`pdetails__size ${size === s.label ? 'is-active' : ''}`}>
              <input
                type="radio"
                name={`${uid}-size`}
                value={s.label}
                checked={size === s.label}
                onChange={() => setSize(s.label)}
              />
              <span>{s.label}</span>
              <small>{formatPrice(s.price)}</small>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Quantity + add */}
      <div className="pdetails__actions">
        <div className="qty" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" disabled={qty <= 1}>
            <Icon name="minus" size={16} />
          </button>
          <output aria-live="polite">{qty}</output>
          <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity" disabled={qty >= 10}>
            <Icon name="plus" size={16} />
          </button>
        </div>
        <AddToBagButton product={product} size={size} qty={qty} label={`Add to Bag — ${formatPrice(price * qty)}`} className="pdetails__add" />
      </div>

      <ul className="pdetails__perks">
        <li><Icon name="leaf" size={16} /> 98% natural origin</li>
        <li><Icon name="rabbit" size={16} /> Cruelty-free &amp; vegan</li>
        <li><Icon name="drop" size={16} /> Dermatologist tested</li>
      </ul>

      {/* Tabs */}
      <div className="ptabs">
        <div className="ptabs__list" role="tablist" aria-label="Product information">
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`${uid}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              aria-controls={`${uid}-panel`}
              className={`ptabs__tab ${tab === t.id ? 'is-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="ptabs__panel" key={tab}>
          {tab === 'benefits' && (
            <ul className="ptabs__benefits">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {tab === 'use' && <p>{product.howToUse}</p>}
          {tab === 'ingredients' && <p>{product.keyIngredients}</p>}
        </div>
      </div>
    </div>
  );
}
