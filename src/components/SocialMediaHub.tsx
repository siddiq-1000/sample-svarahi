import React, { useState } from 'react';
import { BrandConfig } from '../types';
import { socialFeedPosts, SocialFeedPost } from '../data/jewelryData';
import { SavarthiLogo } from './SavarthiLogo';
import {
  Instagram,
  MessageCircle,
  Share2,
  ExternalLink,
  Heart,
  MessageSquare,
  Sparkles,
  Check,
  Youtube,
  Copy
} from 'lucide-react';

interface SocialMediaHubProps {
  brandConfig: BrandConfig;
}

export const SocialMediaHub: React.FC<SocialMediaHubProps> = ({ brandConfig }) => {
  const [selectedPost, setSelectedPost] = useState<SocialFeedPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Explore ${brandConfig.brandName} Haute Joaillerie & Real-time Bullion Valuation Rates:`;
    
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setShareSuccess('Link copied to clipboard!');
      setTimeout(() => {
        setCopiedLink(false);
        setShareSuccess(null);
      }, 3000);
    }
  };

  return (
    <section id="social-media-section" className="py-16 sm:py-20 bg-[#FBF9F5] dark:bg-[#121216] border-b border-[#EAE5DC] dark:border-[#2E2E38] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B88B4A] dark:text-[#D4AF37] font-bold mb-2">
              <Instagram className="w-4 h-4" />
              <span>Connect With The Atelier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-white tracking-tight">
              Social Media & Lookbook
            </h2>
            <div className="w-16 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] mt-3 mb-2"></div>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA]">
              Join our community of over 140,000 connoisseurs. Follow for daily craftsmanship journeys, bridal couture suites, and pure gold bullion pours.
            </p>
          </div>

          {/* Social Follow Actions Bar */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={brandConfig.socials?.instagram || 'https://instagram.com/savarthijewelry'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs font-semibold shadow-xs hover:opacity-95 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
              <span>@savarthijewelry</span>
            </a>

            <a
              href={brandConfig.socials?.whatsapp || 'https://wa.me/919820088888'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>

            <button
              type="button"
              onClick={() => handleShare('copy')}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C1C24] hover:bg-[#F2ECE1] dark:hover:bg-[#282834] text-[#1C1917] dark:text-white border border-[#D6CEBE] dark:border-[#383848] text-xs font-semibold transition-all cursor-pointer"
              title="Share Page"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#B88B4A] dark:text-[#D4AF37]" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Toast if shared */}
        {shareSuccess && (
          <div className="mb-6 p-3 rounded-xl bg-[#1C1917] dark:bg-[#242430] text-white border border-[#B88B4A] dark:border-[#D4AF37] text-xs flex items-center justify-between animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              {shareSuccess}
            </span>
            <button type="button" onClick={() => setShareSuccess(null)} className="text-[#A1A1AA] hover:text-white">✕</button>
          </div>
        )}

        {/* Instagram Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialFeedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#18181F] border border-[#EAE5DC] dark:border-[#2E2E38] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image with overlay */}
              <div className="relative aspect-square overflow-hidden bg-[#FAF8F5] dark:bg-[#121216]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                {/* Platform Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold">
                    {post.platform === 'instagram' ? <Instagram className="w-3 h-3 text-[#FD1D1D]" /> : <Sparkles className="w-3 h-3 text-[#E60023]" />}
                    <span>{post.tag}</span>
                  </span>
                </div>

                {/* Hover stats */}
                <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity z-10 text-white font-semibold text-xs">
                  <div className="flex items-center gap-1.5 drop-shadow-md">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 drop-shadow-md">
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                {/* Bottom title inside image */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <h4 className="font-serif text-sm font-bold truncate mb-0.5">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-white/80 line-clamp-1">
                    {post.caption}
                  </p>
                </div>
              </div>

              {/* Card Footer with Direct Link */}
              <div className="p-3 bg-white dark:bg-[#18181F] flex items-center justify-between text-xs border-t border-[#EAE5DC] dark:border-[#282834]">
                <span className="text-[11px] text-[#78716C] dark:text-[#A1A1AA] font-medium">
                  {post.platform === 'instagram' ? 'Instagram Reel' : 'Pinterest Moodboard'}
                </span>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-semibold text-[#B88B4A] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <span>View Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Social Sharing Strip */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#181820] border border-[#EAE5DC] dark:border-[#2E2E38] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-11 h-11 rounded-full bg-[#FAF8F5] dark:bg-[#242430] border border-[#EAE5DC] dark:border-[#383848] flex items-center justify-center text-[#B88B4A] dark:text-[#D4AF37] flex-shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1C1917] dark:text-white">
                Share Live Bullion Spot & Haute Collections
              </h4>
              <p className="text-xs text-[#78716C] dark:text-[#A1A1AA]">
                Forward real-time bullion valuations and jewelry inspirations to your family, brides, or collectors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => handleShare('whatsapp')}
              className="px-3.5 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => handleShare('pinterest')}
              className="px-3.5 py-2 rounded-xl bg-[#E60023]/10 hover:bg-[#E60023]/20 text-[#E60023] border border-[#E60023]/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pinterest</span>
            </button>

            <button
              type="button"
              onClick={() => handleShare('x')}
              className="px-3.5 py-2 rounded-xl bg-[#1C1917]/10 dark:bg-white/10 hover:bg-[#1C1917]/20 text-[#1C1917] dark:text-white border border-[#D6CEBE] dark:border-[#3E3E4C] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>𝕏 Post</span>
            </button>

            <button
              type="button"
              onClick={() => handleShare('facebook')}
              className="px-3.5 py-2 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Facebook</span>
            </button>

            <button
              type="button"
              onClick={() => handleShare('copy')}
              className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#202028] text-[#1C1917] dark:text-white border border-[#D6CEBE] dark:border-[#383848] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Post Preview Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white dark:bg-[#181820] rounded-2xl border border-[#D6CEBE] dark:border-[#383848] overflow-hidden shadow-2xl p-6 text-left">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-[#78716C] hover:text-[#1C1917] dark:hover:text-white text-sm font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs text-[#B88B4A] dark:text-[#D4AF37] uppercase font-bold tracking-wider mb-2">
                <Instagram className="w-4 h-4" />
                <span>{selectedPost.tag}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#1C1917] dark:text-white mb-3">
                {selectedPost.title}
              </h3>

              <div className="rounded-xl overflow-hidden aspect-video mb-4 bg-black/10">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] leading-relaxed mb-6">
                {selectedPost.caption}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#EAE5DC] dark:border-[#282834]">
                <span className="text-xs text-[#78716C] dark:text-[#A1A1AA]">
                  {selectedPost.likes} Likes • {selectedPost.comments} Comments
                </span>

                <a
                  href={selectedPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#B88B4A] hover:bg-[#9E7432] dark:bg-[#D4AF37] dark:hover:bg-[#C59B27] text-white dark:text-black font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Open in Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
