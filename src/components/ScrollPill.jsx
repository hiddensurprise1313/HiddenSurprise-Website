import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ScrollPill() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSection, setCurrentSection] = useState('Home');
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      setScrollPercent(pct);
      setIsAtBottom(pct > 88);

      // Detect current section
      const sections = [
        { id: 'home', name: 'Home' },
        { id: 'builder', name: 'Builder' },
        { id: 'packages', name: 'Packages' },
        { id: 'spiral-photowall', name: 'Spiral' },
        { id: 'reviews', name: 'Reviews' },
        { id: 'faq', name: 'FAQ' }
      ];

      const scrollPos = scrollTop + 300;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setCurrentSection(sections[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextSection = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionIds = ['home', 'builder', 'packages', 'spiral-photowall', 'reviews', 'faq'];
    const scrollPos = window.scrollY + 250;

    for (let i = 0; i < sectionIds.length; i++) {
      const el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop > scrollPos) {
        const offset = 70;
        window.scrollTo({
          top: el.offsetTop - offset,
          behavior: 'smooth'
        });
        return;
      }
    }

    window.scrollBy({ top: 500, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '12px',
        bottom: '88px',
        zIndex: 95,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        pointerEvents: 'auto'
      }}
      className="scroll-pill-wrapper"
    >
      <button
        onClick={handleNextSection}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(248, 220, 108, 0.35)',
          borderRadius: '9999px',
          padding: '6px 12px 6px 8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55), 0 0 12px rgba(248, 220, 108, 0.2)',
          color: '#FFFFFF',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="scroll-pill-btn"
        title={`Current: ${currentSection} (${scrollPercent}%). Click to jump to next section.`}
        aria-label="Scroll Navigator Pill"
      >
        {/* Circular Progress Ring */}
        <div
          style={{
            position: 'relative',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2.5"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="#F8DC6C"
              strokeWidth="2.5"
              strokeDasharray={56.5}
              strokeDashoffset={56.5 - (56.5 * scrollPercent) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.2s linear' }}
            />
          </svg>
          <span
            style={{
              position: 'absolute',
              color: '#F8DC6C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isAtBottom ? <ChevronUp size={12} strokeWidth={3} /> : <ChevronDown size={12} strokeWidth={3} />}
          </span>
        </div>

        {/* Section Pill Label */}
        <span style={{ color: '#F8DC6C', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
          {currentSection.toUpperCase()}
        </span>
        <span style={{ color: '#9CA3AF', fontSize: '0.7rem' }}>
          {scrollPercent}%
        </span>
      </button>

      <style>{`
        .scroll-pill-btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.7), 0 0 16px rgba(248, 220, 108, 0.45);
          border-color: #F8DC6C;
        }
        @media (max-width: 480px) {
          .scroll-pill-wrapper {
            right: 8px;
            bottom: 78px;
          }
          .scroll-pill-btn {
            padding: 5px 10px 5px 6px;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
}
