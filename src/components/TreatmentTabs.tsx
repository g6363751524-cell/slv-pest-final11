import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Layers,
  Wind,
  Clock,
  Home,
  CheckCircle,
  FileText,
  Printer,
  ChevronDown
} from 'lucide-react';

export const TreatmentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prep' | 'post' | 'ipm' | 'exclusion' | 'kitchen'>('prep');

  return (
    <div className="w-full">
      {/* Category Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#101318]/90 p-2 rounded-2xl border border-white/[0.08] backdrop-blur-md">
        {[
          { id: 'prep', label: '1. Pre-Treatment Preparation' },
          { id: 'post', label: '2. Post-Care & Re-Entry Safety' },
          { id: 'ipm', label: '3. Scientific IPM Framework' },
          { id: 'exclusion', label: '4. Structural Exclusion' },
          { id: 'kitchen', label: '5. Kitchen & Hygiene Habits' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#E5A93C] text-[#0f1115] shadow-[0_0_15px_rgba(229,169,60,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="bg-[#0e1117] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.4)]">
        {/* TAB 1: PRE-TREATMENT PREPARATION */}
        {activeTab === 'prep' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/[0.08] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#E5A93C] uppercase tracking-wider block mb-1">
                  Resident Safety Protocol 01
                </span>
                <h3 className="text-2xl font-black text-white font-heading">
                  Pre-Treatment Preparation Checklist
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  Actions required before SLV certified technicians arrive at your home or workplace.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold shrink-0">
                <Clock className="w-4 h-4" />
                <span>Complete 2 Hours Before Visit</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kitchen Prep */}
              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-[#FFE08A] uppercase tracking-wider mb-3 flex items-center gap-2 font-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                  Kitchen &amp; Dining Prep
                </h4>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Cover Cookware:</strong> Cover open utensils, spice racks, and dining plates with clean cling wrap or newspaper.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Store Perishables:</strong> Store fresh fruits, cut vegetables, and bakery items inside the sealed refrigerator.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Empty Under-Sink Zone:</strong> Clear soap boxes, brushes, and dustbins beneath the kitchen sink for unobstructed pipe access.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Water Purifier &amp; RO:</strong> Close RO dispenser spouts or cover the unit with a protective plastic sheet.</span>
                  </li>
                </ul>
              </div>

              {/* Bedrooms & Wardrobes */}
              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-[#FFE08A] uppercase tracking-wider mb-3 flex items-center gap-2 font-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                  Bedrooms &amp; Furniture Clearance
                </h4>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Pull Out Furniture (Termite &amp; Bed Bug treatments):</strong> Move cots, sofas, and heavy wooden wardrobes 1 to 2 feet away from wall skirting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Strip Bed Linen:</strong> For bed bug treatments, remove sheets and pillow covers directly into sealed bags for hot washing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Clear Floor Perimeter:</strong> Pick up loose shoes, toys, power cords, and storage cartons along all room perimeters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E5A93C] font-bold">✓</span>
                    <span><strong>Cover Electronics:</strong> Cover television screens, laptops, sound bars, and desktop keyboards with clean sheets.</span>
                  </li>
                </ul>
              </div>

              {/* Infants & Medical Conditions */}
              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider mb-3 flex items-center gap-2 font-heading">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Infants, Elderly &amp; Asthma Patients
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                  While our indoor gel baits and insect growth regulators (IGRs) are odorless and non-volatile, any liquid residual barrier spray or cold ULV misting requires individuals with respiratory conditions, expectant mothers, and infants under 1 year to vacate the treated rooms during spraying and for 2–3 hours afterwards.
                </p>
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-[11px] text-rose-200">
                  <strong>Important:</strong> Please inform the technician prior to starting if any resident uses oxygen equipment or has severe chemical sensitivities.
                </div>
              </div>

              {/* Domestic Pets & Aquariums */}
              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2 font-heading">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Pets, Dogs, Cats &amp; Aquariums
                </h4>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span><strong>Dogs &amp; Cats:</strong> Secure pets in an untreated balcony or take them for a walk during spray applications.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span><strong>Fish Aquariums:</strong> Highly critical. Turn off the air bubbler pump and seal the aquarium top with cling wrap and a heavy towel. Fish are sensitive to pyrethroids.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span><strong>Pet Food Bowls:</strong> Empty water and kibble dishes; wash thoroughly and store inside a sealed overhead cabinet.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POST-CARE & RE-ENTRY SAFETY */}
        {activeTab === 'post' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/[0.08] pb-6">
              <span className="text-xs font-mono font-bold text-[#E5A93C] uppercase tracking-wider block mb-1">
                Resident Safety Protocol 02
              </span>
              <h3 className="text-2xl font-black text-white font-heading">
                Post-Treatment Care &amp; Re-Entry Guidelines
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                How to re-enter safely, aerate rooms, and preserve active bait points for maximum colony eradication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/20 flex items-center justify-center mb-3">
                  <Wind className="w-5 h-5 text-[#E5A93C]" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2 font-heading">
                  1. Aeration Window
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Upon re-entering after spray treatments (after 2–3 hours), open all windows and turn on exhaust fans for 20–30 minutes before occupying the bedrooms.
                </p>
              </div>

              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2 font-heading">
                  2. Cleaning Restrictions
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Do not wet mop floor skirting or wipe treated cabinet corners for at least 72 hours. This allows the microencapsulated residual barrier to bond completely.
                </p>
              </div>

              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2 font-heading">
                  3. Gel Bait Preservation
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tiny brown gel dots placed behind cabinet hinges must NEVER be wiped with soap or detergent. Cockroaches feed on them over 10–14 days to destroy the entire nest.
                </p>
              </div>
            </div>

            <div className="bg-[#12161f] border border-white/[0.08] rounded-2xl p-6">
              <h4 className="text-sm font-bold text-[#FFE08A] uppercase tracking-wider mb-3 font-heading">
                What to Expect During the First 7–14 Days
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                You may observe increased pest activity in the first 48 to 72 hours. This is normal and desired: modern IPM compounds contain active stimulants that draw hidden nymphs out of deep harborages. As they ingest bait and contact residual deposits, mortality spikes within 3 to 7 days, achieving complete colony breakdown.
              </p>
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>If abnormal live activity persists after 14 days, call our desk for a free warranty booster visit.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCIENTIFIC IPM FRAMEWORK */}
        {activeTab === 'ipm' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/[0.08] pb-6">
              <span className="text-xs font-mono font-bold text-[#E5A93C] uppercase tracking-wider block mb-1">
                Methodology Protocol 03
              </span>
              <h3 className="text-2xl font-black text-white font-heading">
                The 5-Stage Integrated Pest Management (IPM) Framework
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                We reject blind chemical spraying in favor of scientific, habitat-targeted, and ecologically responsible pest eradication.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Forensic Property Inspection',
                  desc: 'Comprehensive visual diagnosis using UV thermal sensors and moisture meters to pinpoint entry paths, nest centers, and structural compromises.',
                  icon: '🔍',
                },
                {
                  step: '02',
                  title: 'Species-Specific Identification',
                  desc: 'Determining exact species (e.g. German vs American cockroach, Coptotermes vs Heterotermes termite) to choose biological and chemical mechanisms that will work with 100% precision.',
                  icon: '🧬',
                },
                {
                  step: '03',
                  title: 'Targeted Non-Toxic & Odorless Intervention',
                  desc: 'Deployment of CIB-registered pheromone gels, insect growth regulators (IGRs), targeted bait stations, and microencapsulated suspensions rather than harsh smelling fogging.',
                  icon: '🎯',
                },
                {
                  step: '04',
                  title: 'Mechanical Exclusion & Habitat Modification',
                  desc: 'Advising on door sweep sealing, silicone expansion joint fills, pipe sleeve caulking, and food storage hygiene to eliminate access to food and moisture.',
                  icon: '🛡️',
                },
                {
                  step: '05',
                  title: 'Post-Treatment Monitoring & Warranty Verification',
                  desc: 'Placement of non-toxic sticky monitors in critical voids to assess population reduction over 30 days and provide written service audit documentation.',
                  icon: '📊',
                },
              ].map((stage) => (
                <div
                  key={stage.step}
                  className="bg-black/30 border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#E5A93C]/30 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/20 flex items-center justify-center text-xl shrink-0">
                    {stage.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#E5A93C] uppercase">
                        Stage {stage.step}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STRUCTURAL EXCLUSION */}
        {activeTab === 'exclusion' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/[0.08] pb-6">
              <span className="text-xs font-mono font-bold text-[#E5A93C] uppercase tracking-wider block mb-1">
                Prevention Protocol 04
              </span>
              <h3 className="text-2xl font-black text-white font-heading">
                Structural Exclusion &amp; Proofing Standards
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Physical barriers prevent 80% of urban pest infestations from ever establishing inside buildings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-white mb-2 font-heading flex items-center gap-2">
                  <span className="text-cyan-400">■</span> Door Bottoms &amp; Thresholds
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  Gaps under exterior doors exceeding 6mm permit rodents and cockroaches. Install aluminum-backed heavy duty rubber or nylon brush door sweeps across main entrance, utility, and balcony doors.
                </p>
                <div className="text-[11px] text-[#FFE08A] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                  Rule of thumb: If a pencil slips under your door, a young mouse can enter with ease.
                </div>
              </div>

              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-white mb-2 font-heading flex items-center gap-2">
                  <span className="text-cyan-400">■</span> Utility Pipe Penetrations
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  Water supply lines, drain stacks, and AC refrigerant conduits pass through oversized wall drillings. Pack these voids tightly with stainless steel copper mesh, then seal with expanding polyurethane foam or non-shrink grout.
                </p>
                <div className="text-[11px] text-[#FFE08A] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                  Prevents rats from traveling between floors through building duct shafts.
                </div>
              </div>

              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-white mb-2 font-heading flex items-center gap-2">
                  <span className="text-cyan-400">■</span> Bathroom Floor Drain Jali
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  Replace traditional open grill floor drains with anti-cockroach floor traps (jali with water seal cups or one-way silicone flap valves). Ensures American sewer cockroaches cannot push upwards through dry traps.
                </p>
                <div className="text-[11px] text-[#FFE08A] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                  Crucial for ground-floor apartments and multi-story bathroom ducts.
                </div>
              </div>

              <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-white mb-2 font-heading flex items-center gap-2">
                  <span className="text-cyan-400">■</span> Windows &amp; Ventilation Grilles
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  Maintain stainless steel 304 grade 20-mesh screens on all openable windows. Fix tears immediately using silicone screen patches. Keeps out mosquitoes, drain flies, and evening termite swarmers.
                </p>
                <div className="text-[11px] text-[#FFE08A] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                  Essential for homes located within 1 km of Bangalore lakes and stormwater canals.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: KITCHEN & HYGIENE HABITS */}
        {activeTab === 'kitchen' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/[0.08] pb-6">
              <span className="text-xs font-mono font-bold text-[#E5A93C] uppercase tracking-wider block mb-1">
                Prevention Protocol 05
              </span>
              <h3 className="text-2xl font-black text-white font-heading">
                Kitchen Sanitation &amp; Moisture Control Protocols
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                A clean, moisture-free property starves insects of the two fundamental survival needs: water and fermentable carbohydrates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#FFE08A] uppercase tracking-wider font-heading">
                  Daily Nightly Habits (The 10-Minute Close-Down)
                </h4>
                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="p-3 bg-black/30 rounded-xl border border-white/[0.04]">
                    <strong>1. Wipe Countertops &amp; Gas Stovetops:</strong> Grease residues contain lipids that sustain German cockroach colonies for weeks.
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl border border-white/[0.04]">
                    <strong>2. Empty the Wet Trash Nightly:</strong> Never leave open vegetable peelings or food scrapes in unsealed bins overnight.
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl border border-white/[0.04]">
                    <strong>3. Dry the Sink Basin:</strong> Cockroaches require water daily. Running a dry microfiber cloth over the stainless steel basin prevents midnight drinking.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#FFE08A] uppercase tracking-wider font-heading">
                  Pantry Storage &amp; Moisture Mitigation
                </h4>
                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="p-3 bg-black/30 rounded-xl border border-white/[0.04]">
                    <strong>1. Airtight Containers for Grains:</strong> Transfer flours, lentils, rice, and sugar into borosilicate glass or airtight BPA-free plastic jars with rubber gaskets.
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl border border-white/[0.04]">
                    <strong>2. Fix Under-Sink Plumbing Drips:</strong> Even a slow drip under the sink creates elevated cabinet humidity, attracting wood rot and termites.
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl border border-white/[0.04]">
                    <strong>3. Keep Cardboard Cartons Out:</strong> Corrugated cardboard cartons hold glue and cellulose that nourish both cockroaches and silverfish. Discard cartons immediately after delivery.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
