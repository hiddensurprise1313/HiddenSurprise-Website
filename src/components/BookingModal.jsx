import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackEvent } from '../utils/analytics';

export default function BookingModal({ isOpen, onClose, initialData, onBookingSuccess }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    yourName: '',
    yourPhone: '',
    recipientName: '',
    date: '',
    timeSlot: '11:59 PM (Midnight Surprise)',
    noOfPax: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'noOfPax') {
      if (value === '') {
        setFormData({ ...formData, noOfPax: '' });
        return;
      }
      const num = parseInt(value, 10);
      if (isNaN(num)) return;
      if (num > 12) {
        setFormData({ ...formData, noOfPax: '12' });
        return;
      }
      if (num < 1) {
        setFormData({ ...formData, noOfPax: '1' });
        return;
      }
      setFormData({ ...formData, noOfPax: String(num) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const experienceTitle = initialData?.title || initialData?.name || 'Custom Surprise Setup';
    const duration = initialData?.duration || 'Standard Session';

    const lines = [
      '*HIDDEN SURPRISE BOOKING REQUEST*',
      '--------------------------------',
      `*Experience / Package:* ${experienceTitle}`,
      `*Duration:* ${duration}`,
      ...(initialData?.addons && initialData.addons.length > 0 ? [`*Addons:* ${initialData.addons.join(', ')}`] : []),
      ...(initialData?.discount ? [`*Perk Applied:* ${initialData.discount}`] : []),
      '',
      `*Booked By:* ${formData.yourName} (${formData.yourPhone})`,
      `*Surprise For:* ${formData.recipientName}`,
      `*Date:* ${formData.date}`,
      `*Time Slot:* ${formData.timeSlot}`,
      `*No of Pax:* ${formData.noOfPax}`,
      '',
      '*Stealth Protocol:* Please coordinate discreetly with me and provide a personalized package quote!'
    ];

    const message = lines.join('\n');
    const whatsappUrl = `https://wa.me/918870740190?text=${encodeURIComponent(message)}`;

    // Track conversion event for analytics
    trackEvent('booking_submit', {
      title: experienceTitle,
      pax: Number(formData.noOfPax) || 2,
      timeSlot: formData.timeSlot
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSubmitted(true);
    onBookingSuccess && onBookingSuccess('Booking details prepared! Opening WhatsApp concierge...');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  return (
    <div
      className="booking-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        className="booking-modal-card"
        style={{
          width: '100%',
          maxWidth: '580px',
          padding: '2.5rem',
          position: 'relative',
          backgroundColor: '#0A0D14',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#FFFFFF',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          margin: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
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

        {!isSubmitted ? (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000', padding: '0.2rem 0.5rem', fontSize: '0.7rem', fontWeight: 700 }}>CONCIERGE 06</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF' }}>
                Discreet Booking
              </span>
            </div>

            <h2 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Book Your Surprise
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.92rem', marginBottom: '1.6rem' }}>
              Fill out the details below. We'll instantly prepare your stealth package and connect you to our 24/7 WhatsApp coordinator.
            </p>

            <div
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '16px',
                background: 'rgba(248, 220, 108, 0.1)',
                border: '1px solid rgba(248, 220, 108, 0.3)',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: '#F8DC6C', fontWeight: 700, textTransform: 'uppercase' }}>Selected Setup</span>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>{initialData?.title || initialData?.name || 'Custom Surprise Experience'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF' }}>DURATION</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F8DC6C' }}>
                  {initialData?.duration || 'Bespoke'}
                </span>
              </div>
            </div>

            <form onSubmit={handleWhatsAppSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Your Name (Lead Planner)</label>
                  <input
                    type="text"
                    name="yourName"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.yourName}
                    onChange={handleChange}
                    className="modal-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Your WhatsApp Number</label>
                  <input
                    type="tel"
                    name="yourPhone"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.yourPhone}
                    onChange={handleChange}
                    className="modal-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Recipient's Name</label>
                  <input
                    type="text"
                    name="recipientName"
                    required
                    placeholder="e.g. Ananya"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="modal-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Surprise Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="modal-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Preferred Time Slot</label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="modal-input"
                  >
                    <option value="11:59 PM (Midnight Surprise)">11:59 PM (Midnight Surprise)</option>
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening Sunset (6:00 PM - 9:00 PM)">Evening Sunset (6:00 PM - 9:00 PM)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>No of Pax (1 - 12 Guests)</label>
                  <input
                    type="number"
                    name="noOfPax"
                    min="1"
                    max="12"
                    required
                    placeholder="e.g. 2 (Max 12)"
                    value={formData.noOfPax}
                    onChange={handleChange}
                    className="modal-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  borderRadius: '16px',
                  marginTop: '0.5rem'
                }}
              >
                <Send size={18} /> Confirm & Connect via WhatsApp
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(37, 211, 102, 0.15)',
                color: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <CheckCircle2 size={42} />
            </div>

            <h2 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.8rem' }}>
              Stealth Booking Prepared!
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your surprise itinerary has been transferred. Check WhatsApp to finalize the secret setup timing with your coordinator.
            </p>

            <button
              onClick={onClose}
              className="btn-gold"
              style={{ padding: '0.85rem 2rem', borderRadius: '16px' }}
            >
              Back to Website
            </button>
          </div>
        )}
      </div>

      <style>{`
        .modal-input {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .modal-input:focus {
          border-color: #F8DC6C;
          background: rgba(255, 255, 255, 0.12);
        }
        .modal-input option {
          background: #0A0D14;
          color: #FFFFFF;
        }
        @media (max-width: 600px) {
          .booking-modal-overlay {
            padding: 0.5rem !important;
          }
          .booking-modal-card {
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
