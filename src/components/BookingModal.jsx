import React, { useState } from 'react';
import { X, Calendar, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, initialData, onBookingSuccess }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    yourName: '',
    yourPhone: '',
    recipientName: '',
    date: '',
    timeSlot: '11:59 PM (Midnight Surprise)',
    city: 'Mumbai',
    venueAddress: '',
    specialNote: initialData?.addons ? `Addons: ${initialData.addons.join(', ')}` : ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const experienceTitle = initialData?.title || initialData?.name || 'Custom Surprise Setup';
    const totalAmount = initialData?.price || 2999;

    const message = `✨ *HIDDEN SURPRISE BOOKING REQUEST* ✨%0A%0A` +
      `🎁 *Experience:* ${encodeURIComponent(experienceTitle)}%0A` +
      `💰 *Estimated Total:* ₹${totalAmount}%0A` +
      (initialData?.discount ? `🏷️ *Promo Applied:* ${initialData.discount}%0A` : '') +
      `%0A👤 *Booked By:* ${encodeURIComponent(formData.yourName)} (${formData.yourPhone})%0A` +
      `❤️ *Surprise For:* ${encodeURIComponent(formData.recipientName)}%0A` +
      `📅 *Date:* ${formData.date}%0A` +
      `⏰ *Time Slot:* ${encodeURIComponent(formData.timeSlot)}%0A` +
      `📍 *City / Venue:* ${encodeURIComponent(formData.city)} - ${encodeURIComponent(formData.venueAddress)}%0A` +
      (formData.specialNote ? `📝 *Custom Instructions:* ${encodeURIComponent(formData.specialNote)}%0A` : '') +
      `%0A🔒 *Stealth Protocol:* Please coordinate discreetly with me!`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${message}`;

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
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#F8DC6C' }}>
                ₹{(initialData?.price || 2999).toLocaleString('en-IN')}
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
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="modal-input"
                  >
                    <option value="Mumbai">Mumbai & Navi Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Goa">Goa (VIP Destination)</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Other">Other (Pan-India Hamper)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Delivery / Setup Location</label>
                <input
                  type="text"
                  name="venueAddress"
                  required
                  placeholder="e.g. Bandra West, Apartment 402 or Rooftop Venue"
                  value={formData.venueAddress}
                  onChange={handleChange}
                  className="modal-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Custom Note / Secret Hints (Optional)</label>
                <textarea
                  name="specialNote"
                  rows={2}
                  placeholder="e.g. She loves white lilies and fairy lights. Keep car hidden behind the gate!"
                  value={formData.specialNote}
                  onChange={handleChange}
                  className="modal-input"
                  style={{ resize: 'none' }}
                />
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
            padding: 0.75rem !important;
          }
          .booking-modal-card {
            padding: 1.5rem 1.2rem !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
