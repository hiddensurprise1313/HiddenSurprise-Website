import React from 'react';

export default function StatsBanner() {
  return (
    <section className="section-padding bg-bone" style={{ borderBottom: '1px solid var(--color-border-light)' }}>
      <div className="container">
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
            <div className="stat-number">48+</div>
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
                letterSpacing: '-0.03em'
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
      `}</style>
    </section>
  );
}
