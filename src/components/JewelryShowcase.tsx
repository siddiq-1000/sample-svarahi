import React, { useState } from 'react';
import { JewelryItem, DisplayCurrency, MetalRate } from '../types';
import { currencyExchangeRates, featuredCategories } from '../data/jewelryData';
import { ImageMagnifier } from './ImageMagnifier';
import { SavarthiLogo } from './SavarthiLogo';
import {
  Star,
  ShoppingBag,
  ArrowRight,
  Eye,
  Check,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface JewelryShowcaseProps {
  items: JewelryItem[];
  brandName?: string;
  currentRates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  onSelectItem: (item: JewelryItem) => void;
  onOpenCalculatorWithItem: (item: JewelryItem) => void;
  searchFilter?: string;
  onClearSearchFilter?: () => void;
}

export const JewelryShowcase: React.FC<JewelryShowcaseProps> = ({
  items,
  brandName = 'SAVARTHI',
  currentRates,
  selectedCurrency,
  onSelectItem,
  onOpenCalculatorWithItem,
  searchFilter = '',
  onClearSearchFilter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const currency = currencyExchangeRates[selectedCurrency];

  const handleAddToCart = (item: JewelryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    if (!searchFilter.trim()) return matchesCategory;
    const q = searchFilter.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.metal.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.gemstoneType && item.gemstoneType.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="collections-section" className="py-14 sm:py-18 bg-[#FAF8F5] dark:bg-[#101014] border-b border-[#EAE5DC] dark:border-[#2E2E38] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Active Search Filter Banner */}
        {searchFilter && (
          <div className="mb-8 p-4 rounded-xl bg-white dark:bg-[#181820] border border-[#B88B4A] dark:border-[#D4AF37] flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 text-xs text-[#1C1917] dark:text-white">
              <Sparkles className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
              <span>Showing search results for: <strong className="font-bold font-serif text-sm">"{searchFilter}"</strong> ({filteredItems.length} pieces found)</span>
            </div>
            {onClearSearchFilter && (
              <button
                type="button"
                onClick={onClearSearchFilter}
                className="text-xs font-semibold text-[#8C6428] dark:text-[#D4AF37] hover:underline cursor-pointer"
              >
                Clear Search ✕
              </button>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 1. FEATURED COLLECTIONS                                                   */}
        {/* ========================================================================= */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B88B4A] dark:text-[#D4AF37] font-bold mb-1">
              <SavarthiLogo brandName={brandName} variant="emblem" size="sm" />
              <span>{brandName} Haute Salons</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-white tracking-tight">
              Featured Collections
            </h2>
            <div className="w-12 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? 'all' : cat.id)}
                className={`group relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer shadow-xs border transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'border-[#B88B4A] dark:border-[#D4AF37] ring-2 ring-[#B88B4A] dark:ring-[#D4AF37]'
                    : 'border-[#EAE5DC] dark:border-[#282834] hover:border-[#B88B4A] dark:hover:border-[#D4AF37]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

                {/* Stamped Brand Monogram Emblem in Category Card */}
                <div className="absolute top-3 right-3 opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full border border-white/60 bg-black/40 backdrop-blur-xs flex items-center justify-center text-[9px] font-serif font-bold text-[#F3E5AB]">
                    {brandName.charAt(0)}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="font-serif text-base sm:text-xl font-bold text-white mb-0.5">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] text-white/70 block mb-1.5">{cat.count}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#F5F2EB] group-hover:text-[#F3E5AB] font-medium tracking-wide">
                    <span>Explore Suite</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BEST SELLERS SECTION WITH 2.5x MAGNIFYING GLASS ZOOM                   */}
        {/* ========================================================================= */}
        <div id="bestsellers-section" className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B88B4A] dark:text-[#D4AF37] font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Masterpieces</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-white tracking-tight">
                Best Sellers & High Jewelry
              </h2>
              <div className="w-12 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] mt-2 mb-2"></div>
              <p className="text-xs text-[#78716C] dark:text-[#A1A1AA]">
                Hover over jewelry images to inspect gem facets with the <span className="font-semibold text-[#B88B4A] dark:text-[#D4AF37]">Magnifying Glass Zoom</span>
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#1C1917] dark:bg-white text-white dark:text-black font-bold'
                    : 'bg-white dark:bg-[#18181D] text-[#78716C] dark:text-[#A1A1AA] border border-[#E7E2D9] dark:border-[#2E2E38] hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                All Pieces
              </button>
              {[
                { id: 'high_jewelry', label: 'High Jewelry' },
                { id: 'ring', label: 'Rings' },
                { id: 'necklace', label: 'Necklaces' },
                { id: 'bangle', label: 'Bracelets' },
                { id: 'earring', label: 'Earrings' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1C1917] dark:bg-white text-white dark:text-black font-bold'
                      : 'bg-white dark:bg-[#18181D] text-[#78716C] dark:text-[#A1A1AA] border border-[#E7E2D9] dark:border-[#2E2E38] hover:text-[#1C1917] dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => {
              const hasSale = idx % 2 === 0;
              const originalPrice = Math.round(item.price * 1.35);
              const isAdded = addedItemIds[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#18181D] rounded-xl border border-[#EAE5DC] dark:border-[#2E2E38] hover:border-[#D6CEBE] dark:hover:border-[#3E3E4C] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Image with Interactive Magnifying Glass Lens */}
                  <div className="relative aspect-square overflow-hidden bg-[#FAF8F5] dark:bg-[#121216]">
                    <ImageMagnifier
                      src={item.image}
                      alt={item.title}
                      zoomLevel={2.5}
                      lensSize={140}
                      onOpenFullscreen={() => onSelectItem(item)}
                      className="w-full h-full"
                    />

                    {/* Authentic Brand Hallmark Badge (Logo placement on card) */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        <span className="font-serif font-bold text-[#F3E5AB]">{brandName.toUpperCase()}</span>
                        <span className="text-[8px] text-white/70">ASSAY</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectItem(item)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-[#18181D]/90 text-[#44403C] dark:text-white hover:text-[#B88B4A] dark:hover:text-[#D4AF37] border border-[#EAE5DC] dark:border-[#2E2E38] shadow-xs transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                      title="Inspect Specs & Valuation"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8C6428] dark:text-[#D4AF37] font-semibold mb-1">
                        {item.metal}
                      </div>

                      <h3
                        onClick={() => onSelectItem(item)}
                        className="font-serif text-base font-bold text-[#1C1917] dark:text-white hover:text-[#B88B4A] dark:hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-1 mb-1.5"
                      >
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-center gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-[#B88B4A] dark:fill-[#D4AF37] text-[#B88B4A] dark:text-[#D4AF37]" />
                        ))}
                        <span className="text-[10px] text-[#A8A29E] dark:text-[#71717A] ml-1 font-medium">(5.0)</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        {hasSale && (
                          <span className="text-xs text-[#A8A29E] dark:text-[#71717A] line-through font-medium">
                            {currency.symbol}{Math.round(originalPrice * currency.rate).toLocaleString()}
                          </span>
                        )}
                        <span className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F3E5AB]">
                          {currency.symbol}{Math.round(item.price * currency.rate).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        className={`w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 shadow-xs cursor-pointer flex items-center justify-center gap-1.5 ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

