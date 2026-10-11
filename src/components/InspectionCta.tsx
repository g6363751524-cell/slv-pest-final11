import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export const InspectionCta: React.FC = () => {
  return (
    <section id="cta" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#121317] via-[#15171d] to-[#121317] border border-zinc-800/90 p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden">
          {/* Subtle background glow */}
          <div 
            className="absolute top-0 right-1/4 w-80 h-80 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            {/* Left Column with Big Shield & Copy */}
            <div className="flex flex-col sm:flex-row items-start gap-6 max-w-3xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#E5A93C]/20 to-[#E5A93C]/5 border border-[#E5A93C]/40 flex items-center justify-center shrink-0 shadow-lg shadow-[#E5A93C]/10">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#E5A93C]" strokeWidth={1.75} />
              </div>

              <div>
                <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase block mb-2">
                  FOR A CLEANER, SAFER SPACE.
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.2] mb-3">
                  BOOK AN INSPECTION <span className="slv-gold-text">TODAY.</span>
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
                  Professional pest control for healthier, cleaner and safer spaces.
                </p>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="flex items-center shrink-0">
              <a
                href="/contact"
                className="slv-btn-primary px-7 py-3.5 text-sm font-bold gap-2.5"
              >
                <span>Book an Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
