import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, BookOpen, Filter, FileText } from 'lucide-react';

interface ArticleItem {
  pest: string;
  category: string;
  title: string;
  desc: string;
  href: string;
  readTime: string;
}

const ARTICLES_DATABASE: ArticleItem[] = [
  // Cockroaches
  {
    pest: 'Cockroaches',
    category: 'Pest Library & ID',
    title: 'Cockroach Identification Guide',
    desc: 'Diagnose signs, droppings, egg cases (oothecae), and distinctive odors of German and American cockroaches.',
    href: '/knowledge/cockroaches/identification',
    readTime: '4 min read',
  },
  {
    pest: 'Cockroaches',
    category: 'Habitats',
    title: 'Where Cockroaches Hide Indoors',
    desc: 'Common harbourages in modular cabinets, under sinks, drainage conduits, and refrigerator motor compartments.',
    href: '/knowledge/cockroaches/where-they-hide',
    readTime: '3 min read',
  },
  {
    pest: 'Cockroaches',
    category: 'Infestation Signs',
    title: 'How Cockroaches Enter & Spread in Homes',
    desc: 'Entry pathways via grocery cartons, deliveries, drains, duct shafts, and apartment perimeter cracks.',
    href: '/knowledge/cockroaches/how-they-spread',
    readTime: '4 min read',
  },
  {
    pest: 'Cockroaches',
    category: 'Prevention',
    title: 'Cockroach Prevention & Kitchen Hygiene Checklist',
    desc: 'Actionable sanitation protocols, moisture mitigation, structural caulking, and food storage tips.',
    href: '/knowledge/cockroaches/prevention',
    readTime: '5 min read',
  },
  {
    pest: 'Cockroaches',
    category: 'Treatment',
    title: 'Cockroach IPM Treatment Guide',
    desc: 'Professional 4-stage IPM approach: inspection, odorless gel baiting, monitoring traps, and prevention.',
    href: '/knowledge/cockroaches/treatment-guide',
    readTime: '5 min read',
  },
  {
    pest: 'Cockroaches',
    category: 'FAQs',
    title: 'Cockroach Frequently Asked Questions',
    desc: '11 practical questions and answers regarding costs, gel safety, pet risks, and preparation.',
    href: '/knowledge/cockroaches/faq',
    readTime: '6 min read',
  },

  // Termites
  {
    pest: 'Termites',
    category: 'Pest Library & ID',
    title: 'Subterranean Termite Identification',
    desc: 'Signs of activity, earthen mud shelter tubes, hollow-sounding woodwork, and discarded reproductive wings.',
    href: '/knowledge/termites/identification',
    readTime: '5 min read',
  },
  {
    pest: 'Termites',
    category: 'Habitats',
    title: 'Where Termites Are Found in Buildings',
    desc: 'Foundations, sub-slab plinths, wooden door frames, skirting expansion joints, and concealed damp areas.',
    href: '/knowledge/termites/where-they-are-found',
    readTime: '4 min read',
  },
  {
    pest: 'Termites',
    category: 'Infestation Signs',
    title: 'How Termites Spread & Move Subterraneously',
    desc: 'Movement through soil moisture gradients, foundation shrinkage cracks, utility shafts, and connected timber.',
    href: '/knowledge/termites/how-they-spread',
    readTime: '4 min read',
  },
  {
    pest: 'Termites',
    category: 'Prevention',
    title: 'Termite Prevention & Moisture Mitigation',
    desc: 'Eliminating wood-to-soil ground contact, plumbing leak repair, expansion joint sealing, and routine checks.',
    href: '/knowledge/termites/prevention',
    readTime: '5 min read',
  },
  {
    pest: 'Termites',
    category: 'Treatment',
    title: 'Termite Drill-and-Infusion Treatment Guide',
    desc: 'The 4-stage journey: property inspection, structural assessment, targeted chemical barrier drilling, and monitoring.',
    href: '/knowledge/termites/treatment-guide',
    readTime: '6 min read',
  },
  {
    pest: 'Termites',
    category: 'FAQs',
    title: 'Termite Questions, Costs & Safety FAQ',
    desc: 'Factual answers regarding treatment pricing, warranty terms, drilling safety, apartment coverage, and inspection.',
    href: '/knowledge/termites/faq',
    readTime: '6 min read',
  },

  // Mosquitoes
  {
    pest: 'Mosquitoes',
    category: 'Pest Library & ID',
    title: 'Mosquito Identification & Breeding Indicators',
    desc: 'Signs of activity, diurnal vs nocturnal biting habits (Aedes, Culex, Anopheles), and larvae identification.',
    href: '/knowledge/mosquitoes/identification',
    readTime: '4 min read',
  },
  {
    pest: 'Mosquitoes',
    category: 'Habitats',
    title: 'Where Mosquitoes Breed & Rest in Bangalore',
    desc: 'Stagnant water sites, flower pot saucers, overhead water tank gaps, shaded shrubbery, and storm drains.',
    href: '/knowledge/mosquitoes/where-they-breed',
    readTime: '3 min read',
  },
  {
    pest: 'Mosquitoes',
    category: 'Infestation Signs',
    title: 'How Mosquitoes Enter & Disperse in Apartments',
    desc: 'Window gaps, unmeshed balcony doors, utility shafts, lift corridors, and external community water sources.',
    href: '/knowledge/mosquitoes/how-they-spread',
    readTime: '4 min read',
  },
  {
    pest: 'Mosquitoes',
    category: 'Prevention',
    title: 'Mosquito Source Reduction & Prevention Guide',
    desc: 'Weekly standing water removal, overhead tank sealing, window mesh maintenance, and garden larvicide.',
    href: '/knowledge/mosquitoes/prevention',
    readTime: '4 min read',
  },
  {
    pest: 'Mosquitoes',
    category: 'Treatment',
    title: 'Mosquito Larvicide & Cold Fogging Treatment',
    desc: 'The 4-stage workflow: breeding site detection, microbial larviciding, residual wall barrier spray, and thermal fogging.',
    href: '/knowledge/mosquitoes/treatment-guide',
    readTime: '5 min read',
  },
  {
    pest: 'Mosquitoes',
    category: 'FAQs',
    title: 'Mosquito Control & Fogging Safety FAQ',
    desc: 'Answers to 12 frequently asked questions on fogging safety, pet precautions, persistence, and warranty.',
    href: '/knowledge/mosquitoes/faq',
    readTime: '5 min read',
  },

  // Rodents
  {
    pest: 'Rodents',
    category: 'Pest Library & ID',
    title: 'Rodent Identification: Rats vs Mice',
    desc: 'Distinguishing roof rats, Norway rats, and house mice by droppings, gnaw marks, rub grease, and sounds.',
    href: '/knowledge/rodents/identification',
    readTime: '4 min read',
  },
  {
    pest: 'Rodents',
    category: 'Habitats',
    title: 'Where Rodents Hide & Harbour Indoors',
    desc: 'False ceilings, kitchen modular voids, behind refrigerators, AC ducts, storerooms, and cavity walls.',
    href: '/knowledge/rodents/where-they-hide',
    readTime: '4 min read',
  },
  {
    pest: 'Rodents',
    category: 'Infestation Signs',
    title: 'How Rodents Enter & Spread Through Buildings',
    desc: 'Gaps as small as 6mm, pipe sleeves, balcony drainage holes, roof tiles, and cable conduits.',
    href: '/knowledge/rodents/how-they-spread',
    readTime: '4 min read',
  },
  {
    pest: 'Rodents',
    category: 'Prevention',
    title: 'Rodent Proofing & Exclusion Checklist',
    desc: 'Hardware cloth wire mesh installation, silicone sealing, food containment in glass/metal, and waste hygiene.',
    href: '/knowledge/rodents/prevention',
    readTime: '5 min read',
  },
  {
    pest: 'Rodents',
    category: 'Treatment',
    title: 'Rodent Trapping & Multi-Stage Management',
    desc: 'The 4-stage management journey: runway inspection, tamper-resistant bait stations, mechanical snap traps, and sealing.',
    href: '/knowledge/rodents/treatment-guide',
    readTime: '5 min read',
  },
  {
    pest: 'Rodents',
    category: 'FAQs',
    title: 'Rodent Control Questions & Safety FAQ',
    desc: 'Clear, factual answers regarding glue boards vs snap traps, dead rodent removal, pet safety, and commercial care.',
    href: '/knowledge/rodents/faq',
    readTime: '6 min read',
  },

  // Fleas & Ticks
  {
    pest: 'Fleas',
    category: 'Pest Library & ID',
    title: 'Flea Identification & Bite Patterns',
    desc: 'Identifying flea dirt, jumping wingless insects, pet scratching indicators, and lower leg bite clusters.',
    href: '/knowledge/fleas/identification',
    readTime: '4 min read',
  },
  {
    pest: 'Fleas',
    category: 'Treatment',
    title: 'Flea Life-Cycle Treatment & Eradication Guide',
    desc: 'The 4-stage management workflow: pet coordination, deep vacuuming, growth regulator (IGR) spray, and egg follow-up.',
    href: '/knowledge/fleas/treatment-guide',
    readTime: '5 min read',
  },
  {
    pest: 'Ticks',
    category: 'Pest Library & ID',
    title: 'Brown Dog Tick Identification Guide',
    desc: 'Recognizing 8-legged flat ticks, vertical wall climbing behaviors, pet ear/neck attachment, and engorgement stages.',
    href: '/knowledge/ticks/identification',
    readTime: '4 min read',
  },
  {
    pest: 'Ticks',
    category: 'Treatment',
    title: 'Tick Wall & Perimeter Management Protocol',
    desc: 'Targeted baseboard crack infusion, kennel treatment, pet coordinate care, and secondary barrier treatments.',
    href: '/knowledge/ticks/treatment-guide',
    readTime: '5 min read',
  },

  // Wood Borers
  {
    pest: 'Wood Borers',
    category: 'Pest Library & ID',
    title: 'Wood Borer Identification & Powder Symptoms',
    desc: 'Recognizing pinholes (shot holes), fine yellow wood powder (frass), larval tunneling, and weakened timber.',
    href: '/knowledge/wood-borers/identification',
    readTime: '4 min read',
  },
  {
    pest: 'Wood Borers',
    category: 'Habitats',
    title: 'Where Wood Borers Attack Wooden Furniture',
    desc: 'Plywood wardrobes, unpolished timber backs, door frames, dining sets, antique artifacts, and ceiling rafters.',
    href: '/knowledge/wood-borers/where-they-are-found',
    readTime: '4 min read',
  },
  {
    pest: 'Wood Borers',
    category: 'Treatment',
    title: 'Wood Borer Syringe Injection & Fumigation Guide',
    desc: 'The 4-stage timber rehabilitation journey: exit hole inspection, oil-based syringe chemical injection, and sealing.',
    href: '/knowledge/wood-borers/treatment-guide',
    readTime: '5 min read',
  },

  // Ants
  {
    pest: 'Ants',
    category: 'Pest Library & ID',
    title: 'Ant Species Identification (Black & Carpenter Ants)',
    desc: 'Recognizing foraging trails, pheromone tracks, sugar vs protein attractions, and satellite wall colonies.',
    href: '/knowledge/ants/identification',
    readTime: '4 min read',
  },
  {
    pest: 'Ants',
    category: 'Habitats',
    title: 'Where Ants Nest & Shelter Indoors',
    desc: 'Wall voids, electrical outlet conduits, under kitchen sinks, tile gaps, and window sill moisture traps.',
    href: '/knowledge/ants/where-they-hide',
    readTime: '4 min read',
  },
  {
    pest: 'Ants',
    category: 'Treatment',
    title: 'Ant Gel Baiting & Colony Eradication Guide',
    desc: 'Why spray chemicals cause ant colony budding, and how delayed-action gel baits eradicate the queen and entire nest.',
    href: '/knowledge/ants/treatment-guide',
    readTime: '5 min read',
  },
  {
    pest: 'Bed Bugs',
    category: 'Pest Library & ID',
    title: 'Bed Bug Inspection & Harbourage Guide',
    desc: 'Recognizing Cimex lectularius in mattress seams, headboard joints, electrical plates, and sweet-musty room odors.',
    href: '/services/bed-bugs',
    readTime: '5 min read',
  },
];

const CATEGORIES = [
  'All Articles',
  'Cockroaches',
  'Termites',
  'Mosquitoes',
  'Rodents',
  'Fleas & Ticks',
  'Wood Borers',
  'Ants',
];

export const KnowledgeSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATABASE.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All Articles' ||
        (selectedCategory === 'Fleas & Ticks'
          ? article.pest === 'Fleas' || article.pest === 'Ticks'
          : article.pest.toLowerCase() === selectedCategory.toLowerCase());

      const cleanQuery = query.toLowerCase().trim();
      if (!cleanQuery) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(cleanQuery) ||
        article.desc.toLowerCase().includes(cleanQuery) ||
        article.pest.toLowerCase().includes(cleanQuery) ||
        article.category.toLowerCase().includes(cleanQuery);

      return matchesCategory && matchesSearch;
    });
  }, [query, selectedCategory]);

  return (
    <div className="w-full">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#E5A93C] absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by pest, signs, treatment, or topic (e.g. termites, bed bugs, gel bait, moisture)..."
            className="w-full pl-12 pr-12 py-3.5 bg-black/60 border border-white/[0.12] rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F6C453] focus:ring-1 focus:ring-[#F6C453] transition backdrop-blur-md shadow-inner"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 p-1 text-zinc-400 hover:text-white transition"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
                isActive
                  ? 'bg-[#E5A93C]/20 border-[#F6C453] text-[#FFE08A] shadow-[0_0_15px_rgba(229,169,60,0.25)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.2]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search Results Summary */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 px-1">
        <span>
          Showing <span className="text-[#F6C453] font-bold">{filteredArticles.length}</span> educational articles
          {selectedCategory !== 'All Articles' && ` in ${selectedCategory}`}
          {query && ` matching "${query}"`}
        </span>
        {(query || selectedCategory !== 'All Articles') && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('All Articles');
            }}
            className="text-[#E5A93C] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Article Results Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.href + article.title}
              className="slv-card rounded-2xl p-5 sm:p-6 border border-white/[0.08] hover:border-[#E5A93C]/50 transition-all flex flex-col justify-between group bg-[#0e1014]/90"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E5A93C]/10 border border-[#E5A93C]/20 text-[#F6C453] font-mono">
                    {article.pest}
                  </span>
                  <span className="text-[11px] text-zinc-500">{article.readTime}</span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-[#F6C453] transition mb-2 font-heading leading-snug">
                  {article.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-3">
                  {article.desc}
                </p>
              </div>

              <a
                href={article.href}
                className="pt-3 border-t border-white/[0.06] text-xs font-bold text-[#FFE08A] hover:text-white flex items-center justify-between transition group-hover:translate-x-0.5"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <BookOpen className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white mb-1">No articles found</h4>
          <p className="text-zinc-400 text-xs max-w-sm mx-auto mb-4">
            Try adjusting your search terms or select "All Articles" to see all pest education guides.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('All Articles');
            }}
            className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-xs font-bold text-[#F6C453] hover:bg-white/[0.1] transition"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
};
