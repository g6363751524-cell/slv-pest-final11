import React from 'react';
import { Building2, Target, Users, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Home & Business',
    subtitle: 'Residential & Commercial',
  },
  {
    icon: Target,
    title: '100% Results Oriented',
    subtitle: 'Effective Pest Removal',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    subtitle: 'Trained & Professional',
  },
  {
    icon: ShieldCheck,
    title: '120 Days Warranty',
    subtitle: 'Peace of Mind',
  },
];

export const FeatureBar: React.FC = () => {
  return (
    <section className="py-6 border-y border-white/[0.06] bg-[#0c0d10]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="slv-card rounded-xl p-4 sm:p-5 flex items-center gap-4 bg-[#121316] border border-zinc-800/80 hover:border-zinc-700 transition"
              >
                <div className="w-11 h-11 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#E5A93C]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white text-sm font-bold tracking-tight truncate">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
