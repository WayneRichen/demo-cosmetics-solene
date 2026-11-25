import { brand, footerLinks } from '../../data/site';
import { useShop } from '../../context/ShopContext';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import Newsletter from '../sections/Newsletter';
import './Footer.css';

export default function Footer() {
  const { showCategory } = useShop();
  const year = new Date().getFullYear();

  const handleLink = (e, link) => {
    if (link.category) {
      e.preventDefault();
      showCategory(link.category);
    }
  };

  return (
    <footer className="footer" id="contact">
      <Newsletter />

      <div className="footer__main container">
        <div className="footer__brand">
          <Logo />
          <p className="footer__slogan serif">{brand.slogan}</p>
          <p className="footer__tagline">{brand.tagline}</p>
          <ul className="footer__social">
            {['instagram', 'pinterest', 'tiktok'].map((s) => (
              <li key={s}>
                <a href="#top" aria-label={s}>
                  <Icon name={s} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerLinks.map((col) => (
          <nav className="footer__col" key={col.title} aria-label={col.title}>
            <p className="footer__title">{col.title}</p>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleLink(e, link)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer__col">
          <p className="footer__title">Studio</p>
          <address>
            12 Rue des Jardins
            <br />
            75003 Paris, France
            <br />
            <a href="mailto:hello@solene.example">hello@solene.example</a>
          </address>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>
          © {year} <span className="brand-word">SŌLÈNE</span> Botanical Skincare. A portfolio concept.
        </p>
        <p>
          Photography from <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a>
        </p>
      </div>
    </footer>
  );
}
