import React, { useState } from 'react';
import { UNBOXING_REWARDS } from '../data/mockData';
import { Gift, Sparkles, X, Check, Copy, ArrowRight, Flame } from 'lucide-react';
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
      // Pick random reward
      const randomReward = UNBOXING_REWARDS[Math.floor(Math.random() * UNBOXING_REWARDS.length)];
      setReward(randomReward);
      setUnboxed(true);
      setIsOpening(false);

      // Trigger Confetti Blast
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#EC4899', '#8B5CF6', '#F59E0B']
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
    // Scroll to builder
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
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2.5rem',
          position: 'relative',
          textAlign: 'center',
          background: 'linear-gradient(145deg, rgba(24, 32, 53, 0.95), rgba(12, 17, 30, 0.98))',
          border: '1px solid rgba(236, 72, 153, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(225, 29, 72, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            color: '#94A3B8',
            padding: '0.4rem',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {!unboxed ? (
          <div>
            <div className="section-badge" style={{ marginBottom: '1.2rem' }}>
              <Sparkles size={14} /> Celebration Mystery Box
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>
              Tap to Reveal Your <span className="text-gradient">Special Gift</span>
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
              Every client gets a guaranteed celebratory perk, discount, or complimentary gourmet add-on!
            </p>

            {/* Glowing Mystery Box */}
            <div
              onClick={handleOpenBox}
              style={{
                cursor: 'pointer',
                margin: '1.5rem auto 2.5rem',
                width: '150px',
                height: '150px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #E11D48, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 50px rgba(225, 29, 72, 0.6)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className={isOpening ? 'animate-box-wiggle' : 'animate-float'}
              id="mystery-box-trigger"
            >
              <Gift size={72} color="#FFFFFF" />
            </div>

            <button
              onClick={handleOpenBox}
              disabled={isOpening}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '1.1rem' }}
            >
              {isOpening ? (
                <>Opening Mystery Box...</>
              ) : (
                <>
                  <Sparkles size={18} /> Tap to Open Mystery Box
                </>
              )}
            </button>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '2px solid #F59E0B',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.2rem'
              }}
            >
              <Flame size={36} />
            </div>

            <div className="section-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              🎉 Mystery Perk Unlocked!
            </div>

            <h3 style={{ fontSize: '2rem', marginTop: '0.8rem', marginBottom: '0.4rem', color: '#F59E0B' }}>
              {reward.discount}
            </h3>

            <p style={{ color: '#E2E8F0', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {reward.desc}
            </p>

            {/* Promo Code Box */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px dashed rgba(245, 158, 11, 0.5)',
                borderRadius: '14px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.8rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', textAlign: 'left' }}>YOUR PROMO CODE</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.1em', color: '#FFFFFF' }}>
                  {reward.code}
                </div>
              </div>

              <button
                onClick={handleCopyCode}
                className="btn btn-secondary btn-sm"
                style={{ background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}
              >
                {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                {copied ? 'Applied!' : 'Copy & Apply'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button
                onClick={handleUseDiscount}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                id="apply-reward-builder"
              >
                Apply to Surprise Builder <ArrowRight size={18} />
              </button>

              <button
                onClick={onClose}
                className="btn btn-secondary"
                style={{ width: '100%' }}
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
