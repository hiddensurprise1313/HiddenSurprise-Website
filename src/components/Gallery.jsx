import React, { useState, useEffect } from 'react';
import DriftWall from './DriftWall';
import { DRIFT_WALL_PHOTOS } from '../data/driftWallPhotos';
import { MapPin, Eye, X, Sparkles, LayoutGrid, Layers, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImage, setActiveImage] = useState(null);
  const [viewMode, setViewMode] = useState('drift'); // 'drift' | 'grid'
  const [columnsCount, setColumnsCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnsCount(3);
      } else if (width < 1024) {
        setColumnsCount(4);
      } else {
        setColumnsCount(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = selectedCategory === 'all'
    ? DRIFT_WALL_PHOTOS
    : DRIFT_WALL_PHOTOS.filter(i => i.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Celebrations' },
    { id: 'birthday', label: 'Birthdays' },
    { id: 'proposal', label: 'Proposals' },
    { id: 'romantic', label: 'Anniversaries' },
    { id: 'trending', label: 'Car Trunks' },
    { id: 'gifts', label: 'Hampers' }
  ];

  const handleWhatsAppBooking = (photo) => {
    const message = `Hi Hidden Surprise! I saw this setup in your Moments Gallery: "${photo.title}" (${photo.location}). I'd like to plan a similar celebration!`;
    const url = `https://wa.me/919133143232?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>MOMENTS 03</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
                  Real Client Celebrations
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#000000', marginBottom: '0.6rem' }}>
                The Wall of Pure Happiness
              </h2>
              <p style={{ color: '#5E6472', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '680px' }}>
                Browse 50+ real moments and surprise setups executed with stealth precision across Hyderabad & India.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px',
                background: '#F0F0F2',
                borderRadius: '100px',
                border: '1px solid #E4E4E7'
              }}
            >
              <button
                onClick={() => setViewMode('drift')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all 0.25s ease',
                  background: viewMode === 'drift' ? '#000000' : 'transparent',
                  color: viewMode === 'drift' ? '#F8DC6C' : '#5E6472'
                }}
              >
                <Layers size={15} /> 3D Live Drift Wall
              </button>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all 0.25s ease',
                  background: viewMode === 'grid' ? '#000000' : 'transparent',
                  color: viewMode === 'grid' ? '#F8DC6C' : '#5E6472'
                }}
              >
                <LayoutGrid size={15} /> Grid Catalog
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="tab-pills-container" style={{ marginTop: '1rem' }}>
            {categories.map((c) => {
              const count = c.id === 'all'
                ? DRIFT_WALL_PHOTOS.length
                : DRIFT_WALL_PHOTOS.filter(i => i.category === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`tab-pill ${selectedCategory === c.id ? 'active' : ''}`}
                >
                  {c.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEW 1: 3D React Bits <DriftWall /> Container */}
        {viewMode === 'drift' && (
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#06070B',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.25)',
              marginBottom: '2rem'
            }}
          >
            {/* Top Interactive Banner */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '20px',
                right: '20px',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.45rem 1rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(248, 220, 108, 0.3)',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                <Sparkles size={14} color="#F8DC6C" />
                <span>3D Gyro Drift • Hover to illuminate • Click tile to view</span>
              </div>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#F8DC6C',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  fontFamily: 'monospace'
                }}
              >
                {filteredItems.length} MOMENTS LIVE
              </div>
            </div>

            {/* DriftWall Component */}
            <div style={{ height: '580px', width: '100%', position: 'relative' }}>
              <DriftWall
                items={filteredItems}
                columns={columnsCount}
                tileWidth={220}
                tileHeight={148}
                gap={18}
                radius={16}
                tilt={14}
                turn={-12}
                perspective={1200}
                depth={110}
                speed={38}
                direction="up"
                variance={0.4}
                parallax={0.5}
                lift={56}
                fade={0.6}
                dim={0.65}
                overlayColor="#07080D"
                onTileClick={(item) => setActiveImage(item)}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: Elevare Cards Grid */}
        {viewMode === 'grid' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.6rem',
              marginBottom: '2rem'
            }}
          >
            {filteredItems.slice(0, 24).map((item, idx) => {
              const formattedIndex = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item)}
                  className="framer-card"
                  style={{
                    height: '380px',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background Image */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.4s ease'
                    }}
                    className="gallery-bg"
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      right: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 2
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <span className="mono-tag">{formattedIndex}</span>
                      <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000' }}>
                        {item.tag.toUpperCase()}
                      </span>
                    </div>

                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}
                    >
                      <Eye size={16} />
                    </div>
                  </div>

                  {/* Dark Bottom Gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.88) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '1.6rem'
                    }}
                  >
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '0.3rem' }}>
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F8DC6C', fontSize: '0.85rem' }}>
                      <MapPin size={13} /> {item.location}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal with Booking Direct Action */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setActiveImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '860px',
              width: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#0B0D13',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#FFFFFF',
                padding: '0.5rem',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <X size={20} />
            </button>

            {/* Photo preview */}
            <div style={{ width: '100%', maxHeight: '560px', overflow: 'hidden', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={activeImage.image}
                alt={activeImage.title}
                style={{ width: '100%', height: '100%', maxHeight: '560px', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Bottom Actions Bar */}
            <div
              style={{
                padding: '1.5rem 2rem',
                background: '#0B0D13',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000', fontSize: '0.75rem' }}>
                    {activeImage.tag}
                  </span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Verified Client Setup</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', fontWeight: 800 }}>{activeImage.title}</h3>
                <div style={{ color: '#F8DC6C', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <MapPin size={14} /> {activeImage.location}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button
                  onClick={() => handleWhatsAppBooking(activeImage)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#25D366',
                    color: '#000000',
                    fontWeight: 700,
                    padding: '0.75rem 1.4rem',
                    borderRadius: '100px',
                    fontSize: '0.92rem',
                    transition: 'transform 0.2s'
                  }}
                  className="hover-lift"
                >
                  <MessageCircle size={17} /> Plan This Setup on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .framer-card:hover .gallery-bg {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
