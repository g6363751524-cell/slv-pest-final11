import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  price: string;
  href: string;
  titleColor: string;
  accentColor: string;
  glowColor: string;
  borderClass: string;
  envImage: string;
  liveIcon: string;
  deadIcon: string;
}

export const servicesData: ServiceCardData[] = [
  // Row 1 (Cards 1 - 5)
  {
    id: 'cockroach',
    title: 'Cockroach Control',
    description: 'Keep your kitchen and living spaces cockroach free.',
    price: '₹599',
    href: '/services/cockroach-control',
    titleColor: '#F59E0B', // amber orange
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    borderClass: 'border-amber-500/40 hover:border-amber-400',
    envImage: '/service-cards/cockroach-env.png',
    liveIcon: '/service-cards/cockroach-hex-live.png',
    deadIcon: '/service-cards/cockroach-hex-dead.png',
  },
  {
    id: 'ant',
    title: 'Ant Control',
    description: 'Eliminate ants and keep your space pest-free.',
    price: '₹499',
    href: '/services/ant-control',
    titleColor: '#F6C453', // warm gold
    accentColor: '#F6C453',
    glowColor: 'rgba(246, 196, 83, 0.35)',
    borderClass: 'border-[#F6C453]/40 hover:border-[#F6C453]',
    envImage: '/service-cards/ant-env.png',
    liveIcon: '/service-cards/ant-hex-live.png',
    deadIcon: '/service-cards/ant-hex-dead.png',
  },
  {
    id: 'bedbug',
    title: 'Bed Bug Treatments',
    description: 'Remove bed bugs and get restful sleep again.',
    price: '₹999',
    href: '/services/bed-bugs',
    titleColor: '#4ADE80', // sage green
    accentColor: '#4ADE80',
    glowColor: 'rgba(74, 222, 128, 0.35)',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400',
    envImage: '/service-cards/bedbug-env.png',
    liveIcon: '/service-cards/bedbug-hex-live.png',
    deadIcon: '/service-cards/bedbug-hex-dead.png',
  },
  {
    id: 'fleas',
    title: 'Fleas Control',
    description: 'Effective treatment for fleas in homes and pet areas.',
    price: '₹799',
    href: '/services/fleas',
    titleColor: '#FB7185', // dusty rose
    accentColor: '#FB7185',
    glowColor: 'rgba(251, 113, 133, 0.35)',
    borderClass: 'border-rose-400/40 hover:border-rose-400',
    envImage: '/service-cards/fleas-env.png',
    liveIcon: '/service-cards/fleas-hex-live.png',
    deadIcon: '/service-cards/fleas-hex-dead.png',
  },
  {
    id: 'flies',
    title: 'Flies Control',
    description: 'Keep your space free from flies and maintain cleanliness.',
    price: '₹499',
    href: '/services/fly-control',
    titleColor: '#38BDF8', // steel blue
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    borderClass: 'border-sky-400/40 hover:border-sky-400',
    envImage: '/service-cards/flies-env.png',
    liveIcon: '/service-cards/flies-hex-live.png',
    deadIcon: '/service-cards/flies-hex-dead.png',
  },

  // Row 2 (Cards 6 - 10)
  {
    id: 'mosquito',
    title: 'Mosquito Control',
    description: 'Reduce mosquito breeding and enjoy a healthier space.',
    price: '₹799',
    href: '/services/mosquitoes',
    titleColor: '#2DD4BF', // aqua teal
    accentColor: '#2DD4BF',
    glowColor: 'rgba(45, 212, 191, 0.35)',
    borderClass: 'border-teal-400/40 hover:border-teal-400',
    envImage: '/service-cards/mosquito-env.png',
    liveIcon: '/service-cards/mosquito-hex-live.png',
    deadIcon: '/service-cards/mosquito-hex-dead.png',
  },
  {
    id: 'rodent',
    title: 'Rodent Management',
    description: 'Prevent and control rats and mice effectively.',
    price: '₹699',
    href: '/services/rodents',
    titleColor: '#60A5FA', // blue
    accentColor: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.35)',
    borderClass: 'border-blue-400/40 hover:border-blue-400',
    envImage: '/service-cards/rodent-env.png',
    liveIcon: '/service-cards/rodent-hex-live.png',
    deadIcon: '/service-cards/rodent-hex-dead.png',
  },
  {
    id: 'termite',
    title: 'Termite Treatment',
    description: 'Protect your property from termite damage.',
    price: '₹899',
    href: '/services/termites',
    titleColor: '#FBBF24', // earth brown / warm amber gold
    accentColor: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.35)',
    borderClass: 'border-amber-400/40 hover:border-amber-400',
    envImage: '/service-cards/termite-env.png',
    liveIcon: '/service-cards/termite-hex-live.png',
    deadIcon: '/service-cards/termite-hex-dead.png',
  },
  {
    id: 'tick',
    title: 'Tick Control',
    description: 'Protect your home and family from ticks.',
    price: '₹799',
    href: '/services/tick-control',
    titleColor: '#F87171', // burgundy red
    accentColor: '#F87171',
    glowColor: 'rgba(248, 113, 113, 0.35)',
    borderClass: 'border-red-400/40 hover:border-red-400',
    envImage: '/service-cards/tick-env.png',
    liveIcon: '/service-cards/tick-hex-live.png',
    deadIcon: '/service-cards/tick-hex-dead.png',
  },
  {
    id: 'woodborer',
    title: 'Wood Borer Treatment',
    description: 'Protect your wooden furniture and structures.',
    price: '₹899',
    href: '/services/wood-borer-control',
    titleColor: '#C084FC', // deep violet
    accentColor: '#C084FC',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    borderClass: 'border-purple-400/40 hover:border-purple-400',
    envImage: '/service-cards/woodborer-env.png',
    liveIcon: '/service-cards/woodborer-hex-live.png',
    deadIcon: '/service-cards/woodborer-hex-dead.png',
  },
];

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="py-20 lg:py-28 relative bg-[#07080b] overflow-hidden">
      {/* Subtle Dark Honeycomb Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="slv-services-honeycomb-pattern" width="56" height="96" patternUnits="userSpaceOnUse">
              <path
                d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 64 L56 80 L56 112 L28 128 L0 112 L0 80 Z"
                fill="none"
                stroke="#F6C453"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#slv-services-honeycomb-pattern)" />
        </svg>
      </div>

      {/* Subtle Ambient Glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#FFE08A]/[0.025] rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#D99A18]/[0.02] rounded-full blur-[160px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase">
                PEST CONTROL SERVICES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12] font-heading">
              THE RIGHT APPROACH FOR{' '}
              <span className="slv-gold-text">EVERY PEST.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl font-normal">
              Explore dedicated pest control services designed for homes, PGs, offices, and commercial properties in Bangalore.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="/contact"
              className="slv-btn-secondary px-5 py-2.5 text-xs font-bold gap-2 inline-flex items-center"
            >
              <span>Book Free Inspection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 10-Card Grid: 5 columns x 2 rows on wide desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {servicesData.map((item, idx) => {
            return (
              <a
                key={item.id}
                href={item.href}
                aria-label={`View ${item.title} details, starting from ${item.price}`}
                className={`group relative rounded-[24px] sm:rounded-[26px] overflow-hidden transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 border bg-[#0b0c10] shadow-[0_10px_30px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.85)] min-h-[390px] sm:min-h-[420px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C453] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080b] ${item.borderClass}`}
                style={
                  {
                    '--glow-color': item.glowColor,
                  } as React.CSSProperties
                }
              >
                {/* 1. Left Section: Pest-themed environmental image */}
                <div className="absolute inset-y-0 left-0 w-[58%] overflow-hidden pointer-events-none">
                  <img
                    src={item.envImage}
                    alt=""
                    data-image-component="true"
                    className="w-full h-full object-cover object-left brightness-[0.88] contrast-[1.08] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60" />
                </div>

                {/* 2. Right Section: Dark glassmorphic panel with diagonal division */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#0d0e13]/98 via-[#090a0e]/98 to-[#06070a] pointer-events-none transition-colors duration-300"
                  style={{
                    clipPath: 'polygon(36% 0%, 100% 0%, 100% 100%, 18% 100%)',
                  }}
                />

                {/* Glowing Diagonal Separator Line */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <line
                    x1="36"
                    y1="0"
                    x2="18"
                    y2="100"
                    stroke={item.accentColor}
                    strokeWidth="0.8"
                    strokeOpacity="0.45"
                  />
                </svg>

                {/* Ambient Glow in Accent Color on Hover */}
                <div
                  className="absolute inset-0 rounded-[24px] sm:rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 20px ${item.glowColor}, 0 0 25px ${item.glowColor}`,
                  }}
                />

                {/* 3. Glossy Gold-Orange Hexagonal Frame with Live/Dead Pest Hover Interaction */}
                <div className="absolute left-[3%] sm:left-[4%] top-[18%] sm:top-[20%] w-[32%] max-w-[110px] aspect-[125/135] z-20 flex items-center justify-center pointer-events-none">
                  {/* Subtle Ambient Radial Glow behind hexagon */}
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-25 group-hover:opacity-55 transition-opacity duration-300"
                    style={{ backgroundColor: item.accentColor }}
                  />

                  {/* Live Pest Icon (default state) */}
                  <img
                    src={item.liveIcon}
                    alt={`${item.title} live illustration`}
                    data-image-component="true"
                    loading="lazy"
                    className="w-full h-full object-contain relative z-10 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:rotate-1"
                  />

                  {/* Dead Pest Icon (smooth transition on card hover) */}
                  <img
                    src={item.deadIcon}
                    alt={`${item.title} eliminated illustration`}
                    data-image-component="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain z-20 transition-all duration-300 ease-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                  />
                </div>

                {/* 4. Content Panel: Title, Description, Divider, Price, and Button */}
                <div className="relative z-20 ml-auto w-[62%] sm:w-[64%] pl-2 sm:pl-3.5 pr-0.5 py-0.5 flex flex-col justify-between h-full min-h-[360px] sm:min-h-[380px]">
                  {/* Top: Title & Description */}
                  <div>
                    <h3
                      className="text-base sm:text-[17px] font-extrabold tracking-tight font-heading leading-tight mb-2 transition-all duration-200 group-hover:brightness-110"
                      style={{ color: item.titleColor }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-zinc-300 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Middle: Thin Accent-Colored Divider */}
                  <div
                    className="w-8 h-[2px] rounded-full my-3 sm:my-3.5 transition-all duration-300 group-hover:w-14"
                    style={{ backgroundColor: item.accentColor }}
                  />

                  {/* Bottom: Starting Price & Button */}
                  <div className="space-y-3 sm:space-y-3.5 mt-auto">
                    <div>
                      <div className="text-[11px] font-medium text-zinc-400 tracking-wide">
                        Starting from
                      </div>
                      <div className="text-2xl sm:text-[26px] font-black text-[#F6C453] tracking-tight leading-none mt-1 drop-shadow-[0_2px_8px_rgba(246,196,83,0.3)]">
                        {item.price}
                      </div>
                    </div>

                    <div className="pt-0.5">
                      <span className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0c10] border border-amber-500/60 text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-[0_2px_12px_rgba(0,0,0,0.6)] group-hover:border-[#F6C453] group-hover:text-[#F6C453] group-hover:shadow-[0_0_16px_rgba(246,196,83,0.35)] transition-all duration-300">
                        <span>View Service</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-amber-400" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
