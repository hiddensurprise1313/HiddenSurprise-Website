import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, MessageCircle, Clock, Award } from 'lucide-react';
import { CURATED_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData';
import FoldText from './FoldText';
import StarBorder from './StarBorder';

export default function CuratedServices({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all'
    ? CURATED_SERVICES
    : CURATED_SERVICES.filter(s => s.category === activeCategory);

  const getWhatsAppUrl = (service) => {
    const text = encodeURIComponent(
      `Hi Hidden Surprise! 🎁✨\n\nI want to book the *${service.title}* (${service.categoryName}).\n\nPlease let me know availability and details for my celebration date!`
    );
    return `https://wa.me/919133143232?text=${text}`;
  };

  return (
    <section id="services" className="section-padding bg-bone" style={{ borderBottom: '1px solid var(--color-border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>
              CURATED PACKAGES & OFFERINGS
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
              Stealth Celebration Menu
            </span>
          </div>

          <h2 style={{ marginBottom: '1rem' }}>
            <FoldText
              text="Signature Surprise Packages"
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
            Browse our official Basic, Premium, and Elite packages along with bespoke outdoor, romantic, and celebration add-ons — flawlessly executed with 100% stealth guarantee.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '3rem',
            scrollbarWidth: 'none'
          }}
          className="services-filter-pills"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
              background: activeCategory === 'all' ? '#000000' : '#FFFFFF',
              color: activeCategory === 'all' ? '#F8DC6C' : '#000000',
              border: '1px solid',
              borderColor: activeCategory === 'all' ? '#000000' : 'rgba(0, 0, 0, 0.12)',
              boxShadow: activeCategory === 'all' ? '0 6px 20px rgba(0, 0, 0, 0.18)' : '0 2px 6px rgba(0, 0, 0, 0.04)'
            }}
          >
            All Experiences ({CURATED_SERVICES.length})
          </button>

          {SERVICE_CATEGORIES.map(cat => {
            const count = CURATED_SERVICES.filter(s => s.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-pill ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                  background: isActive ? '#000000' : '#FFFFFF',
                  color: isActive ? '#F8DC6C' : '#000000',
                  border: '1px solid',
                  borderColor: isActive ? '#000000' : 'rgba(0, 0, 0, 0.12)',
                  boxShadow: isActive ? '0 6px 20px rgba(0, 0, 0, 0.18)' : '0 2px 6px rgba(0, 0, 0, 0.04)'
                }}
              >
                {cat.badge} ({count})
              </button>
            );
          })}
        </div>

        {/* Services Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.2rem'
          }}
          className="services-grid"
        >
          {filteredServices.map((service) => {
            return (
              <div
                key={service.id}
                className="framer-card curated-service-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Photo Header with Number & Category Badges */}
                <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    className="service-card-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.75) 100%)'
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      right: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 2
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: '#F8DC6C',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(248, 220, 108, 0.35)'
                      }}
                    >
                      {service.categoryName.toUpperCase()} • #{service.number}
                    </span>

                    {service.badgeText && (
                      <span
                        style={{
                          background: '#F8DC6C',
                          color: '#000000',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '9999px',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}
                      >
                        {service.badgeText}
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay Tagline */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.9rem',
                      left: '1.2rem',
                      right: '1.2rem',
                      zIndex: 2
                    }}
                  >
                    <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '0.85rem', fontWeight: 600 }}>
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title & Duration Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.85rem' }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#000000', lineHeight: 1.25 }}>
                      {service.title}
                    </h3>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: 'rgba(0,0,0,0.06)',
                        padding: '0.35rem 0.7rem',
                        borderRadius: '100px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#000000',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Clock size={13} color="#F59E0B" />
                      <span>{service.duration || 'Custom'}</span>
                    </div>
                  </div>

                  <p style={{ color: '#5E6472', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '1.4rem' }}>
                    {service.desc}
                  </p>

                  {/* Highlight Checklist */}
                  <div style={{ marginTop: 'auto', marginBottom: '1.8rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', marginBottom: '0.75rem' }}>
                      Inclusions in this Package:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {service.highlights.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: '#1F2937' }}>
                          <span style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }}>
                            <Check size={14} strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.65rem' }}>
                    <StarBorder
                      onClick={() => onOpenBooking({
                        packageId: service.id,
                        title: service.title,
                        category: service.categoryName,
                        duration: service.duration
                      })}
                      color="#F8DC6C"
                      speed="4s"
                      thickness={1.5}
                      backgroundColor="#000000"
                      textColor="#F8DC6C"
                      borderColor="rgba(248, 220, 108, 0.45)"
                      innerStyle={{
                        padding: '0.8rem 1.2rem',
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        width: '100%',
                        borderRadius: '14px',
                        justifyContent: 'center'
                      }}
                      style={{ width: '100%', borderRadius: '14px' }}
                    >
                      Book Experience <ArrowRight size={15} />
                    </StarBorder>

                    <a
                      href={getWhatsAppUrl(service)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dark"
                      style={{
                        padding: '0.85rem',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#25D366',
                        borderColor: '#25D366',
                        color: '#FFFFFF'
                      }}
                      title="Chat on WhatsApp"
                      aria-label="Chat on WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .curated-service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
        }

        .curated-service-card:hover .service-card-img {
          transform: scale(1.06);
        }

        @media (max-width: 680px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .services-filter-pills {
            padding-bottom: 0.6rem !important;
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
