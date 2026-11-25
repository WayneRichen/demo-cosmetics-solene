# SŌLÈNE — Botanical Skincare

> **Nature, Refined.** A quiet ritual of botanical science and timeless beauty.

A portfolio concept: a brand site for a fictional botanical skincare line. It's a single-page site built with **React 18 + Vite** and plain CSS, with no backend or API.

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

`vite.config.js` sets `base: './'`, so you can deploy `dist/` as-is to Vercel, Netlify or a GitHub Pages sub-path.

## Page structure

| Section | Component | Highlights |
|---|---|---|
| Navbar | `layout/Navbar.jsx` | Shop mega-menu and Rituals dropdown (hover, click, keyboard, Esc), hides on scroll down, mobile slide-in menu |
| Hero | `sections/Hero.jsx` | Image clip-reveal + slow zoom, staggered line-by-line title, drifting light |
| Philosophy | `sections/Philosophy.jsx` | Image collage, line-art botanicals, count-up stats |
| Best Sellers | `sections/BestSellers.jsx` | Category filter with sliding indicator, staggered card entrance, hover image swap |
| Ingredients | `sections/Ingredients.jsx` | Interactive ingredient selector, crossfading imagery, "Found in" links that open Quick View |
| Product Detail | `sections/Signature.jsx` | Signature serum: carousel, size selector with live price, quantity, tabs |
| Journal | `sections/Journal.jsx` | Editorial cards (horizontal swipe on mobile) |
| Footer | `layout/Footer.jsx` + `sections/Newsletter.jsx` | Newsletter form with validation, loading and success states |

Overlays: `product/QuickViewModal.jsx`, `layout/CartDrawer.jsx` (the shopping bag) and `layout/Toast.jsx`.

### Interactions checklist
- [x] Hero image and text entrance animation
- [x] Navbar dropdown menus
- [x] Product card hover image swap
- [x] Product category filtering (also driven from the navbar and footer links)
- [x] Product image carousel: arrows, thumbnails, swipe, ← → keys
- [x] Quick View modal: focus trap, Esc to close, bottom sheet on mobile
- [x] Add-to-bag animation: thumbnail flies to the bag icon, badge bump, button state and toast
- [x] Newsletter subscription form
- [x] Fully responsive, with `prefers-reduced-motion` support

## Project structure

```
src/
├── data/            ← all content lives here
│   ├── products.js      products, categories, signature product id
│   ├── ingredients.js   ingredient stories
│   ├── journal.js       journal cards
│   └── site.js          brand copy, navigation, footer links, free-shipping threshold
├── styles/
│   ├── tokens.css       colours, fonts, spacing, motion (edit the look here)
│   └── base.css         reset, typography, buttons, scroll-reveal
├── context/         CartContext (bag + localStorage), ShopContext (filter + quick view)
├── hooks/           useReveal (scroll animations), useOverlay (scroll lock, Esc, focus trap)
├── utils/           flyToBag animation, price formatting
└── components/
    ├── layout/      Navbar, MobileMenu, CartDrawer, Toast, Footer
    ├── sections/    one component per homepage section
    ├── product/     ProductCard, ProductGallery, ProductDetails, AddToBagButton, QuickViewModal
    └── ui/          Icon, Logo, Modal, BotanicalSketch
```

Each component imports its own `.css` file next to it, and class names follow a BEM-like style (`.pcard__media`).

## Common edits

- **Add a product:** add an object to `src/data/products.js` and put its images in `public/images/`. `images[0]` is the card image, `images[1]` is the hover image, and all of them show in the carousel. The filter counts, Quick View, bag and Ingredients "Found in" links update automatically.
- **Change the brand colours or fonts:** edit `src/styles/tokens.css`. Fonts load from Google Fonts in `index.html`.
- **Animate a new element on scroll:** add `data-reveal` (or `data-reveal="fade"`). For a stagger, add `style={{ '--reveal-delay': '120ms' }}`.
- **Add a nav item or dropdown:** edit `navigation` in `src/data/site.js`. A link with `category` filters the shop.

## Image credits

All photography is from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license), which allows free commercial use without attribution. Images were resized and converted to WebP. On the hero image, the SŌLÈNE label was composited onto the blank bottle label and the background was extended to the left. The photo's colours are untouched; adjust its tone with `--hero-filter` in `src/components/sections/Hero.css`.

| File | Unsplash photo ID |
|---|---|
| hero-serum | MkuwnDkT1s0 |
| serum-1 … 4 | Mxy5gokl8mE, 80wCkpt-IKE, V0nUU1RSQOE, 9nh0lK1FqGE |
| balm-1 … 3 | IWuc9YiChSI, fS8ylQsS1bo, kD9qprR6HBI |
| cleanser-1 … 3 | paN-5NCLxvQ, C1dunESLYBQ, JiqTLjzEH18 |
| oil-1 … 3 | JpnqiMBf7zQ, HKUpK_RSvn0, Z7u2bpbE65Q |
| cream-1 … 3 | VRnf9ErHwUE, E30Dik5cHO8, 01YhA5XDDLk |
| toner-1 … 3 | WdJ4WnLxyDs, T0inbt7nRME, Sj1I3y550VA |
| bodyoil-1 … 3 | x0Opr053RHg, O9yYfckJirY, g6q3lFAe3kA |
| lotion-1 … 3 | LtGwgq7r_mc, dFBhXJHKNeo, ApsLq7FAbiE |
| philosophy-olive / -shadow | Ce3wzkvxNHk, GES3XxdSWEg |
| ing-rose, chamomile, centella, olive, oat, aloe | iajkliejEiU, 3IaMqM_lxj4, CaFcsjX8ZVk, sgj62wdIsgQ, UFQQkXV-jwU, E4mEYDtHI0o |
| journal-morning, -oil, -bath | jyKa0Ynxvow, iZlMuVu9luM, RmxF6X_pEqU |
| newsletter-shadow | njhPkg0Oe5M |

You can view any photo at `https://unsplash.com/photos/<ID>`.

---

SŌLÈNE is a fictional brand created for portfolio purposes. All products, prices and copy are invented.
