import React, { useState } from 'react';
import { OCCASIONS, EXPERIENCE_TYPES, ADDONS } from '../data/mockData';
import { Sparkles, Check, Plus, ArrowRight, ArrowLeft, Heart, Calendar, Gift, Music, Cake, Flower, Image, Sun, Cloud, Video, Send, Baby, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Cake: Cake,
  Heart: Heart,
  Sparkles: Sparkles,
  Send: Send,
  Baby: Baby,
  Smile: Smile,
  Flower: Flower,
  Image: Image,
  Music: Music,
  Sun: Sun,
  Cloud: Cloud,
  Video: Video,
  Gift: Gift
};

export default function SurpriseBuilder({ onOpenBooking, appliedDiscount }) {
  const [step, setStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0]);
  const [selectedExperience, setSelectedExperience] = useState(EXPERIENCE_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState([ADDONS[0]]); // default 1 cake

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const subTotal = (selectedExperience?.basePrice || 0) + addonsTotal;
  
  let discountAmount = 0;
  if (appliedDiscount && appliedDiscount.code === 'SURPRISE20') {
    discountAmount = Math.round(subTotal * 0.2);
  }
  const finalTotal = subTotal - discountAmount;

  const handleComplete = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#E11D48', '#EC4899', '#8B5CF6', '#F59E0B']
    });

    onOpenBooking({
      title: `${selectedOccasion.name} - ${selectedExperience.name}`,
      price: finalTotal,
      occasion: selectedOccasion.name,
      experience: selectedExperience.name,
      addons: selectedAddons.map(a => a.name),
      discount: appliedDiscount?.code
    });
  };

  return (
    <section id="builder" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Interactive Experience Wizard
          </div>
          <h2 className="section-title">
            Build Your Dream <span className="text-gradient">Surprise Setup</span>
          </h2>
          <p className="section-subtitle">
            Choose your occasion, select your experience format, and customize luxury add-ons. We handle the stealth execution from start to finish.
          </p>
        </div>

        {/* Wizard Container */}
        <div
          className="glass-card"
          style={{
            padding: '2.5rem',
            maxWidth: '1060px',
            margin: '0 auto',
            border: '1px solid rgba(236, 72, 153, 0.2)'
          }}
        >
          {/* Steps Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              position: 'relative'
            }}
          >
            {[
              { num: 1, label: 'Occasion' },
              { num: 2, label: 'Experience' },
              { num: 3, label: 'Add-Ons' },
              { num: 4, label: 'Summary' }
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => setStep(s.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  zIndex: 2,
                  opacity: step === s.num ? 1 : step > s.num ? 0.85 : 0.5
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: step === s.num ? 'var(--gradient-primary)' : step > s.num ? '#10B981' : '#1E293B',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: step === s.num ? '0 0 15px rgba(225, 29, 72, 0.5)' : 'none'
                  }}
                >
                  {step > s.num ? <Check size={18} /> : s.num}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', display: 'none', smDisplay: 'inline' }} className="step-label">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Choose Occasion */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>Step 1: Select the Occasion</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                {OCCASIONS.map((occ) => {
                  const IconComponent = ICON_MAP[occ.icon] || Heart;
                  const isSelected = selectedOccasion.id === occ.id;
                  return (
                    <div
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ)}
                      style={{
                        padding: '1.4rem',
                        borderRadius: '16px',
                        background: isSelected ? 'rgba(225, 29, 72, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '2px solid #E11D48' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: isSelected ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <IconComponent size={22} color={isSelected ? '#FFFFFF' : '#EC4899'} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: isSelected ? '#FFFFFF' : '#F1F5F9' }}>
                          {occ.name}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{occ.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setStep(2)} className="btn btn-primary" id="builder-step1-next">
                  Continue to Experiences <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Experience Format */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>Step 2: Choose Experience Format</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {EXPERIENCE_TYPES.map((exp) => {
                  const isSelected = selectedExperience.id === exp.id;
                  return (
                    <div
                      key={exp.id}
                      onClick={() => setSelectedExperience(exp)}
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                        background: isSelected ? 'rgba(225, 29, 72, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '2px solid #E11D48' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div
                        style={{
                          height: '160px',
                          backgroundImage: `url(${exp.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(8px)',
                            padding: '0.3rem 0.7rem',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            color: '#F59E0B',
                            fontSize: '0.85rem'
                          }}
                        >
                          Starts ₹{exp.basePrice}
                        </div>
                      </div>
                      <div style={{ padding: '1.2rem' }}>
                        <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: isSelected ? '#FFFFFF' : '#F1F5F9' }}>
                          {exp.name}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{exp.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">
                  <ArrowLeft size={18} /> Back
                </button>
                <button onClick={() => setStep(3)} className="btn btn-primary" id="builder-step2-next">
                  Continue to Add-Ons <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customize Add-ons */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.4rem' }}>Step 3: Customize Luxury Add-ons</h3>
                <span style={{ fontSize: '0.9rem', color: '#EC4899', fontWeight: 600 }}>
                  {selectedAddons.length} items added (+₹{addonsTotal})
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {ADDONS.map((addon) => {
                  const IconComponent = ICON_MAP[addon.icon] || Gift;
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      style={{
                        padding: '1.1rem',
                        borderRadius: '14px',
                        background: isChecked ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: isChecked ? '2px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.8rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: isChecked ? '#8B5CF6' : 'rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <IconComponent size={18} color="#FFFFFF" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{addon.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 600 }}>+ ₹{addon.price}</div>
                        </div>
                      </div>

                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          border: isChecked ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                          background: isChecked ? '#8B5CF6' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isChecked && <Check size={16} color="#FFFFFF" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} className="btn btn-secondary">
                  <ArrowLeft size={18} /> Back
                </button>
                <button onClick={() => setStep(4)} className="btn btn-primary" id="builder-step3-next">
                  Review & Calculate <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Price Calculation */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Step 4: Celebration Summary & Instant Estimate</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Left: Detailed Configuration */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                  }}
                >
                  <h4 style={{ fontSize: '1.1rem', color: '#EC4899', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart size={18} /> Configuration
                  </h4>

                  <div style={{ marginBottom: '1.2rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Occasion</div>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{selectedOccasion.name}</div>
                  </div>

                  <div style={{ marginBottom: '1.2rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Experience Setup</div>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{selectedExperience.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>₹{selectedExperience.basePrice} base price</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.4rem' }}>Selected Add-ons ({selectedAddons.length})</div>
                    {selectedAddons.length === 0 ? (
                      <div style={{ fontSize: '0.85rem', color: '#64748B' }}>No add-ons selected</div>
                    ) : (
                      selectedAddons.map(a => (
                        <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                          <span>• {a.name}</span>
                          <span style={{ color: '#F59E0B' }}>+₹{a.price}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right: Pricing Breakdown & Booking Trigger */}
                <div
                  style={{
                    background: 'linear-gradient(145deg, rgba(225, 29, 72, 0.08), rgba(139, 92, 246, 0.08))',
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '16px',
                    padding: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Estimated Investment</h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#94A3B8' }}>
                      <span>Base Experience</span>
                      <span>₹{selectedExperience.basePrice}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#94A3B8' }}>
                      <span>Add-ons Total</span>
                      <span>₹{addonsTotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#10B981' }}>
                        <span>Mystery Box Promo ({appliedDiscount.code})</span>
                        <span>- ₹{discountAmount}</span>
                      </div>
                    )}

                    <div
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingTop: '1rem',
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Estimate:</span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.9rem', fontWeight: 800, color: '#F59E0B' }}>
                          ₹{finalTotal}
                        </span>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>All taxes & stealth execution included</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <button
                      onClick={handleComplete}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%' }}
                      id="builder-confirm-btn"
                    >
                      <Calendar size={18} /> Confirm & Reserve Date
                    </button>
                    <button onClick={() => setStep(3)} className="btn btn-secondary">
                      <ArrowLeft size={18} /> Modify Selections
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .step-label {
            display: inline !important;
          }
        }
      `}</style>
    </section>
  );
}
