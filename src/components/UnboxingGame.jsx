import React, { useState } from 'react';
import { UNBOXING_REWARDS } from '../data/mockData';
import { Gift, Sparkles, X, Check, Copy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UnboxingGame({ isOpen, onClose, onApplyDiscount, appliedDiscount }) {
  const [unboxed, setUnboxed] = useState(false);
  const [reward, setReward] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleOpenBox = () => {
    if (isOpening || unboxed) return;
    setIsOpening(true);

    setTimeout(() => {
      const randomReward = UNBOXING_REWARDS[Math.floor(Math.random() * UNBOXING_REWARDS.length)];
      setReward(randomReward);
      setUnboxed(true);
      setIsOpening(false);

      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F8DC6C', '#000000', '#F59E0B', '#FFFFFF']
      });
    }, 1200);
  };

  const handleCopyCode = () => {
    if (!reward) return;
    navigator.clipboard.writeText(reward.code);
    setCopied(true);
    onApplyDiscount(reward);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleUseDiscount = () => {
    onApplyDiscount(reward);
    onClose();
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="unboxing-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="unboxing-modal-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2.5rem',
          position: 'relative',
          textAlign: 'center',
          backgroundColor: '#0A0D14',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#FFFFFF',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: '#9CA3AF',
            padding: '0.4rem',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)'
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {!unboxed ? (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="mono-tag">PERK UNLOCK</span>
            </div>

            <h3 style={{ fontSize: '1.9rem', marginBottom: '0.6rem', color: '#FFFFFF' }}>
              Tap to Open Your <span style={{ color: '#F8DC6C' }}>Mystery Box</span>
            </h3>

            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
              Every client gets a guaranteed celebratory perk, discount, or complimentary gourmet add-on!
            </p>

            {/* Mystery Box Visual */}
            <div
              onClick={handleOpenBox}
              style={{
                cursor: 'pointer',
                margin: '1.5rem auto 2.5rem',
                width: '140px',
                height: '140px',
                borderRadius: '28px',
                background: '#F8DC6C',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 35px rgba(248, 220, 108, 0.45)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isOpening ? 'scale(1.1) rotate(6deg)' : 'scale(1)',
                position: 'relative'
              }}
              className="hover-lift animate-pulse-subtle"
            >
              <Gift size={64} />
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#000000',
                  color: '#F8DC6C',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: '1px solid #F8DC6C'
                }}
              >
                TAP ME!
              </div>
            </div>

            <button
              onClick={handleOpenBox}
              disabled={isOpening}
              className="btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              id="unbox-tap-btn"
            >
              {isOpening ? (
                <>
                  <Sparkles size={18} className="animate-spin" /> Unlocking Secret Perk...
                </>
              ) : (
                <>
                  <Gift size={18} /> Open My Mystery Perk
                </>
              )}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="mono-tag" style={{ background: '#22C55E', color: '#FFFFFF' }}>PERK UNLOCKED</span>
            </div>

            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '24px',
                background: 'rgba(248, 220, 108, 0.15)',
                color: '#F8DC6C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: '1px solid rgba(248, 220, 108, 0.3)'
              }}
            >
              <Gift size={48} />
            </div>

            <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {reward?.name}
            </h3>

            <p style={{ color: '#F8DC6C', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.8rem' }}>
              {reward?.discount}
            </p>

            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.92rem', marginBottom: '1.8rem' }}>
              {reward?.description}
            </p>

            {/* Promo Code Box */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px dashed rgba(248, 220, 108, 0.4)',
                borderRadius: '16px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.8rem'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.1em', color: '#FFFFFF' }}>
                {reward?.code}
              </span>

              <button
                onClick={handleCopyCode}
                className="btn-gold"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                id="copy-reward-code"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Applied!' : 'Apply Code'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button
                onClick={onClose}
                className="btn-gold"
                style={{ width: '100%', padding: '0.9rem' }}
                id="apply-reward-builder"
              >
                Explore Curated Services <ArrowRight size={18} />
              </button>

              <button
                onClick={onClose}
                className="btn-pill-light"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .unboxing-modal-overlay {
            padding: 0.5rem !important;
          }
          .unboxing-modal-card {
            padding: 1.4rem 1.15rem !important;
            border-radius: 20px !important;
            max-height: 92vh !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
