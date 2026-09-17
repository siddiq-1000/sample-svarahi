import React, { useState } from 'react';
import { BrandConfig, DisplayCurrency, MetalRate } from '../types';
import { currencyExchangeRates } from '../data/jewelryData';
import { SavarthiLogo } from './SavarthiLogo';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Eye,
  Check,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  brandName?: string;
  currentRates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  weightUnit: 'gram' | 'tola' | 'oz';
  onExploreClick: () => void;
  onRatesClick: () => void;
  onOpenLiveRatesOverlay: () => void;
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  brandName = 'SAVARTHI',
  currentRates,
  selectedCurrency,
  weightUnit,
  onExploreClick,
  onRatesClick,
  onOpenLiveRatesOverlay,
  onOpenConsultation
}) => {
  const [activeHotspot, setActiveHotspot] = useState<'necklace' | 'earrings' | null>(null);
  const currency = currencyExchangeRates[selectedCurrency];

  const getMult = () => {
    if (weightUnit === 'tola') return 11.664;
    if (weightUnit === 'oz') return 31.1035;
    return 1;
  };

  const formatPrice = (usdPerGram: number) => {
    const val = usdPerGram * currency.rate * getMult();
    return `${currency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const gold24k = currentRates.find((r) => r.id === 'gold_24k') || currentRates[0];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FAF8F5] dark:bg-[#101014] border-b border-[#EAE5DC] dark:border-[#2E2E38] transition-colors duration-200">
      {/* Top Value Assurance Ribbon */}
      <div className="bg-[#F4F0E8] dark:bg-[#16161D] border-b border-[#E7E2D9] dark:border-[#282834] py-2 px-4 text-center text-xs font-medium text-[#78716C] dark:text-[#A1A1AA] flex items-center justify-center gap-3">
        <span>Free Insured Worldwide Delivery</span>
        <span className="text-[#D6CEBE] dark:text-[#3E3E4C]">•</span>
        <span>Assay Office & GIA Certified Masterpieces</span>
        <span className="text-[#D6CEBE] dark:text-[#3E3E4C]">•</span>
        <span className="text-[#B88B4A] dark:text-[#D4AF37] font-semibold">Real-Time Bullion Value Transparency</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Editorial Hero Layout matching Reference Image aesthetic */}
        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#18181D] border border-[#EAE5DC] dark:border-[#2E2E38] shadow-sm grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
          
          {/* Left / Center Column: High-Jewelry Editorial Model Image (Inspired directly by user reference) */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-auto overflow-hidden bg-[#F5F2EB] dark:bg-[#1E1E26] group">
            {/* Primary Editorial Image: Sophisticated model wearing layered diamond cascade necklace and chandelier drop earrings in evening attire */}
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85"
              alt="Savarthi High Jewelry Cascade Diamond Rivière"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 lg:hidden"></div>

            {/* Authentic Brand Crest Seal Placed on Hero Image Corner (Meeting 'Logos should be wherever you can put it on' requirement) */}
            <div className="absolute top-4 left-4 z-10">
              <SavarthiLogo
                brandName={brandName}
                variant="seal"
                className="shadow-md bg-white/95 dark:bg-[#121218]/95"
              />
            </div>

            {/* Live Spot Pill on Hero Banner */}
            <button
              type="button"
              onClick={onOpenLiveRatesOverlay}
              className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-[#181820]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D6CEBE] dark:border-[#3E3E4C] shadow-sm flex items-center gap-2 text-left cursor-pointer hover:border-[#B88B4A] dark:hover:border-[#D4AF37] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-semibold text-[#1C1917] dark:text-white">
                24K Pure Spot: {formatPrice(gold24k?.ratePerGram || 86.45)}/{weightUnit}
              </span>
              <span className="text-[10px] text-[#B88B4A] dark:text-[#D4AF37] font-bold underline ml-1">
                View Live Bar
              </span>
            </button>

            {/* Interactive Jewelry Hotspot 1: Diamond Rivière Necklace */}
            <div className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === 'necklace' ? null : 'necklace')}
                className="relative group/hotspot focus:outline-none cursor-pointer"
                title="Explore Rivière Necklace"
              >
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#B88B4A] opacity-75"></span>
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-black border-2 border-[#B88B4A] dark:border-[#D4AF37] shadow-md text-[#B88B4A] text-[10px] font-bold">
                  ✦
                </span>
              </button>

              {/* Popover Card */}
              {activeHotspot === 'necklace' && (
                <div className="absolute left-8 top-0 w-64 p-3.5 rounded-xl bg-white/95 dark:bg-[#1A1A22]/95 backdrop-blur-md border border-[#D6CEBE] dark:border-[#383844] shadow-xl text-left animate-in fade-in zoom-in-95 duration-150 z-30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#B88B4A] dark:text-[#D4AF37]">
                      Haute Joaillerie
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-[#78716C] hover:text-[#1C1917] dark:hover:text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[#1C1917] dark:text-white mb-1">
                    Cascading Diamond Rivière
                  </h4>
                  <p className="text-[10px] text-[#78716C] dark:text-[#A1A1AA] leading-snug mb-2">
                    38.50 carats D-F color VVS1 triple-row graduated diamonds set in Platinum 950.
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-[#EAE5DC] dark:border-[#282834]">
                    <span className="text-[11px] font-bold text-[#1C1917] dark:text-white">
                      {currency.symbol}{(18500 * currency.rate).toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={onExploreClick}
                      className="text-[10px] font-semibold text-[#B88B4A] dark:text-[#D4AF37] hover:underline"
                    >
                      View Piece →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Jewelry Hotspot 2: Chandelier Drop Earrings */}
            <div className="absolute top-[32%] left-[34%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === 'earrings' ? null : 'earrings')}
                className="relative group/hotspot focus:outline-none cursor-pointer"
                title="Explore Drop Earrings"
              >
                <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#B88B4A] opacity-75"></span>
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-black border-2 border-[#B88B4A] dark:border-[#D4AF37] shadow-md text-[#B88B4A] text-[9px] font-bold">
                  ✦
                </span>
              </button>

              {activeHotspot === 'earrings' && (
                <div className="absolute left-6 top-0 w-60 p-3 rounded-xl bg-white/95 dark:bg-[#1A1A22]/95 backdrop-blur-md border border-[#D6CEBE] dark:border-[#383844] shadow-xl text-left animate-in fade-in zoom-in-95 duration-150 z-30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#B88B4A] dark:text-[#D4AF37]">
                      Matching Suite
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-[#78716C] hover:text-[#1C1917] dark:hover:text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[#1C1917] dark:text-white mb-1">
                    Geometric Chandelier Drops
                  </h4>
                  <p className="text-[10px] text-[#78716C] dark:text-[#A1A1AA] leading-snug mb-2">
                    8.20 carats marquise and brilliant-cut diamond chandelier drops with articulated movement.
                  </p>
                  <button
                    type="button"
                    onClick={onExploreClick}
                    className="text-[10px] font-semibold text-[#B88B4A] dark:text-[#D4AF37] hover:underline"
                  >
                    Explore Suite →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Editorial Typography & Haute Joaillerie Call-to-Actions */}
          <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-center text-left bg-white dark:bg-[#18181D]">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B88B4A] dark:text-[#D4AF37] font-bold mb-3">
              <SavarthiLogo brandName={brandName} variant="emblem" size="sm" />
              <span>{brandName} Haute Joaillerie</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-white tracking-tight leading-[1.14] mb-4">
              Radiate Elegance With Masterpiece Craft
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA] leading-relaxed mb-8">
              Bespoke fine ornaments sculpted in certified 24K bullion gold, 22K royal saffron gold, platinum 950, and 925 sterling silver — linked dynamically to international market spot rates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-6 py-3 rounded-lg bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>Shop Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onRatesClick}
                className="px-5 py-3 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#1C1917] dark:text-white border border-[#D6CEBE] dark:border-[#383848] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
                <span>Pricing Graph</span>
              </button>

              {onOpenConsultation && (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-4 py-3 rounded-lg text-xs font-semibold text-[#8C6428] dark:text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Private Viewing</span>
                </button>
              )}
            </div>

            {/* Hallmarking & Certification Assurance Badges */}
            <div className="pt-6 border-t border-[#F0ECE1] dark:border-[#282834] grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37] flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-[#1C1917] dark:text-white">Assay & GIA Certified</div>
                  <div className="text-[10px] text-[#A8A29E] dark:text-[#71717A]">100% Inscribed Purity</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border border-[#B88B4A] dark:border-[#D4AF37] flex items-center justify-center text-[9px] font-serif font-bold text-[#B88B4A] dark:text-[#D4AF37]">
                  ⚖
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-[#1C1917] dark:text-white">Fair Value Pricing</div>
                  <div className="text-[10px] text-[#A8A29E] dark:text-[#71717A]">Real-Time Metal Pegged</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

