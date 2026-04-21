export const upperheader = [
    "Cash on Delivery.",
    "Every Halir creation is mindfully blended, labeled and packed by hand.",
    "Free delivery across pakistan.",
    "Get a free gift with your perfume."
]

export const menu = [
    {name: "Fine Fragrance", link: "/collections/all"},
    {name: "Hot Sellers", link: "/collections/hot-sellers"},
    {name: "Men", link: "/collections/men"},
    {name: "Women", link: "/collections/women"},
    {name: "Collections", link: "/collections"},
    {name: "About Us", link: "/about-us"},
]

export const newArrivals = [
    {category: "men" ,slug: "nothing" ,name: "Mi Amor", image: "/p.png"},
    {category: "women" ,slug: "nothing" ,name: "Farenheit", image: "/p2.jpg"},
    {category: "men" ,slug: "nothing" ,name: "Tom Ford", image: "/p.png"},
    {category: "men" ,slug: "nothing" ,name: "Creed", image: "/p.png"},
]
export const hotSellers = [
    {name: "Inspiration", image: "/p2.jpg"},
    {name: "Imagination", image: "/p.png"},
    {name: "Ambassador", image: "/p.png"},
    {name: "Air", image: "/p2.jpg"},
]

export const clientCare = [
    {name: "TERMS & CONDITION", link: "/terms-and-condition"},
    {name: "PRIVACY POLICY", link: "/privacy-policy"},
    {name: "SHIPPING & RETURNS", link: "/shipping-and-returns"},
    {name: "CONTACT US", link: "/contact-us"},
]

export const pages = [
    {name: "ABOUT US", link: "/about-us"},
    {name: "COLLECTIONS", link: "/collections"},
    {name: "MEN", link: "/collections/men"},
    {name: "WOMEN", link: "/collections/women"},
    {name: "HOT SELLERS", link: "/collections/hot-sellers"},
]

export const COLLECTIONS = [
  {
    title: 'The Men',
    slug: 'men',
    desc: 'Power, depth, and the scent of refined masculinity.',
    image: '/men.jpg',
  },
  {
    title: 'The Women',
    slug: 'women',
    desc: 'Ethereal florals and seductive ambers for her.',
    image: '/women.jpg',
  },
  {
    title: 'New Arrivals',
    slug: 'new-arrivals',
    desc: 'The latest olfactory signatures from our atelier.',
    image: '/unique.jpg',
  },
  {
    title: 'Hot Sellers',
    slug: 'hot-sellers',
    desc: 'The most coveted identities in Pakistan.',
    image: '/hot.jpg',
  },
  {
    title: 'All',
    slug: 'all',
    desc: 'Explore all premium perfumes with long lasting.',
    image: '/p.png',
  },
]

export const perfumes = [
  {
    id: "mi-amor",
    slug: "mi-amor",
    name: "Mi Amor",
    categories: ["men", "hot-sellers"],
    tagline: "Warm woods meet seductive musk",
    description:
      "A bold oriental fragrance opening with bergamot and cardamom, settling into a heart of oud and rose, anchored by white musk and sandalwood.",
    mainImage: "/p2.jpg",
    gender: "men",
    longevity: "8–12 hours",
    season: ["Fall", "Winter"],
    notes: {
      top: [
        { name: "Bergamot",     image: "notes/bergamot.jpg" },
        { name: "Cardamom",     image: "notes/cardamom.jpg" },
        { name: "Black Pepper", image: "notes/black-pepper.jpg" },
      ],
      heart: [
        { name: "Oud",     image: "notes/oud.jpg" },
        { name: "Rose",    image: "notes/rose.jpg" },
        { name: "Jasmine", image: "notes/jasmine.jpg" },
      ],
      base: [
        { name: "White Musk",  image: "notes/white-musk.jpg" },
        { name: "Sandalwood",  image: "notes/sandalwood.jpg" },
        { name: "Amber",       image: "notes/amber.jpg" },
      ],
    },
    sizes: [
      {
        slug:     "mi-amor-50ml",
        label:    "50ml",
        ml:       50,
        price:    4200,
        currency: "PKR",
        sku:      "HA-MIA-50",
        in_stock: true,
        stock: 2,
        
        images:   ["/perf.jpg"],
      },
      {
        slug:     "mi-amor-100ml",
        label:    "100ml",
        ml:       100,
        price:    7500,
        currency: "PKR",
        sku:      "HA-MIA-100",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
      {
        slug:     "mi-amor-tester",
        label:    "Tester",
        ml:       100,
        price:    5500,
        currency: "PKR",
        sku:      "HA-MIA-TEST",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
    ],
  },

  {
    id: "farenheit",
    slug: "farenheit",
    name: "Farenheit",
    categories: ["men", "hot-sellers"],
    tagline: "The scent of raw masculinity",
    description:
      "A timeless classic reimagined — hawthorn and violet leaf open into a leather-violet heart, resting on a base of cedarwood and vetiver.",
    mainImage: "/p.png",
    gender: "men",
    longevity: "6–10 hours",
    season: ["Spring", "Fall"],
    notes: {
      top: [
        { name: "Hawthorn",    image: "notes/hawthorn.jpg" },
        { name: "Violet Leaf", image: "notes/violet-leaf.jpg" },
        { name: "Mandarin",    image: "notes/mandarin.jpg" },
      ],
      heart: [
        { name: "Leather", image: "notes/leather.jpg" },
        { name: "Violet",  image: "notes/violet.jpg" },
        { name: "Nutmeg",  image: "notes/nutmeg.jpg" },
      ],
      base: [
        { name: "Cedarwood", image: "notes/cedarwood.jpg" },
        { name: "Vetiver",   image: "notes/vetiver.jpg" },
        { name: "Musk",      image: "notes/musk.jpg" },
      ],
    },
    sizes: [
      {
        slug:     "farenheit-100ml",
        label:    "100ml",
        ml:       100,
        price:    6800,
        currency: "PKR",
        sku:      "HA-FAR-100",
        in_stock: true,
        stock: 2,
        
        images:   ["/perf.jpg"],
      },
      {
        slug:     "farenheit-tester",
        label:    "Tester",
        ml:       100,
        price:    4900,
        currency: "PKR",
        sku:      "HA-FAR-TEST",
        in_stock: false,
        stock: 2,
        images:   ["/perf.jpg"],
      },
    ],
  },

  {
    id: "noir-rose",
    slug: "noir-rose",
    name: "Noir Rose",
    categories: ["women", "hot-sellers"],
    tagline: "Dark. Feminine. Unforgettable.",
    description:
      "Turkish rose and saffron bloom into a powdery iris heart, deepened by patchouli and vanilla — a fragrance for evenings that never end.",
    mainImage: "/p.png",
    gender: "women",
    longevity: "10–14 hours",
    season: ["Fall", "Winter"],
    notes: {
      top: [
        { name: "Turkish Rose", image: "notes/turkish-rose.jpg" },
        { name: "Saffron",      image: "notes/saffron.jpg" },
        { name: "Bergamot",     image: "notes/bergamot.jpg" },
      ],
      heart: [
        { name: "Iris",            image: "notes/iris.jpg" },
        { name: "Peony",           image: "notes/peony.jpg" },
        { name: "Jasmine Absolute",image: "notes/jasmine-absolute.jpg" },
      ],
      base: [
        { name: "Patchouli", image: "notes/patchouli.jpg" },
        { name: "Vanilla",   image: "notes/vanilla.jpg" },
        { name: "White Musk",image: "notes/white-musk.jpg" },
      ],
    },
    sizes: [
      {
        slug:     "noir-rose-50ml",
        label:    "50ml",
        ml:       50,
        price:    4800,
        currency: "PKR",
        sku:      "HA-NR-50",
        in_stock: true,
        stock: 0,
        
        images:   ["/perf.jpg"],
      },
      {
        slug:     "noir-rose-100ml",
        label:    "100ml",
        ml:       100,
        price:    8200,
        currency: "PKR",
        sku:      "HA-NR-100",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
      {
        slug:     "noir-rose-tester",
        label:    "Tester",
        ml:       100,
        price:    6000,
        currency: "PKR",
        sku:      "HA-NR-TEST",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
    ],
  },

  {
    id: "aqua-bleu",
    slug: "aqua-bleu",
    name: "Aqua Bleu",
    categories: ["men", "unisex"],
    tagline: "Ocean air and crisp citrus",
    description:
      "A fresh aquatic built for daytime — sea notes and lemon over a clean driftwood heart, finishing with a whisper of musk.",
    mainImage: "/p2.jpg",
    gender: "unisex",
    longevity: "4–6 hours",
    season: ["Spring", "Summer"],
    notes: {
      top: [
        { name: "Lemon",     image: "notes/lemon.jpg" },
        { name: "Sea Notes", image: "notes/sea-notes.jpg" },
        { name: "Grapefruit",image: "notes/grapefruit.jpg" },
      ],
      heart: [
        { name: "Driftwood", image: "notes/driftwood.jpg" },
        { name: "Geranium",  image: "notes/geranium.jpg" },
        { name: "Rosemary",  image: "notes/rosemary.jpg" },
      ],
      base: [
        { name: "Musk",      image: "notes/musk.jpg" },
        { name: "Oakmoss",   image: "notes/oakmoss.jpg" },
        { name: "Ambergris", image: "notes/ambergris.jpg" },
      ],
    },
    sizes: [
      {
        slug:     "aqua-bleu-50ml",
        label:    "50ml",
        ml:       50,
        price:    3500,
        currency: "PKR",
        sku:      "HA-AB-50",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
      {
        slug:     "aqua-bleu-100ml",
        label:    "100ml",
        ml:       100,
        price:    6200,
        currency: "PKR",
        sku:      "HA-AB-100",
        in_stock: true,
        stock: 2,
        
        images:   ["/perf.jpg"],
      },
      {
        slug:     "aqua-bleu-tester",
        label:    "Tester",
        ml:       100,
        price:    4500,
        currency: "PKR",
        sku:      "HA-AB-TEST",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
    ],
  },

  {
    id: "velvet-oud",
    slug: "velvet-oud",
    name: "Velvet Oud",
    categories: ["women", "unisex"],
    tagline: "Smoke, silk, and dark florals",
    description:
      "A smoky oud wrapped in dark rose and incense, softened by a creamy base of tonka bean and sandalwood. Rich, meditative, unforgettable.",
    mainImage: "/p2.jpg",
    gender: "unisex",
    longevity: "12–16 hours",
    season: ["Fall", "Winter"],
    notes: {
      top: [
        { name: "Incense",   image: "notes/incense.jpg" },
        { name: "Saffron",   image: "notes/saffron.jpg" },
        { name: "Black Rose",image: "notes/black-rose.jpg" },
      ],
      heart: [
        { name: "Oud",        image: "notes/oud.jpg" },
        { name: "Dark Rose",  image: "notes/dark-rose.jpg" },
        { name: "Labdanum",   image: "notes/labdanum.jpg" },
      ],
      base: [
        { name: "Tonka Bean", image: "notes/tonka-bean.jpg" },
        { name: "Sandalwood", image: "notes/sandalwood.jpg" },
        { name: "Vanilla",    image: "notes/vanilla.jpg" },
      ],
    },
    sizes: [
      {
        slug:     "velvet-oud-50ml",
        label:    "50ml",
        ml:       50,
        price:    5500,
        currency: "PKR",
        sku:      "HA-VO-50",
        in_stock: true,
        stock: 2,
        
        images:   ["/perf.jpg"],
      },
      {
        slug:     "velvet-oud-100ml",
        label:    "100ml",
        ml:       100,
        price:    9800,
        currency: "PKR",
        sku:      "HA-VO-100",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
    ],
  },

  {
    id: "citrus-bloom",
    slug: "citrus-bloom",
    name: "Citrus Bloom",
    categories: ["women"],
    tagline: "Sunshine in a bottle",
    description:
      "A joyful burst of neroli and mandarin over a soft floral heart of white tea and freesia, finishing clean with musk and cedar.",
    mainImage: "/p.png",
    gender: "women",
    longevity: "4–7 hours",
    season: ["Spring", "Summer"],
    notes: {
      top: [
        { name: "Neroli",    image: "notes/neroli.jpg" },
        { name: "Mandarin",  image: "notes/mandarin.jpg" },
        { name: "Lemon Zest",image: "notes/lemon-zest.jpg" },
      ],
      heart: [
        { name: "White Tea", image: "notes/white-tea.jpg" },
        { name: "Freesia",   image: "notes/freesia.jpg" },
        { name: "Magnolia",  image: "notes/magnolia.jpg" },
      ],
      base: [
        { name: "Musk",       image: "notes/musk.jpg" },
        { name: "Cedar",      image: "notes/cedar.jpg" },
        { name: "Ambrette",   image: "notes/ambrette.jpg" },
      ],
    },
    sizes: [
      {
        slug:     "citrus-bloom-50ml",
        label:    "50ml",
        ml:       50,
        price:    3800,
        currency: "PKR",
        sku:      "HA-CB-50",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
      {
        slug:     "citrus-bloom-100ml",
        label:    "100ml",
        ml:       100,
        price:    6500,
        currency: "PKR",
        sku:      "HA-CB-100",
        in_stock: false,
        stock: 2,
        
        images:   ["/perf.jpg"],
      },
      {
        slug:     "citrus-bloom-tester",
        label:    "Tester",
        ml:       100,
        price:    4800,
        currency: "PKR",
        sku:      "HA-CB-TEST",
        in_stock: true,
        stock: 2,
        images:   ["/perf.jpg"],
      },
    ],
  },
];