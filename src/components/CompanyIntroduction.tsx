import React, { useState } from 'react';
import { ImageMagnifier } from './ImageMagnifier';
import { ShieldCheck, Award, Heart, Check } from 'lucide-react';

interface CompanyIntroductionProps {
  brandName?: string;
  onExploreAtelier?: () => void;
}

export const CompanyIntroduction: React.FC<CompanyIntroductionProps> = ({
  brandName = 'Savarthi'
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <section id="intro-section" className="py-14 sm:py-18 bg-[#FAF8F5] dark:bg-[#101014] border-b border-[#EAE5DC] dark:border-[#2E2E38] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ========================================================================= */}
        {/* 1. CRAFTSMANSHIP BANNER                                                   */}
        {/* ========================================================================= */}
        <div className="bg-[#F5F2EB] dark:bg-[#18181D] rounded-2xl border border-[#E7E2D9] dark:border-[#2E2E38] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 mb-14">
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center text-left">
            <div className="mb-4">
              <span className="font-cormorant italic text-4xl sm:text-5xl text-[#8C6428] dark:text-[#D4AF37] block">
                Craftsmanship
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#44403C] dark:text-[#D4D4D8] leading-relaxed mb-4">
              Every jewelry piece is meticulously crafted by experienced artisans using verified bullion and ethically sourced stones to ensure exceptional quality, elegance, and durability.
            </p>

            <p className="font-serif italic text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA] leading-relaxed mb-8">
              We believe in creating enduring artistry that lasts through generations.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#E2DDD3] dark:border-[#282834]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] dark:text-white">
                <span className="w-6 h-6 rounded-full bg-white dark:bg-[#252530] border border-[#D6CEBE] dark:border-[#383844] flex items-center justify-center text-[#B88B4A] dark:text-[#D4AF37]">
                  <Heart className="w-3.5 h-3.5" />
                </span>
                <span>Ethically Sourced</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] dark:text-white">
                <span className="w-6 h-6 rounded-full bg-white dark:bg-[#252530] border border-[#D6CEBE] dark:border-[#383844] flex items-center justify-center text-[#B88B4A] dark:text-[#D4AF37]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span>Certified Assay</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] dark:text-white">
                <span className="w-6 h-6 rounded-full bg-white dark:bg-[#252530] border border-[#D6CEBE] dark:border-[#383844] flex items-center justify-center text-[#B88B4A] dark:text-[#D4AF37]">
                  <Award className="w-3.5 h-3.5" />
                </span>
                <span>Master Goldsmiths</span>
              </div>
            </div>
          </div>

          {/* Right Column: Artisan Workbench Photo with Zoom Magnifier */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#EFECE6] dark:bg-[#1E1E26]">
            <ImageMagnifier
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80"
              alt="Jewelry Artisan Handcrafting Rings at Workbench"
              zoomLevel={2.5}
              lensSize={160}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. NEWSLETTER STRIP                                                       */}
        {/* ========================================================================= */}
        <div className="bg-[#F4F0E8] dark:bg-[#18181D] rounded-xl border border-[#E7E2D9] dark:border-[#2E2E38] p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-xs">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-white mb-2">
            Join Our VIP Collector Registry & Receive 10% Off
          </h3>
          <p className="text-xs text-[#78716C] dark:text-[#A1A1AA] mb-5">
            Subscribe for private salon invitations, new collection drops, and bullion rate notifications.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold">
              <Check className="w-4 h-4" />
              <span>Thank you! Your 10% welcome coupon has been issued.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full sm:flex-1 px-3.5 py-2.5 bg-white dark:bg-[#22222A] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white placeholder-[#A8A29E] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
