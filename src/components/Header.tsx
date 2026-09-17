import React, { useState } from 'react';
import { SavarthiLogo } from './SavarthiLogo';
import { ThemeToggle } from './ThemeToggle';
import { DisplayCurrency, MetalRate, ThemeMode } from '../types';
import {
  Calendar,
  Menu,
  X,
  Bell,
  Activity,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  brandName?: string;
  currentRates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  onCurrencyChange: (currency: DisplayCurrency) => void;
  weightUnit: 'gram' | 'tola' | 'oz';
  onWeightUnitChange: (unit: 'gram' | 'tola' | 'oz') => void;
  onOpenConsultation: () => void;
  onOpenLiveRatesOverlay: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onSearchQuery?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  brandName = 'SAVARTHI',
  currentRates,
  selectedCurrency,
  onCurrencyChange,
  weightUnit,
  onWeightUnitChange,
  onOpenConsultation,
  onOpenLiveRatesOverlay,
  activeSection,
  onNavigate,
  currentTheme,
  onThemeChange,
  onSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  // Primary navigation matching the reference landing page style:
  // "ALL JEWELRY", "HIGH JEWELRY", "FINE JEWELRY", "VINTAGE JEWELRY", "BY DESIGNERS", "ART OF LIVING" + Market Rates & Estimator
  const navLinks = [
    { id: 'collections-section', label: 'ALL JEWELRY' },
    { id: 'collections-section', label: 'HIGH JEWELRY', filter: 'high_jewelry' },
    { id: 'bestsellers-section', label: 'FINE JEWELRY' },
    { id: 'collections-section', label: 'VINTAGE & BRIDAL', filter: 'bridal' },
    { id: 'market-rates-section', label: 'MARKET RATES' },
    { id: 'calculator-section', label: 'PRICE ESTIMATOR' },
    { id: 'intro-section', label: 'ART OF LIVING' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchQuery && searchInputValue.trim()) {
      onSearchQuery(searchInputValue.trim());
    }
    setSearchOpen(false);
    onNavigate('collections-section');
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchInputValue(keyword);
    if (onSearchQuery) {
      onSearchQuery(keyword);
    }
    setSearchOpen(false);
    onNavigate('collections-section');
  };

  const gold24k = currentRates.find((r) => r.id === 'gold_24k') || currentRates[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#101014]/95 backdrop-blur-md border-b border-[#EAE5DC] dark:border-[#2E2E38] transition-colors duration-200">
      {/* 1. Top Utility Strip: Rates Ticker Pill & Personalization Controls */}
      <div className="bg-[#FAF8F5] dark:bg-[#14141A] border-b border-[#EAE5DC] dark:border-[#282834] py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Spot Ticker Trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenLiveRatesOverlay}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#44403C] dark:text-[#CBD5E1] hover:text-[#B88B4A] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-[#1C1917] dark:text-white">Live Vault Spot:</span>
              <span>24K Gold ${gold24k?.ratePerGram || 86.45}/g</span>
              <span className="text-[#8C6428] dark:text-[#D4AF37] font-semibold underline ml-0.5">
                (Click for Bullion Bar)
              </span>
            </button>
          </div>

          {/* Right: Currency, Weight, Theme, and Consultation */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[#78716C] dark:text-[#A1A1AA] hidden sm:inline">Currency:</span>
              <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as DisplayCurrency)}
                className="bg-transparent border border-[#E0DACF] dark:border-[#383844] rounded px-1.5 py-0.5 text-[11px] font-semibold text-[#1C1917] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>

            {/* Weight Unit */}
            <div className="hidden sm:flex items-center gap-1 text-[11px]">
              <span className="text-[#78716C] dark:text-[#A1A1AA]">Unit:</span>
              <select
                value={weightUnit}
                onChange={(e) => onWeightUnitChange(e.target.value as 'gram' | 'tola' | 'oz')}
                className="bg-transparent border border-[#E0DACF] dark:border-[#383844] rounded px-1.5 py-0.5 text-[11px] font-semibold text-[#1C1917] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="gram">Grams (g)</option>
                <option value="tola">Tola</option>
                <option value="oz">Troy Oz</option>
              </select>
            </div>

            {/* Dark / Light / Default Theme Toggle */}
            <ThemeToggle currentTheme={currentTheme} onThemeChange={onThemeChange} />

            {/* Book Viewing Button */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Viewing</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Centered Brand Masthead (Matching Reference Landing Page) */}
      <div className="py-4 px-4 border-b border-[#F0ECE4] dark:border-[#22222C]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile hamburger on left for smaller screens */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#1E1E24] border border-[#EAE5DC] dark:border-[#2E2E38] text-[#1C1917] dark:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Centered Grand Masthead */}
          <div className="flex-1 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('hero-section')}
              className="text-center cursor-pointer focus:outline-none group"
            >
              <SavarthiLogo
                brandName={brandName}
                variant="masthead"
                eyebrow="RADIATE ELEGANCE WITH"
                size="lg"
                showSubtitle={true}
              />
            </button>
          </div>

          {/* Right Action on Mobile & Quick Search */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-[#FAF8F5] dark:hover:bg-[#202028] text-[#1C1917] dark:text-white transition-colors cursor-pointer"
              title="Search Jewelry & Precious Metals"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4 text-[#8C6428] dark:text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Luxury Horizontal Navigation Menu (Directly Below Masthead, as in Reference Image) */}
      <nav className="hidden md:block bg-white dark:bg-[#101014] py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-7 lg:gap-10 text-xs tracking-[0.14em] font-medium text-[#44403C] dark:text-[#CBD5E1]">
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={`${link.id}-${idx}`}
                type="button"
                onClick={() => onNavigate(link.id)}
                className={`transition-colors duration-200 cursor-pointer relative py-1 hover:text-[#B88B4A] dark:hover:text-[#D4AF37] ${
                  isActive
                    ? 'text-[#B88B4A] dark:text-[#D4AF37] font-bold'
                    : 'text-[#57534E] dark:text-[#A1A1AA]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B88B4A] dark:bg-[#D4AF37] rounded-full"></span>
                )}
              </button>
            );
          })}

          {/* Search Magnifier Button in the Navigation Row (as in reference image) */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1 hover:text-[#B88B4A] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            title="Search Collection"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* 4. Interactive Search Dropdown / Drawer */}
      {searchOpen && (
        <div className="bg-[#FAF8F5] dark:bg-[#181820] border-b border-[#EAE5DC] dark:border-[#2E2E38] px-4 py-4 animate-in slide-in-from-top duration-200 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-[#8C6428] dark:text-[#D4AF37]" />
              <input
                type="text"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Search high jewelry, diamond suites, 22K gold bridal, platinum..."
                className="w-full pl-10 pr-24 py-2.5 bg-white dark:bg-[#20202A] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-xl text-xs text-[#1C1917] dark:text-white focus:outline-none shadow-2xs"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 px-3 py-1.5 bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-[11px] rounded-lg cursor-pointer"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="text-[11px] text-[#78716C] dark:text-[#A1A1AA] uppercase font-semibold">
                Popular:
              </span>
              {['Diamond Rivière', '22K Gold Bangles', 'South Sea Pearl', 'Solitaires', 'Royal Kundan', 'Platinum 950'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleQuickSearch(term)}
                    className="px-2.5 py-1 rounded-full bg-white dark:bg-[#22222C] hover:bg-[#F2ECE1] dark:hover:bg-[#2C2C38] border border-[#EAE5DC] dark:border-[#383844] text-[11px] text-[#57534E] dark:text-[#D4D4D8] cursor-pointer transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#18181D] border-b border-[#EAE5DC] dark:border-[#2E2E38] px-4 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 mb-4">
            {navLinks.map((link, idx) => (
              <button
                key={`mob-${link.id}-${idx}`}
                type="button"
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs font-semibold tracking-wider uppercase py-2 px-3 rounded-lg ${
                  activeSection === link.id
                    ? 'bg-[#FAF8F5] dark:bg-[#22222A] text-[#B88B4A] dark:text-[#D4AF37] font-bold border border-[#EAE5DC] dark:border-[#2E2E38]'
                    : 'text-[#44403C] dark:text-[#CBD5E1] hover:bg-[#FAF8F5] dark:hover:bg-[#22222A]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE5DC] dark:border-[#2E2E38] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenLiveRatesOverlay();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#FAF8F5] dark:bg-[#22222A] text-[#1C1917] dark:text-white text-xs font-semibold border border-[#EAE5DC] dark:border-[#2E2E38]"
            >
              <Activity className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
              View Live Bullion Spot Overlay
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#B88B4A] dark:bg-[#D4AF37] text-white dark:text-black font-bold text-xs uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              Book Private Viewing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

