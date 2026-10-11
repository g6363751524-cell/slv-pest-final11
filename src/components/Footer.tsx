import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { SlvLogo } from './SlvLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <a href="/" className="mb-5 block" aria-label="SLV Pest Control Home">
              <SlvLogo size="lg" />
            </a>

            <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-sm mb-5">
              Providing professional residential and commercial pest management with architectural precision, eco-sensitive botanical actives, and property-specific treatment across Bangalore.
            </p>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>143 Soundarya Layout, Doddabidarakallu, Bangalore 560073</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href="tel:9180397822" className="hover:text-white font-mono font-bold transition">91803 97822</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href="mailto:contact@slvpestcontrol.com" className="hover:text-white transition">contact@slvpestcontrol.com</a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-bold tracking-tight mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/services/cockroaches" className="hover:text-white transition">
                  Pest Control
                </a>
              </li>
              <li>
                <a href="/knowledge" className="hover:text-white transition">
                  Knowledge Hub
                </a>
              </li>
              <li>
                <a href="/service-areas" className="hover:text-white transition">
                  Service Areas
                </a>
              </li>
              <li>
                <a href="/drive" className="hover:text-[#F6C453] transition flex items-center gap-1.5">
                  <span>Drive Portal</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">Google</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Links (3.5 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-bold tracking-tight mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/services" className="text-[#F6C453] font-bold hover:underline transition flex items-center justify-between">
                  <span>View All 10 Services →</span>
                </a>
              </li>
              <li>
                <a href="/services/ant-control" className="hover:text-white transition flex items-center justify-between group">
                  <span>Ant Control</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹499</span>
                </a>
              </li>
              <li>
                <a href="/services/bed-bugs" className="hover:text-white transition flex items-center justify-between group">
                  <span>Bed Bug Treatments</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹999</span>
                </a>
              </li>
              <li>
                <a href="/services/cockroach-control" className="hover:text-white transition flex items-center justify-between group">
                  <span>Cockroach Control</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹599</span>
                </a>
              </li>
              <li>
                <a href="/services/fleas" className="hover:text-white transition flex items-center justify-between group">
                  <span>Fleas Control</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹799</span>
                </a>
              </li>
              <li>
                <a href="/services/fly-control" className="hover:text-white transition flex items-center justify-between group">
                  <span>Flies Control</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹499</span>
                </a>
              </li>
              <li>
                <a href="/services/mosquitoes" className="hover:text-white transition flex items-center justify-between group">
                  <span>Mosquito Control</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹799</span>
                </a>
              </li>
              <li>
                <a href="/services/rodents" className="hover:text-white transition flex items-center justify-between group">
                  <span>Rodent Management</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹699</span>
                </a>
              </li>
              <li>
                <a href="/services/termites" className="hover:text-white transition flex items-center justify-between group">
                  <span>Termite Treatment</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹899</span>
                </a>
              </li>
              <li>
                <a href="/services/tick-control" className="hover:text-white transition flex items-center justify-between group">
                  <span>Tick Control</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹799</span>
                </a>
              </li>
              <li>
                <a href="/services/wood-borer-control" className="hover:text-white transition flex items-center justify-between group">
                  <span>Wood Borer Treatment</span>
                  <span className="text-[10px] text-[#F6C453] opacity-0 group-hover:opacity-100 transition">Starting at ₹899</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Actions & CTAs (2.5 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-bold tracking-tight mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:9180397822"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#F6C453]/60 text-white hover:text-[#F6C453] text-xs font-bold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F6C453]" />
                  <span>Call Now</span>
                </div>
                <span className="font-mono text-[11px] text-zinc-400">91803 97822</span>
              </a>

              <a
                href="https://wa.me/9180397822"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 hover:border-[#25D366] text-white text-xs font-bold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#25D366]" />
              </a>

              <a
                href="/contact"
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#F6C453] hover:bg-[#FFE08A] text-[#090a0c] text-xs font-black uppercase tracking-wider flex items-center justify-between transition-colors"
              >
                <span>Free Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5A93C] shrink-0" />
              <span>Bangalore Central &amp; Suburban Reach</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} SLV Pest Control. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-zinc-300 transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-zinc-300 transition">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
