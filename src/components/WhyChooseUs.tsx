import React from 'react';
import { ShieldCheck, Trophy, Building2, ShieldAlert } from 'lucide-react';

const reasons = [
  {
    icon: ShieldAlert,
    title: 'Safe & Responsible',
    description: 'Appropriate methods with proper application.',
  },
  {
    icon: ShieldCheck,
    title: 'Long-Lasting Protection',
    description: '120-day warranty for peace of mind.',
  },
  {
    icon: Trophy,
    title: 'Experienced Team',
    description: 'Trained, professional and reliable.',
  },
  {
    icon: Building2,
    title: 'Residential & Commercial',
    description: 'Solutions for every space.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-20 lg:py-28 relative bg-[#0a0b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase">
                WHY CHOOSE US
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12] mb-6">
              PROTECTION
              <br />
              THAT FITS
              <br />
              <span className="slv-gold-text">YOUR SPACE.</span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              Homes, apartments, offices, restaurants, hotels, PGs and more — our pest control solutions are designed for every space.
            </p>
          </div>

          {/* Right Column: 2x2 Grid of Feature Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="slv-card rounded-2xl p-6 bg-[#121316] border border-zinc-800/80 hover:border-zinc-700 transition flex flex-col justify-start"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/20 flex items-center justify-center mb-5 shrink-0">
                      <Icon className="w-5 h-5 text-[#E5A93C]" />
                    </div>

                    <h3 className="text-white text-base font-bold tracking-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
