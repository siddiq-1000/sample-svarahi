import { MetalRate, HistoricalPricePoint, JewelryItem, BrandConfig, PriceAlert } from '../types';

export const initialBrandConfig: BrandConfig = {
  brandName: 'SAVARTHI',
  tagline: 'Timeless Luxury Fine Jewelry & Pure Bullion Atelier',
  establishedYear: 1988,
  location: 'Mayfair • Paris • Mumbai • Dubai',
  curatorNote: 'Crafted with master goldsmith devotion using certified pure gold, sterling silver, and ethically sourced gems.'
};

export const currentMetalRates: MetalRate[] = [
  {
    id: 'gold_24k',
    name: '24 Karat Pure Gold',
    category: 'gold',
    purity: '99.9% (999 Fine)',
    ratePerGram: 86.45,
    change24h: 1.42,
    changeAmount: 1.21,
    high24h: 86.90,
    low24h: 85.10,
    unit: 'g',
    description: 'Investment grade 999.9 sovereign bullion standard, untarnished and molten pure.'
  },
  {
    id: 'gold_22k',
    name: '22 Karat Royal Gold',
    category: 'gold',
    purity: '91.6% (BIS 916)',
    ratePerGram: 79.25,
    change24h: 1.38,
    changeAmount: 1.08,
    high24h: 79.60,
    low24h: 78.05,
    unit: 'g',
    description: 'The global benchmark for bridal heirlooms and handcrafted traditional ornaments.'
  },
  {
    id: 'gold_18k',
    name: '18 Karat Rose & Yellow Gold',
    category: 'gold',
    purity: '75.0% (750 Hallmark)',
    ratePerGram: 64.84,
    change24h: 1.15,
    changeAmount: 0.74,
    high24h: 65.20,
    low24h: 63.95,
    unit: 'g',
    description: 'Engineered for high-durability modern diamond pavé and daily luxury.'
  },
  {
    id: 'silver_999',
    name: 'Fine Bullion Silver 999',
    category: 'silver',
    purity: '99.9% Pure Fine',
    ratePerGram: 1.08,
    change24h: -0.45,
    changeAmount: -0.005,
    high24h: 1.11,
    low24h: 1.06,
    unit: 'g',
    description: 'Chaste reflective silver minted for sacred artifacts and pure investment ingots.'
  },
  {
    id: 'silver_925',
    name: '925 Sterling Silver',
    category: 'silver',
    purity: '92.5% Sterling',
    ratePerGram: 1.00,
    change24h: -0.38,
    changeAmount: -0.004,
    high24h: 1.03,
    low24h: 0.98,
    unit: 'g',
    description: 'Alloyed with noble copper for resilience in intricate filigree and everyday jewelry.'
  },
  {
    id: 'platinum_950',
    name: 'Platinum 950 Sovereign',
    category: 'platinum',
    purity: '95.0% Pure Pt',
    ratePerGram: 33.40,
    change24h: 0.85,
    changeAmount: 0.28,
    high24h: 33.75,
    low24h: 32.90,
    unit: 'g',
    description: 'Denser than gold with infinite celestial luster, naturally hypoallergenic.'
  }
];

export const historicalPriceData: Record<string, HistoricalPricePoint[]> = {
  '24H': [
    { date: '00:00', gold: 85.20, silver: 1.06, platinum: 33.00, volume: 1420 },
    { date: '04:00', gold: 85.45, silver: 1.07, platinum: 33.15, volume: 1680 },
    { date: '08:00', gold: 85.80, silver: 1.06, platinum: 33.10, volume: 3200 },
    { date: '12:00', gold: 86.25, silver: 1.09, platinum: 33.30, volume: 4950 },
    { date: '16:00', gold: 86.70, silver: 1.08, platinum: 33.50, volume: 3800 },
    { date: '20:00', gold: 86.45, silver: 1.08, platinum: 33.40, volume: 2100 }
  ],
  '7D': [
    { date: 'Mon', gold: 83.90, silver: 1.02, platinum: 32.40, volume: 18200 },
    { date: 'Tue', gold: 84.30, silver: 1.03, platinum: 32.70, volume: 22100 },
    { date: 'Wed', gold: 84.15, silver: 1.04, platinum: 32.55, volume: 19800 },
    { date: 'Thu', gold: 84.90, silver: 1.05, platinum: 32.90, volume: 24500 },
    { date: 'Fri', gold: 85.35, silver: 1.06, platinum: 33.10, volume: 27900 },
    { date: 'Sat', gold: 85.80, silver: 1.07, platinum: 33.25, volume: 31000 },
    { date: 'Today', gold: 86.45, silver: 1.08, platinum: 33.40, volume: 29400 }
  ],
  '1M': [
    { date: 'Week 1', gold: 81.50, silver: 0.98, platinum: 31.80, volume: 98000 },
    { date: 'Week 2', gold: 82.70, silver: 1.01, platinum: 32.10, volume: 114000 },
    { date: 'Week 3', gold: 84.20, silver: 1.04, platinum: 32.75, volume: 128000 },
    { date: 'Week 4', gold: 86.45, silver: 1.08, platinum: 33.40, volume: 142000 }
  ],
  '6M': [
    { date: 'Apr', gold: 74.20, silver: 0.91, platinum: 30.50, volume: 480000 },
    { date: 'May', gold: 76.50, silver: 0.94, platinum: 31.00, volume: 510000 },
    { date: 'Jun', gold: 78.10, silver: 0.97, platinum: 31.40, volume: 495000 },
    { date: 'Jul', gold: 81.30, silver: 1.02, platinum: 32.20, volume: 540000 },
    { date: 'Aug', gold: 83.90, silver: 1.05, platinum: 32.90, volume: 580000 },
    { date: 'Sep', gold: 86.45, silver: 1.08, platinum: 33.40, volume: 620000 }
  ],
  '1Y': [
    { date: 'Q1', gold: 68.40, silver: 0.84, platinum: 29.20, volume: 1980000 },
    { date: 'Q2', gold: 73.10, silver: 0.89, platinum: 30.40, volume: 2150000 },
    { date: 'Q3', gold: 79.80, silver: 0.99, platinum: 31.80, volume: 2320000 },
    { date: 'Q4', gold: 86.45, silver: 1.08, platinum: 33.40, volume: 2540000 }
  ]
};

export const sampleJewelryItems: JewelryItem[] = [
  // 0. The Signature Haute Joaillerie Suite (Matches User Reference Image)
  {
    id: 'haute-01',
    title: 'Radiance Cascading Diamond Rivière Suite',
    category: 'high_jewelry',
    metal: 'Platinum 950 & 18K White Gold',
    baseMetalType: 'platinum_950',
    purity: '95.0% Pure Platinum with D-F Color VVS1 Diamonds',
    grossWeight: 44.8,
    netWeight: 36.4,
    gemstoneWeight: 38.5,
    gemstoneType: 'Graduated Triple-Row Brilliant & Marquise Cut Diamonds',
    makingChargePercent: 15.0,
    price: 18500,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85',
    alternateImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
    ],
    tag: 'Haute Joaillerie',
    description: 'The crowning jewel of the atelier. A triple-tier fluid diamond rivière articulating gracefully across the collarbone, accompanied by matching chandelier drop earrings in platinum 950.',
    hallmarkCode: 'PT950-RIV-3850',
    isHandcrafted: true
  },
  // 1. Classic Diamond Ring (Matches screenshot Best Seller #1)
  {
    id: 'ring-01',
    title: 'Classic 3-Stone Brilliant Diamond Ring',
    category: 'ring',
    metal: '18K Rose Gold',
    baseMetalType: 'gold_18k',
    purity: '75.0% 750 Gold with Round Cut Pavé',
    grossWeight: 4.8,
    netWeight: 4.2,
    gemstoneWeight: 1.25,
    gemstoneType: 'Triple Round Brilliant Certified Diamonds',
    makingChargePercent: 12.0,
    price: 249,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1200&q=80'
    ],
    tag: 'Best Seller',
    description: 'An iconic three-stone trilogy design symbolizing yesterday, today, and tomorrow. Set in warm 18K gold band with secure four-prong baskets.',
    hallmarkCode: 'AU750-DIA-249',
    isHandcrafted: true
  },
  // 2. Gold Link Bracelet (Matches screenshot Best Seller #2)
  {
    id: 'bangle-01',
    title: 'Solid Twisted Gold Link Bracelet',
    category: 'bangle',
    metal: '22K Gold',
    baseMetalType: 'gold_22k',
    purity: '91.6% BIS 916 Hallmark Solid Core',
    grossWeight: 6.4,
    netWeight: 6.4,
    makingChargePercent: 10.0,
    price: 129,
    image: 'https://images.unsplash.com/photo-1611591475817-d5d852233fec?auto=format&fit=crop&w=1200&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    tag: 'Best Seller',
    description: 'Timeless Italian curb chain weaving in lustrous 22K yellow gold. Equipped with safety lobster clasp and mirror polished links.',
    hallmarkCode: 'BIS-916-BRC-129',
    isHandcrafted: true
  },
  // 3. Pearl Drop Earrings (Matches screenshot Best Seller #3)
  {
    id: 'earring-01',
    title: 'South Sea Pearl & Pavé Drop Earrings',
    category: 'earring',
    metal: '18K Rose Gold',
    baseMetalType: 'gold_18k',
    purity: '75.0% 750 Gold with Natural Luster Pearls',
    grossWeight: 5.2,
    netWeight: 4.1,
    gemstoneWeight: 2.1,
    gemstoneType: 'AAA Cultured Natural Teardrop Pearls & Accent Crystals',
    makingChargePercent: 12.0,
    price: 149,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    ],
    tag: 'Best Seller',
    description: 'Elegantly articulated drop earrings crowned with a glittering diamond pavé disc and iridescent teardrop pearls that sway gracefully.',
    hallmarkCode: 'AU750-PRL-149',
    isHandcrafted: true
  },
  // 4. Elegance Gold Necklace (Matches screenshot Best Seller #4)
  {
    id: 'necklace-01',
    title: 'Elegance Layered Solitaire Gold Necklace',
    category: 'necklace',
    metal: '22K Gold',
    baseMetalType: 'gold_22k',
    purity: '91.6% BIS 916 Hallmark Fine Chain',
    grossWeight: 7.2,
    netWeight: 6.8,
    gemstoneWeight: 0.75,
    gemstoneType: 'Bezel-Set Radiant Cut Diamond Solitaire',
    makingChargePercent: 11.0,
    price: 179,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    tag: 'Best Seller',
    description: 'A minimalist layered cable chain featuring a floating bezel-set diamond droplet. The quintessential everyday luxury necklace.',
    hallmarkCode: 'BIS-916-NCK-179',
    isHandcrafted: true
  },
  // 5. Royal Kundan Bridal Choker
  {
    id: 'sav-001',
    title: 'Aura of Suryavansh Royal Kundan Choker',
    category: 'bridal',
    metal: '22K Gold',
    baseMetalType: 'gold_22k',
    purity: '91.6% BIS 916 Hallmark',
    grossWeight: 78.4,
    netWeight: 68.2,
    gemstoneWeight: 8.5,
    gemstoneType: 'Uncut Polki Diamonds & Natural Columbian Emerald Drops',
    makingChargePercent: 14.5,
    price: 6820,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80'
    ],
    tag: 'Bridal Signature',
    description: 'An ethereal ceremonial masterpiece inspired by regal dynasties. Hand-hammered 22K yellow gold adorned with open-claw uncut polki diamonds.',
    hallmarkCode: 'BIS-916-SAV-78401',
    isHandcrafted: true
  },
  // 6. Lunar Obsidian & 925 Sterling Filigree Collar
  {
    id: 'sav-003',
    title: 'Lunar Obsidian & 925 Sterling Filigree Collar',
    category: 'necklace',
    metal: '925 Sterling Silver',
    baseMetalType: 'silver_925',
    purity: '92.5% Sterling with Black Rhodium & 24K Gold Dust Accents',
    grossWeight: 46.8,
    netWeight: 44.0,
    gemstoneWeight: 12.0,
    gemstoneType: 'Natural Hand-Carved Volcanic Obsidian & Moonstone',
    makingChargePercent: 18.0,
    price: 1150,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80'
    ],
    tag: 'Artisan Silver',
    description: 'Dramatic contrast between deep obsidian stone and pure silver lacework. Brushed with authentic 24K pure gold micro-foil highlighting the curves.',
    hallmarkCode: 'STER-925-OBS-468',
    isHandcrafted: true
  }
];

export const featuredCategories = [
  {
    id: 'high_jewelry',
    title: 'High Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    count: '12 Masterpieces'
  },
  {
    id: 'ring',
    title: 'Solitaires & Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    count: '24 Designs'
  },
  {
    id: 'necklace',
    title: 'Necklaces & Collars',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
    count: '32 Designs'
  },
  {
    id: 'bangle',
    title: 'Bangles & Chains',
    image: 'https://images.unsplash.com/photo-1611591475817-d5d852233fec?auto=format&fit=crop&w=800&q=80',
    count: '15 Designs'
  }
];

export const initialPriceAlerts: PriceAlert[] = [
  {
    id: 'alert-1',
    metalId: 'gold_24k',
    metalName: '24K Pure Gold',
    condition: 'below',
    targetPrice: 85.00,
    email: 'client@savarthi.com',
    createdAt: 'Just now',
    active: true
  },
  {
    id: 'alert-2',
    metalId: 'silver_925',
    metalName: '925 Sterling Silver',
    condition: 'above',
    targetPrice: 1.15,
    email: 'investor@bullion.org',
    createdAt: '2 hrs ago',
    active: true
  }
];

export const currencyExchangeRates: Record<string, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: '$', rate: 1.0, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, name: 'British Pound' },
  INR: { symbol: '₹', rate: 84.50, name: 'Indian Rupee' },
  AED: { symbol: 'AED ', rate: 3.67, name: 'UAE Dirham' }
};

export const hallmarkStandards = [
  {
    symbol: '999',
    grade: '24K Pure Gold / 999 Silver',
    description: '99.9% purity. Zero synthetic alloys. Used for solid bullion bars, ceremonial idols, and sacred gold foil ornaments.'
  },
  {
    symbol: '916',
    grade: '22K Traditional Bridal Gold',
    description: '91.6% purity with 8.4% noble alloys. Highest balance of rich saffron gold warmth and structural integrity for fine jewelry.'
  },
  {
    symbol: '750',
    grade: '18K Haute Diamond Setting',
    description: '75.0% pure gold. The global high-jewelry benchmark for solitaire mountings, rose gold hues, and intricate prong work.'
  },
  {
    symbol: '925',
    grade: 'Sterling Silver Hallmark',
    description: '92.5% pure silver with 7.5% copper. Hypoallergenic, luminous, durable against daily wear with silver luster.'
  }
];
