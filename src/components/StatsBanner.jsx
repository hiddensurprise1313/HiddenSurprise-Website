import React from 'react';
import CountUp from './CountUp';
import ImageTrail from './ImageTrail';
import { DRIFT_WALL_PHOTOS } from '../data/driftWallPhotos';

export default function StatsBanner() {
  const trailImages = DRIFT_WALL_PHOTOS.map(p => p.image);

  return (
    <section
      className="section-padding bg-bone"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border-light)',
        minHeight: '280px',
        cursor: 'crosshair'
      }}
    >
      {/* React Bits Image Trail Interactive Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <ImageTrail items={trailImages} variant={1} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="stats-grid-layout"
        >
          {/* Left: Giant Stat Number */}
          <div>
            <div className="stat-number" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
              <CountUp from={0} to={48} duration={3.5} />+
            </div>
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#000000',
                marginTop: '0.4rem'
              }}
            >
              Happy Customers Since May 2026
            </p>
          </div>

          {/* Right: Editorial Mission Statement */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                fontWeight: 700,
                color: '#000000',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                textShadow: '0 2px 10px rgba(255,255,255,0.7)'
              }}
            >
              Since May 2026, Hidden Surprise has helped 48+ happy customers elevate their celebrations with flawless stealth.
            </h2>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .stats-grid-layout {
            grid-template-columns: 0.85fr 1.15fr !important;
          }
        }
        @media (max-width: 600px) {
          .stats-grid-layout {
            gap: 1.5rem !important;
          }
          .stat-number {
            font-size: 3.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

