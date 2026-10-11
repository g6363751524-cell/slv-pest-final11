import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface ServiceAreasFaqProps {
  faqs: FaqItem[];
}

export const ServiceAreasFaq: React.FC<ServiceAreasFaqProps> = ({ faqs }) => {
  // Allow openIndex: start with first item open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        const faqId = `faq-content-${idx}`;
        const buttonId = `faq-btn-${idx}`;

        return (
          <div
            key={idx}
            className={`slv-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-[#E5A93C]/40 bg-[#0e1015]/95 shadow-[0_8px_30px_rgba(229,169,60,0.08)]'
                : 'border-white/[0.08] bg-[#0c0d11]/80 hover:border-white/[0.18]'
            }`}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={faqId}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-2xl"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                    isOpen
                      ? 'bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#F6C453]'
                      : 'bg-white/[0.03] border-white/[0.08] text-zinc-400'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3
                  className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? 'text-white' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  {faq.q}
                </h3>
              </div>

              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-[#E5A93C]/10 border-[#E5A93C]/30 text-[#F6C453]'
                    : 'bg-white/[0.03] border-white/[0.08] text-zinc-400'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div
                id={faqId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/[0.04] animate-in fade-in duration-200"
              >
                <p className="pl-11">{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
