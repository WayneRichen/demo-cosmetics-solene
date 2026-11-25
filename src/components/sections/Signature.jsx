import { getProduct, SIGNATURE_PRODUCT_ID } from '../../data/products';
import ProductGallery from '../product/ProductGallery';
import ProductDetails from '../product/ProductDetails';
import './Signature.css';

/** "Product Detail" section — an in-depth look at the signature product. */
export default function Signature() {
  const product = getProduct(SIGNATURE_PRODUCT_ID);

  return (
    <section className="signature section" id="signature" aria-label="The signature product">
      <div className="container signature__grid">
        <div className="signature__gallery" data-reveal="fade">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div className="signature__info" data-reveal style={{ '--reveal-delay': '150ms' }}>
          <p className="eyebrow eyebrow--line signature__eyebrow">The Signature · Product Detail</p>
          <ProductDetails product={product} as="h2" showEyebrow={false} />
        </div>
      </div>
    </section>
  );
}
