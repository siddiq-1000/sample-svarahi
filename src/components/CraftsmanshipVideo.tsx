import React, { useState, useRef } from 'react';
import { BrandConfig } from '../types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  Flame,
  Diamond,
  Scissors
} from 'lucide-react';

interface CraftsmanshipVideoProps {
  brandConfig: BrandConfig;
}

export const CraftsmanshipVideo: React.FC<CraftsmanshipVideoProps> = ({ brandConfig }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 0,
      title: 'Molten Gold Casting',
      subtitle: 'Crucible temperatures exceeding 1064°C',
      icon: Flame,
      time: '0:00',
      description: 'Pure 24K and 22K alloy molten bullion poured into precision lost-wax plaster moulds.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-jeweler-holding-a-gold-ring-41226-large.mp4',
      poster: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 1,
      title: 'Micro-Pavé Gem Setting',
      subtitle: 'Under 40x microscope magnification',
      icon: Diamond,
      time: '0:35',
      description: 'Master gemsetters securing uncut polki and calibrated diamonds with microscopic gold beads.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-jeweler-cleaning-a-ring-in-a-workshop-41228-large.mp4',
      poster: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Chased Silver Filigree',
      subtitle: 'Hand-drawn 925 sterling wire',
      icon: Scissors,
      time: '1:10',
      description: 'Hair-thin sterling silver wire twisted into delicate floral patterns, hand-polished to perfection.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-jeweler-holding-a-gold-ring-41226-large.mp4',
      poster: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const selectChapter = (index: number) => {
    setActiveChapter(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="craft-video-section" className="py-14 sm:py-18 bg-[#FAF8F5] dark:bg-[#101014] border-b border-[#EAE5DC] dark:border-[#2E2E38] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#18181D] border border-[#D6CEBE] dark:border-[#383844] text-[#8C6428] dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5 text-[#B88B4A] dark:text-[#D4AF37]" />
            Cinematic Workshop Experience
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-white tracking-tight">
            Inside the {brandConfig.brandName} Atelier
          </h2>
          <div className="w-12 h-0.5 bg-[#B88B4A] dark:bg-[#D4AF37] mx-auto mt-2 mb-3"></div>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A1A1AA]">
            Witness the sacred transformation of raw bullion ingots into fine bespoke jewelry.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="rounded-2xl overflow-hidden border border-[#EAE5DC] dark:border-[#2E2E38] bg-white dark:bg-[#18181D] shadow-xs p-2 sm:p-3">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={chapters[activeChapter].videoUrl}
              poster={chapters[activeChapter].poster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Video Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

            {/* Top Bar Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs font-serif font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B88B4A]" />
                  Chapter {activeChapter + 1}: {chapters[activeChapter].title}
                </span>
              </div>

              <span className="text-xs font-mono text-white/80 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10 hidden sm:inline-block">
                4K Ultra-HD Atelier Master
              </span>
            </div>

            {/* Floating Bottom Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-[#B88B4A] text-white hover:bg-[#9E7432] transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/20 text-white hover:text-[#B88B4A] transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="text-xs text-white">
                  <span className="font-semibold">{chapters[activeChapter].title}</span>
                  <span className="text-[#A8A29E] hidden md:inline ml-2 text-[11px]">— {chapters[activeChapter].subtitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-2 rounded-lg bg-white/20 text-white hover:text-[#B88B4A] transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chapter Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            {chapters.map((chap, idx) => {
              const Icon = chap.icon;
              const isSelected = activeChapter === idx;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => selectChapter(idx)}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF8F5] dark:bg-[#202028] border-[#B88B4A] dark:border-[#D4AF37] shadow-xs ring-1 ring-[#B88B4A] dark:ring-[#D4AF37]'
                      : 'bg-white dark:bg-[#18181D] border-[#EAE5DC] dark:border-[#282834] hover:border-[#D6CEBE]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#B88B4A] dark:text-[#D4AF37]' : 'text-[#78716C] dark:text-[#A1A1AA]'}`} />
                      <span className="font-serif text-sm font-bold text-[#1C1917] dark:text-white">
                        {chap.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#A8A29E] font-mono">{chap.time}</span>
                  </div>
                  <p className="text-xs text-[#78716C] dark:text-[#A1A1AA] line-clamp-2">
                    {chap.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
