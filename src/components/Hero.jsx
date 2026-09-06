import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import FoldText from './FoldText';
import TextPressure from './TextPressure';

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
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundImage: 'url(https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '7rem'
      }}
      className="hero-section"
    >
      {/* Dark & Cinematic Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.88) 100%)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '380px',
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
          {/* Left: Giant Elevare-Style Cutout Typography with TextPressure */}
          <div style={{ maxWidth: '620px', width: '100%' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                padding: '0.35rem 0.9rem',
                color: '#F8DC6C',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '0.6rem',
                cursor: 'pointer'
              }}
              onClick={triggerConfetti}
            >
              <Sparkles size={14} /> #1 Bespoke Surprise Planner
            </div>

            <div
              style={{
                position: 'relative',
                height: 'clamp(95px, 15vw, 155px)',
                width: '100%',
                filter: 'drop-shadow(0 6px 30px rgba(0, 0, 0, 0.6))',
                cursor: 'pointer'
              }}
              className="hero-giant-title"
            >
              <TextPressure
                text="Surprise"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#F8DC6C"
                minFontSize={48}
              />
            </div>
          </div>

          {/* Right: Emotional Statement & Action CTA */}
          <div style={{ maxWidth: '500px', justifySelf: 'end' }} className="hero-right-col">
            <h2
              style={{
                marginBottom: '0.85rem'
              }}
            >
              <FoldText
                text="Achieve Unforgettable Moments with Celebrations that Deliver Results!"
                trigger="mount"
                splitBy="word"
                hinge="top"
                duration={0.65}
                stagger={0.04}
                fontSize="clamp(1.35rem, 2.5vw, 2.2rem)"
                fontWeight={700}
                color="#FFFFFF"
              />
            </h2>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.94rem', marginBottom: '1.6rem', lineHeight: 1.6 }}>
              From midnight acoustic serenades and breathtaking candlelight cabanas to secret trunk reveals. We engineer pure emotional magic with 100% stealth guarantee.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="#builder"
                className="btn-gold"
                style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                id="hero-join-now-btn"
              >
                Join Now <ArrowRight size={18} />
              </a>

              <button
                onClick={onOpenUnboxing}
                className="btn-pill-light"
                style={{ padding: '0.8rem 1.3rem' }}
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
        @media (max-width: 899px) {
          .hero-right-col {
            justify-self: start !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding-top: 6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
