import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Flame } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenUnboxing }) {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 1.5rem',
        pointerEvents: 'none'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'auto'
        }}
      >
        {/* Left: Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            color: '#FFFFFF'
          }}
        >
          {/* Elevare-style connected organic emblem */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="34" rx="10" fill="#F8DC6C" />
            <path
              d="M12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11Z"
              fill="#000000"
            />
            <path
              d="M22 19C20.8954 19 20 19.8954 20 21C20 22.1046 20.8954 23 22 23C23.1046 23 24 22.1046 24 21C24 19.8954 23.1046 19 22 19Z"
              fill="#000000"
            />
            <path
              d="M17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15Z"
              fill="#000000"
            />
            <path
              d="M22 11C20.8954 11 20 11.8954 20 13C20 14.1046 20.8954 15 22 15C23.1046 15 24 14.1046 24 13C24 11.8954 23.1046 11 22 11Z"
              fill="#000000"
            />
            <path
              d="M12 19C10.8954 19 10 19.8954 10 21C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21C14 19.8954 13.1046 19 12 19Z"
              fill="#000000"
            />
          </svg>

          <span
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            Hidden Surprise
          </span>
        </a>

        {/* Center: Elevare Floating Capsule Navigation */}
        <nav
          style={{
            display: 'none',
            mdDisplay: 'flex',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '4px 6px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
          }}
          className="desktop-nav-capsule"
        >
          <a
            href="#"
            onClick={() => setActiveTab('home')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.92rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              background: activeTab === 'home' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'home' ? '#000000' : 'rgba(255, 255, 255, 0.85)'
            }}
          >
            Home
          </a>

          <a
            href="#builder"
            onClick={() => setActiveTab('builder')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.92rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              background: activeTab === 'builder' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'builder' ? '#000000' : 'rgba(255, 255, 255, 0.85)'
            }}
          >
            Surprise Builder
          </a>

          <a
            href="#packages"
            onClick={() => setActiveTab('packages')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.92rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              background: activeTab === 'packages' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'packages' ? '#000000' : 'rgba(255, 255, 255, 0.85)'
            }}
          >
            Packages
          </a>

          <a
            href="#unboxing"
            onClick={(e) => {
              e.preventDefault();
              onOpenUnboxing();
            }}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.92rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              color: '#F8DC6C',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Sparkles size={14} /> Mystery Box
          </a>

          <a
            href="#reviews"
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.92rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              background: activeTab === 'reviews' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'reviews' ? '#000000' : 'rgba(255, 255, 255, 0.85)'
            }}
          >
            Reviews
          </a>
        </nav>

        {/* Right: Golden Pill CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => onOpenBooking()}
            className="btn-gold"
            id="nav-contact-btn"
          >
            Book Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#FFFFFF',
              padding: '0.55rem',
              display: 'flex',
              alignItems: 'center'
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: '0.75rem',
            background: 'rgba(10, 13, 20, 0.96)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            pointerEvents: 'auto',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}
          >
            Home
          </a>
          <a
            href="#builder"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}
          >
            Surprise Builder
          </a>
          <a
            href="#packages"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}
          >
            Packages & Pricing
          </a>
          <a
            href="#unboxing"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenUnboxing();
            }}
            style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F8DC6C', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Sparkles size={16} /> Open Mystery Box
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}
          >
            Moments & Gallery
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}
          >
            Client Reviews
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 868px) {
          .desktop-nav-capsule {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
