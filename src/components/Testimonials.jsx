import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote } from 'lucide-react';
import FoldText from './FoldText';

export default function Testimonials() {
  return (
    <section id="reviews" className="section-padding bg-bone" style={{ borderTop: '1px solid var(--color-border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>STORIES 04</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
              Client Proof
            </span>
          </div>
          <h2 style={{ marginBottom: '1rem' }}>
            <FoldText
              text="Loved by 48+ Happy Hearts"
              trigger="scroll"
              splitBy="word"
              hinge="top"
              duration={0.65}
              stagger={0.045}
              fontSize="clamp(2.2rem, 4.5vw, 3.6rem)"
              fontWeight={800}
              color="#000000"
            />
          </h2>
          <p style={{ color: '#5E6472', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Hear from partners, friends, and families who trusted our stealth coordination.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {TESTIMONIALS.map((t, idx) => {
            const formattedIndex = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={t.id}
                className="framer-card"
                style={{
                  padding: '2.5rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>{formattedIndex}</span>
                    <div style={{ display: 'flex', gap: '0.2rem', color: '#000000' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#000000" />
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: '1.05rem', color: '#1F2937', lineHeight: 1.7, marginBottom: '2rem' }}>
                    "{t.comment}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid #F3F4F6', paddingTop: '1.2rem' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#000000', fontWeight: 700 }}>{t.name}</h4>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                      {t.occasion} • <span style={{ color: '#000000', fontWeight: 600 }}>{t.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
