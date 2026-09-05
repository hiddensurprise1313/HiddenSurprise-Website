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
    const builderEl = document.getElementById('builder');
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(248, 220, 108, 0.5)',
                transition: 'all 0.3s ease'
              }}
              className={isOpening ? 'animate-pulse-subtle' : ''}
              id="mystery-box-trigger"
            >
              <Gift size={68} color="#000000" />
            </div>

            <button
              onClick={handleOpenBox}
              disabled={isOpening}
              className="btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem' }}
            >
              {isOpening ? 'Opening Mystery Box...' : 'Tap to Open Box'}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000' }}>PERK UNLOCKED</span>
            </div>

            <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '0.5rem', marginBottom: '0.4rem', color: '#F8DC6C' }}>
              {reward.discount}
            </h3>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', marginBottom: '1.8rem' }}>
              {reward.desc}
            </p>

            {/* Promo Code Box */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px dashed #F8DC6C',
                borderRadius: '16px',
                padding: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.8rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>PROMO CODE</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.08em' }}>
                  {reward.code}
                </div>
              </div>

              <button
                onClick={handleCopyCode}
                className="btn-gold"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Applied!' : 'Apply Code'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button
                onClick={handleUseDiscount}
                className="btn-gold"
                style={{ width: '100%', padding: '0.9rem' }}
                id="apply-reward-builder"
              >
                Apply to Surprise Builder <ArrowRight size={18} />
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
    </div>
  );
}
