import React from 'react';
import { MessageCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function FloatingWhatsApp({ onOpenBooking }) {
  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', {
      source: 'Floating Concierge Button'
    });
    const text = encodeURIComponent("Hi Hidden Surprise team! I'd like to plan a secret surprise celebration. Can you help me?");
    window.open(`https://wa.me/918870740190?text=${text}`, '_blank');
  };

  return (
    <div
      className="floating-whatsapp-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}
    >
      <button
        onClick={handleWhatsApp}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'all 0.25s ease'
        }}
        className="whatsapp-float-btn animate-float"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle size={28} />
      </button>

      <style>{`
        .whatsapp-float-btn:hover {
          transform: scale(1.1) translateY(-4px);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.65);
        }
        @media (max-width: 600px) {
          .floating-whatsapp-container {
            bottom: 16px !important;
            right: 16px !important;
          }
          .whatsapp-float-btn {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}
