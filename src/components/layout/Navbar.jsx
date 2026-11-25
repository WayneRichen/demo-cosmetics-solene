import { useEffect, useRef, useState } from 'react';
import { navigation, FREE_SHIPPING_THRESHOLD } from '../../data/site';
import { useCart } from '../../context/CartContext';
import { useShop } from '../../context/ShopContext';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import MobileMenu from './MobileMenu';
import './Navbar.css';

const CLOSE_DELAY = 180; // ms grace period so the pointer can travel into the dropdown

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const { count, openBag } = useCart();
  const { showCategory } = useShop();

  /* ---- scroll state: solid background + hide on scroll down ---- */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > window.innerHeight * 0.9 && y > lastY + 4);
      if (y < lastY - 4 || y < 40) setHidden(false);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    // fired by utils/flyToBag so the bag icon is on screen when an item lands
    const show = () => setHidden(false);
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('solene:show-nav', show);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('solene:show-nav', show);
    };
  }, []);

  /* ---- close dropdown on Escape / outside click ---- */
  useEffect(() => {
    if (!openMenu) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null);
    const onClick = (e) => !navRef.current?.contains(e.target) && setOpenMenu(null);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClick);
    };
  }, [openMenu]);

  // don't hide the bar while a dropdown is open
  useEffect(() => {
    if (openMenu) setHidden(false);
  }, [openMenu]);

  const open = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };

  const handleLink = (e, link) => {
    setOpenMenu(null);
    if (link.category) {
      e.preventDefault();
      showCategory(link.category);
    }
  };

  const classes = ['header', scrolled && 'is-scrolled', hidden && 'is-hidden', openMenu && 'has-menu-open']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={classes}>
        <p className="header__announce">
          <span>
            Complimentary shipping on orders over ${FREE_SHIPPING_THRESHOLD}
            <span className="header__announce-extra"> · Samples with every order</span>
          </span>
        </p>

        <div className="header__bar container" ref={navRef}>
          <button
            className="header__burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Icon name="menu" size={24} />
          </button>

          <Logo className="header__logo" />

          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              {navigation.map((item) => {
                const isOpen = openMenu === item.label;
                return (
                  <li
                    key={item.label}
                    className={`nav__item ${item.menu ? 'has-menu' : ''} ${isOpen ? 'is-open' : ''}`}
                    onMouseEnter={item.menu ? () => open(item.label) : undefined}
                    onMouseLeave={item.menu ? scheduleClose : undefined}
                  >
                    {item.menu ? (
                      <button
                        type="button"
                        className="nav__link"
                        aria-expanded={isOpen}
                        aria-controls={`menu-${item.label}`}
                        onClick={() => (isOpen ? setOpenMenu(null) : open(item.label))}
                      >
                        {item.label}
                        <Icon name="chevronDown" size={14} className="nav__chevron" />
                      </button>
                    ) : (
                      <a href={item.href} className="nav__link">
                        {item.label}
                      </a>
                    )}

                    {item.menu && (
                      <div
                        id={`menu-${item.label}`}
                        className={`dropdown ${item.menu.feature ? 'dropdown--mega' : ''}`}
                        aria-hidden={!isOpen}
                        inert={!isOpen ? '' : undefined}
                      >
                        <div className="dropdown__inner">
                          {item.menu.columns.map((col) => (
                            <div className="dropdown__col" key={col.title}>
                              <p className="dropdown__title">{col.title}</p>
                              <ul>
                                {col.links.map((link) => (
                                  <li key={link.label}>
                                    <a href={link.href} onClick={(e) => handleLink(e, link)}>
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {item.menu.feature && (
                            <a
                              href={item.menu.feature.href}
                              className="dropdown__feature"
                              onClick={() => setOpenMenu(null)}
                            >
                              <img src={item.menu.feature.image} alt="" loading="lazy" />
                              <span className="eyebrow">{item.menu.feature.eyebrow}</span>
                              <span className="dropdown__feature-title">{item.menu.feature.title}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button className="header__bag" onClick={openBag} aria-label={`Open shopping bag, ${count} items`} data-bag-target>
            <span className="header__bag-label">Bag</span>
            <Icon name="bag" size={22} />
            <span key={count} className={`header__count ${count ? 'is-filled' : ''}`} aria-hidden="true">
              {count}
            </span>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
