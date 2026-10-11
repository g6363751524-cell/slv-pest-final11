import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMenuStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      setIsMenuOpen(Boolean(customEvent.detail?.open));
    };

    if (typeof document !== 'undefined') {
      setIsMenuOpen(document.body.getAttribute('data-mobile-menu-open') === 'true');
    }

    window.addEventListener('mobile-menu-state-change', handleMenuStateChange);
    return () => {
      window.removeEventListener('mobile-menu-state-change', handleMenuStateChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Container / Fixed Buttons aligned vertically at bottom-right corner */}
      {/* 1. Scroll to Top Button: Positioned directly above floating WhatsApp button, right-edge aligned */}
      <div
        className={`fixed z-40 transition-all duration-300 pointer-events-none ${
          isMenuOpen ? 'opacity-0 hidden' : ''
        }`}
        style={{
          right: '20px',
          bottom: '76px', // 20px (whatsapp bottom) + 42px (whatsapp height) + 14px (spacing) = 76px
        }}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`group w-10 h-10 rounded-full bg-[#121316]/95 border border-zinc-800 text-zinc-400 hover:text-[#FFE08A] hover:border-[#F6C453]/60 hover:bg-[#181920] shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_15px_rgba(246,196,83,0.3)] flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer pointer-events-auto ${
            showBackToTop
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
          }`}
        >
          <ArrowUp className="w-4.5 h-4.5 stroke-[2.25] transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* 2. Floating WhatsApp Chat Button: Fixed at bottom-right corner across desktop, tablet, and mobile */}
      <div
        className={`whatsapp-floating-btn fixed z-40 transition-all duration-200 pointer-events-auto ${
          isMenuOpen ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'
        }`}
        style={{
          right: '20px',
          bottom: '20px',
        }}
      >
        <a
          href="https://wa.me/9180397822"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="group relative flex items-center justify-center w-[42px] h-[42px] rounded-full transition-transform duration-200 ease-out md:hover:scale-110 active:scale-95 drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)] md:hover:drop-shadow-[0_6px_20px_rgba(37,211,102,0.5)] cursor-pointer bg-transparent"
        >
          <img
            src="/whatsapp.png"
            alt="Contact us on WhatsApp"
            className="w-full h-full object-contain filter transition-transform duration-200 ease-out select-none"
            onError={(e) => {
              // Fallback to transparent asset if needed
              (e.currentTarget as HTMLImageElement).src = '/whatsapp-icon-transparent.png';
            }}
          />
        </a>
      </div>
    </>
  );
};
