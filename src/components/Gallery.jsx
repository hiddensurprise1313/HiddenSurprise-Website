import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { Sparkles, MapPin, Eye, X } from 'lucide-react';

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
    <section id="gallery" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Real Moments Captured
          </div>
          <h2 className="section-title">
            The Wall of <span className="text-gradient">Pure Happiness</span>
          </h2>
          <p className="section-subtitle">
            Explore authentic moments, emotional tears, and awe-inspiring setups crafted for our amazing clients.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              marginTop: '1.8rem'
            }}
          >
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  background: selectedCategory === c.id ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === c.id ? '#FFFFFF' : '#94A3B8',
                  border: selectedCategory === c.id ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="glass-card"
              style={{
                overflow: 'hidden',
                borderRadius: '18px',
                cursor: 'pointer',
                position: 'relative',
                height: '290px'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.4s ease'
                }}
                className="gallery-bg-img"
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 9, 14, 0.9) 0%, rgba(7, 9, 14, 0.1) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.4rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      background: 'rgba(225, 29, 72, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {item.tag}
                  </span>

                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    <Eye size={16} />
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.3rem' }}>{item.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.82rem' }}>
                    <MapPin size={14} color="#EC4899" /> {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
              maxWidth: '800px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#0B0F19',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '0.4rem',
                borderRadius: '50%'
              }}
            >
              <X size={22} />
            </button>

            <img
              src={activeImage.image}
              alt={activeImage.title}
              style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', display: 'block' }}
            />

            <div style={{ padding: '1.5rem', background: '#0F172A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.2rem' }}>{activeImage.title}</h3>
                <div style={{ color: '#94A3B8', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} color="#EC4899" /> {activeImage.location} • {activeImage.tag}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .glass-card:hover .gallery-bg-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
