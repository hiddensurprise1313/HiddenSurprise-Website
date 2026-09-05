import React, { useState } from 'react';
import { PACKAGES } from '../data/mockData';
import { Sparkles, Star, Check, Calendar, ArrowRight, Shield } from 'lucide-react';

export default function Packages({ onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPackages = activeFilter === 'all'
    ? PACKAGES
    : PACKAGES.filter(p => p.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Packages' },
    { id: 'popular', label: 'Bestsellers' },
    { id: 'romantic', label: 'Romantic & Canopy' },
    { id: 'birthday', label: 'Birthday & Neon' },
    { id: 'proposal', label: 'VIP Proposals' },
    { id: 'gifts', label: 'Gift Trunks' }
  ];

  return (
    <section id="packages" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Curated Signatures
          </div>
          <h2 className="section-title">
            All-Inclusive <span className="text-gradient">Celebration Packages</span>
          </h2>
          <p className="section-subtitle">
            Flawlessly curated signature experiences designed to deliver awe, happy tears, and cherished lifetime memories.
          </p>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              marginTop: '2rem'
            }}
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  background: activeFilter === f.id ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: activeFilter === f.id ? '#FFFFFF' : '#94A3B8',
                  border: activeFilter === f.id ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: activeFilter === f.id ? '0 4px 15px rgba(225, 29, 72, 0.35)' : 'none'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                border: pkg.badge === 'Bestseller' ? '1px solid rgba(225, 29, 72, 0.4)' : '1px solid var(--border-glass)'
              }}
            >
              {/* Badge Ribbon */}
              {pkg.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    zIndex: 2,
                    background: pkg.badge === 'Signature VIP' ? 'var(--gradient-gold)' : 'var(--gradient-primary)',
                    color: '#fff',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              {/* Image Preview */}
              <div
                style={{
                  height: '220px',
                  backgroundImage: `url(${pkg.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(18, 24, 38, 0.95) 0%, transparent 70%)'
                  }}
                />

                {/* Rating overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: '#F59E0B',
                    fontWeight: 700
                  }}
                >
                  <Star size={14} fill="#F59E0B" /> {pkg.rating} ({pkg.reviewsCount})
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>{pkg.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '1.4rem' }}>{pkg.tagline}</p>

                  {/* Feature Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.8rem' }}>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.86rem', color: '#E2E8F0' }}>
                        <div style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }}>
                          <Check size={16} />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.6rem',
                      marginBottom: '1.2rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC' }}>
                      ₹{pkg.price}
                    </span>
                    <span style={{ fontSize: '1rem', color: '#64748B', textDecoration: 'line-through' }}>
                      ₹{pkg.originalPrice}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, marginLeft: 'auto' }}>
                      Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
                    <button
                      onClick={() => onOpenBooking(pkg)}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.75rem' }}
                      id={`book-pkg-${pkg.id}`}
                    >
                      <Calendar size={16} /> Book This Experience
                    </button>
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
