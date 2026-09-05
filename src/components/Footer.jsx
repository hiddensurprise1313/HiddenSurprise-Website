import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

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
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.2rem' }}>
              <img
                src={logoImg}
                alt="Hidden Surprise Logo"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #F8DC6C',
                  boxShadow: '0 0 15px rgba(248, 220, 108, 0.45)'
                }}
              />
              <div>
                <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF', display: 'block', lineHeight: 1 }}>
                  HIDDEN <span style={{ color: '#F8DC6C' }}>SURPRISE</span>
                </span>
                <span style={{ fontSize: '0.65rem', color: '#F8DC6C', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginTop: '3px' }}>
                  Events & Surprise Planner
                </span>
              </div>
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
            "Your Smile... Our Surprise..."
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
