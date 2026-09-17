import React from 'react';

interface LogoProps {
  brandName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
  variant?: 'horizontal' | 'masthead' | 'seal' | 'emblem';
  eyebrow?: string;
  className?: string;
}

export const SavarthiLogo: React.FC<LogoProps> = ({
  brandName = 'SAVARTHI',
  size = 'md',
  showSubtitle = true,
  variant = 'horizontal',
  eyebrow = 'RADIATE ELEGANCE WITH',
  className = ''
}) => {
  const initial = brandName.trim().charAt(0).toUpperCase() || 'S';

  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[8px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[9px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
    '2xl': { icon: 'w-20 h-20', text: 'text-4xl sm:text-5xl', sub: 'text-xs sm:text-sm' }
  };

  const currentSize = sizeClasses[size];

  // Standalone Emblem
  if (variant === 'emblem') {
    return (
      <div className={`relative ${currentSize.icon} flex items-center justify-center flex-shrink-0 select-none ${className}`} id="brand-emblem">
        {/* Outer Silver Ring */}
        <div className="absolute inset-0 rounded-full border border-[#94A3B8]/70 dark:border-[#64748B] shadow-xs"></div>
        {/* Inner Gold Diamond Facet */}
        <div className="absolute inset-[2.5px] rounded-full border border-[#B88B4A] dark:border-[#D4AF37] rotate-45 transition-transform duration-500 hover:rotate-90"></div>
        {/* Core */}
        <div className="absolute inset-[5px] rounded-full bg-[#1C1917] dark:bg-[#2A2A34] flex items-center justify-center border border-[#B88B4A]/50">
          <span className="font-serif font-bold text-xs text-[#FAF8F5]">
            {initial}
          </span>
        </div>
      </div>
    );
  }

  // Circular Seal / Hallmark Crest
  if (variant === 'seal') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#181820]/95 backdrop-blur-md border border-[#D6CEBE] dark:border-[#3E3E4C] shadow-xs select-none ${className}`}
        id="brand-seal-stamp"
      >
        <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 rounded-full border border-[#B88B4A] dark:border-[#D4AF37]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#1C1917] dark:bg-[#2A2A34] flex items-center justify-center text-[9px] font-serif font-bold text-[#D4AF37]">
            {initial}
          </div>
        </div>
        <div className="flex flex-col text-left leading-none">
          <span className="font-serif text-[10px] font-bold tracking-wider text-[#1C1917] dark:text-white">
            {brandName.toUpperCase()}
          </span>
          <span className="text-[8px] uppercase tracking-widest text-[#B88B4A] dark:text-[#D4AF37] font-semibold">
            ATELIER ASSAY CERTIFIED
          </span>
        </div>
      </div>
    );
  }

  // Grand Centered Masthead (as in the reference image)
  if (variant === 'masthead') {
    return (
      <div className={`flex flex-col items-center justify-center text-center select-none ${className}`} id="brand-masthead-container">
        {eyebrow && (
          <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#78716C] dark:text-[#A1A1AA] font-medium mb-1">
            {eyebrow}
          </span>
        )}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-8 h-[1px] bg-gradient-to-r from-transparent to-[#B88B4A] dark:to-[#D4AF37]"></div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className={`font-serif tracking-[0.18em] font-bold text-[#1C1917] dark:text-white ${currentSize.text} leading-tight`}>
              {brandName.toUpperCase()}
            </span>
            <span className={`font-serif tracking-[0.18em] font-normal text-[#8C6428] dark:text-[#D4AF37] ${currentSize.text} leading-tight`}>
              JEWELRY
            </span>
          </div>
          <div className="hidden sm:block w-8 h-[1px] bg-gradient-to-l from-transparent to-[#B88B4A] dark:to-[#D4AF37]"></div>
        </div>
        {showSubtitle && (
          <span className="font-sans tracking-[0.35em] uppercase font-semibold text-[#8C6428] dark:text-[#D4AF37] text-[8px] sm:text-[9px] mt-1">
            HAUTE JOAILLERIE & LIVE BULLION
          </span>
        )}
      </div>
    );
  }

  // Default: Horizontal Lockup
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="brand-logo-container">
      {/* Tri-Metal Emblem (Gold, Obsidian Noir, Silver) */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center flex-shrink-0`}>
        {/* Outer Silver Ring */}
        <div className="absolute inset-0 rounded-full border border-[#94A3B8]/60 dark:border-[#64748B] shadow-xs"></div>

        {/* Inner Gold Diamond Facet */}
        <div className="absolute inset-[2.5px] rounded-full border border-[#B88B4A] dark:border-[#D4AF37] rotate-45"></div>

        {/* Core */}
        <div className="absolute inset-[5px] rounded-full bg-[#1C1917] dark:bg-[#2A2A34] flex items-center justify-center border border-[#B88B4A]/50">
          <span className="font-serif font-bold text-xs text-[#FAF8F5]">
            {initial}
          </span>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span className={`font-serif tracking-[0.2em] font-bold text-[#1C1917] dark:text-white ${currentSize.text} leading-tight`}>
          {brandName.toUpperCase()}
        </span>
        {showSubtitle && (
          <span className={`font-sans tracking-[0.3em] uppercase font-semibold text-[#8C6428] dark:text-[#D4AF37] ${currentSize.sub}`}>
            FINE JEWELRY
          </span>
        )}
      </div>
    </div>
  );
};

