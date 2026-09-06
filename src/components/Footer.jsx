import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';
import FoldText from './FoldText';
import StarBorder from './StarBorder';

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
            <h2 style={{ marginTop: '1rem', marginBottom: '0.6rem' }}>
              <FoldText
                text="Let's Plan Something Unforgettable Today."
                trigger="scroll"
                splitBy="word"
                hinge="top"
                duration={0.65}
                stagger={0.045}
                fontSize="clamp(2rem, 3.8vw, 3.2rem)"
                fontWeight={900}
                color="#000000"
              />
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#1F2937' }}>
              Connect with our 24/7 stealth concierge on WhatsApp to reserve your date.
            </p>
          </div>

          <div style={{ justifySelf: 'start' }}>
            <StarBorder
              onClick={() => onOpenBooking()}
              color="#F8DC6C"
              speed="3.5s"
              thickness={2}
              backgroundColor="#000000"
              textColor="#F8DC6C"
              borderColor="rgba(248, 220, 108, 0.5)"
              innerStyle={{ padding: '1rem 2.2rem', fontSize: '1.1rem', borderRadius: '16px', fontWeight: 800 }}
              style={{ borderRadius: '16px' }}
            >
              Start Planning Now <ArrowRight size={18} />
            </StarBorder>
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
          {/* Brand with Black Luxury Capsule */}
          <div style={{ maxWidth: '340px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.85rem',
                marginBottom: '1.4rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '8px 16px 8px 8px'
              }}
            >
              <img
                src={logoImg}
                alt="Hidden Surprise Logo"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #F8DC6C',
                  boxShadow: '0 0 15px rgba(248, 220, 108, 0.45)'
                }}
              />
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF', display: 'block', lineHeight: 1.1 }}>
                  HIDDEN <span style={{ color: '#F8DC6C' }}>SURPRISE</span>
                </span>
                <span style={{ fontSize: '0.65rem', color: '#F8DC6C', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginTop: '3px' }}>
                  Your Smile... Our Surprise...
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
              <a href="#services" className="footer-link">Curated Services</a>
              <a href="#spiral-photowall" className="footer-link">3D Spiral Photowall</a>
              <a href="#reviews" className="footer-link">Client Reviews</a>
              <a href="#faq" className="footer-link">FAQ</a>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Experiences</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <a href="#services" className="footer-link">Outdoor 12 O'Clock Surprises</a>
              <a href="#services" className="footer-link">Car Trunk Reveals</a>
              <a href="#services" className="footer-link">Candlelight Dinners</a>
              <a href="#services" className="footer-link">Private Movie Time</a>
              <a href="#services" className="footer-link">Indoor Celebrations</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Stealth Concierge</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#F8DC6C" />
                <span>+91 91331 43232 (24/7 WhatsApp)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#F8DC6C" />
                <span>hello@hiddensurprise.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={16} color="#F8DC6C" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Hyderabad, Mumbai, Delhi NCR, Bengaluru, Goa & Pan-India.</span>
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
        @media (max-width: 640px) {
          .footer-cta-grid {
            padding: 2rem 1.4rem !important;
            border-radius: 20px !important;
            margin-bottom: 3.5rem !important;
          }
        }
        .footer-link:hover {
          color: #F8DC6C !important;
        }
      `}</style>
    </footer>
  );
}
