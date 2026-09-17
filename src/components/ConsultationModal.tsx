import React, { useState } from 'react';
import { BrandConfig } from '../types';
import { X, Sparkles, CheckCircle } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandConfig: BrandConfig;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  brandConfig
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'London Mayfair Boutique',
    metalInterest: '22K Royal Bridal Gold',
    date: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#18181D] border border-[#D6CEBE] dark:border-[#383844] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-[#1C1917] dark:text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white hover:bg-[#FAF8F5] dark:hover:bg-[#22222A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center mx-auto mb-4 text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-white mb-2">
              Viewing Appointment Reserved
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA] max-w-sm mx-auto">
              Our Senior Master Goldsmith and Concierge at {brandConfig.brandName} will contact you within 4 business hours with your private salon confirmation.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#B88B4A] dark:text-[#D4AF37]">
                Private Salon Experience
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-white mt-1">
                Book a VIP Viewing at {brandConfig.brandName}
              </h3>
              <p className="text-xs text-[#78716C] dark:text-[#A1A1AA] mt-1 leading-relaxed">
                Meet one-on-one with our artisans to inspect rare gems, custom commission bridal heirlooms, or view private vault collections.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                  Full Name <span className="text-[#B88B4A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    Email Address <span className="text-[#B88B4A]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7911 123456"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    Select Salon
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                  >
                    <option value="London Mayfair">London Mayfair Flagship</option>
                    <option value="Paris Place Vendôme">Paris Place Vendôme</option>
                    <option value="Mumbai High Street">Mumbai Heritage Flagship</option>
                    <option value="Dubai Gold Souk">Dubai Gold & Diamond Park</option>
                    <option value="Virtual Concierge">Virtual Video Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#CBD5E1] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#202028] border border-[#D6CEBE] dark:border-[#383844] focus:border-[#B88B4A] dark:focus:border-[#D4AF37] rounded-lg text-xs text-[#1C1917] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Viewing Request</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
