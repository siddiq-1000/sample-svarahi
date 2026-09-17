import React, { useState, useEffect } from 'react';
import { BrandConfig, DisplayCurrency, JewelryItem, MetalRate, ThemeMode } from './types';
import { initialBrandConfig, currentMetalRates, sampleJewelryItems } from './data/jewelryData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { JewelryShowcase } from './components/JewelryShowcase';
import { MarketRateSection } from './components/MarketRateSection';
import { CompanyIntroduction } from './components/CompanyIntroduction';
import { CraftsmanshipVideo } from './components/CraftsmanshipVideo';
import { JewelryCalculator } from './components/JewelryCalculator';
import { HallmarkGuide } from './components/HallmarkGuide';
import { BoutiqueLocation } from './components/BoutiqueLocation';
import { SocialMediaHub } from './components/SocialMediaHub';
import { Footer } from './components/Footer';
import { JewelryDetailsModal } from './components/JewelryDetailsModal';
import { ConsultationModal } from './components/ConsultationModal';
import { LiveRatesOverlay } from './components/LiveRatesOverlay';
import { FloatingConciergeButton } from './components/FloatingConciergeButton';

export default function App() {
  const [brandConfig] = useState<BrandConfig>({
    ...initialBrandConfig,
    brandName: 'SAVARTHI'
  });
  const [rates, setRates] = useState<MetalRate[]>(currentMetalRates);
  const [selectedCurrency, setSelectedCurrency] = useState<DisplayCurrency>('INR');
  const [weightUnit, setWeightUnit] = useState<'gram' | 'tola' | 'oz'>('gram');
  const [activeSection, setActiveSection] = useState<string>('hero-section');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Theme state: 'light' | 'dark' | 'system'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('savarthi_theme_mode');
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeMode;
    }
    return 'system';
  });

  // Apply theme to document element
  useEffect(() => {
    localStorage.setItem('savarthi_theme_mode', themeMode);
    const root = document.documentElement;

    const applyTheme = () => {
      if (themeMode === 'dark') {
        root.classList.add('dark');
      } else if (themeMode === 'light') {
        root.classList.remove('dark');
      } else {
        // System preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme();

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeMode]);

  // Modals & Overlays state
  const [selectedItem, setSelectedItem] = useState<JewelryItem | null>(null);
  const [calculatorPrefill, setCalculatorPrefill] = useState<JewelryItem | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [liveRatesOverlayOpen, setLiveRatesOverlayOpen] = useState(false);

  // Live Refresh handler (simulates live spot fluctuation)
  const handleRefreshRates = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRates((prev) =>
        prev.map((rate) => {
          const deltaFactor = 1 + (Math.random() * 0.006 - 0.003);
          const newRate = Number((rate.ratePerGram * deltaFactor).toFixed(2));
          const changeDelta = Number((newRate - rate.ratePerGram).toFixed(2));
          return {
            ...rate,
            ratePerGram: newRate,
            changeAmount: changeDelta,
            high24h: Math.max(rate.high24h, newRate),
            low24h: Math.min(rate.low24h, newRate)
          };
        })
      );
      setIsRefreshing(false);
    }, 500);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCalculatorWithItem = (item: JewelryItem) => {
    setCalculatorPrefill(item);
    handleNavigate('calculator-section');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#101014] text-[#1C1917] dark:text-[#F4F4F5] font-sans selection:bg-[#B88B4A]/25 selection:text-[#1C1917] transition-colors duration-200">
      {/* 1. Header with clean navigation & right-aligned controls */}
      <Header
        brandName={brandConfig.brandName}
        currentRates={rates}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        weightUnit={weightUnit}
        onWeightUnitChange={setWeightUnit}
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenLiveRatesOverlay={() => setLiveRatesOverlayOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentTheme={themeMode}
        onThemeChange={setThemeMode}
        onSearchQuery={setSearchQuery}
      />

      {/* 2. Redesigned, clean Hero Section */}
      <Hero
        brandName={brandConfig.brandName}
        currentRates={rates}
        selectedCurrency={selectedCurrency}
        weightUnit={weightUnit}
        onExploreClick={() => handleNavigate('collections-section')}
        onRatesClick={() => handleNavigate('market-rates-section')}
        onOpenLiveRatesOverlay={() => setLiveRatesOverlayOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* 3. Featured Collections & Best Sellers with 2.5x Magnifying Glass Zoom */}
      <JewelryShowcase
        items={sampleJewelryItems}
        brandName={brandConfig.brandName}
        currentRates={rates}
        selectedCurrency={selectedCurrency}
        onSelectItem={setSelectedItem}
        onOpenCalculatorWithItem={handleOpenCalculatorWithItem}
        searchFilter={searchQuery}
        onClearSearchFilter={() => setSearchQuery('')}
      />

      {/* 4. Live Pricing Graph (Left) & Price Alert System (Right-hand side) */}
      <MarketRateSection
        brandName={brandConfig.brandName}
        currentRates={rates}
        selectedCurrency={selectedCurrency}
        weightUnit={weightUnit}
        onRefreshRates={handleRefreshRates}
        isRefreshing={isRefreshing}
      />

      {/* 5. Craftsmanship & Ethical Ethos Narrative */}
      <CompanyIntroduction
        brandName={brandConfig.brandName}
        onExploreAtelier={() => handleNavigate('craft-video-section')}
      />

      {/* 6. Live Spot Jewelry Calculator */}
      <JewelryCalculator
        currentRates={rates}
        selectedCurrency={selectedCurrency}
        brandConfig={brandConfig}
        prefillItem={calculatorPrefill}
        onClearPrefill={() => setCalculatorPrefill(null)}
      />

      {/* 7. Cinematic Atelier Craftsmanship Video Experience */}
      <CraftsmanshipVideo
        brandConfig={brandConfig}
      />

      {/* 8. Purity Verification & Hallmarking Standards */}
      <HallmarkGuide
        brandConfig={brandConfig}
      />

      {/* 9. Boutique & Atelier Locations (Mumbai Flagship, Bandra, Delhi) */}
      <BoutiqueLocation
        brandConfig={brandConfig}
        onBookAppointmentAtLocation={(locName) => {
          setConsultationOpen(true);
        }}
      />

      {/* 10. Social Media Integration & Curated Visual Feed */}
      <SocialMediaHub
        brandConfig={brandConfig}
      />

      {/* 11. Refined Footer with Flagship Location & Social Links */}
      <Footer
        brandConfig={brandConfig}
        onNavigate={handleNavigate}
      />

      {/* ========================================================================= */}
      {/* MODALS & OVERLAYS                                                         */}
      {/* ========================================================================= */}
      {/* Live Bullion Rates Overlay Modal */}
      <LiveRatesOverlay
        isOpen={liveRatesOverlayOpen}
        onClose={() => setLiveRatesOverlayOpen(false)}
        rates={rates}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        weightUnit={weightUnit}
        onWeightUnitChange={setWeightUnit}
        onRefresh={handleRefreshRates}
        isRefreshing={isRefreshing}
        onViewGraph={() => {
          setLiveRatesOverlayOpen(false);
          handleNavigate('market-rates-section');
        }}
      />

      {/* Item Details with Magnifying Glass Modal */}
      <JewelryDetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        currentRates={rates}
        selectedCurrency={selectedCurrency}
        brandConfig={brandConfig}
        onOpenCalculator={handleOpenCalculatorWithItem}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* VIP Viewing & Salon Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        brandConfig={brandConfig}
      />

      {/* Floating Concierge & Quick Menu Action Button (Matching Reference Design) */}
      <FloatingConciergeButton
        brandName={brandConfig.brandName}
        currentRates={rates}
        selectedCurrency={selectedCurrency}
        onOpenLiveRates={() => setLiveRatesOverlayOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
