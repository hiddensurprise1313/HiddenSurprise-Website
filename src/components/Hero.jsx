import React from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart } from 'lucide-react';
import FoldText from './FoldText';
import TextPressure from './TextPressure';
import StarBorder from './StarBorder';
import { HeroAmbientConfetti, triggerSideCannons, HOME_RAINBOW_CELEBRATION_COLORS } from './Confetti';

export default function Hero({ onOpenBooking, onOpenUnboxing }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 30%, rgba(248, 220, 108, 0.09) 0%, transparent 60%), radial-gradient(circle at 15% 75%, rgba(245, 158, 11, 0.07) 0%, transparent 50%), #07090E',
        paddingTop: '7rem',
        paddingBottom: '3rem'
      }}
      className="hero-section"
    >
      {/* Dreamy Multi-Color Celebration Ambient Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 25%, rgba(255, 0, 127, 0.14) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(0, 242, 254, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 50% 40%, rgba(248, 220, 108, 0.15) 0%, transparent 55%),
            radial-gradient(circle at 15% 80%, rgba(121, 40, 202, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 85% 75%, rgba(255, 87, 34, 0.12) 0%, transparent 50%),
            linear-gradient(180deg, rgba(7, 9, 14, 0.7) 0%, rgba(7, 9, 14, 0.3) 40%, rgba(7, 9, 14, 0.98) 100%),
            #07090E
          `,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Rich Multi-Color Rainbow Confetti at Medium Density & Speed (Home Exclusive) */}
      <HeroAmbientConfetti
        colors={HOME_RAINBOW_CELEBRATION_COLORS}
        sideColors={HOME_RAINBOW_CELEBRATION_COLORS}
        speed="medium"
        density="medium"
        showSideCannons={true}
        showMainRain={true}
      />

      {/* Bottom Soft Edge Blur */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      {/* Hero Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          margin: 'auto 0'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
          className="hero-grid-layout"
        >
          {/* Left: Giant Elevare-Style Cutout Typography with TextPressure */}
          <div style={{ maxWidth: '620px', width: '100%', position: 'relative' }} className="hero-left-col">
            {/* Ambient Title Glow Backdrop */}
            <div
              style={{
                position: 'absolute',
                left: '-10%',
                top: '-10%',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(ellipse at 40% 50%, rgba(248, 220, 108, 0.12) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 75%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: -1
              }}
            />

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(248, 220, 108, 0.35)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                color: '#F8DC6C',
                fontSize: '0.84rem',
                fontWeight: 700,
                marginBottom: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
              }}
              onClick={() => triggerSideCannons(HOME_RAINBOW_CELEBRATION_COLORS)}
            >
              <Sparkles size={15} color="#F8DC6C" /> #1 Bespoke Surprise Planner
            </div>

            <div
              style={{
                position: 'relative',
                height: 'clamp(95px, 13vw, 150px)',
                width: '100%',
                filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.7))',
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
                minFontSize={40}
              />
            </div>

            {/* Desktop Trust Highlights Bar */}
            <div
              className="hero-trust-bar"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                marginTop: '1.4rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.84rem', fontWeight: 600 }}>
                <Star size={14} color="#F8DC6C" fill="#F8DC6C" />
                <span style={{ color: '#F8DC6C', fontWeight: 700 }}>4.9/5.0</span>
                <span>(48+ Happy Hearts)</span>
              </div>
              <div className="hero-trust-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.3)' }} />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.84rem', fontWeight: 600 }}>
                <ShieldCheck size={14} color="#F8DC6C" />
                <span>100% Stealth Guarantee</span>
              </div>
              <div className="hero-trust-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.3)' }} />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.84rem', fontWeight: 600 }}>
                <Heart size={14} color="#F8DC6C" />
                <span>Karaikal & Surrounding</span>
              </div>
            </div>
          </div>

          {/* Right: Emotional Statement & Action CTA */}
          <div style={{ maxWidth: '520px', justifySelf: 'end' }} className="hero-right-col">
            <h2
              style={{
                marginBottom: '1rem'
              }}
            >
              <FoldText
                text="Achieve Unforgettable Moments with Celebrations that Deliver Results!"
                trigger="mount"
                splitBy="word"
                hinge="top"
                duration={0.65}
                stagger={0.04}
                fontSize="clamp(1.35rem, 2.5vw, 2.3rem)"
                fontWeight={700}
                color="#FFFFFF"
              />
            </h2>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.96rem', marginBottom: '1.8rem', lineHeight: 1.65 }}>
              From midnight acoustic serenades and breathtaking candlelight cabanas to secret trunk reveals. We engineer pure emotional magic with 100% stealth guarantee.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }} className="hero-cta-btns">
              <StarBorder
                onClick={() => onOpenBooking()}
                color="#F8DC6C"
                speed="3.5s"
                thickness={2}
                backgroundColor="#000000"
                textColor="#F8DC6C"
                borderColor="rgba(248, 220, 108, 0.5)"
                innerStyle={{ padding: '0.9rem 1.9rem', fontSize: '1.02rem', fontWeight: 800 }}
                id="hero-join-now-btn"
                className="hero-btn-star"
              >
                Book Now <ArrowRight size={18} />
              </StarBorder>

              <button
                onClick={() => {
                  triggerSideCannons(HOME_RAINBOW_CELEBRATION_COLORS);
                  onOpenUnboxing();
                }}
                className="btn-pill-light hero-btn-unbox"
                style={{ padding: '0.85rem 1.4rem', fontSize: '0.92rem' }}
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
            grid-template-columns: 1.12fr 0.88fr !important;
            gap: 3.5rem !important;
          }
        }
        @media (max-width: 899px) {
          .hero-right-col {
            justify-self: start !important;
            max-width: 100% !important;
          }
          .hero-trust-bar {
            margin-top: 1rem !important;
            gap: 0.8rem !important;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding-top: 5.2rem !important;
            padding-bottom: 2rem !important;
            min-height: 90vh !important;
          }
          .hero-cta-btns {
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 0.65rem !important;
          }
          .hero-btn-star {
            width: 100% !important;
          }
          .hero-btn-star .star-border-inner {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.4rem !important;
          }
          .hero-btn-unbox {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.4rem !important;
          }
          .hero-giant-title {
            height: 85px !important;
          }
          .hero-trust-bar {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding-top: 4.8rem !important;
          }
          .hero-giant-title {
            height: 75px !important;
          }
        }
      `}</style>
    </section>
  );
}

