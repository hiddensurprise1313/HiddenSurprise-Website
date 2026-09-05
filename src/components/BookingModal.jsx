import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Heart, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
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

    // WhatsApp Direct URL (Replace with business number or use direct api)
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
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '580px',
          padding: '2.5rem',
          position: 'relative',
          background: 'linear-gradient(145deg, rgba(20, 26, 44, 0.98), rgba(10, 14, 25, 0.99))',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          margin: 'auto'
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
            color: '#94A3B8',
            padding: '0.4rem',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="section-badge" style={{ marginBottom: '0.8rem' }}>
              <Heart size={14} /> Stealth Booking Concierge
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>
              Reserve Your <span className="text-gradient">Surprise Date</span>
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '1.8rem' }}>
              Selected: <strong style={{ color: '#FFFFFF' }}>{initialData?.title || 'Custom Surprise Setup'}</strong>
              {initialData?.price && <span style={{ color: '#F59E0B', marginLeft: '0.5rem' }}>(₹{initialData.price})</span>}
            </p>

            <form onSubmit={handleWhatsAppSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Row 1: Your Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>Your Name (Secret Planner)</label>
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
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>Your WhatsApp Number</label>
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

              {/* Row 2: Recipient Name & Date */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>Recipient's Name</label>
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
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>Surprise Date</label>
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

              {/* Row 3: Time slot & City */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>Preferred Time Slot</label>
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
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>City</label>
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

              {/* Address / Landmark */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>Delivery / Setup Location & Landmark</label>
                <input
                  type="text"
                  name="venueAddress"
                  required
                  placeholder="e.g. Bandra West, Apartment 402 or Rooftop Cafe"
                  value={formData.venueAddress}
                  onChange={handleChange}
                  className="modal-input"
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.4rem' }}>Special Custom Requests / Message</label>
                <textarea
                  name="specialNote"
                  rows="2"
                  placeholder="Any song requests, cake flavors, or secret stealth instructions..."
                  value={formData.specialNote}
                  onChange={handleChange}
                  className="modal-input"
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%', marginTop: '0.6rem' }}
                id="modal-submit-whatsapp"
              >
                <Send size={18} /> Send Booking to WhatsApp Concierge
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.76rem', color: '#64748B' }}>
                🔒 100% Confidentiality Guarantee. We will never contact the recipient directly.
              </p>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ color: '#10B981', marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}>
              <CheckCircle2 size={64} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>Booking Prepared!</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              We've connected you with our 24/7 WhatsApp Surprise Concierge. If WhatsApp didn't open automatically, click the button below.
            </p>
            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
              Back to Website
            </button>
          </div>
        )}
      </div>

      <style>{`
        .modal-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .modal-input:focus {
          border-color: #E11D48;
          background: rgba(255, 255, 255, 0.08);
        }
        .modal-input option {
          background: #0B0F19;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}
