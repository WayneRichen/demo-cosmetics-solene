/**
 * Product catalogue.
 * To add a product: copy an entry, give it a unique `id`, and drop images in /public/images.
 *  - `images[0]` is the card image, `images[1]` shows on hover, all are used in the gallery.
 *  - `sizes` drives the size selector; the first size is the default.
 *  - `ingredients` holds ids from data/ingredients.js (used by the Ingredients section).
 */

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'cleanse', label: 'Cleanse' },
  { id: 'treat', label: 'Treat' },
  { id: 'moisturize', label: 'Moisturize' },
  { id: 'body', label: 'Body' },
];

const img = (name) => `./images/${name}.webp`;

export const products = [
  {
    id: 'lumiere-serum',
    name: 'Lumière Botanical Serum',
    category: 'treat',
    tagline: 'Brightening daily serum',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 312,
    sizes: [
      { label: '30 ml', price: 68 },
      { label: '50 ml', price: 92 },
    ],
    images: [img('serum-1'), img('serum-2'), img('serum-3'), img('serum-4')],
    description:
      'A weightless, golden serum that pairs centella asiatica with plant-derived squalane to calm, brighten and restore the skin’s natural luminosity — morning and night.',
    benefits: [
      'Visibly evens tone in 4 weeks',
      'Calms redness and reactivity',
      'Strengthens the moisture barrier',
    ],
    howToUse:
      'After cleansing, warm 3–4 drops between your palms and press gently into face and neck. Follow with moisturizer.',
    keyIngredients: 'Centella Asiatica, Olive-derived Squalane, Niacinamide 4%',
    ingredients: ['centella', 'olive'],
  },
  {
    id: 'rose-balm',
    name: 'Rose Petal Cleansing Balm',
    category: 'cleanse',
    tagline: 'Melting first cleanse',
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 204,
    sizes: [{ label: '100 ml', price: 42 }],
    images: [img('balm-1'), img('balm-2'), img('balm-3')],
    description:
      'A silken balm that melts into an oil on contact, lifting makeup and SPF while Damask rose and colloidal oat leave skin soft, never stripped.',
    benefits: ['Dissolves long-wear makeup', 'Leaves no greasy residue', 'Comforts dry, tight skin'],
    howToUse:
      'Massage a small scoop onto dry skin for 60 seconds. Add warm water to emulsify, then rinse or remove with a warm cloth.',
    keyIngredients: 'Damask Rose Oil, Colloidal Oat, Sunflower Seed Oil',
    ingredients: ['rose', 'oat'],
  },
  {
    id: 'chamomile-cleanser',
    name: 'Chamomile Gel Cleanser',
    category: 'cleanse',
    tagline: 'Gentle daily wash',
    badge: null,
    rating: 4.7,
    reviews: 158,
    sizes: [{ label: '150 ml', price: 34 }],
    images: [img('cleanser-1'), img('cleanser-2'), img('cleanser-3')],
    description:
      'A low-foam gel cleanser with German chamomile and aloe that purifies without disturbing the skin’s balance. Suitable for the most sensitive skin.',
    benefits: ['pH-balanced at 5.5', 'Soothes as it cleanses', 'Fragrance-free'],
    howToUse:
      'Work a pea-sized amount into damp skin morning and evening. Rinse with lukewarm water.',
    keyIngredients: 'German Chamomile, Aloe Leaf Juice, Glycerin',
    ingredients: ['chamomile', 'aloe'],
  },
  {
    id: 'night-oil',
    name: 'Night Renewal Oil',
    category: 'treat',
    tagline: 'Overnight restorative oil',
    badge: 'New',
    rating: 4.9,
    reviews: 87,
    sizes: [{ label: '30 ml', price: 74 }],
    images: [img('oil-1'), img('oil-2'), img('oil-3')],
    description:
      'Cold-pressed rosehip and bakuchiol — nature’s gentle alternative to retinol — work through the night to refine texture and restore suppleness.',
    benefits: ['Smooths fine lines', 'Refines texture overnight', 'Pregnancy-safe retinol alternative'],
    howToUse:
      'As the last step of your evening ritual, press 2–3 drops into skin. Use nightly.',
    keyIngredients: 'Rosehip Seed Oil, Bakuchiol 1%, Olive Squalane',
    ingredients: ['rose', 'olive'],
  },
  {
    id: 'velvet-cream',
    name: 'Velvet Cloud Cream',
    category: 'moisturize',
    tagline: 'Whipped barrier cream',
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 276,
    sizes: [
      { label: '50 ml', price: 58 },
      { label: '100 ml', price: 96 },
    ],
    images: [img('cream-1'), img('cream-2'), img('cream-3')],
    description:
      'A cloud-light cream with shea butter, ceramides and oat that sinks in instantly, leaving skin cushioned and velvet-soft for a full day.',
    benefits: ['72-hour hydration', 'Ceramide-rich barrier repair', 'Non-comedogenic'],
    howToUse: 'Smooth over face and neck morning and evening, after serum.',
    keyIngredients: 'Shea Butter, Ceramide NP, Colloidal Oat',
    ingredients: ['oat', 'centella'],
  },
  {
    id: 'hydra-mist',
    name: 'Hydra Mist Toner',
    category: 'moisturize',
    tagline: 'Hydrating facial mist',
    badge: null,
    rating: 4.6,
    reviews: 119,
    sizes: [{ label: '100 ml', price: 32 }],
    images: [img('toner-1'), img('toner-2'), img('toner-3')],
    description:
      'A fine, cooling mist of aloe and triple-weight hyaluronic acid that floods skin with moisture and preps it to absorb what follows.',
    benefits: ['Instant hydration boost', 'Refreshes makeup', 'Alcohol-free'],
    howToUse: 'Mist over face after cleansing, or throughout the day whenever skin feels tight.',
    keyIngredients: 'Aloe Leaf Juice, Hyaluronic Acid, Centella Water',
    ingredients: ['aloe', 'centella'],
  },
  {
    id: 'olive-body-oil',
    name: 'Olive & Fig Body Oil',
    category: 'body',
    tagline: 'Dry-touch body oil',
    badge: 'New',
    rating: 4.7,
    reviews: 64,
    sizes: [{ label: '100 ml', price: 48 }],
    images: [img('bodyoil-1'), img('bodyoil-2'), img('bodyoil-3')],
    description:
      'A silky dry-touch oil of Mediterranean olive and fig, softly scented with fig leaf. Absorbs in moments to leave a satin glow.',
    benefits: ['Fast-absorbing, non-greasy', 'Softens rough skin', 'Subtle natural fig scent'],
    howToUse: 'Massage onto damp skin after bathing, paying attention to elbows and knees.',
    keyIngredients: 'Olive Fruit Oil, Fig Extract, Vitamin E',
    ingredients: ['olive'],
  },
  {
    id: 'sandalwood-lotion',
    name: 'Sandalwood Body Lotion',
    category: 'body',
    tagline: 'Nourishing daily lotion',
    badge: null,
    rating: 4.8,
    reviews: 142,
    sizes: [{ label: '250 ml', price: 52 }],
    images: [img('lotion-1'), img('lotion-2'), img('lotion-3')],
    description:
      'A rich yet weightless lotion of cocoa butter and colloidal oat, warmed with ethically sourced sandalwood for a grounding evening ritual.',
    benefits: ['24-hour moisture', 'Calms dry, itchy skin', 'Warm woody scent'],
    howToUse: 'Smooth generously over the body after showering.',
    keyIngredients: 'Cocoa Butter, Colloidal Oat, Sandalwood Oil',
    ingredients: ['oat'],
  },
];

/** The product featured in the "Product Detail" section */
export const SIGNATURE_PRODUCT_ID = 'lumiere-serum';

export const getProduct = (id) => products.find((p) => p.id === id);
