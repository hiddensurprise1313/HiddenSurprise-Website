import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import CuratedServices from './components/CuratedServices';
import AdditionalServices from './components/AdditionalServices';
import SpiralPhotoWall from './components/SpiralPhotoWall';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import UnboxingGame from './components/UnboxingGame';
import BookingModal from './components/BookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Toast from './components/Toast';

function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);
  const [unboxingModalOpen, setUnboxingModalOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleOpenBooking = (data = null) => {
    setSelectedBookingData(data);
    setBookingModalOpen(true);
  };

  const handleApplyDiscount = (discount) => {
    setAppliedDiscount(discount);
    setToastMessage(`🎉 Perk "${discount.code}" (${discount.discount}) applied to your booking!`);
  };

  return (
    <div className="app">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Top Floating Pill Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenUnboxing={() => setUnboxingModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Fullscreen 100vh Hero with TextPressure */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenUnboxing={() => setUnboxingModalOpen(true)}
        />

        {/* Elevare Style Stats & Statement Callout */}
        <StatsBanner />

        {/* Curated Surprise Services (Outdoor, Special, Indoor) */}
        <CuratedServices
          onOpenBooking={handleOpenBooking}
        />

        {/* Additional Celebration Add-Ons (Flower Bouquet, Chocolate Bouquet, Banner Entry) */}
        <AdditionalServices
          onOpenBooking={handleOpenBooking}
        />

        {/* 3D Infinite Spiral Gallery (Celebration Moments) */}
        <SpiralPhotoWall />

        {/* Loved by 48+ Happy Hearts Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer with Top CTA Card */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenUnboxing={() => setUnboxingModalOpen(true)}
      />

      {/* Floating 24/7 WhatsApp Concierge Button */}
      <FloatingWhatsApp onOpenBooking={() => handleOpenBooking()} />

      {/* Mystery Box Unboxing Game */}
      <UnboxingGame
        isOpen={unboxingModalOpen}
        onClose={() => setUnboxingModalOpen(false)}
        onApplyDiscount={handleApplyDiscount}
        appliedDiscount={appliedDiscount}
      />

      {/* Stealth Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={selectedBookingData}
        onBookingSuccess={(msg) => setToastMessage(msg)}
      />
    </div>
  );
}

export default App;


