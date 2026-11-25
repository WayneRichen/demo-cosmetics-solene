import { useShop } from '../../context/ShopContext';
import { getProduct } from '../../data/products';
import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import './QuickViewModal.css';

export default function QuickViewModal() {
  const { quickViewId, closeQuickView } = useShop();
  // keep the last product rendered while the modal animates out
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (quickViewId) setProduct(getProduct(quickViewId));
  }, [quickViewId]);

  return (
    <Modal isOpen={Boolean(quickViewId)} onClose={closeQuickView} label={product ? `Quick view: ${product.name}` : 'Quick view'}>
      {product && (
        <div className="quickview">
          <ProductGallery images={product.images} alt={product.name} className="quickview__gallery" />
          <div className="quickview__info">
            <ProductDetails product={product} />
          </div>
        </div>
      )}
    </Modal>
  );
}
