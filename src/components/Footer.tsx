import React, { useState } from 'react';
import { SavarthiLogo } from './SavarthiLogo';
import { BrandConfig } from '../types';
import {
  MapPin,
  ArrowRight,
  Check
} from 'lucide-react';

interface FooterProps {
  brandConfig: BrandConfig;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  brandConfig,
  onNavigate
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#F5F2EB] dark:bg-[#121216] border-t border-[#EAE5DC] dark:border-[#2E2E38] text-[#44403C] dark:text-[#A1A1AA] pt-14 pb-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E2DDD3] dark:border-[#282834]">
          {/* Col 1: Brand & Logo (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <SavarthiLogo brandName={brandConfig.brandName} size="lg" />

            <p className="font-serif text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA] italic leading-relaxed max-w-sm pt-1">
              "Honoring the ancient goldsmithing heritage through pure metals and contemporary precision."
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#57534E] dark:text-[#D4D4D8]">
              <MapPin className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
              <span>{brandConfig.location}</span>
            </div>
          </div>

          {/* Col 2: High Jewelry Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#78716C] dark:text-[#A1A1AA]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collections-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Featured Collections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('bestsellers-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collections-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Rings & Solitaires
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collections-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Bracelets & Kadas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Bullion & Heritage (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-white">
              Market Rates
            </h4>
            <ul className="space-y-2 text-xs text-[#78716C] dark:text-[#A1A1AA]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('market-rates-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Live Spot Feeds
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('market-graph-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Pricing Graph
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('market-rates-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Email Price Alerts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('intro-section')}
                  className="hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Artisan Ethos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-white">
              Atelier Newsletter
            </h4>
            <p className="text-xs text-[#78716C] dark:text-[#A1A1AA] leading-relaxed">
              Receive private salon invitations and weekly bullion market digests.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <Check className="w-4 h-4" />
                <span>Subscribed successfully</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white dark:bg-[#1E1E26] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white placeholder-[#A8A29E] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black rounded text-xs font-bold flex items-center transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-1 text-[11px] text-[#A8A29E] dark:text-[#71717A]">
              Assayed by LBMA & GIA • Certified Conflict-Free
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] dark:text-[#A1A1AA]">
          <div>
            <span>© {new Date().getFullYear()} {brandConfig.brandName}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#1C1917] dark:hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-[#1C1917] dark:hover:text-white cursor-pointer">Bullion Valuation Policy</span>
            <span className="hover:text-[#1C1917] dark:hover:text-white cursor-pointer">Ethical Sourcing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
