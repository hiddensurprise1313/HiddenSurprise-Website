import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, CheckCircle2, Heart, Sparkles, MapPin } from 'lucide-react';
import FoldText from './FoldText';

export default function Testimonials() {
  const [activeCardId, setActiveCardId] = useState(null);

  // Split 15 real reviews into two balanced tracks for dynamic dual-row marquee
  const row1 = TESTIMONIALS.slice(0, 8);
  const row2 = TESTIMONIALS.slice(8);

  const renderReviewCard = (t, trackIndex) => {
    const isExpanded = activeCardId === `${trackIndex}-${t.id}`;
    const formattedIndex = String(t.id).padStart(2, '0');

    return (
      <div
        key={`${trackIndex}-${t.id}`}
        className={`review-card ${isExpanded ? 'is-hovered' : ''}`}
        onMouseEnter={() => setActiveCardId(`${trackIndex}-${t.id}`)}
        onMouseLeave={() => setActiveCardId(null)}
        style={{
          width: '380px',
          minWidth: '380px',
          height: '290px',
          backgroundColor: isExpanded ? '#FFFDF5' : '#FFFFFF',
          borderRadius: '24px',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: isExpanded ? '2px solid #F8DC6C' : '1.5px solid #E5E7EB',
          boxShadow: isExpanded
            ? '0 25px 50px -12px rgba(248, 220, 108, 0.35), 0 16px 32px -8px rgba(0, 0, 0, 0.12)'
            : '0 4px 20px rgba(0, 0, 0, 0.03)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isExpanded ? 'translateY(-10px) scale(1.04)' : 'none',
          zIndex: isExpanded ? 40 : 1
        }}
      >
        {/* Top Header info */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span
                className="mono-tag"
                style={{
                  background: isExpanded ? '#000000' : '#0F172A',
                  color: '#F8DC6C',
                  fontSize: '0.72rem',
                  padding: '0.25rem 0.6rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  transition: 'all 0.3s ease'
                }}
              >
                #{formattedIndex}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#4B5563',
                  backgroundColor: '#F3F4F6',
                  padding: '0.22rem 0.55rem',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <CheckCircle2 size={11} color="#10B981" />
                {t.badge || 'Verified Client'}
              </span>
            </div>

            {/* Star Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              {[...Array(t.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="#F8DC6C"
                  stroke="#EAB308"
                  style={{ filter: isExpanded ? 'drop-shadow(0 0 3px rgba(248, 220, 108, 0.9))' : 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Quote Icon & Text */}
          <div style={{ position: 'relative' }}>
            <Quote
              size={22}
              style={{
                color: isExpanded ? '#F8DC6C' : '#E5E7EB',
                marginBottom: '0.3rem',
                transition: 'all 0.3s ease',
                transform: isExpanded ? 'rotate(-6deg) scale(1.1)' : 'none'
              }}
            />
            <p
              className="review-comment-text"
              style={{
                fontSize: '0.96rem',
                color: isExpanded ? '#000000' : '#374151',
                lineHeight: 1.58,
                fontWeight: isExpanded ? 500 : 450,
                letterSpacing: '-0.01em',
                display: '-webkit-box',
                WebkitLineClamp: isExpanded ? 5 : 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'color 0.2s ease'
              }}
            >
              "{t.comment}"
            </p>
          </div>
        </div>

        {/* Bottom Author Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #F3F4F6',
            paddingTop: '0.9rem',
            marginTop: '0.4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={t.avatar}
                alt={t.name}
                loading="lazy"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: isExpanded ? '2px solid #F8DC6C' : '2px solid #E5E7EB',
                  boxShadow: isExpanded ? '0 0 10px rgba(248, 220, 108, 0.5)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#10B981',
                  border: '2px solid #FFFFFF',
                  borderRadius: '50%'
                }}
              />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#000000', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {t.name}
              </h4>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                <MapPin size={10} color="#9CA3AF" />
                <span>{t.city}</span>
                <span>•</span>
                <span style={{ color: '#374151', fontWeight: 500 }}>{t.occasion}</span>
              </div>
            </div>
          </div>

          <Heart
            size={17}
            fill={isExpanded ? '#EF4444' : 'transparent'}
            color={isExpanded ? '#EF4444' : '#D1D5DB'}
            style={{ transition: 'all 0.3s ease', flexShrink: 0 }}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="reviews" className="section-padding bg-bone" style={{ borderTop: '1px solid var(--color-border-light)', overflow: 'hidden', position: 'relative', scrollMarginTop: '90px' }}>
      <div className="container" style={{ marginBottom: '2.5rem' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem' }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>STORIES 04</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
                100% Real Client Proof
              </span>
            </div>
            <h2 style={{ marginBottom: '1rem' }}>
              <FoldText
                text="Loved by 48+ Happy Hearts"
                trigger="scroll"
                splitBy="word"
                hinge="top"
                duration={0.65}
                stagger={0.045}
                fontSize="clamp(2.2rem, 4.5vw, 3.6rem)"
                fontWeight={800}
                color="#000000"
              />
            </h2>
            <p style={{ color: '#5E6472', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Authentic stories and handwritten gratitude from secret birthdays, midnight milestones, and romantic surprises in Karaikal.
            </p>
          </div>

          {/* Social Proof Summary Capsule */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: '#FFFFFF',
              padding: '0.8rem 1.4rem',
              borderRadius: '999px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F8DC6C" stroke="#EAB308" />
                ))}
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#000000', marginLeft: '0.3rem' }}>5.0</span>
            </div>
            <span style={{ color: '#D1D5DB' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 600, color: '#374151' }}>
              <Sparkles size={14} color="#F59E0B" />
              <span>Hover card to pause & expand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Container with Edge Fades */}
      <div className="reviews-marquee-wrapper">
        {/* Row 1: Scrolling Left */}
        <div className="marquee-row marquee-row-top">
          <div className="marquee-track track-left">
            {row1.map((t) => renderReviewCard(t, 'r1-a'))}
            {row1.map((t) => renderReviewCard(t, 'r1-b'))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Reversed) */}
        <div className="marquee-row marquee-row-bottom" style={{ marginTop: '1.5rem' }}>
          <div className="marquee-track track-right">
            {row2.map((t) => renderReviewCard(t, 'r2-a'))}
            {row2.map((t) => renderReviewCard(t, 'r2-b'))}
          </div>
        </div>
      </div>

      <style>{`
        /* Wrapper Styling & Fade Masks */
        .reviews-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 1.5rem 0 2rem 0;
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, transparent 100%);
        }

        .marquee-row {
          display: flex;
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 0.75rem 0;
        }

        .marquee-track {
          display: flex;
          gap: 1.6rem;
          width: max-content;
          will-change: transform;
        }

        /* Continuous Smooth Linear Animations */
        .track-left {
          animation: marqueeScrollLeft 48s linear infinite;
        }

        .track-right {
          animation: marqueeScrollRight 52s linear infinite;
        }

        /* Pause Entire Scroller on Track or Card Hover */
        .marquee-row:hover .marquee-track {
          animation-play-state: paused !important;
        }

        /* Keyframes */
        @keyframes marqueeScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeScrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .review-card {
            width: 310px !important;
            min-width: 310px !important;
            height: 280px !important;
            padding: 1.4rem !important;
            border-radius: 20px !important;
          }
          .track-left {
            animation-duration: 36s !important;
          }
          .track-right {
            animation-duration: 38s !important;
          }
          .reviews-marquee-wrapper {
            mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 3%, rgba(0,0,0,1) 97%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 3%, rgba(0,0,0,1) 97%, transparent 100%);
          }
        }
      `}</style>
    </section>
  );
}

