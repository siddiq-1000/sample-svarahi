import React, { useState } from 'react';
import { JewelryItem, DisplayCurrency, MetalRate, BrandConfig } from '../types';
import { currencyExchangeRates } from '../data/jewelryData';
import { ImageMagnifier } from './ImageMagnifier';
import {
  X,
  ShieldCheck,
  Gem,
  Scale,
  Share2,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';

interface JewelryDetailsModalProps {
  item: JewelryItem | null;
  onClose: () => void;
  currentRates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  brandConfig: BrandConfig;
  onOpenCalculator: (item: JewelryItem) => void;
  onOpenConsultation: () => void;
}

export const JewelryDetailsModal: React.FC<JewelryDetailsModalProps> = ({
  item,
  onClose,
  currentRates,
  selectedCurrency,
  brandConfig,
  onOpenCalculator,
  onOpenConsultation
}) => {
  if (!item) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  const currency = currencyExchangeRates[selectedCurrency];
  const allImages = [item.image, ...(item.alternateImages || [])];

  const rateObj = currentRates.find((r) => r.id === item.baseMetalType) || currentRates[0];
  const metalValUsd = item.netWeight * rateObj.ratePerGram;
  const makingFeeUsd = metalValUsd * (item.makingChargePercent / 100);
  const gemValUsd = (item.gemstoneWeight || 0) * 450;
  const totalValUsd = metalValUsd + makingFeeUsd + gemValUsd;

  const formatCurrency = (amountUsd: number) => {
    const val = amountUsd * currency.rate;
    return `${currency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white dark:bg-[#18181D] border border-[#D6CEBE] dark:border-[#383848] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#1C1917] dark:text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-[#202028]/90 border border-[#E7E2D9] dark:border-[#383844] text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer shadow-xs"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left: Image Gallery with Magnifier */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF8F5] dark:bg-[#121216] border border-[#EAE5DC] dark:border-[#2E2E38]">
              <ImageMagnifier
                src={allImages[activeImageIndex]}
                alt={item.title}
                zoomLevel={2.5}
                lensSize={160}
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 pointer-events-none z-10">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-[#1E1E26]/90 border border-[#D6CEBE] dark:border-[#3E3E4C] text-[#B88B4A] dark:text-[#D4AF37] shadow-xs">
                  {item.tag}
                </span>
              </div>
            </div>

            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#B88B4A] dark:border-[#D4AF37] shadow-xs'
                        : 'border-[#EAE5DC] dark:border-[#2E2E38] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                <span className="text-[#44403C] dark:text-[#CBD5E1] font-medium">Laser Hallmark ID:</span>
              </div>
              <span className="font-mono text-[#1C1917] dark:text-white bg-white dark:bg-[#18181D] px-2 py-0.5 rounded border border-[#D6CEBE] dark:border-[#383844]">
                {item.hallmarkCode}
              </span>
            </div>
          </div>

          {/* Right: Technical Specs & Valuation */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#B88B4A] dark:text-[#D4AF37] uppercase tracking-wider">
                  {item.metal}
                </span>
                <span className="text-xs text-[#78716C] dark:text-[#A1A1AA] capitalize font-medium">
                  {item.category} Collection
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-white mb-2 leading-tight">
                {item.title}
              </h2>

              <p className="font-sans text-xs text-[#78716C] dark:text-[#A1A1AA] leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Physical Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-[#FAF8F5] dark:bg-[#202028] p-2.5 rounded-lg border border-[#EAE5DC] dark:border-[#2E2E38]">
                  <span className="text-[10px] uppercase font-semibold text-[#A8A29E] dark:text-[#71717A] block">
                    Gross Weight
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1917] dark:text-white">
                    {item.grossWeight} grams
                  </span>
                </div>

                <div className="bg-[#FAF8F5] dark:bg-[#202028] p-2.5 rounded-lg border border-[#EAE5DC] dark:border-[#2E2E38]">
                  <span className="text-[10px] uppercase font-semibold text-[#A8A29E] dark:text-[#71717A] block">
                    Net Metal Weight
                  </span>
                  <span className="font-serif text-base font-bold text-[#B88B4A] dark:text-[#D4AF37]">
                    {item.netWeight} grams
                  </span>
                </div>

                <div className="bg-[#FAF8F5] dark:bg-[#202028] p-2.5 rounded-lg border border-[#EAE5DC] dark:border-[#2E2E38]">
                  <span className="text-[10px] uppercase font-semibold text-[#A8A29E] dark:text-[#71717A] block">
                    Precious Purity
                  </span>
                  <span className="text-xs font-semibold text-[#1C1917] dark:text-white truncate block">
                    {item.purity}
                  </span>
                </div>

                <div className="bg-[#FAF8F5] dark:bg-[#202028] p-2.5 rounded-lg border border-[#EAE5DC] dark:border-[#2E2E38]">
                  <span className="text-[10px] uppercase font-semibold text-[#A8A29E] dark:text-[#71717A] block">
                    Making Fee Rate
                  </span>
                  <span className="text-xs font-semibold text-[#1C1917] dark:text-white">
                    {item.makingChargePercent}% on bullion value
                  </span>
                </div>
              </div>

              {item.gemstoneType && (
                <div className="mb-4 p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38] text-xs">
                  <div className="flex items-center gap-1.5 text-[#B88B4A] dark:text-[#D4AF37] font-semibold mb-0.5">
                    <Gem className="w-3.5 h-3.5" />
                    <span>Gemstone & Setting Grade</span>
                  </div>
                  <p className="text-[#44403C] dark:text-[#D4D4D8] text-[11px]">
                    {item.gemstoneType} ({item.gemstoneWeight || 0} Carats)
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-[#F5F2EB] dark:bg-[#202028] p-4 rounded-xl border border-[#E7E2D9] dark:border-[#2E2E38] mb-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8C6428] dark:text-[#D4AF37] mb-2">
                  <span>Live Spot Cost Breakdown</span>
                  <span>{currency.name}</span>
                </div>

                <div className="space-y-1.5 text-xs text-[#78716C] dark:text-[#A1A1AA] pb-3 border-b border-[#E2DDD3] dark:border-[#2E2E38]">
                  <div className="flex justify-between">
                    <span>Pure Metal ({item.netWeight}g @ {formatCurrency(rateObj.ratePerGram)}/g):</span>
                    <span className="text-[#1C1917] dark:text-white font-semibold">{formatCurrency(metalValUsd)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Artisan Making ({item.makingChargePercent}%):</span>
                    <span className="text-[#1C1917] dark:text-white font-semibold">{formatCurrency(makingFeeUsd)}</span>
                  </div>
                  {item.gemstoneWeight && (
                    <div className="flex justify-between">
                      <span>Certified Gemstones ({item.gemstoneWeight}ct):</span>
                      <span className="text-[#1C1917] dark:text-white font-semibold">{formatCurrency(gemValUsd)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-[#78716C] dark:text-[#A1A1AA] uppercase block">
                      Estimated Valuation
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F3E5AB]">
                      {formatCurrency(totalValUsd)}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#B88B4A] dark:text-[#D4AF37] bg-white dark:bg-[#18181D] px-2 py-0.5 rounded border border-[#D6CEBE] dark:border-[#383844] font-semibold">
                    Live Linked
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className={`w-full sm:flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all ${
                  added ? 'bg-emerald-700 text-white' : 'bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Bag' : 'Add to Bag'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCalculator(item);
                }}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-lg bg-white dark:bg-[#202028] hover:bg-[#FAF8F5] text-[#1C1917] dark:text-white border border-[#D6CEBE] dark:border-[#383844] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Scale className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                <span>Price Estimator</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2.5 rounded-lg bg-white dark:bg-[#202028] text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white border border-[#E7E2D9] dark:border-[#383844] transition-colors"
                title="Share piece"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
