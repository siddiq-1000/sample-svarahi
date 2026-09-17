import React from 'react';
import { hallmarkStandards } from '../data/jewelryData';
import { ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';
import { BrandConfig } from '../types';

interface HallmarkGuideProps {
  brandConfig: BrandConfig;
}

export const HallmarkGuide: React.FC<HallmarkGuideProps> = ({ brandConfig }) => {
  return (
    <section id="hallmark-section" className="py-14 sm:py-18 bg-[#FAF8F5] dark:bg-[#101014] border-b border-[#EAE5DC] dark:border-[#2E2E38] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#18181D] border border-[#D6CEBE] dark:border-[#383844] text-[#8C6428] dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
            Authentication Standards
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-white tracking-tight">
            Hallmarking & Purity Verification
          </h2>
          <div className="w-12 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] mx-auto mt-2 mb-3"></div>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA]">
            Every precious piece leaving the {brandConfig.brandName} workshop carries laser-engraved certification stamps recognized worldwide.
          </p>
        </div>

        {/* 4 Hallmark Stamp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {hallmarkStandards.map((std) => (
            <div
              key={std.symbol}
              className="bg-white dark:bg-[#18181D] rounded-xl border border-[#EAE5DC] dark:border-[#2E2E38] hover:border-[#D6CEBE] p-5 flex flex-col justify-between transition-all duration-200 shadow-xs"
            >
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] flex items-center justify-center mb-3 text-[#B88B4A] dark:text-[#D4AF37]">
                  <span className="font-serif text-base font-bold">{std.symbol}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#1C1917] dark:text-white mb-1">
                  {std.grade}
                </h3>

                <p className="text-xs text-[#78716C] dark:text-[#A1A1AA] leading-relaxed mb-3">
                  {std.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE5DC] dark:border-[#282834] flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certified Assay Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Anatomy of Inscription */}
        <div className="bg-white dark:bg-[#18181D] border border-[#EAE5DC] dark:border-[#2E2E38] rounded-xl p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pb-3.5 border-b border-[#EAE5DC] dark:border-[#282834] mb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#B88B4A] dark:text-[#D4AF37]">
                Micro-Laser Forensics
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] dark:text-white mt-0.5">
                Anatomy of a {brandConfig.brandName} Hallmark
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#78716C] dark:text-[#A1A1AA]">
              <FileCheck className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
              <span>Conforms to International Assay Office Regulations</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38]">
              <div className="text-xs font-serif font-bold text-[#1C1917] dark:text-white mb-1">
                1. Official Assay Mark
              </div>
              <p className="text-xs text-[#78716C] dark:text-[#A1A1AA]">
                Official triangle symbol confirming compliance with national bullion purity testing laboratories.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38]">
              <div className="text-xs font-serif font-bold text-[#1C1917] dark:text-white mb-1">
                2. Fineness Grade
              </div>
              <p className="text-xs text-[#78716C] dark:text-[#A1A1AA]">
                Precise karat stamp: 999 (24K), 916 (22K), 750 (18K), or 925 (Sterling Silver) denoting exact parts per thousand.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38]">
              <div className="text-xs font-serif font-bold text-[#1C1917] dark:text-white mb-1">
                3. Unique HUID Serial
              </div>
              <p className="text-xs text-[#78716C] dark:text-[#A1A1AA]">
                Tamper-proof alphanumeric code traceable in the central registry database with lifetime provenance history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
