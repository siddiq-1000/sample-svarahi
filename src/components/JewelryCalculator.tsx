import React, { useState, useEffect } from 'react';
import { MetalRate, DisplayCurrency, MetalType, BrandConfig, JewelryItem } from '../types';
import { currencyExchangeRates } from '../data/jewelryData';
import {
  Calculator,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

interface JewelryCalculatorProps {
  currentRates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  brandConfig: BrandConfig;
  prefillItem?: JewelryItem | null;
  onClearPrefill?: () => void;
}

export const JewelryCalculator: React.FC<JewelryCalculatorProps> = ({
  currentRates,
  selectedCurrency,
  brandConfig,
  prefillItem,
  onClearPrefill
}) => {
  const [selectedMetalId, setSelectedMetalId] = useState<MetalType>('gold_22k');
  const [weightGrams, setWeightGrams] = useState<number>(28.5);
  const [makingChargeRate, setMakingChargeRate] = useState<number>(12);
  const [gemstoneValueUsd, setGemstoneValueUsd] = useState<number>(450);
  const [taxRatePercent, setTaxRatePercent] = useState<number>(3);
  const [lockedSuccess, setLockedSuccess] = useState<boolean>(false);

  const currency = currencyExchangeRates[selectedCurrency];

  useEffect(() => {
    if (prefillItem) {
      setSelectedMetalId(prefillItem.baseMetalType);
      setWeightGrams(prefillItem.netWeight);
      setMakingChargeRate(prefillItem.makingChargePercent);
      setGemstoneValueUsd((prefillItem.gemstoneWeight || 0) * 450);
    }
  }, [prefillItem]);

  const activeRateObj = currentRates.find((r) => r.id === selectedMetalId) || currentRates[1];

  const spotRatePerGram = activeRateObj.ratePerGram;
  const rawMetalCostUsd = weightGrams * spotRatePerGram;
  const makingChargesUsd = rawMetalCostUsd * (makingChargeRate / 100);
  const subtotalUsd = rawMetalCostUsd + makingChargesUsd + gemstoneValueUsd;
  const taxAmountUsd = subtotalUsd * (taxRatePercent / 100);
  const totalCostUsd = subtotalUsd + taxAmountUsd;

  const formatAmount = (amountUsd: number) => {
    const val = amountUsd * currency.rate;
    return `${currency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const handleReset = () => {
    setSelectedMetalId('gold_22k');
    setWeightGrams(25.0);
    setMakingChargeRate(12);
    setGemstoneValueUsd(0);
    setTaxRatePercent(3);
    setLockedSuccess(false);
    if (onClearPrefill) onClearPrefill();
  };

  const handleLockIn = () => {
    setLockedSuccess(true);
    setTimeout(() => setLockedSuccess(false), 4500);
  };

  return (
    <section id="calculator-section" className="py-14 sm:py-18 bg-[#FAF8F5] dark:bg-[#101014] border-b border-[#EAE5DC] dark:border-[#2E2E38] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#18181D] border border-[#D6CEBE] dark:border-[#383844] text-[#8C6428] dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
            Live Market Valuation Engine
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-white tracking-tight">
            Jewelry Price Estimator
          </h2>
          <div className="w-12 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] mx-auto mt-2 mb-3"></div>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA]">
            Compute manufacturing and bullion valuations anchored directly to live spot market rates.
          </p>
        </div>

        {/* Calculator Interactive Container */}
        <div className="bg-white dark:bg-[#18181D] rounded-2xl border border-[#EAE5DC] dark:border-[#2E2E38] p-6 sm:p-8 shadow-xs max-w-5xl mx-auto">
          {prefillItem && (
            <div className="mb-6 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#202028] border border-[#B88B4A]/40 dark:border-[#D4AF37]/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#1C1917] dark:text-white">
                <Sparkles className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                <span>Preset: <strong>{prefillItem.title}</strong></span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#8C6428] dark:text-[#D4AF37] underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Inputs */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-2">
                  1. Select Precious Metal
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {currentRates.map((rate) => {
                    const isSelected = selectedMetalId === rate.id;
                    return (
                      <button
                        key={rate.id}
                        type="button"
                        onClick={() => setSelectedMetalId(rate.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF8F5] dark:bg-[#22222C] border-[#B88B4A] dark:border-[#D4AF37] ring-1 ring-[#B88B4A] dark:ring-[#D4AF37]'
                            : 'bg-white dark:bg-[#1A1A22] border-[#EAE5DC] dark:border-[#2E2E38] hover:border-[#D6CEBE]'
                        }`}
                      >
                        <div className="text-xs font-serif font-bold text-[#1C1917] dark:text-white truncate">
                          {rate.name.split(' ')[0]} {rate.purity.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-[#78716C] dark:text-[#A1A1AA] truncate mt-0.5">
                          {rate.purity}
                        </div>
                        <div className="text-[11px] font-semibold text-[#8C6428] dark:text-[#D4AF37] mt-1">
                          {formatAmount(rate.ratePerGram)}/g
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1]">
                    2. Net Metal Weight (Grams)
                  </label>
                  <span className="font-mono text-xs font-bold text-[#8C6428] dark:text-[#D4AF37]">
                    {weightGrams.toFixed(2)} g ({ (weightGrams / 11.664).toFixed(2) } tola)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="150"
                    step="0.5"
                    value={weightGrams}
                    onChange={(e) => setWeightGrams(parseFloat(e.target.value))}
                    className="w-full accent-[#B88B4A] bg-[#FAF8F5] dark:bg-[#202028] h-2 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={weightGrams}
                    onChange={(e) => setWeightGrams(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-20 px-2 py-1 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] rounded-lg text-xs text-[#1C1917] dark:text-white font-mono text-center focus:outline-none focus:border-[#B88B4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    3. Making Fee ({makingChargeRate}%)
                  </label>
                  <select
                    value={makingChargeRate}
                    onChange={(e) => setMakingChargeRate(parseFloat(e.target.value))}
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                  >
                    <option value={8}>8% — Plain Classic Bands</option>
                    <option value={10}>10% — Bangles & Chains</option>
                    <option value={12}>12% — Fine Gem Settings</option>
                    <option value={15}>15% — Intricate Filigree</option>
                    <option value={18}>18% — Bridal Masterpieces</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    4. Gemstones Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#78716C] dark:text-[#A1A1AA] text-xs">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={Math.round(gemstoneValueUsd * currency.rate)}
                      onChange={(e) => setGemstoneValueUsd(Math.max(0, (parseFloat(e.target.value) || 0) / currency.rate))}
                      className="w-full pl-7 pr-3 py-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                  5. Metal Tax Rate
                </label>
                <div className="flex items-center gap-2">
                  {[0, 3, 5].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTaxRatePercent(t)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        taxRatePercent === t
                          ? 'bg-[#B88B4A] dark:bg-[#D4AF37] text-white dark:text-black font-semibold'
                          : 'bg-[#FAF8F5] dark:bg-[#202028] text-[#78716C] dark:text-[#A1A1AA] border border-[#EAE5DC] dark:border-[#383844]'
                      }`}
                    >
                      {t === 0 ? '0% Exempt' : `${t}% Standard`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Receipt Breakdown */}
            <div className="lg:col-span-5 bg-[#FAF8F5] dark:bg-[#202028] border border-[#E7E2D9] dark:border-[#2E2E38] rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD3] dark:border-[#2E2E38] mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6428] dark:text-[#D4AF37]">
                      {brandConfig.brandName} Atelier
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#1C1917] dark:text-white mt-0.5">
                      Estimated Valuation
                    </h4>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#B88B4A] dark:text-[#D4AF37]" />
                </div>

                <div className="space-y-2 text-xs text-[#78716C] dark:text-[#A1A1AA] pb-3 border-b border-[#E2DDD3] dark:border-[#2E2E38]">
                  <div className="flex items-center justify-between">
                    <span>Metal Standard:</span>
                    <span className="text-[#1C1917] dark:text-white font-medium">{activeRateObj.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Vault Spot Rate:</span>
                    <span className="font-mono text-[#1C1917] dark:text-white">{formatAmount(spotRatePerGram)} / g</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Net Weight:</span>
                    <span className="font-mono text-[#1C1917] dark:text-white">{weightGrams.toFixed(2)} g</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 font-semibold text-[#1C1917] dark:text-white">
                    <span>Bullion Value:</span>
                    <span>{formatAmount(rawMetalCostUsd)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Making Fee ({makingChargeRate}%):</span>
                    <span className="text-[#1C1917] dark:text-white font-medium">+{formatAmount(makingChargesUsd)}</span>
                  </div>

                  {gemstoneValueUsd > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Gemstones / Diamonds:</span>
                      <span className="text-[#1C1917] dark:text-white font-medium">+{formatAmount(gemstoneValueUsd)}</span>
                    </div>
                  )}

                  {taxRatePercent > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Bullion Tax ({taxRatePercent}%):</span>
                      <span className="text-[#1C1917] dark:text-white font-medium">+{formatAmount(taxAmountUsd)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 mb-4">
                  <div className="text-[10px] text-[#78716C] dark:text-[#A1A1AA] uppercase font-semibold mb-0.5">
                    Estimated Total
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F3E5AB]">
                    {formatAmount(totalCostUsd)}
                  </div>
                  <div className="text-[10px] text-[#A8A29E] dark:text-[#71717A] mt-0.5">
                    Tied to Live Vault Spot Feed
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {lockedSuccess ? (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Rate locked for 48 hours!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleLockIn}
                    className="w-full py-2.5 rounded-lg bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Lock In Spot Rate</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2 rounded-lg bg-white dark:bg-[#18181D] hover:bg-[#FAF8F5] text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] border border-[#EAE5DC] dark:border-[#383844] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Estimator</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
