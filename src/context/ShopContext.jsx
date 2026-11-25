import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Shared UI state for shopping:
 *  - the active Best Sellers category (so the navbar can set it)
 *  - which product is open in the Quick View modal
 */
const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [category, setCategory] = useState('all');
  const [quickViewId, setQuickViewId] = useState(null);

  /** Set the filter then scroll to the shop section — used by nav & footer links. */
  const showCategory = useCallback((id) => {
    setCategory(id);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const value = useMemo(
    () => ({
      category,
      setCategory,
      showCategory,
      quickViewId,
      openQuickView: setQuickViewId,
      closeQuickView: () => setQuickViewId(null),
    }),
    [category, quickViewId, showCategory]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
};
