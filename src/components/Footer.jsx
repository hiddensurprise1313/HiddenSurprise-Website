import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer({ onOpenBooking, onOpenUnboxing }) {
  return (
    <footer
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: '6rem 0 3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container">
        {/* Top CTA Banner inside footer */}
        <div
          style={{
            backgroundColor: '#F8DC6C',
            color: '#000000',
            borderRadius: '28px',
            padding: '3.5rem',
            marginBottom: '5rem',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            alignItems: 'center'
          }}
          className="footer-cta-grid"
        >
          <div>
            <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>READY TO CELEBRATE?</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '0.6rem', letterSpacing: '-0.03em' }}>
              Let's Plan Something Unforgettable Today.
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#1F2937' }}>
              Connect with our 24/7 stealth concierge on WhatsApp to reserve your date.
            </p>
          </div>

          <div style={{ justifySelf: 'start', mdJustifySelf: 'end' }}>
            <button
              onClick={() => onOpenBooking()}
              className="btn-dark"
              style={{ padding: '1rem 2.2rem', fontSize: '1.1rem', borderRadius: '16px' }}
            >
              Start Planning Now <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.2rem' }}>
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="34" rx="10" fill="#F8DC6C" />
                <path d="M12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11Z" fill="#000000"/>
                <path d="M22 19C20.8954 19 20 19.8954 20 21C20 22.1046 20.8954 23 22 23C23.1046 23 24 22.1046 24 21C24 19.8954 23.1046 19 22 19Z" fill="#000000"/>
                <path d="M17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15Z" fill="#000000"/>
              </svg>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                Hidden Surprise
              </span>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.92rem', lineHeight: 1.7 }}>
              Turning secret plans into unforgettable happy tears. Specializing in midnight room decor, candlelight setups, car trunk reveals & bespoke gift trunks.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <a href="#" className="footer-link">Home</a>
              <a href="#builder" className="footer-link">Surprise Builder</a>
              <a href="#packages" className="footer-link">Packages</a>
              <a href="#gallery" className="footer-link">Gallery Moments</a>
              <a href="#reviews" className="footer-link">Client Reviews</a>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Experiences</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <a href="#packages" className="footer-link">Midnight Starfall</a>
              <a href="#packages" className="footer-link">Candlelight Cabanas</a>
              <a href="#packages" className="footer-link">Secret Trunk Reveals</a>
              <a href="#packages" className="footer-link">Royal "Marry Me" Extravaganza</a>
              <a href="#packages" className="footer-link">Luxury Mystery Trunks</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Stealth Concierge</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#F8DC6C" />
                <span>+91 98765 43210 (24/7 WhatsApp)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#F8DC6C" />
                <span>hello@hiddensurprise.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={16} color="#F8DC6C" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Mumbai, Delhi NCR, Bengaluru, Pune, Goa & Pan-India.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Hidden Surprise. All rights reserved.
          </div>
          <div>
            Crafted for pure celebration magic & stealth execution.
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .footer-cta-grid {
            grid-template-columns: 1.3fr 0.7fr !important;
          }
        }
        .footer-link:hover {
          color: #F8DC6C !important;
        }
      `}</style>
    </footer>
  );
}
