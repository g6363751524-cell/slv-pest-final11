import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const zones = [
  {
    id: 'north-bangalore',
    name: 'NORTH BANGALORE',
    areas: 'Yelahanka, Hebbal, RT Nagar, Sahakar Nagar and surrounding sectors',
  },
  {
    id: 'east-bangalore',
    name: 'EAST BANGALORE',
    areas: 'Whitefield, Indiranagar, Marathahalli, KR Puram and surrounding sectors',
  },
  {
    id: 'west-bangalore',
    name: 'WEST BANGALORE',
    areas: 'Nagasandra, Yeshwanthpur, Rajajinagar, Basaveshwaranagar, Andarahalli',
  },
  {
    id: 'south-bangalore',
    name: 'SOUTH BANGALORE',
    areas: 'Jayanagar, JP Nagar, BTM Layout, Koramangala, Electronic City',
  },
  {
    id: 'central-bangalore',
    name: 'CENTRAL BANGALORE',
    areas: 'Malleshwaram, MG Road, Richmond Town, Shanthi Nagar and central corridors',
  },
  {
    id: 'outer-bangalore',
    name: 'OUTER BANGALORE',
    areas: 'Sarjapur Road, Devanahalli, Kanakapura Road and extended industrial zones',
  },
];

export const ServiceAreas: React.FC = () => {
  return (
    <section id="service-areas" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and View All Areas Button */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase">
                SERVICE AREAS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
              BANGALORE SERVICE <span className="slv-gold-text">AREAS</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl font-normal">
              We provide professional pest control services across Bangalore.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="/service-areas"
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.1] text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>View All Service Areas</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F6C453]" />
            </a>
            <a
              href="/contact"
              className="slv-btn-secondary px-5 py-2.5 text-xs font-bold gap-2"
            >
              <span>Book Local Inspection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6 Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {zones.map((zone, idx) => (
            <a
              key={idx}
              href={`/service-areas#${zone.id}`}
              className="slv-card group rounded-2xl p-5 sm:p-6 bg-[#121316] border border-zinc-800/80 hover:border-[#E5A93C]/50 hover:bg-white/[0.02] transition flex items-center justify-between block"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5 text-[#E5A93C]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white text-base font-bold tracking-tight truncate group-hover:text-[#F6C453] transition-colors">
                    {zone.name}
                  </h3>
                  <p className="text-zinc-400 text-xs truncate mt-0.5">
                    {zone.areas}
                  </p>
                </div>
              </div>

              <div className="text-zinc-500 group-hover:text-[#E5A93C] group-hover:translate-x-1 transition shrink-0 ml-3">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
