import React, { useState, useEffect } from 'react';
import InfiniteSpiral from './InfiniteSpiral';
import { DRIFT_WALL_PHOTOS } from '../data/driftWallPhotos';
import { Sparkles, MoveVertical, ArrowUp, ArrowDown, Zap, MapPin, X, MessageCircle, RotateCcw } from 'lucide-react';

export default function SpiralPhotoWall() {
  const [direction, setDirection] = useState('up');
  const [speed, setSpeed] = useState(0.55);
  const [activeImage, setActiveImage] = useState(null);
  const [spiralRadius, setSpiralRadius] = useState(200);
  const [cardDim, setCardDim] = useState({ w: 160, h: 160 });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setSpiralRadius(130);
        setCardDim({ w: 120, h: 120 });
      } else if (w < 1024) {
        setSpiralRadius(170);
        setCardDim({ w: 140, h: 140 });
      } else {
        setSpiralRadius(220);
        setCardDim({ w: 160, h: 160 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const spiralItems = DRIFT_WALL_PHOTOS.map((item) => ({
    src: item.image,
    alt: item.title,
    title: item.title,
    location: item.location,
    tag: item.tag,
    category: item.category,
    id: item.id
  }));

  const handleWhatsAppBooking = (photo) => {
    const message = `Hi Hidden Surprise! I saw this setup in your 3D Spiral Photowall: "${photo.title}" (${photo.location}). I'd like to plan a similar celebration!`;
    const url = `https://wa.me/919133143232?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="spiral-photowall" className="section-padding" style={{ backgroundColor: '#07080D', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248, 220, 108, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000' }}>SPIRAL 04</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF' }}>
              3D Vortex Experience
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#FFFFFF', marginBottom: '1rem', maxWidth: '800px' }}>
            The Infinite Spiral Photowall
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '640px' }}>
            Step inside our 3D helix vortex. Drag vertically, scroll, or let it auto-drift through 50+ real moments captured across India.
          </p>

          {/* Interactive Control Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginTop: '1.5rem',
              padding: '0.4rem 1.2rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '100px',
              backdropFilter: 'blur(10px)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {/* Drag Gesture Hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F8DC6C', fontSize: '0.82rem', fontWeight: 600 }}>
              <MoveVertical size={15} />
              <span>Drag or Scroll Helix</span>
            </div>

            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>

            {/* Direction Toggle */}
            <button
              onClick={() => setDirection(d => (d === 'up' ? 'down' : 'up'))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                padding: '0.3rem 0.8rem',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {direction === 'up' ? <ArrowUp size={13} color="#F8DC6C" /> : <ArrowDown size={13} color="#F8DC6C" />}
              <span>Direction: {direction.toUpperCase()}</span>
            </button>

            {/* Speed Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {[
                { label: 'Slow', val: 0.35 },
                { label: 'Normal', val: 0.55 },
                { label: 'Fast', val: 0.95 }
              ].map(s => (
                <button
                  key={s.label}
                  onClick={() => setSpeed(s.val)}
                  style={{
                    background: speed === s.val ? '#F8DC6C' : 'transparent',
                    color: speed === s.val ? '#000000' : '#9CA3AF',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D InfiniteSpiral Stage */}
        <div
          style={{
            position: 'relative',
            height: '640px',
            width: '100%',
            borderRadius: '32px',
            background: 'radial-gradient(ellipse at center, #11131C 0%, #06070A 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden'
          }}
        >
          {/* Top Floating Badge */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '20px',
              right: '20px',
              zIndex: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                padding: '0.4rem 0.9rem',
                borderRadius: '100px',
                border: '1px solid rgba(248, 220, 108, 0.3)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Sparkles size={14} color="#F8DC6C" />
              <span>3D Interactive Helix • Click tile to view setup</span>
            </div>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                padding: '0.4rem 0.8rem',
                borderRadius: '100px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F8DC6C',
                fontSize: '0.78rem',
                fontWeight: 700,
                fontFamily: 'monospace'
              }}
            >
              57 REAL SETUPS
            </div>
          </div>

          {/* InfiniteSpiral Component */}
          <InfiniteSpiral
            items={spiralItems}
            speed={speed}
            direction={direction}
            animationMode="all"
            radius={spiralRadius}
            cardWidth={cardDim.w}
            cardHeight={cardDim.h}
            verticalSpacing={65}
            perspective={1100}
            cardsPerTurn={8}
            cardRadius={16}
            centerScale={1.3}
            edgeFade={0.32}
            edgeBlur={5}
            pauseOnHover={true}
            onCardClick={(item) => setActiveImage(item)}
          />
        </div>
      </div>

      {/* Lightbox Modal for Spiral Photo */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 350,
            background: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setActiveImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '860px',
              width: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#0B0D13',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#FFFFFF',
                padding: '0.5rem',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Photo preview */}
            <div style={{ width: '100%', maxHeight: '560px', overflow: 'hidden', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={activeImage.src || activeImage.image}
                alt={activeImage.title || activeImage.alt}
                style={{ width: '100%', height: '100%', maxHeight: '560px', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Bottom Actions Bar */}
            <div
              style={{
                padding: '1.5rem 2rem',
                background: '#0B0D13',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000', fontSize: '0.75rem' }}>
                    {activeImage.tag || 'CELEBRATION'}
                  </span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Verified Client Moment</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', fontWeight: 800 }}>{activeImage.title || activeImage.alt}</h3>
                <div style={{ color: '#F8DC6C', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <MapPin size={14} /> {activeImage.location || 'Hyderabad • India'}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleWhatsAppBooking(activeImage)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#25D366',
                    color: '#000000',
                    fontWeight: 700,
                    padding: '0.75rem 1.4rem',
                    borderRadius: '100px',
                    fontSize: '0.92rem',
                    cursor: 'pointer'
                  }}
                  className="hover-lift"
                >
                  <MessageCircle size={17} /> Plan This Setup on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
