import React from 'react';
import { Search, ClipboardList, Syringe, ShieldCheck } from 'lucide-react';

const steps = [
  {
    step: 'STEP 01',
    icon: Search,
    title: 'Inspection',
    description: 'We assess your space and identify the problem.',
  },
  {
    step: 'STEP 02',
    icon: ClipboardList,
    title: 'Custom Plan',
    description: 'We create the right treatment plan.',
  },
  {
    step: 'STEP 03',
    icon: Syringe,
    title: 'Treatment',
    description: 'Safe and effective application.',
  },
  {
    step: 'STEP 04',
    icon: ShieldCheck,
    title: 'Follow-Up',
    description: 'Ongoing support for lasting results.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase">
              HOW IT WORKS
            </span>
            <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
            A SIMPLE PROCESS.
            <br />
            <span className="slv-gold-text">LASTING RESULTS.</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            From inspection to follow-up, we make pest control simple, safe and effective.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="slv-card rounded-2xl p-6 bg-[#121316] border border-zinc-800/80 hover:border-zinc-700 transition flex flex-col items-center text-center relative group"
              >
                {/* Step Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/25 flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#E5A93C]" />
                </div>

                {/* Step indicator */}
                <span className="text-[#E5A93C] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                  {item.step}
                </span>

                {/* Step title */}
                <h3 className="text-white text-base font-bold tracking-tight mb-3">
                  {item.title}
                </h3>

                {/* Step description */}
                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
