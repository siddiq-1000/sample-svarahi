import React, { useState, useRef } from 'react';
import { ZoomIn, Sparkles } from 'lucide-react';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
  lensSize?: number;
  onOpenFullscreen?: () => void;
}

export const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  className = '',
  zoomLevel = 2.5,
  lensSize = 150,
  onOpenFullscreen
}) => {
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imgRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Bounds checking
    if (x < 0 || y < 0 || x > width || y > height) {
      setShowLens(false);
      return;
    }

    setShowLens(true);

    // Center the lens on cursor
    const lensX = x - lensSize / 2;
    const lensY = y - lensSize / 2;
    setLensPosition({ x: lensX, y: lensY });

    // Calculate background position for zoomed image
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;
    setBackgroundPosition({ x: bgX, y: bgY });
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-crosshair group select-none ${className}`}
    >
      {/* Base Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300"
        loading="lazy"
      />

      {/* Magnifier Lens */}
      {showLens && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-[#B88B4A] shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_0_20px_rgba(184,139,74,0.3)] z-30"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            top: `${lensPosition.y}px`,
            left: `${lensPosition.x}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
            backgroundColor: '#FFF'
          }}
        >
          {/* Subtle crosshair and shine */}
          <div className="absolute inset-0 rounded-full border border-white/50 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border-t border-b border-[#B88B4A]/50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 border-l border-r border-[#B88B4A]/50"></div>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-[#B88B4A] bg-white/90 px-1.5 py-0.5 rounded shadow-sm">
            {zoomLevel}x ZOOM
          </span>
        </div>
      )}

      {/* Floating Action Badge - like in sample screenshot */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
        {onOpenFullscreen && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFullscreen();
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-[#FAF8F5] text-[#1C1917] hover:text-[#B88B4A] border border-[#E7E2D9] shadow-md transition-all cursor-pointer"
            title="Expand Fullscreen Inspection"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Subtle indicator for first-time visitors */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#44403C] text-[10px] font-medium border border-[#E7E2D9] shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#B88B4A]" />
          Hover to Magnify
        </span>
      </div>
    </div>
  );
};
