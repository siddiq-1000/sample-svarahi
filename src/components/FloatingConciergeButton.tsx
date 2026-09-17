import React, { useState } from 'react';
import { SavarthiLogo } from './SavarthiLogo';
import { DisplayCurrency, MetalRate } from '../types';
import { currencyExchangeRates } from '../data/jewelryData';
import {
  X,
  Activity,
  Calendar,
  Sparkles,
  TrendingUp,
  Phone,
  ArrowRight,
  ShieldCheck,
  MapPin,
  MessageCircle
} from 'lucide-react';

interface FloatingConciergeButtonProps {
  brandName?: string;
  currentRates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  onOpenLiveRates: () => void;
  onOpenConsultation: () => void;
  onNavigate: (sectionId: string) => void;
}

export const FloatingConciergeButton: React.FC<FloatingConciergeButtonProps> = ({
  brandName = 'SAVARTHI',
  currentRates,
  selectedCurrency,
  onOpenLiveRates,
  onOpenConsultation,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currency = currencyExchangeRates[selectedCurrency];
  const gold24k = currentRates.find((r) => r.id === 'gold_24k') || currentRates[0];

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Concierge Popover Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-88 rounded-2xl bg-white/95 dark:bg-[#181822]/95 backdrop-blur-xl border border-[#D6CEBE] dark:border-[#383848] shadow-2xl p-5 mb-2 text-left animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header with Brand Logo */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC] dark:border-[#282834]">
            <SavarthiLogo brandName={brandName} size="sm" showSubtitle={true} />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close Concierge Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Bullion Rate Snapshot */}
          <div className="mt-3.5 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#20202C] border border-[#EAE5DC] dark:border-[#2E2E3C]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-[#1C1917] dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                24K Pure Gold Spot
              </span>
              <span className="font-bold text-[#B88B4A] dark:text-[#D4AF37]">
                {currency.symbol}{(gold24k.ratePerGram * currency.rate).toFixed(2)}/g
              </span>
            </div>
            <p className="text-[10px] text-[#78716C] dark:text-[#A1A1AA]">
              Assay certified spot valuation updated in real-time.
            </p>
          </div>

          {/* Concierge Action Links */}
          <div className="mt-3.5 space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenLiveRates();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#20202C] text-xs font-semibold text-[#1C1917] dark:text-white border border-transparent hover:border-[#EAE5DC] dark:hover:border-[#2E2E3C] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                Interactive Live Bullion Bar
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#78716C]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onNavigate('market-rates-section');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#20202C] text-xs font-semibold text-[#1C1917] dark:text-white border border-transparent hover:border-[#EAE5DC] dark:hover:border-[#2E2E3C] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                Bullion Pricing Graph & Alerts
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#78716C]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onNavigate('collections-section');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#20202C] text-xs font-semibold text-[#1C1917] dark:text-white border border-transparent hover:border-[#EAE5DC] dark:hover:border-[#2E2E3C] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                High Jewelry & Best Sellers
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#78716C]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onNavigate('boutique-location-section');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#20202C] text-xs font-semibold text-[#1C1917] dark:text-white border border-transparent hover:border-[#EAE5DC] dark:hover:border-[#2E2E3C] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                Atelier Locations (Mumbai, Delhi)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#78716C]" />
            </button>

            {/* Direct WhatsApp Concierge */}
            <a
              href="https://wa.me/919820088888?text=Hello%20Savarthi%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20high%20jewelry%20and%20live%20bullion%20rates."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                WhatsApp Live Concierge
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Online</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Private Salon Viewing</span>
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-[#EAE5DC] dark:border-[#282834] flex items-center justify-between text-[10px] text-[#78716C] dark:text-[#A1A1AA]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#B88B4A] dark:text-[#D4AF37]" />
              BIS 916 & GIA Inscribed
            </span>
            <span className="font-semibold text-[#1C1917] dark:text-white">
              Zaveri Bazaar • Bandra • Mayfair
            </span>
          </div>
        </div>
      )}

      {/* The Iconic Floating Round Button (Directly inspired by the circular button in user's reference photo) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-13 h-13 rounded-full bg-white dark:bg-[#181822] text-[#1C1917] dark:text-white border-2 border-[#D6CEBE] dark:border-[#383848] hover:border-[#B88B4A] dark:hover:border-[#D4AF37] shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-108 active:scale-95"
        title="Atelier Concierge & Navigation"
        aria-label="Atelier Concierge & Navigation"
        id="floating-concierge-btn"
      >
        {/* Animated pulse ring */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#B88B4A] to-[#D4AF37] opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xs"></span>

        {isOpen ? (
          <X className="w-5 h-5 text-[#B88B4A] dark:text-[#D4AF37]" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            {/* Custom 3-line hamburger as shown in reference button, crowned with a tiny gold facet */}
            <span className="w-4 h-0.5 bg-[#1C1917] dark:bg-white rounded-full"></span>
            <span className="w-4 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] rounded-full"></span>
            <span className="w-4 h-0.5 bg-[#1C1917] dark:bg-white rounded-full"></span>
          </div>
        )}
      </button>
    </div>
  );
};
