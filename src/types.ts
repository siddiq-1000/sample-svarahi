export type MetalType = 'gold_24k' | 'gold_22k' | 'gold_18k' | 'silver_999' | 'silver_925' | 'platinum_950';

export interface MetalRate {
  id: MetalType;
  name: string;
  category: 'gold' | 'silver' | 'platinum';
  purity: string;
  ratePerGram: number; // in USD
  change24h: number; // percentage
  changeAmount: number;
  high24h: number;
  low24h: number;
  unit: string;
  description: string;
}

export interface HistoricalPricePoint {
  date: string;
  gold: number;
  silver: number;
  platinum: number;
  volume: number;
}

export interface JewelryItem {
  id: string;
  title: string;
  category: 'necklace' | 'ring' | 'bangle' | 'earring' | 'bridal' | 'polki' | 'high_jewelry';
  metal: '24K Gold' | '22K Gold' | '18K Rose Gold' | '925 Sterling Silver' | 'Platinum & Gold Dual' | '18K White Gold' | 'Platinum 950 & 18K White Gold';
  baseMetalType: MetalType;
  purity: string;
  grossWeight: number; // grams
  netWeight: number; // grams of pure metal
  gemstoneWeight?: number; // carats
  gemstoneType?: string;
  makingChargePercent: number;
  price: number;
  image: string;
  alternateImages: string[];
  tag: 'Bespoke Heirloom' | 'Best Seller' | 'Bridal Signature' | 'Artisan Silver' | 'Limited Edition' | 'Haute Joaillerie';
  description: string;
  hallmarkCode: string;
  isHandcrafted: boolean;
}

export interface BoutiqueLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  state: string;
  pincode: string;
  country: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  hours: string;
  isFlagship: boolean;
  googleMapsUrl: string;
  image: string;
  amenities: string[];
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  establishedYear: number;
  location: string;
  curatorNote: string;
  flagshipAddress: string;
  primaryPhone: string;
  whatsappNumber: string;
  contactEmail: string;
  socials: {
    instagram: string;
    whatsapp: string;
    pinterest: string;
    youtube: string;
    facebook: string;
  };
  boutiques: BoutiqueLocation[];
}

export type TimeframePeriod = '24H' | '7D' | '1M' | '6M' | '1Y';
export type DisplayCurrency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface PriceAlert {
  id: string;
  metalId: MetalType;
  metalName: string;
  condition: 'below' | 'above';
  targetPrice: number;
  email: string;
  createdAt: string;
  active: boolean;
}
