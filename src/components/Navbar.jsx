import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Phone, Menu, X, Calendar, Flame } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenUnboxing }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isScrolled ? '0.8rem 0' : '1.2rem 0',
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(7, 9, 14, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #E11D48, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(225, 29, 72, 0.5)'
            }}
          >
            <Gift size={22} color="#FFFFFF" />
          </div>
          <div>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'block', lineHeight: 1 }}>
              HIDDEN <span style={{ color: '#E11D48' }}>SURPRISE</span>
            </span>
            <span style={{ fontSize: '0.68rem', color: '#94A3B8', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Bespoke Celebrations
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'none', mdDisplay: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-links-desktop">
          <a href="#builder" className="nav-link">Surprise Builder</a>
          <a href="#packages" className="nav-link">Packages</a>
          <a href="#unboxing" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenUnboxing(); }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#EC4899', fontWeight: 600 }}>
              <Sparkles size={15} /> Mystery Box
            </span>
          </a>
          <a href="#gallery" className="nav-link">Moments</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onOpenUnboxing}
            className="btn shimmer-badge"
            style={{
              padding: '0.5rem 0.9rem',
              fontSize: '0.82rem',
              color: '#F59E0B',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'none',
              smDisplay: 'inline-flex'
            }}
            id="nav-unlock-reward"
          >
            <Flame size={14} /> Win 20% Off
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
            id="nav-book-now"
          >
            <Calendar size={16} /> Book Surprise
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#F8FAFC', padding: '0.4rem', display: 'flex', alignItems: 'center' }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(7, 9, 14, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}
        >
          <a href="#builder" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>Surprise Builder</a>
          <a href="#packages" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>Packages</a>
          <a
            href="#unboxing"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenUnboxing();
            }}
            style={{ fontSize: '1.1rem', fontWeight: 600, color: '#EC4899', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Sparkles size={18} /> Unlock Mystery Box Reward
          </a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>Gallery & Moments</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>Client Stories</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>FAQ</a>
        </div>
      )}

      <style>{`
        @media (min-width: 868px) {
          .nav-links-desktop {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        .nav-link {
          font-size: 0.92rem;
          font-weight: 500;
          color: #94A3B8;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #FFFFFF;
        }
      `}</style>
    </nav>
  );
}
