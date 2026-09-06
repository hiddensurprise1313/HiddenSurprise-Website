import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ onOpenBooking, onOpenUnboxing }) {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Scroll Spy: Automatically switch active pill based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      setIsScrolled(window.scrollY > 25);

      const builderSection = document.getElementById('builder');
      const packagesSection = document.getElementById('packages');
      const gallerySection = document.getElementById('gallery');
      const spiralSection = document.getElementById('spiral-photowall');
      const reviewsSection = document.getElementById('reviews');

      if (reviewsSection && scrollPosition >= reviewsSection.offsetTop) {
        setActiveTab('reviews');
      } else if (spiralSection && scrollPosition >= spiralSection.offsetTop) {
        setActiveTab('spiral');
      } else if (gallerySection && scrollPosition >= gallerySection.offsetTop) {
        setActiveTab('gallery');
      } else if (packagesSection && scrollPosition >= packagesSection.offsetTop) {
        setActiveTab('packages');
      } else if (builderSection && scrollPosition >= builderSection.offsetTop) {
        setActiveTab('builder');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
    setMobileMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '12px',
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 1rem',
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
        {/* Left: Brand Logo Capsule (collapses to focused circle on mobile scroll) */}
        <a
          href="#"
          onClick={(e) => scrollToSection(e, 'home', 'home')}
          className={`nav-brand-capsule ${isScrolled ? 'is-scrolled' : ''}`}
          aria-label="Hidden Surprise Home"
        >
          <img
            src={logoImg}
            alt="Hidden Surprise Logo"
            className="nav-brand-logo"
          />

          <div className="nav-brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  lineHeight: 1.1
                }}
              >
                HIDDEN <span style={{ color: '#F8DC6C' }}>SURPRISE</span>
              </span>
            </div>
            <span
              style={{
                fontSize: '0.62rem',
                color: '#F8DC6C',
                letterSpacing: '0.06em',
                fontWeight: 700,
                display: 'block',
                marginTop: '1px'
              }}
            >
              Your Smile... Our Surprise...
            </span>
          </div>
        </a>

        {/* Center: Elevare Floating Capsule Navigation with Dynamic Scroll Spy */}
        <nav className="desktop-nav-capsule">
          <a
            href="#"
            onClick={(e) => scrollToSection(e, 'home', 'home')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              background: activeTab === 'home' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'home' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: activeTab === 'home' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Home
          </a>

          <a
            href="#builder"
            onClick={(e) => scrollToSection(e, 'builder', 'builder')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              background: activeTab === 'builder' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'builder' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: activeTab === 'builder' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Builder
          </a>

          <a
            href="#packages"
            onClick={(e) => scrollToSection(e, 'packages', 'packages')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              background: activeTab === 'packages' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'packages' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: activeTab === 'packages' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
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
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.25s ease',
              color: '#F8DC6C',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Sparkles size={14} /> Mystery Box
          </a>

          <a
            href="#gallery"
            onClick={(e) => scrollToSection(e, 'gallery', 'gallery')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              background: activeTab === 'gallery' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'gallery' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: activeTab === 'gallery' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Drift Wall
          </a>

          <a
            href="#spiral-photowall"
            onClick={(e) => scrollToSection(e, 'spiral-photowall', 'spiral')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              background: activeTab === 'spiral' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'spiral' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: activeTab === 'spiral' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Spiral Wall
          </a>

          <a
            href="#reviews"
            onClick={(e) => scrollToSection(e, 'reviews', 'reviews')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              background: activeTab === 'reviews' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'reviews' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: activeTab === 'reviews' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Reviews
          </a>
        </nav>

        {/* Right: Golden Pill CTA Button & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={() => onOpenBooking()}
            className="btn-gold nav-book-btn"
            id="nav-contact-btn"
          >
            Book Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: '0.75rem',
            background: 'rgba(10, 13, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '1.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            pointerEvents: 'auto',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)'
          }}
        >
          <a
            href="#"
            onClick={(e) => scrollToSection(e, 'home', 'home')}
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: activeTab === 'home' ? '#F8DC6C' : '#FFFFFF'
            }}
          >
            Home
          </a>
          <a
            href="#builder"
            onClick={(e) => scrollToSection(e, 'builder', 'builder')}
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: activeTab === 'builder' ? '#F8DC6C' : '#FFFFFF'
            }}
          >
            Surprise Builder
          </a>
          <a
            href="#packages"
            onClick={(e) => scrollToSection(e, 'packages', 'packages')}
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: activeTab === 'packages' ? '#F8DC6C' : '#FFFFFF'
            }}
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
            onClick={(e) => scrollToSection(e, 'gallery', 'gallery')}
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: activeTab === 'gallery' ? '#F8DC6C' : '#FFFFFF'
            }}
          >
            Drift Wall Moments
          </a>
          <a
            href="#spiral-photowall"
            onClick={(e) => scrollToSection(e, 'spiral-photowall', 'spiral')}
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: activeTab === 'spiral' ? '#F8DC6C' : '#FFFFFF'
            }}
          >
            3D Spiral Photowall
          </a>
          <a
            href="#reviews"
            onClick={(e) => scrollToSection(e, 'reviews', 'reviews')}
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: activeTab === 'reviews' ? '#F8DC6C' : '#FFFFFF'
            }}
          >
            Client Reviews
          </a>
        </div>
      )}

      <style>{`
        .nav-brand-capsule {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          text-decoration: none;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 9999px;
          padding: 5px 16px 5px 6px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          flex-shrink: 0;
        }

        .nav-brand-logo {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #F8DC6C;
          box-shadow: 0 0 12px rgba(248, 220, 108, 0.45);
          display: block;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-brand-text {
          transition: opacity 0.25s ease, max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          max-width: 220px;
          opacity: 1;
          white-space: nowrap;
        }

        .desktop-nav-capsule {
          display: none;
          align-items: center;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 9999px;
          padding: 4px 6px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .mobile-nav-toggle {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: '#FFFFFF';
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        @media (min-width: 980px) {
          .desktop-nav-capsule {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
          .nav-brand-capsule:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 32px rgba(0, 0, 0, 0.7);
          }
        }

        @media (max-width: 979px) {
          .desktop-nav-capsule {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
          .nav-book-btn {
            padding: 0.55rem 1rem !important;
            font-size: 0.85rem !important;
          }
        }

        /* Mobile Scroll State: Collapse Brand Capsule into a Focused Circle */
        @media (max-width: 768px) {
          .nav-brand-capsule.is-scrolled {
            width: 44px;
            height: 44px;
            padding: 2px;
            gap: 0;
            border-radius: 50%;
            justify-content: center;
            border-color: rgba(248, 220, 108, 0.6);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7), 0 0 14px rgba(248, 220, 108, 0.4);
          }

          .nav-brand-capsule.is-scrolled .nav-brand-text {
            max-width: 0;
            opacity: 0;
            display: none;
          }

          .nav-brand-capsule.is-scrolled .nav-brand-logo {
            width: 38px;
            height: 38px;
            border-width: 1.5px;
            box-shadow: none;
          }
        }
      `}</style>
    </header>
  );
}
