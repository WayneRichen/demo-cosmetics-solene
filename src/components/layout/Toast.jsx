import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Icon from '../ui/Icon';
import './Toast.css';

const DURATION = 3800;

/** "Added to bag" confirmation shown after every add. */
export default function Toast() {
  const { toast, dismissToast, openBag } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(dismissToast, DURATION);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.id}>
          <img src={toast.product.images[0]} alt="" />
          <div className="toast__body">
            <p className="toast__label">
              <Icon name="check" size={14} /> Added to your bag
            </p>
            <p className="toast__name">{toast.product.name}</p>
            <p className="toast__size">{toast.size}</p>
          </div>
          <button
            className="toast__view"
            onClick={() => {
              dismissToast();
              openBag();
            }}
          >
            View Bag
          </button>
          <span className="toast__timer" style={{ animationDuration: `${DURATION}ms` }} />
        </div>
      )}
    </div>
  );
}
