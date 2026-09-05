import React from 'react';
import { Sparkles, Heart, Star, ShieldCheck, ArrowRight, Play, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ onOpenBooking, onOpenUnboxing, onSelectOccasion }) {
  const triggerHeroConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#EC4899', '#8B5CF6', '#F59E0B']
    });
  };

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.18) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid">
          {/* Left Column: Text & CTAs */}
          <div style={{ maxWidth: '680px' }}>
            {/* Top Badge */}
            <div
              className="section-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                marginBottom: '1.4rem'
              }}
              onClick={triggerHeroConfetti}
              title="Click for celebration sparkle!"
            >
              <Sparkles size={16} />
              <span>India's #1 Bespoke Surprise Experience Brand</span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              We Turn Secret Plans Into{' '}
              <span className="text-gradient">Unforgettable Magic.</span>
            </h1>

            {/* Subheading */}
            <p style={{ fontSize: '1.15rem', color: '#94A3B8', marginBottom: '2.2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              From midnight acoustic serenades and breathtaking candlelight cabanas to secret trunk reveals and handcrafted keepsake hampers. We craft pure emotional goosebumps.
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.8rem' }}>
              <a href="#builder" className="btn btn-primary btn-lg" id="hero-cta-builder">
                Build Your Surprise <ArrowRight size={18} />
              </a>

              <button
                onClick={onOpenUnboxing}
                className="btn btn-secondary btn-lg"
                id="hero-cta-mystery"
                style={{ borderColor: 'rgba(236, 72, 153, 0.4)' }}
              >
                <Gift size={18} color="#EC4899" /> Unbox Reward Box
              </button>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1.2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: '#F59E0B' }}>
                  <Star size={20} fill="#F59E0B" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>4.9 / 5.0</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>1,500+ Celebrations</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: '#E11D48' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>100% Stealth</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Zero-Clue Guarantee</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: '#8B5CF6' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>12:00 AM Sharp</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Punctual Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual Card */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-card"
              style={{
                padding: '2rem',
                width: '100%',
                maxWidth: '460px',
                position: 'relative',
                background: 'linear-gradient(145deg, rgba(24, 32, 53, 0.8), rgba(12, 17, 30, 0.95))',
                border: '1px solid rgba(236, 72, 153, 0.25)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(225, 29, 72, 0.15)'
              }}
            >
              {/* Floating Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '24px',
                  background: 'var(--gradient-primary)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 15px rgba(225, 29, 72, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Heart size={13} fill="#fff" /> Live Booking Open
              </div>

              {/* Visual Showcase Card */}
              <div
                style={{
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '1.5rem',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7, 9, 14, 0.85) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.2rem'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tonight's Highlight
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Midnight Rooftop Serenade</h3>
                </div>
              </div>

              {/* Quick Builder Preview Buttons */}
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '0.75rem', fontWeight: 500 }}>
                  What are you celebrating?
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['🎂 Birthday', '💍 Proposal', '🥂 Anniversary', '💌 Long Distance'].map((item, idx) => (
                    <a
                      key={idx}
                      href="#builder"
                      style={{
                        padding: '0.45rem 0.85rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: '#F8FAFC',
                        transition: 'all 0.2s ease',
                        display: 'inline-block'
                      }}
                      className="tag-btn"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Action */}
              <button
                onClick={() => onOpenBooking({ title: 'Custom Surprise Experience', price: 2999 })}
                className="btn btn-whatsapp"
                style={{ width: '100%', borderRadius: '12px', padding: '0.85rem' }}
                id="hero-quick-chat"
              >
                Chat on WhatsApp Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        .tag-btn:hover {
          background: rgba(236, 72, 153, 0.15) !important;
          border-color: rgba(236, 72, 153, 0.4) !important;
          color: #EC4899 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
