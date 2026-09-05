import React, { useState } from 'react';
import { OCCASIONS, EXPERIENCE_TYPES, ADDONS } from '../data/mockData';
import { Check, ArrowRight, ArrowLeft, Heart, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseBuilder({ onOpenBooking, appliedDiscount }) {
  const [step, setStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0]);
  const [selectedExperience, setSelectedExperience] = useState(EXPERIENCE_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState([ADDONS[0]]);

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
      colors: ['#F8DC6C', '#000000', '#F59E0B', '#FFFFFF']
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
    <section id="builder" className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>WIZARD 01</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
              Interactive Customizer
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#000000', marginBottom: '1rem' }}>
            Why Great Surprises Change Everything
          </h2>
          <p style={{ color: '#5E6472', fontSize: '1.1rem', lineHeight: 1.6 }}>
            At Hidden Surprise, we recognize that every bond is unique. That’s why we design bespoke experiences tailored to each celebration's emotional goals.
          </p>
        </div>

        {/* Step Tabs Pills (Elevare Style) */}
        <div className="tab-pills-container" style={{ marginBottom: '2.5rem' }}>
          {[
            { num: 1, tag: '01', label: 'Occasions' },
            { num: 2, tag: '02', label: 'Experiences' },
            { num: 3, tag: '03', label: 'Add-Ons' },
            { num: 4, tag: '04', label: 'Review & Estimate' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`tab-pill ${step === s.num ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.8 }}>{s.tag}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Wizard Main Container Card */}
        <div
          className="framer-card"
          style={{
            padding: '2.5rem',
            backgroundColor: '#F6F6F6',
            borderRadius: '28px',
            border: '1px solid #E5E7EB'
          }}
        >
          {/* STEP 1: Occasions */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#000000' }}>Select Your Occasion</h3>
                <span style={{ fontSize: '0.88rem', color: '#5E6472' }}>Step 1 of 4</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                {OCCASIONS.map((occ, idx) => {
                  const isSelected = selectedOccasion.id === occ.id;
                  const formattedIndex = String(idx + 1).padStart(2, '0');
                  return (
                    <div
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ)}
                      style={{
                        padding: '1.6rem',
                        borderRadius: '20px',
                        backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        border: isSelected ? '2px solid #000000' : '1px solid #E5E7EB',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 10px 25px rgba(0,0,0,0.15)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            backgroundColor: isSelected ? '#F8DC6C' : '#F0F0F0',
                            color: '#000000'
                          }}
                        >
                          {formattedIndex}
                        </span>
                        {isSelected && <Check size={18} color="#F8DC6C" />}
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: isSelected ? '#FFFFFF' : '#000000' }}>
                        {occ.name}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: isSelected ? 'rgba(255, 255, 255, 0.75)' : '#5E6472' }}>
                        {occ.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setStep(2)} className="btn-gold" id="builder-step1-next">
                  Continue to Experiences <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Experiences */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#000000' }}>Choose Experience Format</h3>
                <span style={{ fontSize: '0.88rem', color: '#5E6472' }}>Step 2 of 4</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {EXPERIENCE_TYPES.map((exp, idx) => {
                  const isSelected = selectedExperience.id === exp.id;
                  const formattedIndex = String(idx + 1).padStart(2, '0');
                  return (
                    <div
                      key={exp.id}
                      onClick={() => setSelectedExperience(exp)}
                      style={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                        border: isSelected ? '3px solid #000000' : '1px solid #E5E7EB',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: isSelected ? '0 12px 30px rgba(0,0,0,0.15)' : 'none'
                      }}
                    >
                      <div
                        style={{
                          height: '180px',
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
                            left: '12px',
                            display: 'flex',
                            gap: '0.4rem'
                          }}
                        >
                          <span className="mono-tag">{formattedIndex}</span>
                          <span className="mono-tag" style={{ background: '#F8DC6C', color: '#000000' }}>EXPERIENCE</span>
                        </div>

                        <div
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            background: '#000000',
                            color: '#F8DC6C',
                            padding: '0.35rem 0.8rem',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                          }}
                        >
                          Starts ₹{exp.basePrice}
                        </div>
                      </div>

                      <div style={{ padding: '1.4rem' }}>
                        <h4 style={{ fontSize: '1.2rem', color: '#000000', marginBottom: '0.4rem' }}>{exp.name}</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5E6472' }}>{exp.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} className="btn-dark">
                  <ArrowLeft size={18} /> Back
                </button>
                <button onClick={() => setStep(3)} className="btn-gold" id="builder-step2-next">
                  Continue to Add-Ons <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Add-Ons */}
          {step === 3 && (
            <div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#000000' }}>Customize Luxury Add-ons</h3>
                  <span style={{ fontSize: '0.88rem', color: '#5E6472' }}>{selectedAddons.length} added (+₹{addonsTotal})</span>
                </div>
                <span style={{ fontSize: '0.88rem', color: '#5E6472' }}>Step 3 of 4</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      style={{
                        padding: '1.2rem',
                        borderRadius: '18px',
                        backgroundColor: isChecked ? '#000000' : '#FFFFFF',
                        color: isChecked ? '#FFFFFF' : '#000000',
                        border: isChecked ? '2px solid #000000' : '1px solid #E5E7EB',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.8rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{addon.name}</div>
                        <div style={{ fontSize: '0.85rem', color: isChecked ? '#F8DC6C' : '#000000', fontWeight: 700, marginTop: '0.2rem' }}>
                          + ₹{addon.price}
                        </div>
                      </div>

                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '8px',
                          border: isChecked ? 'none' : '2px solid #D1D5DB',
                          backgroundColor: isChecked ? '#F8DC6C' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {isChecked && <Check size={16} color="#000000" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} className="btn-dark">
                  <ArrowLeft size={18} /> Back
                </button>
                <button onClick={() => setStep(4)} className="btn-gold" id="builder-step3-next">
                  Review & Calculate <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Estimate */}
          {step === 4 && (
            <div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#000000' }}>Review & Instant Estimate</h3>
                <span style={{ fontSize: '0.88rem', color: '#5E6472' }}>Step 4 of 4</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {/* Left Breakdown */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '1.8rem',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', color: '#000000' }}>Configuration Details</h4>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#5E6472', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Occasion</div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#000000' }}>{selectedOccasion.name}</div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#5E6472', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience Format</div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#000000' }}>{selectedExperience.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#5E6472' }}>₹{selectedExperience.basePrice} base</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#5E6472', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Add-ons ({selectedAddons.length})
                    </div>
                    {selectedAddons.map(a => (
                      <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                        <span>• {a.name}</span>
                        <span style={{ fontWeight: 600 }}>₹{a.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Price Summary */}
                <div
                  style={{
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.3rem', color: '#F8DC6C', marginBottom: '1.2rem' }}>Estimated Investment</h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      <span>Base Experience</span>
                      <span>₹{selectedExperience.basePrice}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      <span>Add-ons Total</span>
                      <span>₹{addonsTotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#F8DC6C' }}>
                        <span>Perk Discount ({appliedDiscount.code})</span>
                        <span>- ₹{discountAmount}</span>
                      </div>
                    )}

                    <div
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                        paddingTop: '1.2rem',
                        marginTop: '1.2rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Estimate:</span>
                      <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#F8DC6C' }}>
                        ₹{finalTotal}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <button
                      onClick={handleComplete}
                      className="btn-gold"
                      style={{ width: '100%', padding: '0.95rem', fontSize: '1.05rem' }}
                      id="builder-confirm-btn"
                    >
                      <Calendar size={18} /> Confirm & Reserve Date
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="btn-pill-light"
                      style={{ justifyContent: 'center' }}
                    >
                      <ArrowLeft size={16} /> Modify Selections
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
