import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    category: 'Identification',
    question: 'How do I know if I have bed bugs or fleas?',
    answer: 'Bed bugs are reddish-brown, flat oval insects (apple-seed sized) that crawl and hide in mattress piping, headboard joints, and electrical faceplates, leaving clustered bites. Fleas are tiny (1.5–3 mm) wingless jumping insects that infest pet fur and carpet fibers, typically biting human ankles and calves.',
  },
  {
    category: 'Identification',
    question: 'What is the visual difference between termites and flying ants?',
    answer: 'Termite swarmers (alates) have straight beaded antennae, uniform broad waists without constriction, and two pairs of wings of equal length. Flying ants have elbowed antennae, distinctly pinched (wasp-like) waists, and forewings that are noticeably larger than hindwings.',
  },
  {
    category: 'Safety & IPM',
    question: 'Are SLV Pest Control treatments safe for infants, pregnant women, and pets?',
    answer: 'Yes. We utilize odorless, target-specific, Bayer and CIB-approved Integrated Pest Management (IPM) formulations. For cockroaches and ants, our micro-placed gel baits emit zero airborne fumes and are applied strictly inside inaccessible crevices. For indoor thermal or residual applications, we provide explicit pre-treatment safety protocols and advise a brief 2-hour vacate period during active drying.',
  },
  {
    category: 'Preparation',
    question: 'What preparation is required before an indoor pest control service?',
    answer: 'For cockroach treatments with gel baiting, minimal preparation is needed—you do not even need to empty modular kitchen cabinets. For general spraying or bed bug heat-chemical treatments, we recommend storing uncovered food in refrigerators, covering pet water dishes, clearing mattress linens for hot-water washing, and wiping floor skirting boards.',
  },
  {
    category: 'Warranty & Persistence',
    question: 'Why do pests sometimes appear active immediately after treatment?',
    answer: 'This is known as the "flushing effect." Modern IPM formulations contain active flushing agents that irritate hidden pests, forcing them out of deep wall voids and pipe shafts into contact with treated surfaces. Cockroach gels and termite non-repellents work through delayed transfer—infected pests carry the toxicant back to their colonies, leading to total nest eradication within 3 to 7 days.',
  },
  {
    category: 'Service Frequency',
    question: 'How frequently should homes and commercial properties be treated?',
    answer: 'For standard residential apartments in Bangalore, an annual maintenance contract (AMC) with 3 scheduled visits provides continuous barrier protection. For commercial kitchens, restaurants, and IT food courts, monthly or bi-monthly monitoring and bait servicing is recommended due to constant delivery crate traffic and municipal drainage connections.',
  },
];

export const KnowledgeFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {FAQS_DATA.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className={`slv-card rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-[#E5A93C]/60 bg-[#0e1014]/95 shadow-[0_4px_25px_rgba(229,169,60,0.08)]'
                : 'border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02]'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-[#F6C453]">
                  0{index + 1}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A93C] block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </h3>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#F6C453] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/[0.05] text-xs sm:text-sm text-zinc-300 leading-relaxed pl-15 sm:pl-18">
                <p>{faq.answer}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-[#FFE08A]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Verified by SLV Pest Control Technical Director</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
