import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CuratedHome from './components/CuratedHome';
import OldExperience from './components/OldExperience';
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
  const [isOldRoute, setIsOldRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path.endsWith('/old') || path.includes('/old/') || hash.includes('old');
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const isOld = path.endsWith('/old') || path.includes('/old/') || hash.includes('old');
      setIsOldRoute(isOld);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

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
        isOldRoute={isOldRoute}
      />

      {/* Render Curated Services Home (/) or Full Classic Experience (/old) */}
      {isOldRoute ? (
        <OldExperience
          onOpenBooking={handleOpenBooking}
          onOpenUnboxing={() => setUnboxingModalOpen(true)}
          appliedDiscount={appliedDiscount}
        />
      ) : (
        <CuratedHome
          onOpenBooking={handleOpenBooking}
          onOpenUnboxing={() => setUnboxingModalOpen(true)}
        />
      )}

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

