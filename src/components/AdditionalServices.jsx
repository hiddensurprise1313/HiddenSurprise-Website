import React from 'react';
import { Sparkles, ArrowRight, MessageCircle, Check } from 'lucide-react';
import { ADDITIONAL_SERVICES } from '../data/servicesData';
import FoldText from './FoldText';
import StarBorder from './StarBorder';

export default function AdditionalServices({ onOpenBooking }) {
  const getWhatsAppUrl = (service) => {
    const text = encodeURIComponent(
      `Hi Hidden Surprise! 🎁✨\n\nI want to add the *${service.title}* (Additional Service) for ₹${service.price.toLocaleString('en-IN')}.\n\nPlease check availability for my celebration date!`
    );
    return `https://wa.me/919133143232?text=${text}`;
  };

  return (
    <section id="additional-services" className="section-padding bg-dark" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', position: 'relative', overflow: 'hidden' }}>
      {/* Soft Ambient Radial Lights */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(248, 220, 108, 0.08) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(255, 0, 127, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000', fontWeight: 800 }}>
              EXTRA MAGIC • ADD-ONS
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F8DC6C' }}>
              Additional Services
            </span>
          </div>

          <h2 style={{ marginBottom: '1rem' }}>
            <FoldText
              text="Celebration Add-On Services"
              trigger="scroll"
              splitBy="word"
              hinge="top"
              duration={0.65}
              stagger={0.045}
              fontSize="clamp(2.2rem, 4.5vw, 3.6rem)"
              fontWeight={800}
              color="#FFFFFF"
            />
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Elevate any surprise setup with our signature hand-tied flower bouquets, decadent chocolate arrangements, and grand banner entrance reveals.
          </p>
        </div>

        {/* 3 Additional Service Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.2rem'
          }}
          className="addons-grid"
        >
          {ADDITIONAL_SERVICES.map((service) => {
            const discountPct = Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100);

            return (
              <div
                key={service.id}
                className="framer-card addon-service-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  background: '#121620',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Photo Header */}
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
                    className="addon-card-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(10,13,20,0.92) 100%)'
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
                      ADD-ON #{service.number}
                    </span>

                    <span
                      style={{
                        background: '#F8DC6C',
                        color: '#000000',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '9999px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {discountPct}% OFF
                    </span>
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
                    <p style={{ color: '#F8DC6C', fontSize: '0.85rem', fontWeight: 700 }}>
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title & Price Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.85rem' }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25 }}>
                      {service.title}
                    </h3>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F8DC6C', fontFamily: 'var(--font-display)' }}>
                        ₹{service.price.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'line-through' }}>
                        ₹{service.originalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '1.4rem' }}>
                    {service.desc}
                  </p>

                  {/* Highlight Checklist */}
                  <div style={{ marginTop: 'auto', marginBottom: '1.8rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#F8DC6C', marginBottom: '0.75rem' }}>
                      What's Included:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      {service.highlights.map((item, idx2) => (
                        <li key={idx2} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                          <span style={{ color: '#F8DC6C', flexShrink: 0, marginTop: '2px' }}>
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
                        price: service.price
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
                      Book Add-on <ArrowRight size={15} />
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
                      title="Add on WhatsApp"
                      aria-label="Add on WhatsApp"
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
        .addon-service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6) !important;
          border-color: rgba(248, 220, 108, 0.4) !important;
        }

        .addon-service-card:hover .addon-card-img {
          transform: scale(1.06);
        }

        @media (max-width: 680px) {
          .addons-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
