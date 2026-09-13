import React, { useState, useEffect } from 'react';
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
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { trackPageView, trackEvent, checkAdminAuth } from './utils/analytics';

function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);
  const [unboxingModalOpen, setUnboxingModalOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Route & Admin state
  const [currentHash, setCurrentHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  const [isAdminAuth, setIsAdminAuth] = useState(() => checkAdminAuth());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      setIsAdminAuth(checkAdminAuth());
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    // Track initial page view
    trackPageView(window.location.pathname + window.location.hash);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const isAdminRoute = currentHash === '#admin' || currentHash === '#/admin' || (typeof window !== 'undefined' && window.location.pathname === '/admin');

  const handleNavigateToSite = () => {
    window.location.hash = '';
    setCurrentHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (data = null) => {
    setSelectedBookingData(data);
    setBookingModalOpen(true);
    trackEvent('booking_modal_open', {
      source: data ? 'Service Card' : 'Navigation CTA',
      package: data?.title || 'General'
    });
  };

  const handleApplyDiscount = (discount) => {
    setAppliedDiscount(discount);
    setToastMessage(`🎉 Perk "${discount.code}" (${discount.discount}) applied to your booking!`);
  };

  // If viewing Admin Route
  if (isAdminRoute) {
    if (!isAdminAuth) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuth(true)}
          onBackToSite={handleNavigateToSite}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={() => setIsAdminAuth(false)}
        onBackToSite={handleNavigateToSite}
      />
    );
  }

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

      {/* Footer with Top CTA Card and Admin Link */}
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



