import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { MapPin, Eye, X } from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Celebrations' },
    { id: 'birthday', label: 'Birthdays' },
    { id: 'proposal', label: 'Proposals' },
    { id: 'romantic', label: 'Anniversaries' },
    { id: 'trending', label: 'Car Trunks' },
    { id: 'gifts', label: 'Hampers' }
  ];

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>MOMENTS 03</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
              Real Setups Captured
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#000000', marginBottom: '1rem' }}>
            The Wall of Pure Happiness
          </h2>
          <p style={{ color: '#5E6472', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Explore authentic moments and setups executed with stealth precision across India.
          </p>
        </div>

        {/* Category Pills */}
        <div className="tab-pills-container" style={{ marginBottom: '3rem' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`tab-pill ${selectedCategory === c.id ? 'active' : ''}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid (Elevare Style Vertical Cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {filteredItems.map((item, idx) => {
            const formattedIndex = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="framer-card"
                style={{
                  height: '420px',
                  borderRadius: '28px',
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

                {/* Top Corner Badges */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    right: '16px',
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
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}
                  >
                    <Eye size={18} />
                  </div>
                </div>

                {/* Dark Bottom Gradient & Text */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.8rem'
                  }}
                >
                  <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '0.3rem' }}>
                    {item.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F8DC6C', fontSize: '0.88rem' }}>
                    <MapPin size={14} /> {item.location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 250,
            background: 'rgba(0, 0, 0, 0.92)',
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
              maxWidth: '820px',
              width: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#FFFFFF',
                padding: '0.4rem',
                borderRadius: '50%'
              }}
            >
              <X size={22} />
            </button>

            <img
              src={activeImage.image}
              alt={activeImage.title}
              style={{ width: '100%', maxHeight: '560px', objectFit: 'cover', display: 'block' }}
            />

            <div style={{ padding: '1.6rem 2rem', background: '#0A0D14', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>{activeImage.title}</h3>
                <div style={{ color: '#F8DC6C', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} /> {activeImage.location} • {activeImage.tag}
                </div>
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
