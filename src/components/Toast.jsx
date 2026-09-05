import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 300,
        background: 'linear-gradient(135deg, rgba(24, 32, 53, 0.95), rgba(12, 17, 30, 0.98))',
        backdropFilter: 'blur(16px)',
        border: '1px solid #10B981',
        borderRadius: '14px',
        padding: '1rem 1.4rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        color: '#FFFFFF',
        maxWidth: '420px',
        animation: 'slideIn 0.3s ease'
      }}
    >
      <div style={{ color: '#10B981', flexShrink: 0 }}>
        <CheckCircle2 size={22} />
      </div>
      <div style={{ fontSize: '0.9rem', lineHeight: 1.4, flexGrow: 1 }}>{message}</div>
      <button onClick={onClose} style={{ color: '#94A3B8', padding: '0.2rem' }}>
        <X size={16} />
      </button>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
