import React from 'react';
import { Shield, ArrowRight, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const bgUrl = '/hero-banner.png';

  return (
    <section 
      id="hero" 
      className="relative z-10 -mb-px min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#090a0c] bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
      }}
    >
      {/* Cinematic Dark Overlay with 20–25% reduced darkness for maximum clarity & vibrancy */}
      {/* Horizontal gradient: soft protection for text readability on the left, clear view of the living room on the right */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#090a0c]/75 via-[#090a0c]/60 sm:via-[#090a0c]/50 to-[#090a0c]/20 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Vertical gradient: gentle blend for header and bottom boundary */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#090a0c]/65 via-transparent to-[#090a0c]/80 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Subtle warm amber ambient spotlight in background */}
      <div 
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-8 flex flex-col items-start pr-0 lg:pr-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-6 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase">
                Cleaner Spaces. Happier Lives.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[66px] font-black text-white tracking-tight leading-[1.06] mb-6 drop-shadow-md">
              PESTS OUT.
              <br />
              <span className="slv-gold-text">PEACE IN.</span>
            </h1>

            {/* Paragraph Subtitle */}
            <p className="text-zinc-200 sm:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl mb-6 drop-shadow-sm font-normal">
              Clean, safe and comfortable spaces for your home and business.
            </p>

            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121316]/90 border border-zinc-700/80 text-xs text-zinc-200 mb-8 backdrop-blur-md shadow-lg">
              <Shield className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span className="font-semibold">Residential & Commercial Pest Control</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="/contact"
                className="slv-btn-primary px-7 py-3.5 text-sm font-bold gap-2.5"
              >
                <span>Book an Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="slv-btn-secondary px-6 py-3.5 text-sm font-bold gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-zinc-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

