import React from 'react';
import { ArrowRight, Ear, Eye, AlertTriangle, PackageOpen } from 'lucide-react';

const signs = [
  {
    icon: Ear,
    title: 'Unusual Noises',
    description: 'Scratching or movement in walls or ceilings',
  },
  {
    icon: Eye,
    title: 'Visible Signs',
    description: 'Droppings, damage or pest activity',
  },
  {
    icon: AlertTriangle,
    title: 'Health Concerns',
    description: 'Risk to your family, customers or employees',
  },
  {
    icon: PackageOpen,
    title: 'Property Damage',
    description: 'Structural and material damage over time',
  },
];

export const ProblemSigns: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase">
                SOMETHING ISN'T RIGHT.
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12] mb-6">
              YOU KEEP SEEING
              <br />
              THE SIGNS.
            </h2>

            <div className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 font-normal space-y-3">
              <p>You wonder where they're coming from and how serious the problem is.</p>
              <p>You want to know what's happening and what can actually be done.</p>
            </div>

            <a
              href="#cta"
              className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#F8D279] font-bold text-sm transition group"
            >
              <span>Let's Find Out What's Really Happening.</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: 2x2 Grid of Signs */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {signs.map((item, idx) => {
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
