import React from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ onOpenBooking, onOpenUnboxing }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F8DC6C', '#FFFFFF', '#F59E0B', '#000000']
    });
  };

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundImage: 'url(https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark & Cinematic Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.85) 100%)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '420px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Hero Bottom Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingBottom: '3.5rem',
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            alignItems: 'flex-end'
          }}
          className="hero-grid-layout"
        >
          {/* Left: Giant Elevare-Style Cutout Typography */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                color: '#F8DC6C',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '0.8rem',
                cursor: 'pointer'
              }}
              onClick={triggerConfetti}
            >
              <Sparkles size={14} /> #1 Bespoke Surprise Planner
            </div>

            <h1
              style={{
                fontSize: 'clamp(4.2rem, 11vw, 9.5rem)',
                fontWeight: 900,
                color: '#F8DC6C',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                margin: 0,
                textTransform: 'none',
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
              }}
              className="hero-giant-title"
            >
              Surprise
            </h1>
          </div>

          {/* Right: Emotional Statement & Action CTA */}
          <div style={{ maxWidth: '480px', justifySelf: 'end' }} className="hero-right-col">
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
                color: '#FFFFFF',
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: '1rem'
              }}
            >
              Achieve Unforgettable Moments with Celebrations that Deliver Results!
            </h2>

            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.98rem', marginBottom: '1.8rem', lineHeight: 1.6 }}>
              From midnight acoustic serenades and breathtaking candlelight cabanas to secret trunk reveals. We engineer pure emotional magic with 100% stealth guarantee.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="#builder"
                className="btn-gold"
                style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
                id="hero-join-now-btn"
              >
                Join Now <ArrowRight size={18} />
              </a>

              <button
                onClick={onOpenUnboxing}
                className="btn-pill-light"
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <Sparkles size={16} color="#F8DC6C" /> Unbox Perk
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid-layout {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}</style>
    </section>
  );
}
