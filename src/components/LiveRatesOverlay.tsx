import React from 'react';
import { MetalRate, DisplayCurrency } from '../types';
import { currencyExchangeRates } from '../data/jewelryData';
import {
  X,
  TrendingUp,
  TrendingDown,
  Clock,
  Scale,
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface LiveRatesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  rates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  onCurrencyChange: (c: DisplayCurrency) => void;
  weightUnit: 'gram' | 'tola' | 'oz';
  onWeightUnitChange: (u: 'gram' | 'tola' | 'oz') => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onViewGraph: () => void;
}

export const LiveRatesOverlay: React.FC<LiveRatesOverlayProps> = ({
  isOpen,
  onClose,
  rates,
  selectedCurrency,
  onCurrencyChange,
  weightUnit,
  onWeightUnitChange,
  onRefresh,
  isRefreshing,
  onViewGraph
}) => {
  if (!isOpen) return null;

  const currencyInfo = currencyExchangeRates[selectedCurrency];

  const formatRate = (usdPerGram: number) => {
    let multiplier = 1;
    if (weightUnit === 'tola') multiplier = 11.664;
    if (weightUnit === 'oz') multiplier = 31.1035;

    const val = usdPerGram * currencyInfo.rate * multiplier;
    return `${currencyInfo.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center sm:justify-end p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#18181D] border border-[#EAE5DC] dark:border-[#2E2E38] w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-[#1C1917] dark:text-[#F4F4F5] animate-in slide-in-from-right-6 duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE5DC] dark:border-[#2E2E38] flex items-center justify-between bg-[#FAF8F5] dark:bg-[#141418]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <h3 className="font-serif font-bold text-base text-[#1C1917] dark:text-white">
                Live Bullion Spot Overlay
              </h3>
              <p className="text-[11px] text-[#78716C] dark:text-[#A1A1AA] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#B88B4A] dark:text-[#D4AF37]" />
                Direct London & Mumbai Vault Feeds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg text-[#78716C] hover:text-[#1C1917] dark:text-[#A1A1AA] dark:hover:text-white hover:bg-white dark:hover:bg-[#252530] transition-colors"
              title="Refresh Spot Rates"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B88B4A]' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#78716C] hover:text-[#1C1917] dark:text-[#A1A1AA] dark:hover:text-white hover:bg-white dark:hover:bg-[#252530] transition-colors"
              title="Close Overlay"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Currency & Unit Selector Controls */}
        <div className="px-5 py-3 bg-white dark:bg-[#18181D] border-b border-[#EAE5DC] dark:border-[#2E2E38] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#78716C] dark:text-[#A1A1AA] text-[11px]">Currency:</span>
            <select
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as DisplayCurrency)}
              className="bg-[#FAF8F5] dark:bg-[#22222A] border border-[#EAE5DC] dark:border-[#383844] rounded px-2 py-1 text-xs font-semibold focus:outline-none"
            >
              {Object.keys(currencyExchangeRates).map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
            <select
              value={weightUnit}
              onChange={(e) => onWeightUnitChange(e.target.value as 'gram' | 'tola' | 'oz')}
              className="bg-[#FAF8F5] dark:bg-[#22222A] border border-[#EAE5DC] dark:border-[#383844] rounded px-2 py-1 text-xs font-semibold focus:outline-none"
            >
              <option value="gram">Per Gram</option>
              <option value="tola">Per Tola (11.66g)</option>
              <option value="oz">Per Troy Oz (31.1g)</option>
            </select>
          </div>
        </div>

        {/* Spot Rate Cards List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {rates.map((rate) => {
            const isPositive = rate.change24h >= 0;
            return (
              <div
                key={rate.id}
                className="p-3.5 rounded-xl border border-[#EAE5DC] dark:border-[#2E2E38] bg-[#FAF8F5] dark:bg-[#1E1E24] hover:border-[#B88B4A] dark:hover:border-[#D4AF37] transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#1C1917] dark:text-white">
                      {rate.name}
                    </span>
                    <span className="text-[10px] text-[#78716C] dark:text-[#A1A1AA] ml-2">
                      {rate.purity}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
                      isPositive
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {isPositive ? '+' : ''}{rate.change24h}%
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-2">
                  <div className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3E5AB]">
                    {formatRate(rate.ratePerGram)}
                  </div>
                  <div className="text-[10px] text-[#78716C] dark:text-[#A1A1AA]">
                    24h Range: {formatRate(rate.low24h)} - {formatRate(rate.high24h)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with Graph Action */}
        <div className="p-4 border-t border-[#EAE5DC] dark:border-[#2E2E38] bg-[#FAF8F5] dark:bg-[#141418] flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] dark:text-[#A1A1AA]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
            <span>LBMA & GIA Assayed</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onViewGraph();
            }}
            className="px-4 py-2 rounded-lg bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-xs transition-colors cursor-pointer"
          >
            View Pricing Graph
          </button>
        </div>
      </div>
    </div>
  );
};
