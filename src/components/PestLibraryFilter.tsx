import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Filter,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Info,
  Phone
} from 'lucide-react';

export interface PestProfile {
  id: string;
  name: string;
  scientificName: string;
  category: 'crawling' | 'flying' | 'structural' | 'parasite';
  categoryLabel: string;
  riskLevel: 'Critical' | 'Severe' | 'High' | 'Moderate';
  riskColor: string;
  imageIcon: string;
  badge: string;
  summary: string;
  identifyingFeatures: string[];
  bangaloreZones: string;
  hidingSpots: string;
  healthRisks: string;
  serviceHref: string;
  primaryGuideHref: string;
  articleCount: number;
  availableArticles?: { title: string; href: string }[];
}

const ALL_PESTS: PestProfile[] = [
  {
    id: 'cockroaches',
    name: 'Cockroaches',
    scientificName: 'Blattella germanica & Periplaneta americana',
    category: 'crawling',
    categoryLabel: 'Crawling Pest',
    riskLevel: 'High',
    riskColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    imageIcon: '/cockroach-icon.png',
    badge: 'Kitchen Threat',
    summary: 'Nocturnal scavengers sheltering in warm kitchen crevices, under sinks, and behind appliances. Carry 33+ bacterial species and trigger severe childhood asthma.',
    identifyingFeatures: [
      'German: 12-15mm light brown with 2 dark parallel pronotum stripes',
      'American: 35-40mm reddish-brown, active night glider',
      'Black pepper-like fecal specks along cabinet hinges',
      'Foul oily pheromone scent in heavily infested spaces'
    ],
    bangaloreZones: 'High density across all urban apartments, especially Koramangala, Indiranagar, HSR Layout, and Whitefield.',
    hidingSpots: 'Behind refrigerator motor compressors, under sink P-traps, modular drawer runners, and false ceiling gaps.',
    healthRisks: 'Salmonella, E. coli, Dysentery, and allergenic airborne tropomyosin proteins causing allergic rhinitis.',
    serviceHref: '/services/cockroach-control',
    primaryGuideHref: '/knowledge/cockroaches/identification',
    articleCount: 6,
    availableArticles: [
      { title: 'Identification Guide', href: '/knowledge/cockroaches/identification' },
      { title: 'Where They Hide Indoors', href: '/knowledge/cockroaches/where-they-hide' },
      { title: 'How They Enter & Spread', href: '/knowledge/cockroaches/how-they-spread' },
      { title: 'Hygiene & Prevention Checklist', href: '/knowledge/cockroaches/prevention' },
      { title: 'IPM Gel Baiting Guide', href: '/knowledge/cockroaches/treatment-guide' },
      { title: 'Cockroach Safety FAQ', href: '/knowledge/cockroaches/faq' },
    ]
  },
  {
    id: 'termites',
    name: 'Subterranean Termites',
    scientificName: 'Coptotermes gestroi & Heterotermes',
    category: 'structural',
    categoryLabel: 'Structural Threat',
    riskLevel: 'Critical',
    riskColor: 'text-red-400 border-red-400/30 bg-red-400/10',
    imageIcon: '/beetle-banner.png',
    badge: 'Zero-Tolerance',
    summary: 'Silent wood-destroying insects nesting underground that build earthen mud tubes up building plinths to consume timber, door jambs, and false ceilings from the inside out.',
    identifyingFeatures: [
      'Creamy-white soft-bodied workers hidden inside hollowed timber',
      'Brown earthen mud shelter tubes branching along masonry plinths',
      'Discarded translucent alate wings beneath windows after monsoon rains',
      'Woodwork that sounds paper-thin and hollow upon light tapping'
    ],
    bangaloreZones: 'Extremely prevalent in new red-soil suburban layouts (Sarjapur Road, Devanahalli, Kanakapura Road, Electronic City).',
    hidingSpots: 'Sub-slab soil gradients, door frame plinths, modular kitchen baseboards, and expansion joint mortar voids.',
    healthRisks: 'Severe financial property destruction; airborne mold spores and frass irritating respiratory systems.',
    serviceHref: '/services/termites',
    primaryGuideHref: '/knowledge/termites/identification',
    articleCount: 6,
    availableArticles: [
      { title: 'Subterranean Identification', href: '/knowledge/termites/identification' },
      { title: 'Where Found in Buildings', href: '/knowledge/termites/where-they-are-found' },
      { title: 'How Termites Spread', href: '/knowledge/termites/how-they-spread' },
      { title: 'Moisture & Barrier Prevention', href: '/knowledge/termites/prevention' },
      { title: 'Drill-and-Infusion Guide', href: '/knowledge/termites/treatment-guide' },
      { title: 'Termite Warranty & Cost FAQ', href: '/knowledge/termites/faq' },
    ]
  },
  {
    id: 'bed-bugs',
    name: 'Bed Bugs',
    scientificName: 'Cimex lectularius',
    category: 'parasite',
    categoryLabel: 'Parasitic Biter',
    riskLevel: 'Severe',
    riskColor: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
    imageIcon: '/bedbug.png',
    badge: 'High Discomfort',
    summary: 'Obligate blood-feeding nocturnal parasites that harbor within 5–8 feet of sleeping areas. Extremely resilient to over-the-counter aerosols.',
    identifyingFeatures: [
      'Oval, flattened apple-seed shaped reddish-brown bodies (4-5mm)',
      'Linear clusters or zig-zag patterns of 3-4 intensely itchy red bites',
      'Tiny black digested blood spots along mattress seams and bed sheets',
      'Translucent cast exoskeletons shed during five nymphal molts'
    ],
    bangaloreZones: 'Frequent in transit zones, PG hostels, rented tech corridors, and serviced apartments in Marathahalli, Bellandur, and BTM Layout.',
    hidingSpots: 'Mattress piping, box springs, wooden headboard joins, electrical switchplate backs, and sofa seams.',
    healthRisks: 'Chronic sleep deprivation, severe secondary skin infections from scratching, psychological anxiety, and allergic dermatitis.',
    serviceHref: '/services/bed-bugs',
    primaryGuideHref: '/knowledge/bed-bugs/identification',
    articleCount: 4,
    availableArticles: [
      { title: 'Diagnostic Bite Identification', href: '/knowledge/bed-bugs/identification' },
      { title: 'Bed Bug vs Flea Comparison', href: '/knowledge#bedbugs-vs-fleas' },
      { title: 'Luggage & Travel Quarantine', href: '/knowledge/treatment#resident-checklist' },
      { title: 'Heat & Residual IPM Protocols', href: '/knowledge/treatment#ipm-methodology' },
    ]
  },
  {
    id: 'ants',
    name: 'Ants (Black, Carpenter & Pharaoh)',
    scientificName: 'Camponotus compressus & Monomorium pharaonis',
    category: 'crawling',
    categoryLabel: 'Crawling Pest',
    riskLevel: 'Moderate',
    riskColor: 'text-amber-300 border-amber-300/30 bg-amber-300/10',
    imageIcon: '/ant-icon.png',
    badge: 'Colony Invader',
    summary: 'Persistent social insects establishing pheromone highways from foundation soils or cavity walls straight into pantries and electrical sockets.',
    identifyingFeatures: [
      'Black carpenter ants (6-12mm) excavating smooth galleries in damp wood',
      'Tiny yellow pharaoh ants (1.5-2mm) infesting sterile rooms & appliances',
      'Uniform trails marching along floor skirting and countertop splashbacks',
      'Fine wood frass accumulation beneath wooden architraves'
    ],
    bangaloreZones: 'Widespread across ground floor villas, tree-adjacent balconies, and high-rise apartment kitchen shafts.',
    hidingSpots: 'Wall voids, window sill cavities, behind switchboards, compost bins, and wet plumbing ducts.',
    healthRisks: 'Food contamination, electrical short-circuits caused by swarm nesting inside AC relays and inverters.',
    serviceHref: '/services/ant-control',
    primaryGuideHref: '/knowledge/pests/ants',
    articleCount: 7,
    availableArticles: [
      { title: 'Comprehensive Ants Guide', href: '/knowledge/pests/ants' },
      { title: 'Ant Identification Guide', href: '/knowledge/ants/identification' },
      { title: 'Where Ants Hide Indoors', href: '/knowledge/ants/where-they-hide' },
      { title: 'How Ants Spread & Forage', href: '/knowledge/ants/how-they-spread' },
      { title: 'Sweet & Protein Baits', href: '/knowledge/ants/prevention' },
      { title: 'Colony Eradication Guide', href: '/knowledge/ants/treatment-guide' },
      { title: 'Ant Management FAQ', href: '/knowledge/ants/faq' },
    ]
  },
  {
    id: 'mosquitoes',
    name: 'Mosquitoes',
    scientificName: 'Aedes aegypti, Culex & Anopheles',
    category: 'flying',
    categoryLabel: 'Flying Vector',
    riskLevel: 'Critical',
    riskColor: 'text-red-400 border-red-400/30 bg-red-400/10',
    imageIcon: '/fly-banner.png',
    badge: 'Vector Disease',
    summary: 'High-risk flying disease vectors that breed in stagnant water containers, plant saucers, and storm drains. Rest on dark indoor curtains and furniture backs during daylight.',
    identifyingFeatures: [
      'Aedes: Distinct black and white lyre body markings; daytime biting',
      'Culex: Plain brownish-gray body; nocturnal biting and loud ear buzzing',
      'Visible aquatic wriggler larvae squirming in standing water sumps',
      'Resting on dark curtains, behind wardrobes, and under desks'
    ],
    bangaloreZones: 'Lake catchment belts and storm water drain perimeters (Bellandur, Varthur, Hebbal, Ulsoor, and Mahadevapura).',
    hidingSpots: 'Under beds, behind hanging window drapes, balcony plant drip trays, and unsealed overhead water tanks.',
    healthRisks: 'Dengue fever, Chikungunya, Zika virus, and high-fever inflammatory illnesses.',
    serviceHref: '/services/mosquitoes',
    primaryGuideHref: '/knowledge/mosquitoes/identification',
    articleCount: 6,
    availableArticles: [
      { title: 'Mosquito Identification & Breeding', href: '/knowledge/mosquitoes/identification' },
      { title: 'Where Mosquitoes Breed in Bangalore', href: '/knowledge/mosquitoes/where-they-breed' },
      { title: 'Entry & Dispersal in Apartments', href: '/knowledge/mosquitoes/how-they-spread' },
      { title: 'Source Reduction Checklist', href: '/knowledge/mosquitoes/prevention' },
      { title: 'Larviciding & Cold Fogging', href: '/knowledge/mosquitoes/treatment-guide' },
      { title: 'Fogging Safety & Disease FAQ', href: '/knowledge/mosquitoes/faq' },
    ]
  },
  {
    id: 'rodents',
    name: 'Rodents (Rats & Mice)',
    scientificName: 'Rattus rattus & Mus musculus',
    category: 'crawling',
    categoryLabel: 'Mammalian Hazard',
    riskLevel: 'Critical',
    riskColor: 'text-red-400 border-red-400/30 bg-red-400/10',
    imageIcon: '/rat-icon.png',
    badge: 'Wire & Food Hazard',
    summary: 'Aggressive gnawers that chew electrical insulation, vehicle engine harnesses, and contaminate food stores. Can squeeze through openings as narrow as 6mm.',
    identifyingFeatures: [
      'Spindle-shaped black droppings (6-12mm for rats, 3-6mm for mice)',
      'Nocturnal scratching sounds above false ceilings and within drywall',
      'Distinct parallel incisor gnaw marks on PVC pipes, doors, and wires',
      'Dark greasy smudge trails (sebum) left along wall baseboards'
    ],
    bangaloreZones: 'Older commercial hubs and restaurant belts: Chickpet, Commercial Street, Brigade Road, Majestic, and Jayanagar.',
    hidingSpots: 'False ceilings, modular kitchen voids, behind refrigerators, AC ducting, and basement electrical shafts.',
    healthRisks: 'Leptospirosis, Rat-Bite Fever, Salmonella, and major structural fires caused by exposed chewed electrical wiring.',
    serviceHref: '/services/rodents',
    primaryGuideHref: '/knowledge/rodents/identification',
    articleCount: 6,
    availableArticles: [
      { title: 'Rats vs Mice Diagnostics', href: '/knowledge/rodents/identification' },
      { title: 'Where Rodents Hide Indoors', href: '/knowledge/rodents/where-they-hide' },
      { title: 'Entry Gaps & Building Spread', href: '/knowledge/rodents/how-they-spread' },
      { title: 'Hardware Cloth Exclusion', href: '/knowledge/rodents/prevention' },
      { title: 'Multi-Catch & Tamper Trapping', href: '/knowledge/rodents/treatment-guide' },
      { title: 'Rodent Safety & Trapping FAQ', href: '/knowledge/rodents/faq' },
    ]
  },
  {
    id: 'wood-borers',
    name: 'Wood Borers (Powder Post Beetles)',
    scientificName: 'Lyctidae & Anobiidae',
    category: 'structural',
    categoryLabel: 'Structural Threat',
    riskLevel: 'High',
    riskColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    imageIcon: '/spider-banner.png',
    badge: 'Timber Destroyer',
    summary: 'Wood-boring beetle larvae that spend years tunneling through seasoned hardwoods, plyboards, and furniture frames, converting timber into ultra-fine flour dust.',
    identifyingFeatures: [
      'Tiny circular exit pinholes (1-2mm) appearing on polished furniture surfaces',
      'Small conical mounds of talc-like pale yellow wood powder (frass) beneath tables',
      'Structural weakness and sudden crumbling along wooden frame edges',
      'Small 3-5mm dark brown cylindrical adult beetles emerging in warm weather'
    ],
    bangaloreZones: 'Prevalent in vintage colonial bungalows, teak/rosewood collections, and untreated imported plywood furnishings.',
    hidingSpots: 'Backing of wardrobes, unlaminated undersides of dining tables, wooden door jambs, and antique timber.',
    healthRisks: 'Catastrophic structural failure of expensive wood fittings, floorboards, and ceiling rafters.',
    serviceHref: '/services/wood-borer-control',
    primaryGuideHref: '/knowledge/wood-borers/identification',
    articleCount: 6,
    availableArticles: [
      { title: 'Wood Borer Identification', href: '/knowledge/wood-borers/identification' },
      { title: 'Where Found in Homes', href: '/knowledge/wood-borers/where-they-are-found' },
      { title: 'How Larvae Damage Wood', href: '/knowledge/wood-borers/how-they-damage-wood' },
      { title: 'Moisture & Varnish Prevention', href: '/knowledge/wood-borers/prevention' },
      { title: 'Pressure Syringe Injection Guide', href: '/knowledge/wood-borers/treatment-guide' },
      { title: 'Wood Borer FAQ', href: '/knowledge/wood-borers/faq' },
    ]
  },
  {
    id: 'fleas',
    name: 'Fleas',
    scientificName: 'Ctenocephalides felis & canis',
    category: 'parasite',
    categoryLabel: 'Parasitic Biter',
    riskLevel: 'High',
    riskColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    imageIcon: '/test64.png',
    badge: 'Pet & Carpet Vector',
    summary: 'Wingless jumping insects with laterally compressed bodies that jump onto hosts from carpet piles, pet beds, and floor gaps to draw blood.',
    identifyingFeatures: [
      'Tiny 2-3mm dark reddish-brown insects capable of jumping 200x body length',
      'Bites clustered almost exclusively on lower legs, ankles, and feet',
      '"Flea dirt" (peppery black blood specks) in pet fur and along pet bed fibers',
      'Pets persistently biting, licking, or scratching their rump and belly'
    ],
    bangaloreZones: 'Pet-friendly residential complexes, independent villas with outdoor turf, and animal shelters across Sahakarnagar and JP Nagar.',
    hidingSpots: 'Base of deep carpet piles, pet sleep cushions, upholstery crevices, and floorboard gaps.',
    healthRisks: 'Flea allergy dermatitis (FAD), tapeworm vector transmission to domestic animals, and painful scratching lesions.',
    serviceHref: '/services/fleas',
    primaryGuideHref: '/knowledge/fleas/identification',
    articleCount: 6,
    availableArticles: [
      { title: 'Flea Identification & Bite Signs', href: '/knowledge/fleas/identification' },
      { title: 'Where Fleas Hide in Homes', href: '/knowledge/fleas/where-they-hide' },
      { title: 'How Fleas Spread on Hosts', href: '/knowledge/fleas/how-they-spread' },
      { title: 'Carpet & Pet Bed Sanitation', href: '/knowledge/fleas/prevention' },
      { title: 'Life-Cycle IGR Treatment Guide', href: '/knowledge/fleas/treatment-guide' },
      { title: 'Flea Safety & Pet FAQ', href: '/knowledge/fleas/faq' },
    ]
  },
  {
    id: 'ticks',
    name: 'Brown Dog Ticks',
    scientificName: 'Rhipicephalus sanguineus',
    category: 'parasite',
    categoryLabel: 'Parasitic Arachnid',
    riskLevel: 'Severe',
    riskColor: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
    imageIcon: '/tick-icon.png',
    badge: 'Veterinary Risk',
    summary: 'Eight-legged parasitic arachnids uniquely adapted to complete their entire life cycle indoors, crawling up vertical walls and attaching to canines.',
    identifyingFeatures: [
      'Flat, teardrop-shaped brown arachnids that swell into gray beans when engorged',
      'Seen crawling vertically up white walls, baseboards, and window curtains',
      'Attached firmly to dog ears, neck folds, between paw toes, and belly',
      'Pet showing lethargy, high fever, pale gums, and loss of appetite'
    ],
    bangaloreZones: 'Canine boarding facilities, gated villa communities, and compound walls across Banashankari and Yelahanka.',
    hidingSpots: 'Cracks in compound walls, kennel woodwork, baseboard expansion joints, and curtain header tape.',
    healthRisks: 'Canine Babesiosis and Ehrlichiosis (Tick Fever), severe canine anemia, and accidental tick-borne human infections.',
    serviceHref: '/services/tick-control',
    primaryGuideHref: '/knowledge/ticks/identification',
    articleCount: 6,
    availableArticles: [
      { title: 'Tick Identification & Biology', href: '/knowledge/ticks/identification' },
      { title: 'Where Ticks Hide Indoors', href: '/knowledge/ticks/where-they-hide' },
      { title: 'Compound Spread & Vectors', href: '/knowledge/ticks/how-they-spread' },
      { title: 'Kennel Sanitation Checklist', href: '/knowledge/ticks/prevention' },
      { title: 'Perimeter Spray & Acaricide Guide', href: '/knowledge/ticks/treatment-guide' },
      { title: 'Tick Fever & Safety FAQ', href: '/knowledge/ticks/faq' },
    ]
  },
  {
    id: 'flies',
    name: 'Flies (House, Drain & Fruit)',
    scientificName: 'Musca domestica, Psychodidae & Drosophila',
    category: 'flying',
    categoryLabel: 'Flying Vector',
    riskLevel: 'Moderate',
    riskColor: 'text-amber-300 border-amber-300/30 bg-amber-300/10',
    imageIcon: '/fly-banner.png',
    badge: 'Sanitation Threat',
    summary: 'High-speed biological vectors breeding in moist decomposing organic matter, unsealed drains, and fermenting kitchen waste, transferring pathogens to food.',
    identifyingFeatures: [
      'House flies (6-7mm) with 4 dark longitudinal stripes on thorax',
      'Drain flies (moth flies) with fuzzy hairy wings hovering near bathroom floor traps',
      'Fruit flies (3-4mm) hovering over overripe bananas and bar taps',
      'Dark fly speck defecation spots on light fixtures and upper walls'
    ],
    bangaloreZones: 'Commercial restaurant kitchens, food courts, and apartments near open storm water channels.',
    hidingSpots: 'Under rim of trash bins, biofilm lining inside shower floor traps, and damp mops.',
    healthRisks: 'Typhoid fever, Cholera, Dysentery, and gastrointestinal bacterial infections.',
    serviceHref: '/services/fly-control',
    primaryGuideHref: '/knowledge/treatment#hygiene-prevention',
    articleCount: 3,
    availableArticles: [
      { title: 'Drain Biofilm & Pipe Sanitation', href: '/knowledge/treatment#moisture-drainage' },
      { title: 'Food Preparation & Fly Proofing', href: '/knowledge/treatment#hygiene-prevention' },
      { title: 'Commercial Fly Control Protocols', href: '/services/fly-control' },
    ]
  }
];

export const PestLibraryFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPests = useMemo(() => {
    return ALL_PESTS.filter((pest) => {
      const matchesCategory =
        selectedCategory === 'all' || pest.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        pest.name.toLowerCase().includes(q) ||
        pest.scientificName.toLowerCase().includes(q) ||
        pest.summary.toLowerCase().includes(q) ||
        pest.hidingSpots.toLowerCase().includes(q) ||
        pest.bangaloreZones.toLowerCase().includes(q) ||
        pest.identifyingFeatures.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="w-full">
      {/* Search and Category Control Bar */}
      <div className="bg-[#101318]/90 border border-white/[0.08] rounded-2xl p-4 sm:p-6 backdrop-blur-xl mb-8 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by pest name, symptoms (e.g. mud tubes, droppings), or location..."
              className="w-full pl-11 pr-10 py-3 bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E5A93C] transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All 10 Pests' },
              { id: 'crawling', label: 'Crawling' },
              { id: 'flying', label: 'Flying' },
              { id: 'structural', label: 'Structural' },
              { id: 'parasite', label: 'Parasites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#E5A93C] text-[#0f1115] shadow-[0_0_15px_rgba(229,169,60,0.35)]'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter and Results Status */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <span>
            Showing <strong className="text-white">{filteredPests.length}</strong> of 10 Bangalore pest profiles
          </span>
          {searchTerm && (
            <span className="text-[#E5A93C]">
              Filtered by: &ldquo;{searchTerm}&rdquo;
            </span>
          )}
        </div>
      </div>

      {/* PEST PROFILE CARDS GRID */}
      {filteredPests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPests.map((pest) => (
            <div
              key={pest.id}
              id={pest.id}
              className="bg-[#0e1117]/95 border border-white/[0.08] hover:border-[#E5A93C]/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/[0.1] p-2 flex items-center justify-center shrink-0 group-hover:border-[#E5A93C]/30 transition">
                      <img
                        src={pest.imageIcon}
                        alt={pest.name}
                        className="w-10 h-10 object-contain drop-shadow"
                        onError={(e) => {
                          // Fallback to SVG placeholder if image missing
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                          {pest.categoryLabel}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${pest.riskColor}`}>
                          {pest.riskLevel} Risk
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white group-hover:text-[#F6C453] transition font-heading">
                        {pest.name}
                      </h3>
                      <p className="text-xs font-mono italic text-zinc-400">
                        {pest.scientificName}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#E5A93C] bg-[#E5A93C]/10 border border-[#E5A93C]/20 px-2.5 py-1 rounded-lg shrink-0">
                    {pest.badge}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {pest.summary}
                </p>

                {/* Biological Indicators */}
                <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3.5 mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#FFE08A] mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#E5A93C]" />
                    Key Identification Markers
                  </h4>
                  <ul className="space-y-1.5">
                    {pest.identifyingFeatures.map((feat, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-5">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-2.5">
                    <strong className="text-zinc-400 block text-[10px] uppercase tracking-wider mb-0.5">
                      Common Hiding Zones
                    </strong>
                    <span className="text-zinc-300">{pest.hidingSpots}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-2.5">
                    <strong className="text-zinc-400 block text-[10px] uppercase tracking-wider mb-0.5">
                      Bangalore Spread Zone
                    </strong>
                    <span className="text-zinc-300">{pest.bangaloreZones}</span>
                  </div>
                </div>

                {/* Available In-Depth Guides */}
                {pest.availableArticles && pest.availableArticles.length > 0 && (
                  <div className="mb-4">
                    <strong className="text-zinc-400 block text-[10px] uppercase tracking-wider mb-2">
                      Educational Guides &amp; Protocols ({pest.articleCount})
                    </strong>
                    <div className="grid grid-cols-2 gap-2">
                      {pest.availableArticles.slice(0, 4).map((art, idx) => (
                        <a
                          key={idx}
                          href={art.href}
                          className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#E5A93C]/10 border border-white/[0.06] hover:border-[#E5A93C]/30 text-[11px] text-zinc-300 hover:text-[#FFE08A] transition flex items-center justify-between"
                        >
                          <span className="truncate">{art.title}</span>
                          <ArrowRight className="w-3 h-3 shrink-0 ml-1 opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <a
                  href={pest.primaryGuideHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F6C453] hover:text-white transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Detailed Guide</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={pest.serviceHref}
                    className="px-3 py-1.5 rounded-lg bg-[#E5A93C] text-[#0d0f13] text-xs font-bold hover:bg-[#F6C453] transition inline-flex items-center gap-1 shadow-[0_0_12px_rgba(229,169,60,0.25)]"
                  >
                    <span>Treatment Service</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Fallback view when no results found */
        <div className="bg-[#12151b] border border-amber-500/30 rounded-2xl p-8 text-center max-w-xl mx-auto">
          <Info className="w-10 h-10 text-[#E5A93C] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2 font-heading">
            No exact pest match found for &ldquo;{searchTerm}&rdquo;
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
            Pests in Bangalore often exhibit non-standard symptoms or regional nicknames. Our senior entomologist is on call to provide instant free diagnosis over WhatsApp or phone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.08] text-xs font-bold text-white hover:bg-white/[0.15] transition"
            >
              Reset All Filters
            </button>
            <a
              href="tel:9180397822"
              className="px-4 py-2 rounded-xl bg-[#E5A93C] text-[#0e1116] text-xs font-bold hover:bg-[#F6C453] transition inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Entomologist: 91803 97822</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
