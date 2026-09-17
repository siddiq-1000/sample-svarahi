import React, { useState } from 'react';
import { BoutiqueLocation as BoutiqueLocationType, BrandConfig } from '../types';
import { SavarthiLogo } from './SavarthiLogo';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Navigation,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';

interface BoutiqueLocationProps {
  brandConfig: BrandConfig;
  onBookAppointmentAtLocation?: (locationName: string) => void;
}

export const BoutiqueLocation: React.FC<BoutiqueLocationProps> = ({
  brandConfig,
  onBookAppointmentAtLocation
}) => {
  const boutiques = brandConfig.boutiques || [];
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string>(boutiques[0]?.id || 'mumbai-zaveri');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const activeBoutique = boutiques.find((b) => b.id === selectedBoutiqueId) || boutiques[0];

  const handleCopyAddress = () => {
    if (!activeBoutique) return;
    const fullText = `${activeBoutique.name}\n${activeBoutique.address}, ${activeBoutique.city}, ${activeBoutique.state} - ${activeBoutique.pincode}, ${activeBoutique.country}\nLandmark: ${activeBoutique.landmark}\nPhone: ${activeBoutique.phone}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  if (!activeBoutique) return null;

  return (
    <section id="boutique-location-section" className="py-16 sm:py-20 bg-[#FAF8F5] dark:bg-[#101014] border-b border-[#EAE5DC] dark:border-[#2E2E38] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B88B4A] dark:text-[#D4AF37] font-bold mb-2">
            <SavarthiLogo brandName={brandConfig.brandName} variant="emblem" size="sm" />
            <span>The Boutiques & Private Salons</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-white tracking-tight mb-3">
            Experience Savarthi In Person
          </h2>
          <div className="w-16 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA] leading-relaxed">
            Step into our heritage Flagship Atelier in Mumbai's historic jewelry precinct or visit our exclusive private salons in Bandra, South Extension New Delhi, and Mayfair London.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {boutiques.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBoutiqueId(b.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedBoutiqueId === b.id
                  ? 'bg-[#1C1917] dark:bg-white text-white dark:text-black shadow-md font-bold'
                  : 'bg-white dark:bg-[#18181F] text-[#78716C] dark:text-[#A1A1AA] border border-[#E7E2D9] dark:border-[#2E2E38] hover:border-[#B88B4A] dark:hover:border-[#D4AF37] hover:text-[#1C1917] dark:hover:text-white'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${selectedBoutiqueId === b.id ? 'text-[#D4AF37] dark:text-[#9E7432]' : 'text-[#78716C]'}`} />
              <span>{b.city}</span>
              {b.isFlagship && (
                <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                  selectedBoutiqueId === b.id ? 'bg-[#B88B4A] dark:bg-[#D4AF37] text-white dark:text-black' : 'bg-[#F2ECE1] dark:bg-[#282834] text-[#8C6428] dark:text-[#D4AF37]'
                }`}>
                  Flagship
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Boutique Details Card */}
        <div className="bg-white dark:bg-[#18181E] rounded-2xl border border-[#EAE5DC] dark:border-[#2E2E38] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Boutique Architecture Image & Badge */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[480px] overflow-hidden group">
            <img
              src={activeBoutique.image}
              alt={activeBoutique.name}
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

            {/* Corner Seal Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for In-Boutique Viewings</span>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#F3E5AB] mb-1">
                {activeBoutique.city} • {activeBoutique.country}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1">
                {activeBoutique.name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2">
                Landmark: {activeBoutique.landmark}
              </p>
            </div>
          </div>

          {/* Right Column: Address, Phone, Hours, Amenities & Direct Actions */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Boutique Name & City */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#B88B4A] dark:text-[#D4AF37] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Official Atelier Location</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-white">
                    {activeBoutique.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#78716C] dark:text-[#A1A1AA] hover:text-[#1C1917] dark:hover:text-white border border-[#E7E2D9] dark:border-[#383848] text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Copy Full Address"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Postal Address Block */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1E26] border border-[#EAE5DC] dark:border-[#2E2E38] mb-6 space-y-2">
                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-[#44403C] dark:text-[#D4D4D8] leading-relaxed">
                    <p className="font-semibold text-[#1C1917] dark:text-white">{activeBoutique.address}</p>
                    <p>{activeBoutique.city}, {activeBoutique.state} – {activeBoutique.pincode}, {activeBoutique.country}</p>
                    <p className="text-xs text-[#78716C] dark:text-[#A1A1AA] mt-1">
                      <strong className="text-[#1C1917] dark:text-white font-medium">Landmark:</strong> {activeBoutique.landmark}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EAE5DC] dark:border-[#282834] flex items-center gap-2 text-xs text-[#78716C] dark:text-[#A1A1AA]">
                  <Clock className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
                  <span>{activeBoutique.hours}</span>
                </div>
              </div>

              {/* Direct Contact Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <a
                  href={`tel:${activeBoutique.phone.replace(/\s+/g, '')}`}
                  className="p-3 rounded-xl bg-white dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38] hover:border-[#B88B4A] dark:hover:border-[#D4AF37] flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#282834] group-hover:bg-[#B88B4A] group-hover:text-white dark:group-hover:bg-[#D4AF37] dark:group-hover:text-black flex items-center justify-center text-[#B88B4A] dark:text-[#D4AF37] transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#78716C] dark:text-[#A1A1AA]">Phone Concierge</div>
                    <div className="text-xs font-bold text-[#1C1917] dark:text-white">{activeBoutique.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${activeBoutique.whatsapp.replace(/\D/g, '')}?text=Hello%20Savarthi%2C%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(activeBoutique.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-[#202028] border border-[#EAE5DC] dark:border-[#2E2E38] hover:border-emerald-500 flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#78716C] dark:text-[#A1A1AA]">WhatsApp Salon</div>
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Direct Chat</div>
                  </div>
                </a>
              </div>

              {/* Boutique Amenities */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-[#1C1917] dark:text-white mb-2.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />
                  <span>In-Boutique Complimentary Services:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  {activeBoutique.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37] flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#F0ECE1] dark:border-[#282834] flex flex-wrap items-center gap-3">
              <a
                href={activeBoutique.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#202028] hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#1C1917] dark:text-white border border-[#D6CEBE] dark:border-[#383848] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-[#78716C]" />
              </a>

              <button
                type="button"
                onClick={() => onBookAppointmentAtLocation && onBookAppointmentAtLocation(activeBoutique.name)}
                className="px-6 py-2.5 rounded-lg bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book In-Store Viewing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
