/** Site-wide copy & navigation. */
export const brand = {
  name: 'SŌLÈNE',
  descriptor: 'Botanical Skincare',
  slogan: 'Nature, Refined.',
  tagline: 'A quiet ritual of botanical science and timeless beauty.',
};

export const FREE_SHIPPING_THRESHOLD = 100;

/**
 * Navbar. Items with `menu` open a dropdown.
 * `category` links set the Best Sellers filter before scrolling.
 */
export const navigation = [
  {
    label: 'Shop',
    href: '#shop',
    menu: {
      columns: [
        {
          title: 'By Category',
          links: [
            { label: 'Shop All', href: '#shop', category: 'all' },
            { label: 'Cleanse', href: '#shop', category: 'cleanse' },
            { label: 'Treat', href: '#shop', category: 'treat' },
            { label: 'Moisturize', href: '#shop', category: 'moisturize' },
            { label: 'Body', href: '#shop', category: 'body' },
          ],
        },
        {
          title: 'Discover',
          links: [
            { label: 'Best Sellers', href: '#shop', category: 'all' },
            { label: 'The Signature Serum', href: '#signature' },
            { label: 'Our Ingredients', href: '#ingredients' },
          ],
        },
      ],
      feature: {
        image: './images/serum-1.webp',
        eyebrow: 'The Signature',
        title: 'Lumière Botanical Serum',
        href: '#signature',
      },
    },
  },
  {
    label: 'Rituals',
    href: '#journal',
    menu: {
      columns: [
        {
          title: 'Daily Rituals',
          links: [
            { label: 'Morning Ritual', href: '#journal' },
            { label: 'Evening Ritual', href: '#journal' },
            { label: 'Body Ritual', href: '#journal' },
          ],
        },
      ],
    },
  },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Journal', href: '#journal' },
  { label: 'About', href: '#philosophy' },
];

export const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'Cleanse', href: '#shop', category: 'cleanse' },
      { label: 'Treat', href: '#shop', category: 'treat' },
      { label: 'Moisturize', href: '#shop', category: 'moisturize' },
      { label: 'Body', href: '#shop', category: 'body' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Philosophy', href: '#philosophy' },
      { label: 'Ingredients', href: '#ingredients' },
      { label: 'Journal', href: '#journal' },
    ],
  },
  {
    title: 'Care',
    links: [
      { label: 'Shipping & Returns', href: '#top' },
      { label: 'FAQ', href: '#top' },
      { label: 'Contact', href: '#top' },
    ],
  },
];
