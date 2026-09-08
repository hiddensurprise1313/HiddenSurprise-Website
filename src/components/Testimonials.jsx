import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, CheckCircle2, Heart, Sparkles, MapPin, X, MessageSquareHeart } from 'lucide-react';
import FoldText from './FoldText';

export default function Testimonials() {
  const [activeCardId, setActiveCardId] = useState(null);
  const [selectedReviewModal, setSelectedReviewModal] = useState(null);

  // Split 15 real reviews into two balanced tracks for dynamic dual-row marquee
  const row1 = TESTIMONIALS.slice(0, 8);
  const row2 = TESTIMONIALS.slice(8);

  // Helper to render 3 star types: 5, 4.5, and 4 with half-star precision
  const renderRatingStars = (rating, size = 14, isExpanded = false) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full Golden Star
        stars.push(
          <Star
            key={i}
            size={size}
            fill="#F8DC6C"
            stroke="#EAB308"
            style={{
              filter: isExpanded ? 'drop-shadow(0 0 3px rgba(248, 220, 108, 0.9))' : 'none',
              transition: 'all 0.2s ease'
            }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half Golden Star (Precision 50% Clip)
        stars.push(
          <div
            key={i}
            style={{
              position: 'relative',
              display: 'inline-flex',
              width: `${size}px`,
              height: `${size}px`,
              flexShrink: 0
            }}
          >
            <Star size={size} fill="#E5E7EB" stroke="#D1D5DB" />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                overflow: 'hidden',
                display: 'flex'
              }}
            >
              <Star
                size={size}
                fill="#F8DC6C"
                stroke="#EAB308"
                style={{
                  filter: isExpanded ? 'drop-shadow(0 0 3px rgba(248, 220, 108, 0.9))' : 'none',
                  minWidth: `${size}px`
                }}
              />
            </div>
          </div>
        );
      } else {
        // Empty / Gray Star
        stars.push(
          <Star
            key={i}
            size={size}
            fill="#E5E7EB"
            stroke="#D1D5DB"
            style={{ transition: 'all 0.2s ease' }}
          />
        );
      }
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.12rem' }}>{stars}</div>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: isExpanded ? '#000000' : '#4B5563',
            marginLeft: '0.15rem'
          }}
        >
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const renderReviewCard = (t, trackIndex) => {
    const isExpanded = activeCardId === `${trackIndex}-${t.id}`;
    const formattedIndex = String(t.id).padStart(2, '0');

    return (
      <div
        key={`${trackIndex}-${t.id}`}
        className={`review-card ${isExpanded ? 'is-hovered' : ''}`}
        onMouseEnter={() => setActiveCardId(`${trackIndex}-${t.id}`)}
        onMouseLeave={() => setActiveCardId(null)}
        onClick={() => setSelectedReviewModal(t)}
        style={{
          width: '390px',
          minWidth: '390px',
          minHeight: '295px',
          backgroundColor: isExpanded ? '#FFFDF5' : '#FFFFFF',
          borderRadius: '24px',
          padding: '1.75rem 1.85rem 1.6rem 1.85rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: isExpanded ? '2px solid #F8DC6C' : '1.5px solid #E5E7EB',
          boxShadow: isExpanded
            ? '0 28px 56px -12px rgba(248, 220, 108, 0.38), 0 16px 32px -8px rgba(0, 0, 0, 0.12)'
            : '0 4px 20px rgba(0, 0, 0, 0.03)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease, background-color 0.3s ease',
          transform: isExpanded ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
          zIndex: isExpanded ? 50 : 1,
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        {/* Top Header & Quote info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          {/* Header info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', gap: '0.5rem', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0, flex: 1, overflow: 'hidden' }}>
              <span
                className="mono-tag"
                style={{
                  background: isExpanded ? '#000000' : '#0F172A',
                  color: '#F8DC6C',
                  fontSize: '0.72rem',
                  padding: '0.25rem 0.55rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
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
                  gap: '0.25rem',
                  minWidth: 0,
                  overflow: 'hidden'
                }}
              >
                <CheckCircle2 size={11} color="#10B981" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t.badge || 'Verified Client'}
                </span>
              </span>
            </div>

            {/* 3 Types of Star Ratings: 4, 4.5, 5 */}
            <div style={{ flexShrink: 0 }}>
              {renderRatingStars(t.rating, 13, isExpanded)}
            </div>
          </div>

          {/* Quote Icon & Fluid Expanding Text */}
          <div style={{ position: 'relative', marginTop: '0.2rem', minWidth: 0, overflow: 'hidden' }}>
            <Quote
              size={22}
              style={{
                color: isExpanded ? '#F8DC6C' : '#E5E7EB',
                marginBottom: '0.35rem',
                transition: 'all 0.4s ease',
                transform: isExpanded ? 'rotate(-6deg) scale(1.12)' : 'none'
              }}
            />
            {/* Smooth Expanding Text Area */}
            <div
              className="review-text-container"
              style={{
                maxHeight: isExpanded ? '380px' : '88px',
                overflow: 'hidden',
                transition: 'max-height 0.48s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative'
              }}
            >
              <p
                className="review-comment-text"
                style={{
                  fontSize: '0.95rem',
                  color: isExpanded ? '#000000' : '#374151',
                  lineHeight: 1.6,
                  fontWeight: isExpanded ? 500 : 450,
                  letterSpacing: '-0.01em',
                  margin: 0,
                  transition: 'color 0.25s ease',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                "{t.comment}"
              </p>
              {/* Subtle bottom fade when collapsed */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '24px',
                  background: isExpanded ? 'transparent' : 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))',
                  pointerEvents: 'none',
                  transition: 'opacity 0.3s ease',
                  opacity: isExpanded ? 0 : 1
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Author Section (Always has generous bottom padding & never overflows) */}
        <div
          className="review-author-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #F3F4F6',
            paddingTop: '0.9rem',
            marginTop: '0.9rem',
            flexShrink: 0,
            gap: '0.5rem',
            width: '100%',
            minWidth: 0,
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1, overflow: 'hidden' }}>
            {/* Avatar Container with perfectly nested online dot */}
            <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
              <img
                src={t.avatar}
                alt={t.name}
                loading="lazy"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  border: isExpanded ? '2px solid #F8DC6C' : '2px solid #E5E7EB',
                  boxShadow: isExpanded ? '0 0 10px rgba(248, 220, 108, 0.5)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '9px',
                  height: '9px',
                  backgroundColor: '#10B981',
                  border: '2px solid #FFFFFF',
                  borderRadius: '50%',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
                }}
              />
            </div>

            <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
              <h4 style={{ fontSize: '0.92rem', color: '#000000', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {t.name}
              </h4>
              <div style={{ fontSize: '0.76rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem', minWidth: 0, overflow: 'hidden' }}>
                <MapPin size={10} color="#9CA3AF" style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{t.city}</span>
                <span style={{ flexShrink: 0 }}>•</span>
                <span style={{ color: '#374151', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
                  {t.occasion}
                </span>
              </div>
            </div>
          </div>

          <Heart
            size={16}
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
            className="social-proof-capsule"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              background: '#FFFFFF',
              padding: '0.75rem 1.3rem',
              borderRadius: '999px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F8DC6C" stroke="#EAB308" />
                ))}
              </div>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#000000', marginLeft: '0.3rem' }}>4.9</span>
            </div>
            <span className="capsule-divider" style={{ color: '#D1D5DB' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
              <Sparkles size={14} color="#F59E0B" />
              <span className="capsule-hint-text">Tap or hover card for full story</span>
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

      {/* Full Review Focused Modal */}
      {selectedReviewModal && (
        <div
          className="review-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out',
            overflowY: 'auto'
          }}
          onClick={() => setSelectedReviewModal(null)}
        >
          <div
            className="review-modal-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '540px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '2rem 2.2rem',
              border: '2px solid #F8DC6C',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReviewModal(null)}
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#F3F4F6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1F2937',
                zIndex: 10
              }}
              aria-label="Close review"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem', paddingRight: '2.5rem' }}>
              <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>
                #{String(selectedReviewModal.id).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#4B5563',
                  backgroundColor: '#F3F4F6',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <CheckCircle2 size={12} color="#10B981" />
                {selectedReviewModal.badge || 'Verified Client'}
              </span>
              <div style={{ marginLeft: 'auto' }}>
                {renderRatingStars(selectedReviewModal.rating, 15, true)}
              </div>
            </div>

            {/* Full Quote */}
            <div style={{ position: 'relative', margin: '1rem 0 1.5rem 0' }}>
              <Quote size={24} style={{ color: '#F8DC6C', marginBottom: '0.4rem' }} />
              <p style={{ fontSize: '1.02rem', color: '#111827', lineHeight: 1.7, fontWeight: 450, margin: 0 }}>
                "{selectedReviewModal.comment}"
              </p>
            </div>

            {/* Modal Author Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                borderTop: '1px solid #F3F4F6',
                paddingTop: '1rem'
              }}
            >
              <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
                <img
                  src={selectedReviewModal.avatar}
                  alt={selectedReviewModal.name}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                    border: '2px solid #F8DC6C'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '1px',
                    right: '1px',
                    width: '11px',
                    height: '11px',
                    backgroundColor: '#10B981',
                    border: '2px solid #FFFFFF',
                    borderRadius: '50%'
                  }}
                />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h4 style={{ fontSize: '1rem', color: '#000000', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {selectedReviewModal.name}
                </h4>
                <div style={{ fontSize: '0.82rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  <MapPin size={11} color="#9CA3AF" />
                  <span>{selectedReviewModal.city}</span>
                  <span>•</span>
                  <span style={{ color: '#374151', fontWeight: 500 }}>{selectedReviewModal.occasion}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Wrapper Styling & Fade Masks */
        .reviews-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2rem 0 3rem 0;
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, transparent 100%);
        }

        .marquee-row {
          display: flex;
          width: 100%;
          overflow: visible;
          position: relative;
          padding: 0.75rem 0;
          align-items: flex-start;
        }

        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
          align-items: flex-start;
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Responsive Breakpoints */
        .review-card {
          overflow: hidden !important;
        }

        @media (max-width: 768px) {
          .reviews-marquee-wrapper {
            padding: 1.25rem 0 2rem 0;
            mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 96%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 96%, transparent 100%);
          }
          .marquee-track {
            gap: 1rem !important;
          }
          .review-card {
            width: 290px !important;
            min-width: 290px !important;
            min-height: 255px !important;
            padding: 1.35rem 1.35rem 1.25rem 1.35rem !important;
            border-radius: 20px !important;
            overflow: hidden !important;
          }
          .track-left {
            animation-duration: 34s !important;
          }
          .track-right {
            animation-duration: 36s !important;
          }
          .social-proof-capsule {
            padding: 0.6rem 1rem !important;
            border-radius: 16px !important;
            width: 100%;
            justify-content: space-between;
          }
          .review-modal-card {
            padding: 1.5rem 1.3rem !important;
            border-radius: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .review-card {
            width: 275px !important;
            min-width: 275px !important;
            min-height: 245px !important;
            padding: 1.15rem 1.15rem 1.1rem 1.15rem !important;
            border-radius: 18px !important;
            overflow: hidden !important;
          }
          .social-proof-capsule {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 0.4rem !important;
          }
          .capsule-divider {
            display: none !important;
          }
          .review-modal-card {
            padding: 1.35rem 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
}


