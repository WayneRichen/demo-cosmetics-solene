import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { getProduct } from '../data/products';

const STORAGE_KEY = 'solene-bag-v1';
const CartContext = createContext(null);

/** A bag line is identified by product + size. */
const lineKey = (productId, size) => `${productId}__${size}`;

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { productId, size, qty } = action;
      const key = lineKey(productId, size);
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l));
      }
      return [...state, { key, productId, size, qty }];
    }
    case 'setQty':
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: Math.min(action.qty, 10) } : l))
        .filter((l) => l.qty > 0);
    case 'remove':
      return state.filter((l) => l.key !== action.key);
    default:
      return state;
  }
}

function loadBag() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // drop lines whose product no longer exists in data/products.js
    return Array.isArray(saved) ? saved.filter((l) => getProduct(l.productId)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, loadBag);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null); // { id, product, size }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable (private mode) — bag still works in memory */
    }
  }, [lines]);

  const addItem = useCallback((productId, size, qty = 1) => {
    dispatch({ type: 'add', productId, size, qty });
    setToast({ id: Date.now(), product: getProduct(productId), size });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo(() => {
    // enrich lines with product data so components don't have to look it up
    const items = lines.map((l) => {
      const product = getProduct(l.productId);
      const sizeInfo = product.sizes.find((s) => s.label === l.size) ?? product.sizes[0];
      return { ...l, product, price: sizeInfo.price };
    });
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      addItem,
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      removeItem: (key) => dispatch({ type: 'remove', key }),
      isOpen,
      openBag: () => {
        setToast(null);
        setIsOpen(true);
      },
      closeBag: () => setIsOpen(false),
      toast,
      dismissToast,
    };
  }, [lines, isOpen, toast, addItem, dismissToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
