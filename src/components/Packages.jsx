import React, { useState } from 'react';
import { PACKAGES } from '../data/mockData';
import { Star, Check, ArrowRight, Calendar } from 'lucide-react';

export default function Packages({ onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPackages = activeFilter === 'all'
    ? PACKAGES
    : PACKAGES.filter(p => p.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Experiences' },
    { id: 'popular', label: 'Bestsellers' },
    { id: 'romantic', label: 'Romantic & Canopy' },
    { id: 'birthday', label: 'Birthday & Neon' },
    { id: 'proposal', label: 'VIP Proposals' },
    { id: 'gifts', label: 'Gift Trunks' }
  ];

  return (
    <section id="packages" className="section-padding bg-bone" style={{ borderTop: '1px solid var(--color-border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>PROGRAMS 02</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
              Curated Signatures
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#000000', marginBottom: '1rem' }}>
            All-Inclusive Celebration Packages
          </h2>
          <p style={{ color: '#5E6472', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Designed to deliver breathtaking reactions and cherished lifetime memories across India.
          </p>
        </div>

        {/* Elevare Style Category Pill Tabs */}
        <div className="tab-pills-container" style={{ marginBottom: '3rem' }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`tab-pill ${activeFilter === f.id ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredPackages.map((pkg, idx) => {
            const formattedIndex = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={pkg.id}
                className="framer-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden'
                }}
              >
                {/* Full-Bleed Image Container */}
                <div
                  style={{
                    height: '270px',
                    backgroundImage: `url(${pkg.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Top Bar Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 2
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <span className="mono-tag">{formattedIndex}</span>
                      {pkg.badge && (
                        <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000' }}>
                          {pkg.badge.toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        color: '#F8DC6C',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}
                    >
                      <Star size={14} fill="#F8DC6C" /> {pkg.rating}
                    </div>
                  </div>

                  {/* Dark Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'
                    }}
                  />

                  {/* Title overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '20px',
                      right: '20px',
                      color: '#FFFFFF'
                    }}
                  >
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.2rem' }}>
                      {pkg.title}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                      {pkg.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content & Features */}
                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: '0.8rem' }}>
                      Included In Setup
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {pkg.features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#374151' }}>
                          <Check size={16} color="#000000" style={{ flexShrink: 0 }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000' }}>
                          ₹{pkg.price}
                        </span>
                        <span style={{ fontSize: '0.95rem', color: '#9CA3AF', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                          ₹{pkg.originalPrice}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        SAVE {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(pkg)}
                      className="btn-gold"
                      style={{ width: '100%', padding: '0.85rem' }}
                      id={`book-pkg-${pkg.id}`}
                    >
                      <Calendar size={16} /> Book This Experience
                    </button>
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
