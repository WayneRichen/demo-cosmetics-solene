import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useShop } from '../../context/ShopContext';
import { useOverlay } from '../../hooks/useOverlay';
import { FREE_SHIPPING_THRESHOLD } from '../../data/site';
import { formatPrice } from '../../utils/format';
import Icon from '../ui/Icon';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, count, subtotal, setQty, removeItem, isOpen, closeBag } = useCart();
  const { showCategory } = useShop();
  const ref = useOverlay(isOpen, closeBag);
  const [checkoutNote, setCheckoutNote] = useState(false);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={`drawer ${isOpen ? 'is-open' : ''}`} data-overlay-open={isOpen} inert={isOpen ? undefined : ''}>
      <div className="drawer__backdrop" onClick={closeBag} aria-hidden="true" />
      <aside ref={ref} className="drawer__panel" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <header className="drawer__head">
          <h2 className="drawer__title serif">
            Your Bag <span>({count})</span>
          </h2>
          <button onClick={closeBag} aria-label="Close bag" className="drawer__close">
            <Icon name="close" size={22} />
          </button>
        </header>

        {items.length > 0 && (
          <div className="drawer__shipping">
            <p>
              {remaining > 0 ? (
                <>You’re <strong>{formatPrice(remaining)}</strong> away from complimentary shipping</>
              ) : (
                <>You’ve unlocked <strong>complimentary shipping</strong></>
              )}
            </p>
            <div className="drawer__progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="drawer__empty">
            <Icon name="bag" size={40} strokeWidth={0.8} />
            <p className="serif">Your bag is empty</p>
            <p>Discover botanical formulas crafted for a quiet daily ritual.</p>
            <button
              className="btn"
              onClick={() => {
                closeBag();
                setTimeout(() => showCategory('all'), 300);
              }}
            >
              Shop the Collection <Icon name="arrowRight" size={16} />
            </button>
          </div>
        ) : (
          <ul className="drawer__items">
            {items.map((item) => (
              <li key={item.key} className="drawer__item">
                <img src={item.product.images[0]} alt="" className="drawer__thumb" />
                <div className="drawer__info">
                  <div className="drawer__row">
                    <p className="drawer__name">{item.product.name}</p>
                    <p className="drawer__price">{formatPrice(item.price * item.qty)}</p>
                  </div>
                  <p className="drawer__size">{item.size}</p>
                  <div className="drawer__row">
                    <div className="qty qty--sm" role="group" aria-label={`Quantity of ${item.product.name}`}>
                      <button onClick={() => setQty(item.key, item.qty - 1)} aria-label="Decrease quantity">
                        <Icon name="minus" size={14} />
                      </button>
                      <output>{item.qty}</output>
                      <button onClick={() => setQty(item.key, item.qty + 1)} aria-label="Increase quantity" disabled={item.qty >= 10}>
                        <Icon name="plus" size={14} />
                      </button>
                    </div>
                    <button className="drawer__remove" onClick={() => removeItem(item.key)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <footer className="drawer__foot">
            <div className="drawer__row drawer__subtotal">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="drawer__note">Taxes and shipping calculated at checkout.</p>
            <button className="btn btn--block" onClick={() => setCheckoutNote(true)}>
              Checkout <Icon name="arrowRight" size={16} />
            </button>
            {checkoutNote && (
              <p className="drawer__demo" role="status">
                This is a portfolio concept — checkout is not available.
              </p>
            )}
          </footer>
        )}
      </aside>
    </div>
  );
}
