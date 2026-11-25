import { useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { flyToBag } from '../../utils/flyToBag';
import Icon from '../ui/Icon';
import './AddToBagButton.css';

/**
 * Add-to-bag with feedback:
 *   idle → adding (thumbnail flies to the bag) → added ✓ → idle
 * `compact` renders a round icon button (used on product cards).
 */
export default function AddToBagButton({ product, size, qty = 1, compact = false, label = 'Add to Bag', className = '' }) {
  const { addItem } = useCart();
  const [status, setStatus] = useState('idle');
  const ref = useRef(null);

  const handleClick = async (e) => {
    e.stopPropagation();
    if (status !== 'idle') return;
    setStatus('adding');
    await flyToBag(ref.current, product.images[0]);
    addItem(product.id, size ?? product.sizes[0].label, qty);
    setStatus('added');
    setTimeout(() => setStatus('idle'), 1600);
  };

  if (compact) {
    return (
      <button
        ref={ref}
        type="button"
        className={`bag-btn-icon is-${status} ${className}`}
        onClick={handleClick}
        aria-label={status === 'added' ? `${product.name} added to bag` : `Add ${product.name} to bag`}
      >
        <Icon name={status === 'added' ? 'check' : 'plus'} size={18} />
      </button>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={`btn bag-btn is-${status} ${className}`}
      onClick={handleClick}
      aria-live="polite"
    >
      <span className="bag-btn__label bag-btn__label--idle">
        <Icon name="bag" size={18} /> {label}
      </span>
      <span className="bag-btn__label bag-btn__label--adding" aria-hidden={status !== 'adding'}>
        <span className="bag-btn__spinner" /> Adding
      </span>
      <span className="bag-btn__label bag-btn__label--added" aria-hidden={status !== 'added'}>
        <Icon name="check" size={18} /> Added to Bag
      </span>
    </button>
  );
}
