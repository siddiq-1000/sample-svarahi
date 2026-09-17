import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { MetalRate, TimeframePeriod, DisplayCurrency, PriceAlert, MetalType } from '../types';
import { historicalPriceData, currencyExchangeRates, initialPriceAlerts } from '../data/jewelryData';
import { SavarthiLogo } from './SavarthiLogo';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
  CheckCircle2,
  Trash2,
  Mail,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MarketRateSectionProps {
  brandName?: string;
  currentRates: MetalRate[];
  selectedCurrency: DisplayCurrency;
  weightUnit: 'gram' | 'tola' | 'oz';
  onRefreshRates: () => void;
  isRefreshing: boolean;
}

export const MarketRateSection: React.FC<MarketRateSectionProps> = ({
  brandName = 'SAVARTHI',
  currentRates,
  selectedCurrency,
  weightUnit,
  onRefreshRates,
  isRefreshing
}) => {
  const [selectedMetal, setSelectedMetal] = useState<'gold' | 'silver' | 'platinum' | 'compare'>('gold');
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('7D');
  const [activeRateCardId, setActiveRateCardId] = useState<string>('gold_24k');

  // Price Alert Form State (docked on the right-hand side)
  const [alerts, setAlerts] = useState<PriceAlert[]>(initialPriceAlerts);
  const [alertMetalId, setAlertMetalId] = useState<MetalType>('gold_24k');
  const [alertCondition, setAlertCondition] = useState<'below' | 'above'>('below');
  const [alertTargetPrice, setAlertTargetPrice] = useState<number>(85.00);
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [alertSuccessMessage, setAlertSuccessMessage] = useState<string | null>(null);
  const [testAlertToast, setTestAlertToast] = useState<string | null>(null);

  const currency = currencyExchangeRates[selectedCurrency];

  const getMultiplier = () => {
    if (weightUnit === 'tola') return 11.664;
    if (weightUnit === 'oz') return 31.1035;
    return 1;
  };

  const mult = getMultiplier();

  const formatPrice = (usdPerGram: number) => {
    const val = usdPerGram * currency.rate * mult;
    return `${currency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const rawData = historicalPriceData[timeframe] || historicalPriceData['7D'];

  const chartData = rawData.map((item) => ({
    date: item.date,
    gold: Number((item.gold * currency.rate * mult).toFixed(2)),
    silver: Number((item.silver * currency.rate * mult).toFixed(2)),
    platinum: Number((item.platinum * currency.rate * mult).toFixed(2)),
    volume: item.volume
  }));

  const activeRate = currentRates.find((r) => r.id === activeRateCardId) || currentRates[0];
  const unitTitle = weightUnit === 'gram' ? 'Per Gram' : weightUnit === 'tola' ? 'Per 10g Tola' : 'Per Troy Ounce';

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail || !alertEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    const metalObj = currentRates.find((m) => m.id === alertMetalId) || currentRates[0];
    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      metalId: alertMetalId,
      metalName: metalObj.name,
      condition: alertCondition,
      targetPrice: alertTargetPrice,
      email: alertEmail,
      createdAt: 'Just now',
      active: true
    };

    setAlerts([newAlert, ...alerts]);
    setAlertSuccessMessage(
      `Alert saved for ${metalObj.name} (${alertCondition === 'below' ? '≤' : '≥'} ${currency.symbol}${alertTargetPrice}). Trigger notifications will be sent to ${alertEmail}.`
    );
    setAlertEmail('');

    setTimeout(() => {
      setAlertSuccessMessage(null);
    }, 4500);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleTestTrigger = (alertItem: PriceAlert) => {
    setTestAlertToast(
      `🔔 PRICE ALERT TRIGGERED: ${alertItem.metalName} crossed threshold of ${currency.symbol}${alertItem.targetPrice}! An email notification was dispatched to ${alertItem.email}.`
    );
    setTimeout(() => {
      setTestAlertToast(null);
    }, 5000);
  };

  const handleQuickAdjust = (percentChange: number) => {
    const metalObj = currentRates.find((m) => m.id === alertMetalId) || currentRates[0];
    const base = metalObj.ratePerGram * currency.rate * mult;
    const adjusted = Number((base * (1 + percentChange / 100)).toFixed(2));
    setAlertTargetPrice(adjusted);
  };

  return (
    <section id="market-rates-section" className="py-14 sm:py-18 bg-[#FBF9F5] dark:bg-[#121216] border-b border-[#EAE5DC] dark:border-[#2E2E38] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Test Alert Toast */}
        {testAlertToast && (
          <div className="mb-6 p-4 rounded-xl bg-[#1C1917] dark:bg-[#202028] text-[#FAF8F5] border border-[#B88B4A] dark:border-[#D4AF37] shadow-xl flex items-center justify-between animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#B88B4A] dark:bg-[#D4AF37] text-white dark:text-black flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4" />
              </span>
              <p className="text-xs sm:text-sm font-medium">{testAlertToast}</p>
            </div>
            <button
              type="button"
              onClick={() => setTestAlertToast(null)}
              className="text-[#A8A29E] hover:text-white text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B88B4A] dark:text-[#D4AF37] font-bold mb-1">
              <SavarthiLogo brandName={brandName} variant="emblem" size="sm" />
              <span>{brandName} Live Precious Metal Index</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-white tracking-tight">
              Precious Metal Pricing & Trends
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA] mt-1">
              Direct spot rates for 24K gold, 22K gold, 999 silver, and platinum 950.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#78716C] dark:text-[#A1A1AA] bg-white dark:bg-[#18181D] px-3 py-1.5 rounded-lg border border-[#E7E2D9] dark:border-[#2E2E38] shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
              <span>Realtime Vault Spot ({unitTitle})</span>
            </div>

            <button
              type="button"
              onClick={onRefreshRates}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#18181D] hover:bg-[#FAF8F5] dark:hover:bg-[#22222A] text-[#1C1917] dark:text-white border border-[#D6CEBE] dark:border-[#383844] text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
              id="btn-refresh-rates"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Spot Rate Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {currentRates.map((rate) => {
            const isSelected = activeRateCardId === rate.id;
            const isGold = rate.category === 'gold';
            const isSilver = rate.category === 'silver';

            return (
              <div
                key={rate.id}
                onClick={() => {
                  setActiveRateCardId(rate.id);
                  if (isGold) setSelectedMetal('gold');
                  else if (isSilver) setSelectedMetal('silver');
                  else setSelectedMetal('platinum');
                  setAlertMetalId(rate.id);
                  setAlertTargetPrice(Number((rate.ratePerGram * currency.rate * mult).toFixed(2)));
                }}
                className={`p-3.5 rounded-xl cursor-pointer transition-all duration-150 border text-left ${
                  isSelected
                    ? 'bg-white dark:bg-[#1E1E26] border-[#B88B4A] dark:border-[#D4AF37] shadow-sm ring-1 ring-[#B88B4A] dark:ring-[#D4AF37]'
                    : 'bg-white/80 dark:bg-[#18181D]/80 hover:bg-white dark:hover:bg-[#1E1E24] border-[#EAE5DC] dark:border-[#282834]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1C1917] dark:text-white truncate">
                    {rate.name.split(' ')[0]} {rate.purity.split(' ')[0]}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isGold ? 'bg-[#B88B4A] dark:bg-[#D4AF37]' : isSilver ? 'bg-[#94A3B8]' : 'bg-[#60A5FA]'
                    }`}
                  ></span>
                </div>

                <div className="text-[10px] text-[#A8A29E] dark:text-[#71717A] truncate mb-1.5">
                  {rate.purity}
                </div>

                <div className="font-serif text-base sm:text-lg font-bold text-[#1C1917] dark:text-[#F3E5AB] leading-tight">
                  {formatPrice(rate.ratePerGram)}
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[10px]">
                  <span
                    className={`inline-flex items-center font-bold ${
                      rate.change24h >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                    }`}
                  >
                    {rate.change24h >= 0 ? (
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    )}
                    {rate.change24h > 0 ? '+' : ''}
                    {rate.change24h}%
                  </span>
                  <span className="text-[#A8A29E] dark:text-[#71717A]">24h</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Grid: Left Pricing Graph, Right-Hand Side Price Alert System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================================= */}
          {/* LEFT 7 COLS: CLEAN PRICING GRAPH */}
          {/* ========================================================================= */}
          <div
            id="market-graph-section"
            className="lg:col-span-7 bg-white dark:bg-[#18181D] rounded-2xl border border-[#EAE5DC] dark:border-[#2E2E38] p-5 sm:p-6 shadow-sm"
          >
            {/* Chart Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0ECE1] dark:border-[#282834] mb-4">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] dark:text-white">
                  {selectedMetal === 'compare'
                    ? 'Precious Metal Comparative Trends'
                    : `${activeRate.name} Pricing Graph`}
                </h3>
                <p className="text-xs text-[#78716C] dark:text-[#A1A1AA] mt-0.5">
                  Spot in {currency.name} ({currency.symbol}) {unitTitle.toLowerCase()}
                </p>
              </div>

              {/* Timeframe & Metal Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Metal Selector Buttons */}
                <div className="flex items-center bg-[#FAF8F5] dark:bg-[#202028] p-1 rounded-lg border border-[#EAE5DC] dark:border-[#383844]">
                  <button
                    type="button"
                    onClick={() => setSelectedMetal('gold')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      selectedMetal === 'gold'
                        ? 'bg-white dark:bg-[#2A2A34] text-[#B88B4A] dark:text-[#D4AF37] shadow-xs font-bold'
                        : 'text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white'
                    }`}
                  >
                    Gold
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMetal('silver')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      selectedMetal === 'silver'
                        ? 'bg-white dark:bg-[#2A2A34] text-[#64748B] dark:text-white shadow-xs font-bold'
                        : 'text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white'
                    }`}
                  >
                    Silver
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMetal('platinum')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      selectedMetal === 'platinum'
                        ? 'bg-white dark:bg-[#2A2A34] text-[#2563EB] dark:text-[#60A5FA] shadow-xs font-bold'
                        : 'text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white'
                    }`}
                  >
                    Platinum
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMetal('compare')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      selectedMetal === 'compare'
                        ? 'bg-white dark:bg-[#2A2A34] text-[#1C1917] dark:text-white shadow-xs font-bold'
                        : 'text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white'
                    }`}
                  >
                    All
                  </button>
                </div>

                {/* Timeframe Buttons */}
                <div className="flex items-center bg-[#FAF8F5] dark:bg-[#202028] p-1 rounded-lg border border-[#EAE5DC] dark:border-[#383844]">
                  {(['24H', '7D', '1M', '6M', '1Y'] as TimeframePeriod[]).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setTimeframe(period)}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                        timeframe === period
                          ? 'bg-white dark:bg-[#2A2A34] text-[#1C1917] dark:text-white shadow-xs'
                          : 'text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-[#FAF8F5] dark:bg-[#202028] p-2.5 rounded-lg border border-[#EAE5DC] dark:border-[#2E2E38]">
                <span className="text-[10px] text-[#A8A29E] dark:text-[#71717A] uppercase font-semibold block">
                  Current Spot
                </span>
                <span className="font-serif text-base font-bold text-[#1C1917] dark:text-white">
                  {selectedMetal === 'silver'
                    ? formatPrice(currentRates[4].ratePerGram)
                    : selectedMetal === 'platinum'
                    ? formatPrice(currentRates[5].ratePerGram)
                    : formatPrice(currentRates[0].ratePerGram)}
                </span>
              </div>

              <div className="bg-[#FAF8F5] dark:bg-[#202028] p-2.5 rounded-lg border border-[#EAE5DC] dark:border-[#2E2E38]">
                <span className="text-[10px] text-[#A8A29E] dark:text-[#71717A] uppercase font-semibold block">
                  Period High
                </span>
                <span className="font-serif text-base font-bold text-emerald-700 dark:text-emerald-400">
                  {selectedMetal === 'silver'
                    ? formatPrice(1.12)
                    : selectedMetal === 'platinum'
                    ? formatPrice(33.90)
                    : formatPrice(86.95)}
                </span>
              </div>

              <div className="bg-[#FAF8F5] dark:bg-[#202028] p-2.5 rounded-lg border border-[#EAE5DC] dark:border-[#2E2E38]">
                <span className="text-[10px] text-[#A8A29E] dark:text-[#71717A] uppercase font-semibold block">
                  Period Low
                </span>
                <span className="font-serif text-base font-bold text-rose-700 dark:text-rose-400">
                  {selectedMetal === 'silver'
                    ? formatPrice(0.96)
                    : selectedMetal === 'platinum'
                    ? formatPrice(32.10)
                    : formatPrice(83.80)}
                </span>
              </div>
            </div>

            {/* Clean Recharts Canvas */}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {selectedMetal === 'compare' ? (
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                    <XAxis dataKey="date" stroke="#888888" tick={{ fontSize: 11 }} />
                    <YAxis
                      stroke="#888888"
                      tick={{ fontSize: 11 }}
                      domain={['auto', 'auto']}
                      tickFormatter={(val) => `${currency.symbol}${val}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E1E24',
                        borderColor: '#383844',
                        borderRadius: '8px',
                        color: '#F4F4F5',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                      formatter={(val: any) => [`${currency.symbol}${val}`, '']}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="gold"
                      name="24K Pure Gold"
                      stroke="#B88B4A"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#B88B4A' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="platinum"
                      name="Platinum 950"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#2563EB' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="silver"
                      name="Fine Silver 999"
                      stroke="#94A3B8"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#94A3B8' }}
                    />
                  </LineChart>
                ) : (
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="warmGoldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B88B4A" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#B88B4A" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="coolSilverGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748B" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="platinumGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                    <XAxis dataKey="date" stroke="#888888" tick={{ fontSize: 11 }} />
                    <YAxis
                      stroke="#888888"
                      tick={{ fontSize: 11 }}
                      domain={['auto', 'auto']}
                      tickFormatter={(val) => `${currency.symbol}${val}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E1E24',
                        borderColor: '#383844',
                        borderRadius: '8px',
                        color: '#F4F4F5',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                      formatter={(val: any) => [`${currency.symbol}${val} ${unitTitle}`, 'Spot Rate']}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetal}
                      stroke={
                        selectedMetal === 'silver'
                          ? '#94A3B8'
                          : selectedMetal === 'platinum'
                          ? '#3B82F6'
                          : '#B88B4A'
                      }
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill={
                        selectedMetal === 'silver'
                          ? 'url(#coolSilverGradient)'
                          : selectedMetal === 'platinum'
                          ? 'url(#platinumGradient)'
                          : 'url(#warmGoldGradient)'
                      }
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT-HAND SIDE: USER-FRIENDLY PRICE ALERT SYSTEM */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 bg-white dark:bg-[#18181D] rounded-2xl border border-[#EAE5DC] dark:border-[#2E2E38] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F0ECE1] dark:border-[#282834] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#B88B4A]/10 text-[#B88B4A] dark:text-[#D4AF37] flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] dark:text-white">
                    Metal Price Alerts
                  </h3>
                  <p className="text-[11px] text-[#78716C] dark:text-[#A1A1AA]">
                    Direct email push when target thresholds are hit
                  </p>
                </div>
              </div>
            </div>

            {/* Success message */}
            {alertSuccessMessage && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{alertSuccessMessage}</span>
              </div>
            )}

            {/* Price Alert Subscription Form */}
            <form onSubmit={handleCreateAlert} className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                  1. Select Precious Metal
                </label>
                <select
                  value={alertMetalId}
                  onChange={(e) => {
                    const id = e.target.value as MetalType;
                    setAlertMetalId(id);
                    const metalObj = currentRates.find((m) => m.id === id) || currentRates[0];
                    setAlertTargetPrice(Number((metalObj.ratePerGram * currency.rate * mult).toFixed(2)));
                  }}
                  className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#E7E2D9] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs font-medium text-[#1C1917] dark:text-white focus:outline-none"
                >
                  {currentRates.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.purity}) — {formatPrice(r.ratePerGram)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    2. Condition
                  </label>
                  <select
                    value={alertCondition}
                    onChange={(e) => setAlertCondition(e.target.value as 'below' | 'above')}
                    className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#E7E2D9] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs font-medium text-[#1C1917] dark:text-white focus:outline-none"
                  >
                    <option value="below">Drops below (≤)</option>
                    <option value="above">Rises above (≥)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    3. Target ({currency.symbol})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#E7E2D9] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs font-bold text-[#1C1917] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-[#A8A29E] dark:text-[#71717A] font-medium mr-1">Presets:</span>
                <button
                  type="button"
                  onClick={() => handleQuickAdjust(-5)}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#FAF8F5] dark:bg-[#202028] hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#78716C] dark:text-[#CBD5E1] border border-[#E7E2D9] dark:border-[#383844]"
                >
                  -5% Dip
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdjust(-2)}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#FAF8F5] dark:bg-[#202028] hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#78716C] dark:text-[#CBD5E1] border border-[#E7E2D9] dark:border-[#383844]"
                >
                  -2% Dip
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdjust(5)}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#FAF8F5] dark:bg-[#202028] hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#78716C] dark:text-[#CBD5E1] border border-[#E7E2D9] dark:border-[#383844]"
                >
                  +5% Surge
                </button>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                  4. Your Notification Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
                  <input
                    type="email"
                    required
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="Enter email for price alerts..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#E7E2D9] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-xs tracking-wider uppercase transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Set Price Alert</span>
              </button>
            </form>

            {/* Active Subscriptions List */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#78716C] dark:text-[#A1A1AA] mb-2">
                <span>Active Alerts ({alerts.length})</span>
                <span className="text-[10px] text-[#A8A29E] dark:text-[#71717A]">Right-Hand Dispatch</span>
              </div>

              {alerts.length === 0 ? (
                <p className="text-xs text-[#A8A29E] italic text-center py-3 bg-[#FAF8F5] dark:bg-[#202028] rounded-lg border border-[#F0ECE1] dark:border-[#282834]">
                  No active alerts. Add one above.
                </p>
              ) : (
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {alerts.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38] flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                        <div className="truncate">
                          <div className="font-semibold text-[#1C1917] dark:text-white truncate">
                            {item.metalName.split(' ')[0]} {item.condition === 'below' ? '≤' : '≥'} {currency.symbol}
                            {item.targetPrice}
                          </div>
                          <div className="text-[10px] text-[#78716C] dark:text-[#A1A1AA] truncate">{item.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleTestTrigger(item)}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-[#282832] hover:bg-[#F5F2EB] text-[#B88B4A] dark:text-[#D4AF37] border border-[#D6CEBE] dark:border-[#3E3E4C]"
                        >
                          Test
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAlert(item.id)}
                          className="p-1 rounded text-[#A8A29E] hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
