import { useShop } from '../../context/ShopContext';
import { priceLabel } from '../../utils/format';
import AddToBagButton from './AddToBagButton';
import Icon from '../ui/Icon';
import './ProductCard.css';

/**
 * Product card: image swaps to `images[1]` on hover,
 * Quick View slides up, round + button adds the default size to the bag.
 */
export default function ProductCard({ product, style }) {
  const { openQuickView } = useShop();
  const [main, hover] = product.images;

  return (
    <article className="pcard" style={style}>
      <div className="pcard__media">
        <button
          type="button"
          className="pcard__image-btn"
          onClick={() => openQuickView(product.id)}
          aria-label={`Quick view ${product.name}`}
        >
          <img className="pcard__img pcard__img--main" src={main} alt={product.name} loading="lazy" />
          {hover && <img className="pcard__img pcard__img--hover" src={hover} alt="" loading="lazy" />}
        </button>

        {product.badge && <span className="pcard__badge">{product.badge}</span>}

        <div className="pcard__actions">
          <button type="button" className="pcard__quick" onClick={() => openQuickView(product.id)}>
            <Icon name="eye" size={16} /> Quick View
          </button>
          <AddToBagButton product={product} compact />
        </div>
      </div>

      <div className="pcard__body">
        <p className="pcard__tagline">{product.tagline}</p>
        <h3 className="pcard__name">
          <button type="button" onClick={() => openQuickView(product.id)}>
            {product.name}
          </button>
        </h3>
        <p className="pcard__price">
          {priceLabel(product)}
          <span>{product.sizes.map((s) => s.label).join(' / ')}</span>
        </p>
      </div>
    </article>
  );
}
