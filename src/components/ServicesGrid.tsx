import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Bug,
  Layers,
  PawPrint,
  Wind,
  Share2,
  ShieldAlert,
} from 'lucide-react';

interface ServiceItem {
  icon: React.ElementType | string;
  hoverIcon?: string;
  isCustomImg?: boolean;
  isRodentCard?: boolean;
  isCockroachCard?: boolean;
  isAntCard?: boolean;
  isTickCard?: boolean;
  title: string;
  subheading?: {
    line1: string;
    line2: string;
  };
  description: string;
  price: string;
  startingLabel?: string;
  href: string;
}

const WarningSymbol: React.FC<{ id: string }> = ({ id }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_8px_rgba(245,158,11,0.85)] filter"
  >
    <defs>
      <linearGradient id={`warn-grad-${id}`} x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="35%" stopColor="#FBBF24" />
        <stop offset="75%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id={`warn-gloss-${id}`} x1="12" y1="3" x2="12" y2="13" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
      </linearGradient>
      <filter id={`warn-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.7" />
      </filter>
    </defs>
    {/* 3D Glossy Yellow-Gold Warning Triangle */}
    <path
      d="M10.268 3.866a2 2 0 013.464 0l7.856 13.608A2 2 0 0119.856 20.5H4.144a2 2 0 01-1.732-3.026L10.268 3.866z"
      fill={`url(#warn-grad-${id})`}
      stroke="#78350F"
      strokeWidth="0.85"
      filter={`url(#warn-shadow-${id})`}
    />
    {/* Glossy Reflection Sheen */}
    <path
      d="M12 4.8L5.2 16.5C8 14.5 13 13.5 18.8 16.5L12 4.8Z"
      fill={`url(#warn-gloss-${id})`}
      opacity="0.65"
    />
    {/* High-Contrast Exclamation Mark */}
    <path
      d="M12 8.5v5"
      stroke="#1E1303"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="16.8"
      r="1.25"
      fill="#1E1303"
    />
  </svg>
);

const ProhibitedSymbol: React.FC<{ id: string }> = ({ id }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[58px] h-[58px] sm:w-[80px] sm:h-[80px] drop-shadow-[0_0_10px_rgba(239,68,68,0.95)] drop-shadow-[0_0_22px_rgba(220,38,38,0.65)] filter"
  >
    <defs>
      <linearGradient id={`prohib-grad-${id}`} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF4D4D" />
        <stop offset="40%" stopColor="#EF4444" />
        <stop offset="80%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <linearGradient id={`prohib-gloss-${id}`} x1="32" y1="4" x2="32" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <filter id={`prohib-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.75" />
      </filter>
    </defs>
    {/* Outer Red Ring */}
    <circle
      cx="32"
      cy="32"
      r="25"
      fill="none"
      stroke={`url(#prohib-grad-${id})`}
      strokeWidth="5.5"
      filter={`url(#prohib-shadow-${id})`}
    />
    {/* Diagonal Slash crossing out the pest */}
    <line
      x1="14.3"
      y1="14.3"
      x2="49.7"
      y2="49.7"
      stroke={`url(#prohib-grad-${id})`}
      strokeWidth="5.5"
      strokeLinecap="round"
      filter={`url(#prohib-shadow-${id})`}
    />
    {/* Glossy Light Reflection Sheen on upper rim */}
    <path
      d="M11 26A25 25 0 0 1 53 26"
      fill="none"
      stroke={`url(#prohib-gloss-${id})`}
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

const services: ServiceItem[] = [
  {
    icon: '/ant-icon.png',
    isCustomImg: true,
    isAntCard: true,
    title: 'Ant Control',
    subheading: {
      line1: 'STOP ANTS AT THE SOURCE.',
      line2: 'COLONY ERADICATION.',
    },
    description: 'Targeted baiting & pheromone trail elimination',
    price: '₹499',
    href: '/services/ant-control',
  },
  {
    icon: '/bedbug.png',
    isCustomImg: true,
    title: 'Bed Bug Treatments',
    subheading: {
      line1: 'BED BUGS OUT.',
      line2: 'SLEEP PEACEFULLY.',
    },
    description: 'Deep thermal & chemical mattress-safe eradication',
    price: '₹999',
    href: '/services/bed-bugs',
  },
  {
    icon: '/cockroach-icon.png',
    isCustomImg: true,
    isCockroachCard: true,
    title: 'Cockroach Control',
    subheading: {
      line1: 'CLEAN & HYGIENIC SPACES.',
      line2: 'ODORLESS GEL BAITING.',
    },
    description: 'Kitchen gel baiting & drain flush-out service',
    price: '₹599',
    href: '/services/cockroach-control',
  },
  {
    icon: PawPrint,
    title: 'Fleas Control',
    subheading: {
      line1: 'STOP ITCHING.',
      line2: 'PET & CARPET RELIEF.',
    },
    description: 'Pet-safe indoor carpet, rug & upholstery sanitization',
    price: '₹799',
    href: '/services/fleas',
  },
  {
    icon: Wind,
    title: 'Flies Control',
    subheading: {
      line1: 'CLEAN AIR & DRAINS.',
      line2: 'LARVICIDE & BARRIER.',
    },
    description: 'Bio-drain flushing, fruit fly & house fly perimeter misting',
    price: '₹499',
    href: '/services/fly-control',
  },
  {
    icon: Wind,
    title: 'Mosquito Control',
    subheading: {
      line1: 'DENGUE & MALARIA DEFENSE.',
      line2: 'MISTING & LARVICIDE.',
    },
    description: 'Larvicide breeding control & outdoor barrier misting',
    price: '₹799',
    href: '/services/mosquitoes',
  },
  {
    icon: '/rat-icon.png',
    isCustomImg: true,
    isRodentCard: true,
    title: 'Rodent Management',
    subheading: {
      line1: 'ENTRY POINT SEALING.',
      line2: 'TAMPER-PROOF BAITING.',
    },
    description: 'Tamper-proof bait stations & burrow exclusion sealing',
    price: '₹699',
    href: '/services/rodents',
  },
  {
    icon: Layers,
    title: 'Termite Treatment',
    subheading: {
      line1: 'STRUCTURAL PROTECTION.',
      line2: 'DRILL-FILL-SEAL BARRIER.',
    },
    description: 'Drill-fill-seal subterranean barrier with warranty',
    price: '₹899',
    href: '/services/termites',
  },
  {
    icon: '/tick-icon.png',
    isCustomImg: true,
    isTickCard: true,
    title: 'Tick Control',
    subheading: {
      line1: 'YARD & HOME DEFENSE.',
      line2: 'KENNEL & LAWN CARE.',
    },
    description: 'Yard border spraying & indoor perimeter defense',
    price: '₹799',
    href: '/services/tick-control',
  },
  {
    icon: Layers,
    title: 'Wood Borer Treatment',
    subheading: {
      line1: 'WOODWORK DEFENSE.',
      line2: 'SYRINGE INJECTION.',
    },
    description: 'Specialized chemical injection into exit holes & timbers',
    price: '₹899',
    href: '/services/wood-borer-control',
  },
];

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="py-20 lg:py-28 relative bg-[#0a0b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase">
                PEST CONTROL SERVICES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
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
              className="slv-btn-secondary px-5 py-2.5 text-xs font-bold gap-2"
            >
              <span>Book Free Inspection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 10-Card Grid in strict alphabetical order: 5 columns x 2 rows on large desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {services.map((item, idx) => {
            const isAnt = item.isAntCard || item.href === '/services/ant-control';
            const isBedBug = item.href === '/services/bed-bugs';
            const isRodent = item.isRodentCard || item.href === '/services/rodents';
            const isCockroach = item.isCockroachCard || item.href === '/services/cockroach-control';
            const isTick = item.isTickCard || item.href === '/services/tick-control';

            return (
              <a
                key={idx}
                href={item.href}
                className={`slv-card group rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-row items-stretch relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C453] ${
                  isAnt
                    ? 'bg-gradient-to-br from-[#12161a] via-[#101317] to-[#0c0f12] border border-cyan-500/35 hover:border-cyan-400/70 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_26px_rgba(34,211,238,0.22),0_10px_32px_rgba(0,0,0,0.65)] ring-1 ring-cyan-500/15 hover:ring-cyan-400/35'
                    : isTick
                    ? 'bg-gradient-to-br from-[#181215] via-[#131012] to-[#0f0d0f] border border-rose-900/40 hover:border-rose-600/70 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_26px_rgba(225,29,72,0.22),0_10px_32px_rgba(0,0,0,0.65)] ring-1 ring-rose-900/20 hover:ring-rose-600/35'
                    : isRodent
                    ? 'bg-gradient-to-br from-[#11151a] via-[#101317] to-[#0c0e12] border border-slate-500/40 hover:border-sky-400/70 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_26px_rgba(70,130,180,0.25),0_10px_32px_rgba(0,0,0,0.65)] ring-1 ring-slate-500/15 hover:ring-sky-400/35'
                    : isBedBug
                    ? 'bg-gradient-to-br from-[#181613] via-[#121316] to-[#0f1013] border border-[#E5A93C]/50 hover:border-[#F6C453] shadow-[0_0_20px_rgba(229,169,60,0.12),0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(246,196,83,0.25),0_12px_36px_rgba(0,0,0,0.7)] ring-1 ring-[#E5A93C]/20 hover:ring-[#F6C453]/40'
                    : isCockroach
                    ? 'bg-gradient-to-br from-[#181613] via-[#121316] to-[#0f1013] border border-[#E5A93C]/40 hover:border-[#F6C453] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_26px_rgba(246,196,83,0.22),0_10px_32px_rgba(0,0,0,0.65)] ring-1 ring-[#E5A93C]/15 hover:ring-[#F6C453]/35'
                    : 'bg-gradient-to-br from-[#16171a] via-[#121316] to-[#0f1013] border border-[#E5A93C]/30 hover:border-[#E5A93C]/70 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(229,169,60,0.18),0_10px_32px_rgba(0,0,0,0.6)] ring-1 ring-[#E5A93C]/10 hover:ring-[#E5A93C]/30'
                }`}
              >
                {/* Subtle ambient gold/aqua/burgundy/steel-blue glow in the icon corner */}
                <div
                  className={`absolute -left-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br to-transparent blur-2xl pointer-events-none transition-all duration-500 ${
                    isAnt
                      ? 'from-cyan-500/20 group-hover:from-cyan-400/35'
                      : isTick
                      ? 'from-rose-900/25 group-hover:from-rose-600/35'
                      : isRodent
                      ? 'from-sky-700/20 group-hover:from-sky-500/35'
                      : isBedBug || isCockroach
                      ? 'from-[#E5A93C]/20 group-hover:from-[#F6C453]/30'
                      : 'from-[#E5A93C]/10 group-hover:from-[#E5A93C]/20'
                  }`}
                />

                {/* Inner subtle illumination along card top edge */}
                <div
                  className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent pointer-events-none ${
                    isAnt
                      ? 'via-cyan-400/50 to-transparent'
                      : isTick
                      ? 'via-rose-600/40 to-transparent'
                      : isRodent
                      ? 'via-sky-400/40 to-transparent'
                      : isBedBug || isCockroach
                      ? 'via-[#F6C453]/60 to-transparent'
                      : 'via-[#F6C453]/40 to-transparent'
                  }`}
                />

                {/* Left section: exactly one-third (33.33%) of card width, icon centered vertically and horizontally */}
                <div className="w-[33.333%] shrink-0 flex items-center justify-center p-1 sm:p-2 relative z-10">
                  <div
                    className={`absolute inset-2 rounded-full blur-xl pointer-events-none transition-all duration-300 ${
                      isAnt
                        ? 'bg-cyan-500/20 group-hover:bg-cyan-400/35'
                        : isCockroach
                        ? 'bg-amber-500/20 group-hover:bg-amber-400/35'
                        : isTick
                        ? 'bg-rose-900/25 group-hover:bg-rose-600/35'
                        : isRodent
                        ? 'bg-sky-600/20 group-hover:bg-sky-400/35'
                        : 'bg-[#E5A93C]/10 group-hover:bg-[#E5A93C]/20'
                    }`}
                  />

                  {/* Pest Icon with Warning Symbol and Centered Prohibited Overlay */}
                  <div className="relative flex items-center justify-center w-[68px] h-[68px] sm:w-[92px] sm:h-[92px] shrink-0">
                    {isAnt ? (
                      <img
                        src={item.icon as string}
                        alt={item.title}
                        className="w-[66px] h-[66px] sm:w-[90px] sm:h-[90px] max-w-full max-h-20 sm:max-h-24 object-contain transition-all duration-[250ms] ease-out group-hover:scale-105 group-focus-visible:scale-105 drop-shadow-[0_0_12px_rgba(34,211,238,0.55)] group-hover:drop-shadow-[0_0_24px_rgba(34,211,238,0.85)] relative z-10 motion-reduce:transition-none motion-reduce:transform-none"
                        style={{ transitionDuration: '250ms' }}
                        loading="lazy"
                      />
                    ) : isCockroach ? (
                      <img
                        src={item.icon as string}
                        alt={item.title}
                        className="w-[66px] h-[66px] sm:w-[90px] sm:h-[90px] max-w-full max-h-20 sm:max-h-24 object-contain transition-all duration-[250ms] ease-out group-hover:scale-105 group-focus-visible:scale-105 drop-shadow-[0_0_10px_rgba(245,158,11,0.45)] group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.8)] relative z-10 motion-reduce:transition-none motion-reduce:transform-none"
                        style={{ transitionDuration: '250ms' }}
                        loading="lazy"
                      />
                    ) : isTick ? (
                      <img
                        src={item.icon as string}
                        alt={item.title}
                        className="w-[66px] h-[66px] sm:w-[90px] sm:h-[90px] max-w-full max-h-20 sm:max-h-24 object-contain transition-all duration-[250ms] ease-out group-hover:scale-105 group-focus-visible:scale-105 drop-shadow-[0_0_12px_rgba(190,18,60,0.5)] group-hover:drop-shadow-[0_0_24px_rgba(225,29,72,0.85)] relative z-10 motion-reduce:transition-none motion-reduce:transform-none"
                        style={{ transitionDuration: '250ms' }}
                        loading="lazy"
                      />
                    ) : isRodent ? (
                      <img
                        src={item.icon as string}
                        alt={item.title}
                        className="w-[66px] h-[66px] sm:w-[90px] sm:h-[90px] max-w-full max-h-20 sm:max-h-24 object-contain transition-all duration-[250ms] ease-out group-hover:scale-105 group-focus-visible:scale-105 drop-shadow-[0_0_12px_rgba(70,130,180,0.55)] group-hover:drop-shadow-[0_0_24px_rgba(96,165,250,0.85)] relative z-10 motion-reduce:transition-none motion-reduce:transform-none"
                        style={{ transitionDuration: '250ms' }}
                        loading="lazy"
                      />
                    ) : item.isCustomImg ? (
                      <img
                        src={item.icon as string}
                        alt={item.title}
                        className="w-[66px] h-[66px] sm:w-[86px] sm:h-[86px] max-w-full max-h-20 sm:max-h-24 object-contain transition-all duration-[250ms] ease-out group-hover:scale-105 group-focus-visible:scale-105 drop-shadow-[0_4px_14px_rgba(229,169,60,0.45)] group-hover:drop-shadow-[0_0_22px_rgba(246,196,83,0.7)] relative z-10 motion-reduce:transition-none motion-reduce:transform-none"
                        style={{ transitionDuration: '250ms' }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/25 flex items-center justify-center shrink-0 group-hover:scale-105 group-focus-visible:scale-105 group-hover:border-[#E5A93C]/50 transition-all duration-[250ms] ease-out shadow-[0_0_15px_rgba(229,169,60,0.15)] relative z-10 motion-reduce:transition-none motion-reduce:transform-none">
                        {React.createElement(item.icon as React.ElementType, {
                          className:
                            'w-6 h-6 sm:w-8 sm:h-8 text-[#F6C453] drop-shadow-[0_2px_8px_rgba(229,169,60,0.35)]',
                        })}
                      </div>
                    )}

                    {/* Warning Symbol Badge: Yellow-Gold Warning Triangle at bottom-right corner */}
                    <div
                      className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 z-20 pointer-events-none transition-all duration-[250ms] ease-out opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75 group-focus-visible:opacity-0 group-focus-visible:scale-75 [@media(hover:none)]:group-hover:opacity-100 [@media(hover:none)]:group-hover:scale-100 motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      <WarningSymbol id={`warn-${idx}`} />
                    </div>

                    {/* Prohibited Symbol: Centered glossy red circle with diagonal slash, subtle neon glow */}
                    <div
                      className="absolute inset-0 m-auto flex items-center justify-center z-30 pointer-events-none transition-all duration-[250ms] ease-out opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 [@media(hover:none)]:group-hover:opacity-0 [@media(hover:none)]:group-hover:scale-90 motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      <ProhibitedSymbol id={`prohib-${idx}`} />
                    </div>
                  </div>
                </div>

                {/* Thin vertical gold divider between the two sections */}
                <div
                  className={`w-px self-stretch my-0.5 shrink-0 relative z-10 ${
                    isAnt
                      ? 'bg-gradient-to-b from-cyan-500/25 via-cyan-400/50 to-transparent'
                      : 'bg-gradient-to-b from-[#E5A93C]/20 via-[#E5A93C]/50 to-transparent'
                  }`}
                />

                {/* Right section: remaining two-thirds (66.67%) of card width */}
                <div className="w-[66.667%] shrink-0 flex flex-col justify-between pl-3 sm:pl-3.5 py-0.5 relative z-10">
                  <div>
                    {/* Heading */}
                    <h3 className="text-white text-sm sm:text-base font-bold tracking-tight mb-1 group-hover:text-[#F6C453] transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Description / Subheading */}
                    {item.subheading ? (
                      <div className="text-zinc-300 text-[10px] sm:text-[10.5px] font-semibold tracking-wider uppercase leading-tight mb-2.5">
                        <div className="truncate">{item.subheading.line1}</div>
                        <div className="truncate">{item.subheading.line2}</div>
                      </div>
                    ) : (
                      <p className="text-zinc-400 text-[11px] leading-snug line-clamp-2 mb-2.5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price, starting label, and circular arrow button */}
                  <div className="flex items-end justify-between pt-1 mt-auto gap-1">
                    <div className="min-w-0 pr-1">
                      <span className="text-[9.5px] sm:text-[10px] text-zinc-400 font-medium uppercase tracking-wider block mb-0.5">
                        Starting at
                      </span>
                      <div
                        className="text-base sm:text-lg font-black leading-none text-[#F6C453] tracking-tight drop-shadow-[0_2px_10px_rgba(246,196,83,0.35)]"
                      >
                        {item.price}
                      </div>
                    </div>

                    {/* Circular dark button with thin gold border and gold arrow */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#18191d] border border-[#E5A93C]/40 flex items-center justify-center text-[#F6C453] shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:text-[#F6C453] group-hover:border-[#F6C453]/80 group-hover:bg-[#22242a] group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(229,169,60,0.25)] transition-all shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Clear Button/Link: View All Pest Services */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href="/services"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#F6C453] text-[#0a0b0e] font-black text-sm tracking-wide shadow-lg shadow-[#E5A93C]/20 hover:brightness-110 hover:shadow-[#E5A93C]/30 hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <span>View All Pest Services</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Browse all 10 pest management treatments in Bangalore
          </span>
        </div>
      </div>
    </section>
  );
};
