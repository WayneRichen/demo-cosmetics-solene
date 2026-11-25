import { useState } from 'react';
import { navigation, brand } from '../../data/site';
import { useShop } from '../../context/ShopContext';
import { useOverlay } from '../../hooks/useOverlay';
import Icon from '../ui/Icon';
import './MobileMenu.css';

export default function MobileMenu({ isOpen, onClose }) {
  const ref = useOverlay(isOpen, onClose);
  const [expanded, setExpanded] = useState('Shop');
  const { showCategory } = useShop();

  const handleLink = (e, link) => {
    onClose();
    if (link.category) {
      e.preventDefault();
      // wait for the panel to slide away before scrolling
      setTimeout(() => showCategory(link.category), 300);
    }
  };

  return (
    <div className={`mmenu ${isOpen ? 'is-open' : ''}`} data-overlay-open={isOpen} inert={isOpen ? undefined : ''}>
      <div className="mmenu__backdrop" onClick={onClose} aria-hidden="true" />
      <div ref={ref} id="mobile-menu" className="mmenu__panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mmenu__head">
          <span className="mmenu__brand">{brand.name}</span>
          <button onClick={onClose} aria-label="Close menu" className="mmenu__close">
            <Icon name="close" size={24} />
          </button>
        </div>

        <ul className="mmenu__list">
          {navigation.map((item, i) => (
            <li key={item.label} className="mmenu__item" style={{ '--i': i }}>
              {item.menu ? (
                <>
                  <button
                    className="mmenu__link"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((cur) => (cur === item.label ? null : item.label))}
                  >
                    {item.label}
                    <Icon name={expanded === item.label ? 'minus' : 'plus'} size={18} />
                  </button>
                  <div className={`mmenu__sub ${expanded === item.label ? 'is-expanded' : ''}`}>
                    <ul>
                      {item.menu.columns.flatMap((col) => col.links).map((link) => (
                        <li key={link.label}>
                          <a href={link.href} onClick={(e) => handleLink(e, link)}>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <a href={item.href} className="mmenu__link" onClick={onClose}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <p className="mmenu__foot">{brand.slogan}</p>
      </div>
    </div>
  );
}
