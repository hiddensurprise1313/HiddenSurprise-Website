import React from 'react';
import { Gift, Heart, Phone, Mail, MapPin, Share2, Camera, Video } from 'lucide-react';

export default function Footer({ onOpenBooking, onOpenUnboxing }) {
  return (
    <footer
      style={{
        background: 'rgba(5, 7, 11, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '5rem 0 2rem',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Col 1: Brand */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #E11D48, #8B5CF6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Gift size={20} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                HIDDEN <span style={{ color: '#E11D48' }}>SURPRISE</span>
              </span>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Turning secret plans into unforgettable goosebumps. Specializing in midnight room decor, candlelight setups, car trunk reveals & bespoke gift trunks.
            </p>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {[
                { icon: Camera, label: 'Instagram' },
                { icon: Video, label: 'YouTube' },
                { icon: Share2, label: 'Share' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94A3B8',
                    transition: 'all 0.2s'
                  }}
                  className="social-icon"
                  title={s.label}
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Experiences */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Experiences</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <a href="#builder" className="footer-link">Surprise Builder Wizard</a>
              <a href="#packages" className="footer-link">Midnight Serenades</a>
              <a href="#packages" className="footer-link">Rooftop Candlelight Cabanas</a>
              <a href="#packages" className="footer-link">Car Trunk Surprises</a>
              <a href="#packages" className="footer-link">VIP Proposal Marquees</a>
              <a href="#packages" className="footer-link">Custom Wooden Gift Hampers</a>
            </div>
          </div>

          {/* Col 3: Occasions */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Occasions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <a href="#builder" className="footer-link">Birthday Bashes</a>
              <a href="#builder" className="footer-link">Romantic Anniversaries</a>
              <a href="#builder" className="footer-link">Dream Marriage Proposals</a>
              <a href="#builder" className="footer-link">Long Distance Love</a>
              <a href="#builder" className="footer-link">Baby Showers & Reveals</a>
              <a href="#builder" className="footer-link">Heartfelt Apologies</a>
            </div>
          </div>

          {/* Col 4: Contact & Service Areas */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: '#FFFFFF' }}>Concierge Hotline</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#25D366" />
                <span>+91 98765 43210 (24/7 WhatsApp)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#EC4899" />
                <span>hello@hiddensurprise.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={16} color="#F59E0B" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Operating across Mumbai, Delhi NCR, Bengaluru, Pune, Goa & Pan-India.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#64748B'
          }}
        >
          <div>
            © {new Date().getFullYear()} Hidden Surprise Experiences. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Handcrafted with <Heart size={14} color="#E11D48" fill="#E11D48" /> for unforgettable celebrations.
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: #FFFFFF;
        }
        .social-icon:hover {
          background: rgba(225, 29, 72, 0.2) !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </footer>
  );
}
