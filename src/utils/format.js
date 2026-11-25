const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (value) => currency.format(value);

/** "From $68" when a product has several sizes */
export const priceLabel = (product) => {
  const prices = product.sizes.map((s) => s.price);
  const min = Math.min(...prices);
  return prices.length > 1 ? `From ${formatPrice(min)}` : formatPrice(min);
};
