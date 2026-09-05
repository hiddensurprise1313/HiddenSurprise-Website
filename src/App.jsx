import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SurpriseBuilder from './components/SurpriseBuilder';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
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
    setToastMessage(`🎉 Promo "${discount.code}" (${discount.discount}) applied to your booking!`);
  };

  return (
    <div className="app">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenUnboxing={() => setUnboxingModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenUnboxing={() => setUnboxingModalOpen(true)}
        />

        {/* Surprise Configurator Wizard */}
        <SurpriseBuilder
          onOpenBooking={handleOpenBooking}
          appliedDiscount={appliedDiscount}
        />

        {/* Curated Package Catalog */}
        <Packages
          onOpenBooking={handleOpenBooking}
        />

        {/* Photo Gallery of Moments */}
        <Gallery />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenUnboxing={() => setUnboxingModalOpen(true)}
      />

      {/* Floating 24/7 WhatsApp Concierge Button */}
      <FloatingWhatsApp onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Unboxing Game / Mystery Box Modal */}
      <UnboxingGame
        isOpen={unboxingModalOpen}
        onClose={() => setUnboxingModalOpen(false)}
        onApplyDiscount={handleApplyDiscount}
        appliedDiscount={appliedDiscount}
      />

      {/* Direct Booking Modal with WhatsApp Message Link */}
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
