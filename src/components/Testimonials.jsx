import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Sparkles, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Emotional Stories
          </div>
          <h2 className="section-title">
            Loved by <span className="text-gradient">1,500+ Happy Hearts</span>
          </h2>
          <p className="section-subtitle">
            Read how we brought dream celebrations to life with tears of happiness and stealth perfection.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card"
              style={{
                padding: '2.2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  color: 'rgba(236, 72, 153, 0.2)'
                }}
              >
                <Quote size={48} />
              </div>

              <div>
                {/* Star rating */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.2rem', color: '#F59E0B' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" />
                  ))}
                </div>

                <p style={{ color: '#E2E8F0', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '2rem', fontStyle: 'italic' }}>
                  "{t.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.2rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #EC4899' }}
                />
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#FFFFFF' }}>{t.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    {t.occasion} • <span style={{ color: '#EC4899' }}>{t.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
