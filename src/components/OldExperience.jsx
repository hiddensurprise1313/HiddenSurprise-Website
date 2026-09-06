import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Hero from './Hero';
import StatsBanner from './StatsBanner';
import SurpriseBuilder from './SurpriseBuilder';
import Packages from './Packages';
import SpiralPhotoWall from './SpiralPhotoWall';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import ScrollPill from './ScrollPill';

export default function OldExperience({
  onOpenBooking,
  onOpenUnboxing,
  appliedDiscount
}) {
  return (
    <div className="old-experience">
      {/* Top Banner indicating /old archive with quick link back to / */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: '#0A0D14',
          borderBottom: '1px solid rgba(248, 220, 108, 0.3)',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          color: '#FFFFFF',
          fontSize: '0.85rem'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#F8DC6C', fontWeight: 700 }}>
          <Sparkles size={14} /> Viewing Full Classic Website (/old)
        </span>
        <a
          href="#/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#F8DC6C',
            color: '#000000',
            fontWeight: 800,
            fontSize: '0.78rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={13} /> Switch to Curated Services Page (/)
        </a>
      </div>

      <main>
        {/* Fullscreen 100vh Hero with TextPressure */}
        <Hero
          onOpenBooking={onOpenBooking}
          onOpenUnboxing={onOpenUnboxing}
        />

        {/* Elevare Style Stats & Statement Callout */}
        <StatsBanner />

        {/* Interactive 4-step Surprise Builder Wizard */}
        <SurpriseBuilder
          onOpenBooking={onOpenBooking}
          appliedDiscount={appliedDiscount}
        />

        {/* Curated Package Catalog Cards */}
        <Packages
          onOpenBooking={onOpenBooking}
        />

        {/* 3D Infinite Spiral Photowall Section */}
        <SpiralPhotoWall />

        {/* Client Stories & Testimonials */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FAQ />
      </main>

      {/* Quick Scroll Navigation Pill */}
      <ScrollPill />
    </div>
  );
}
