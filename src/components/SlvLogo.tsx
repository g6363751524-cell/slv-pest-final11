import React from 'react';

interface SlvLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SlvLogo: React.FC<SlvLogoProps> = ({ size = 'md', className = '' }) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-10 h-10';
  const slvTextSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';
  const pestTextSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Gold Shield with Checkmark Emblem */}
      <div className={`relative ${iconSize} shrink-0 filter drop-shadow-[0_2px_10px_rgba(246,196,83,0.4)] transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="slvShieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE08A" />
              <stop offset="50%" stopColor="#F6C453" />
              <stop offset="100%" stopColor="#D99A18" />
            </linearGradient>
            <linearGradient id="slvShieldInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1B1914" />
              <stop offset="100%" stopColor="#0B0C0E" />
            </linearGradient>
          </defs>
          {/* Outer Shield Outline */}
          <path
            d="M20 2.5L4.5 8.5V20.5C4.5 30.2 11.2 39.2 20 41.5C28.8 39.2 35.5 30.2 35.5 20.5V8.5L20 2.5Z"
            fill="url(#slvShieldInner)"
            stroke="url(#slvShieldGold)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner Accent Line */}
          <path
            d="M20 6.5L8 11V20.5C8 28.2 13.2 35.4 20 37.5C26.8 35.4 32 28.2 32 20.5V11L20 6.5Z"
            stroke="url(#slvShieldGold)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Distinct Bold Checkmark inside Shield */}
          <path
            d="M13 21.5L18 26.5L27 15"
            stroke="url(#slvShieldGold)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text Lockup: Bold white "SLV" + Gold "PEST CONTROL" */}
      <div className="flex flex-col select-none">
        <span className={`font-black text-white tracking-tight leading-none ${slvTextSize} font-['Outfit',sans-serif]`}>
          SLV
        </span>
        <span className={`font-bold tracking-[0.2em] text-[#F6C453] uppercase leading-tight mt-0.5 ${pestTextSize}`}>
          Pest Control
        </span>
      </div>
    </div>
  );
};
