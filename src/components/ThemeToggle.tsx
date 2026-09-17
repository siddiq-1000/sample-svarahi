import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { id: ThemeMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'light', label: 'Light Mode', icon: Sun },
    { id: 'dark', label: 'Dark Mode', icon: Moon },
    { id: 'system', label: 'System Default', icon: Laptop }
  ];

  const CurrentIcon = currentTheme === 'dark' ? Moon : currentTheme === 'light' ? Sun : Laptop;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#1E1E24] hover:bg-[#F2ECE1] dark:hover:bg-[#282832] border border-[#EAE5DC] dark:border-[#2E2E38] text-[#1C1917] dark:text-[#F4F4F5] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
        aria-label="Toggle theme mode"
        title={`Theme: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}`}
      >
        <CurrentIcon className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
        <span className="text-xs font-semibold capitalize hidden sm:inline">
          {currentTheme === 'system' ? 'Default' : currentTheme}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-[#18181D] border border-[#EAE5DC] dark:border-[#2E2E38] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A1A1AA] px-2.5 py-1">
            Display Appearance
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = currentTheme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onThemeChange(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF8F5] dark:bg-[#22222A] text-[#B88B4A] dark:text-[#D4AF37] font-semibold'
                    : 'text-[#44403C] dark:text-[#CBD5E1] hover:bg-[#FAF8F5] dark:hover:bg-[#202026]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
