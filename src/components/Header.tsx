import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Phone } from 'lucide-react';
import { SlvLogo } from './SlvLogo';

const DialerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="5" cy="3.5" r="2.1" fill="currentColor" />
    <circle cx="12" cy="3.5" r="2.1" fill="currentColor" />
    <circle cx="19" cy="3.5" r="2.1" fill="currentColor" />
    <circle cx="5" cy="9.2" r="2.1" fill="currentColor" />
    <circle cx="12" cy="9.2" r="2.1" fill="currentColor" />
    <circle cx="19" cy="9.2" r="2.1" fill="currentColor" />
    <circle cx="5" cy="14.9" r="2.1" fill="currentColor" />
    <circle cx="12" cy="14.9" r="2.1" fill="currentColor" />
    <circle cx="19" cy="14.9" r="2.1" fill="currentColor" />
    <circle cx="12" cy="20.5" r="2.1" fill="currentColor" />
  </svg>
);

export interface NavDropdownItem {
  label: string;
  href: string;
  desc?: string;
}

export const pestControlServices: NavDropdownItem[] = [
  { label: 'Ant Control', href: '/services/ant-control' },
  { label: 'Bed Bug Treatments', href: '/services/bed-bugs' },
  { label: 'Cockroach Control', href: '/services/cockroach-control' },
  { label: 'Fleas Control', href: '/services/fleas' },
  { label: 'Flies Control', href: '/services/fly-control' },
  { label: 'Mosquito Control', href: '/services/mosquitoes' },
  { label: 'Rodent Management', href: '/services/rodents' },
  { label: 'Termite Treatment', href: '/services/termites' },
  { label: 'Tick Control', href: '/services/tick-control' },
  { label: 'Wood Borer Treatment', href: '/services/wood-borer-control' },
];

export const allPestServices: NavDropdownItem[] = pestControlServices;

export const knowledgeItems: NavDropdownItem[] = [
  {
    label: 'Knowledge Hub',
    href: '/knowledge',
    desc: 'Main educational landing page with all guides & articles',
  },
  {
    label: 'Pest Library',
    href: '/knowledge/pests',
    desc: 'Pest profiles, identification, infestation signs, habitats & common risks',
  },
  {
    label: 'Treatment & Prevention',
    href: '/knowledge/treatment',
    desc: 'Treatment guides, prevention methods, safe practices & preparation instructions',
  },
  {
    label: 'Seasonal Pest Guide',
    href: '/knowledge/seasonal',
    desc: 'Seasonal pest activity, weather-related risks & prevention recommendations',
  },
];

export interface HeaderProps {
  activeItem?: 'home' | 'services' | 'knowledge' | 'service-areas' | 'about' | 'contact' | 'drive' | 'ants' | 'ant-control' | 'cockroaches' | 'bed-bugs' | 'termites' | 'mosquitoes' | 'rodents' | 'fleas' | 'ticks';
}

export const Header: React.FC<HeaderProps> = ({ activeItem }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'pest-control' | 'knowledge' | null>(null);
  const [mobilePestOpen, setMobilePestOpen] = useState(false);
  const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [dialKey, setDialKey] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  const handleTriggerDialer = () => {
    // On mobile / touch devices without hover capability, prioritize direct calling
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
    }

    setDialKey((prev) => prev + 1);
    setIsCallHovered(true);

    // Keep the complete phone number visible for 10 seconds, then smoothly hide and return to original phone icon
    callTimeoutRef.current = setTimeout(() => {
      setIsCallHovered(false);
      callTimeoutRef.current = null;
    }, 10000);
  };

  const handleMouseEnter = (menu: 'pest-control' | 'knowledge') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeDropdowns = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (callTimeoutRef.current) clearTimeout(callTimeoutRef.current);
    };
  }, []);

  // Lock background scrolling on mobile & tablet devices when menu is open (lock background page ONLY)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return;

    // Cache current style values to restore accurately
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Disable scrolling on body only (do not lock html or menu container)
    document.body.style.overflow = 'hidden';

    // Prevent background scrolling on touch gestures and swipe gestures outside the menu
    const handleTouchMove = (e: TouchEvent) => {
      // Do not prevent or block touch scrolling inside the mobile menu drawer!
      if (mobileDrawerRef.current && mobileDrawerRef.current.contains(e.target as Node)) {
        return;
      }

      // Any touchmove outside the drawer: prevent scrolling the background page
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    // Prevent mouse-wheel / trackpad scrolling from scrolling the background page
    const handleWheel = (e: WheelEvent) => {
      // Do not block wheel or trackpad scrolling inside the mobile menu drawer!
      if (mobileDrawerRef.current && mobileDrawerRef.current.contains(e.target as Node)) {
        return;
      }

      // Any wheel scroll outside the drawer: prevent scrolling background page
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    // Auto-restore if viewport resized to desktop breakpoint
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Synchronize mobile menu open state on document.body and dispatch event to hide floating WhatsApp button
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (mobileMenuOpen) {
        document.body.setAttribute('data-mobile-menu-open', 'true');
        window.dispatchEvent(new CustomEvent('mobile-menu-state-change', { detail: { open: true } }));
      } else {
        document.body.removeAttribute('data-mobile-menu-open');
        window.dispatchEvent(new CustomEvent('mobile-menu-state-change', { detail: { open: false } }));
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.removeAttribute('data-mobile-menu-open');
        window.dispatchEvent(new CustomEvent('mobile-menu-state-change', { detail: { open: false } }));
      }
    };
  }, [mobileMenuOpen]);

  const isPestActive = activeItem === 'services' || ['ant-control', 'ants', 'cockroaches', 'bed-bugs', 'termites', 'mosquitoes', 'rodents', 'fleas', 'ticks'].includes(activeItem || '');
  const isKnowledgeActive = activeItem === 'knowledge';

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full bg-[#090a0c]/92 backdrop-blur-md border-b border-white/[0.08]"
        style={{ position: 'sticky', top: 0 }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-3">
        {/* Left: SLV LOGO + Navigation Group */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* SLV Logo */}
          <a href="/" className="shrink-0 flex items-center" aria-label="SLV Pest Control Home">
            <SlvLogo size="sm" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs lg:text-sm font-bold tracking-wider text-white">
            {/* HOME */}
            <a
              href="/"
              className={`py-2 px-2.5 rounded-lg transition-colors ${
                activeItem === 'home' ? 'text-[#F6C453] bg-white/[0.04]' : 'text-zinc-300 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              HOME
            </a>

            {/* PEST CONTROL ▾ Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('pest-control')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'pest-control' ? null : 'pest-control')}
                aria-expanded={activeDropdown === 'pest-control'}
                className={`flex items-center gap-1 py-2 px-2.5 rounded-lg transition-colors focus:outline-none ${
                  isPestActive || activeDropdown === 'pest-control'
                    ? 'text-[#F6C453] bg-white/[0.04]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <span>PEST CONTROL</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'pest-control' ? 'rotate-180 text-[#F6C453]' : 'text-zinc-400'
                  }`}
                />
              </button>

              {/* PEST CONTROL Dropdown Panel */}
              {activeDropdown === 'pest-control' && (
                <div
                  className="absolute top-full left-0 mt-1 w-80 max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-contain rounded-2xl bg-[#0e1014]/98 border border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter('pest-control')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-3 pb-2 mb-1 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#E5A93C] text-[11px] font-bold tracking-[0.18em] uppercase">
                      Specialized Treatments
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">Bangalore</span>
                  </div>
                  <ul className="space-y-1">
                    {pestControlServices.map((service) => (
                      <li key={service.href}>
                        <a
                          href={service.href}
                          onClick={closeDropdowns}
                          className="group flex flex-col px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="group-hover:text-[#F6C453] transition-colors">{service.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-[#F6C453] transition-all" />
                          </div>
                          {service.desc && (
                            <span className="text-[11px] text-zinc-400 font-normal mt-0.5">{service.desc}</span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 mt-2 border-t border-white/[0.06]">
                    <a
                      href="/services"
                      onClick={closeDropdowns}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#F6C453] bg-[#E5A93C]/[0.08] hover:bg-[#E5A93C]/[0.15] border border-[#E5A93C]/20 transition-all"
                    >
                      <span>View All Pest Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* KNOWLEDGE ▾ Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('knowledge')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'knowledge' ? null : 'knowledge')}
                aria-expanded={activeDropdown === 'knowledge'}
                className={`flex items-center gap-1 py-2 px-2.5 rounded-lg transition-colors focus:outline-none ${
                  isKnowledgeActive || activeDropdown === 'knowledge'
                    ? 'text-[#F6C453] bg-white/[0.04]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <span>KNOWLEDGE</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'knowledge' ? 'rotate-180 text-[#F6C453]' : 'text-zinc-400'
                  }`}
                />
              </button>

              {/* KNOWLEDGE Dropdown Panel */}
              {activeDropdown === 'knowledge' && (
                <div
                  className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-[#0e1014]/98 border border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter('knowledge')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-3 pb-2 mb-1 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#E5A93C] text-[11px] font-bold tracking-[0.18em] uppercase">
                      Educational Hub
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">4 Main Sections</span>
                  </div>
                  <ul className="space-y-1">
                    {knowledgeItems.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={closeDropdowns}
                          className="group flex flex-col px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="group-hover:text-[#F6C453] transition-colors">{item.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-[#F6C453] transition-all" />
                          </div>
                          {item.desc && (
                            <span className="text-[11px] text-zinc-400 font-normal mt-0.5">{item.desc}</span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* SERVICE AREAS */}
            <a
              href="/service-areas"
              className={`py-2 px-2.5 rounded-lg transition-colors ${
                activeItem === 'service-areas' ? 'text-[#F6C453] bg-white/[0.04]' : 'text-zinc-300 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              SERVICE AREAS
            </a>

            {/* DRIVE PORTAL */}
            <a
              href="/drive"
              className={`py-2 px-2.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeItem === 'drive' ? 'text-[#F6C453] bg-white/[0.04]' : 'text-zinc-300 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <span>DRIVE PORTAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </a>

            {/* ABOUT */}
            <a
              href="/about"
              className={`py-2 px-2.5 rounded-lg transition-colors ${
                activeItem === 'about' ? 'text-[#F6C453] bg-white/[0.04]' : 'text-zinc-300 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              ABOUT
            </a>

            {/* CONTACT */}
            <a
              href="/contact"
              className={`py-2 px-2.5 rounded-lg transition-colors ${
                activeItem === 'contact' ? 'text-[#F6C453] bg-white/[0.04]' : 'text-zinc-300 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              CONTACT
            </a>
          </nav>
        </div>

        {/* Right Action Cluster: CALL NOW | WHATSAPP | THEME TOGGLE | Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* 1. Call Button: Modern digital dialer animation with 10-second visibility duration */}
          <a
            href="tel:9180397822"
            data-open={isCallHovered ? 'true' : 'false'}
            onMouseEnter={handleTriggerDialer}
            onClick={handleTriggerDialer}
            onFocus={handleTriggerDialer}
            className={`group header-call-btn relative h-9 sm:h-10 rounded-full inline-flex items-center justify-center cursor-pointer overflow-hidden border border-[#FFE08A]/60 bg-gradient-to-r from-[#FFE08A] via-[#F6C453] to-[#D99A18] text-[#090a0c] shadow-[0_3px_14px_rgba(246,196,83,0.35)] transition-all duration-300 ease-out select-none active:scale-95 ${
              isCallHovered
                ? '!w-auto px-3.5 sm:px-4 shadow-[0_4px_22px_rgba(246,196,83,0.55)] border-[#FFE08A]/90'
                : 'w-9 sm:w-10 px-0'
            }`}
            title="Call SLV Pest Control: 91803 97822"
            aria-label="Call SLV Pest Control"
          >
            <Phone
              strokeWidth={2.5}
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 text-[#090a0c] transition-transform duration-300 ${
                isCallHovered ? 'scale-105' : 'group-hover:scale-105'
              }`}
            />
            <span
              className={`header-call-number overflow-hidden transition-all duration-300 ease-out inline-flex items-center ${
                isCallHovered
                  ? 'max-w-[150px] opacity-100 ml-2'
                  : 'max-w-0 opacity-0 ml-0 pointer-events-none'
              }`}
            >
              <span
                key={dialKey}
                className="font-black text-xs sm:text-[13px] tracking-wider text-[#090a0c] whitespace-nowrap font-mono tabular-nums antialiased inline-flex items-center select-none"
              >
                {'91803 97822'.split('').map((char, index) => (
                  <span
                    key={`${dialKey}-${index}`}
                    className={isCallHovered ? 'animate-dial-digit' : ''}
                    style={{
                      animationDelay: `${index * 60}ms`,
                      whiteSpace: 'pre',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </span>
          </a>

          {/* Tablet & Mobile Menu Toggle Button (Hamburger) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="lg:hidden border-t border-zinc-800/80 bg-[#0c0d10] px-5 pt-5 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] space-y-4 overflow-y-auto overscroll-contain"
          style={{
            maxHeight: 'calc(100dvh - 5rem - env(safe-area-inset-bottom, 0px))',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorY: 'contain',
            touchAction: 'pan-y',
          }}
        >
          {/* HOME */}
          <div className="border-b border-zinc-800/60 pb-2.5">
            <a
              href="/"
              onClick={closeDropdowns}
              className={`block w-full py-1 font-bold text-sm tracking-wider hover:text-[#F6C453] transition-colors ${
                activeItem === 'home' ? 'text-[#F6C453]' : 'text-white'
              }`}
            >
              HOME
            </a>
          </div>

          {/* PEST CONTROL Accordion */}
          <div className="border-b border-zinc-800/60 pb-3">
            <button
              type="button"
              onClick={() => setMobilePestOpen(!mobilePestOpen)}
              className={`w-full flex items-center justify-between font-bold text-sm tracking-wider py-1 ${
                isPestActive ? 'text-[#F6C453]' : 'text-white hover:text-[#F6C453]'
              }`}
            >
              <span>PEST CONTROL</span>
              <ChevronDown
                className={`w-4 h-4 text-[#F6C453] transition-transform duration-200 ${
                  mobilePestOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobilePestOpen && (
              <div className="mt-2.5 pl-3 space-y-1">
                {pestControlServices.map((service) => (
                  <a
                    key={service.href}
                    href={service.href}
                    onClick={closeDropdowns}
                    className="block py-1.5 px-2 rounded text-xs text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                  >
                    <div className="font-semibold text-white">{service.label}</div>
                    {service.desc && <div className="text-[11px] text-zinc-400">{service.desc}</div>}
                  </a>
                ))}
                <div className="pt-2">
                  <a
                    href="/services"
                    onClick={closeDropdowns}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-[#F6C453] bg-[#E5A93C]/[0.1] border border-[#E5A93C]/20"
                  >
                    <span>View All Pest Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* KNOWLEDGE Accordion */}
          <div className="border-b border-zinc-800/60 pb-3">
            <button
              type="button"
              onClick={() => setMobileKnowledgeOpen(!mobileKnowledgeOpen)}
              className={`w-full flex items-center justify-between font-bold text-sm tracking-wider py-1 ${
                isKnowledgeActive ? 'text-[#F6C453]' : 'text-white hover:text-[#F6C453]'
              }`}
            >
              <span>KNOWLEDGE</span>
              <ChevronDown
                className={`w-4 h-4 text-[#F6C453] transition-transform duration-200 ${
                  mobileKnowledgeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileKnowledgeOpen && (
              <div className="mt-2.5 pl-3 space-y-1">
                {knowledgeItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeDropdowns}
                    className="block py-1.5 px-2 rounded text-xs text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                  >
                    <div className="font-semibold text-white">{item.label}</div>
                    {item.desc && <div className="text-[11px] text-zinc-400">{item.desc}</div>}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* SERVICE AREAS */}
          <div className="border-b border-zinc-800/60 pb-2.5">
            <a
              href="/service-areas"
              onClick={closeDropdowns}
              className={`block w-full py-1 font-bold text-sm tracking-wider hover:text-[#F6C453] transition-colors ${
                activeItem === 'service-areas' ? 'text-[#F6C453]' : 'text-white'
              }`}
            >
              SERVICE AREAS
            </a>
          </div>

          {/* DRIVE PORTAL */}
          <div className="border-b border-zinc-800/60 pb-2.5">
            <a
              href="/drive"
              onClick={closeDropdowns}
              className={`flex items-center justify-between w-full py-1 font-bold text-sm tracking-wider hover:text-[#F6C453] transition-colors ${
                activeItem === 'drive' ? 'text-[#F6C453]' : 'text-white'
              }`}
            >
              <span>DRIVE PORTAL</span>
              <span className="text-[10px] uppercase font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                Google Drive
              </span>
            </a>
          </div>

          {/* ABOUT */}
          <div className="border-b border-zinc-800/60 pb-2.5">
            <a
              href="/about"
              onClick={closeDropdowns}
              className={`block w-full py-1 font-bold text-sm tracking-wider hover:text-[#F6C453] transition-colors ${
                activeItem === 'about' ? 'text-[#F6C453]' : 'text-white'
              }`}
            >
              ABOUT
            </a>
          </div>

          {/* CONTACT */}
          <div className="border-b border-zinc-800/60 pb-2.5">
            <a
              href="/contact"
              onClick={closeDropdowns}
              className={`block w-full py-1 font-bold text-sm tracking-wider hover:text-[#F6C453] transition-colors ${
                activeItem === 'contact' ? 'text-[#F6C453]' : 'text-white'
              }`}
            >
              CONTACT
            </a>
          </div>

          {/* Mobile CTA: CALL NOW */}
          <div className="pt-2">
            <a
              href="tel:9180397822"
              onClick={closeDropdowns}
              className="w-full py-3 text-xs sm:text-sm font-black gap-2 uppercase tracking-wider tabular-nums justify-center inline-flex items-center rounded-full bg-gradient-to-r from-[#FFE08A] via-[#F6C453] to-[#D99A18] text-[#090a0c] shadow-md active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
              <span>CALL: 91803 97822</span>
            </a>
          </div>
        </div>
      )}
    </header>

    {/* Mobile & Tablet Backdrop Overlay */}
    {mobileMenuOpen && (
      <div
        className="lg:hidden fixed inset-0 top-20 bg-black/60 backdrop-blur-sm z-40 transition-opacity touch-none select-none"
        onClick={closeDropdowns}
        aria-hidden="true"
      />
    )}
  </>
  );
};
