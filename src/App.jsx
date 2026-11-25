import { CartProvider } from './context/CartContext';
import { ShopProvider } from './context/ShopContext';
import { useReveal } from './hooks/useReveal';

import Navbar from './components/layout/Navbar';
import CartDrawer from './components/layout/CartDrawer';
import Toast from './components/layout/Toast';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import Philosophy from './components/sections/Philosophy';
import BestSellers from './components/sections/BestSellers';
import Ingredients from './components/sections/Ingredients';
import Signature from './components/sections/Signature';
import Journal from './components/sections/Journal';

import QuickViewModal from './components/product/QuickViewModal';

export default function App() {
  useReveal();

  return (
    <ShopProvider>
      <CartProvider>
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />

        <main id="main">
          <Hero />
          <Philosophy />
          <BestSellers />
          <Ingredients />
          <Signature />
          <Journal />
        </main>

        <Footer />

        {/* overlays */}
        <QuickViewModal />
        <CartDrawer />
        <Toast />
      </CartProvider>
    </ShopProvider>
  );
}
