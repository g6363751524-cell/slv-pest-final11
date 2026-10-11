import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureBar } from './components/FeatureBar';
import { ProblemSigns } from './components/ProblemSigns';
import { ServicesGrid } from './components/ServicesGrid';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServiceAreas } from './components/ServiceAreas';
import { InspectionCta } from './components/InspectionCta';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-zinc-200 flex flex-col font-sans selection:bg-[#E5A93C] selection:text-black">
      {/* 1. Header */}
      <Header />

      {/* Main Content Area - normal continuous document flow */}
      <main className="flex-1 w-full">
        {/* 2. Hero — "PESTS OUT. PEACE IN." */}
        <Hero />

        {/* 3. Four feature cards */}
        <FeatureBar />

        {/* 4. Problem / Signs section */}
        <ProblemSigns />

        {/* 5. 8-service grid */}
        <ServicesGrid />

        {/* 6. How It Works */}
        <HowItWorks />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Bangalore Service Areas */}
        <ServiceAreas />

        {/* 9. Inspection CTA */}
        <InspectionCta />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Floating Scroll to Top & WhatsApp Actions */}
      <FloatingActions />
    </div>
  );
}
