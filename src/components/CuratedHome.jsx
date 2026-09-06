import React from 'react';
import Hero from './Hero';
import StatsBanner from './StatsBanner';
import CuratedServices from './CuratedServices';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

export default function CuratedHome({
  onOpenBooking,
  onOpenUnboxing
}) {
  return (
    <main className="curated-home-main">
      {/* Fullscreen 100vh Hero with TextPressure */}
      <Hero
        onOpenBooking={onOpenBooking}
        onOpenUnboxing={onOpenUnboxing}
      />

      {/* Elevare Style Stats & Statement Callout */}
      <StatsBanner />

      {/* Curated Surprise Services Section (Outdoor, Special, Indoor) */}
      <CuratedServices
        onOpenBooking={onOpenBooking}
      />

      {/* Loved by 48+ Happy Hearts Testimonials */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />
    </main>
  );
}
