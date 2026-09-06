import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown } from 'lucide-react';
import FoldText from './FoldText';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="mono-tag" style={{ background: '#000000', color: '#F8DC6C' }}>FAQ 05</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
              Common Inquiries
            </span>
          </div>
          <h2 style={{ marginBottom: '1rem' }}>
            <FoldText
              text="Frequently Asked Questions"
              trigger="scroll"
              splitBy="word"
              hinge="top"
              duration={0.65}
              stagger={0.045}
              fontSize="clamp(2.2rem, 4vw, 3.2rem)"
              fontWeight={800}
              color="#000000"
            />
          </h2>
          <p style={{ color: '#5E6472', fontSize: '1.05rem' }}>
            Everything you need to know about our discreet surprise setups, timings, and custom curation.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const formattedIndex = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={idx}
                className="framer-card"
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#F6F6F6',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    padding: '1.6rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: '#000000',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#6B7280' }}>{formattedIndex}</span>
                    <span>{faq.q}</span>
                  </div>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: '#000000'
                    }}
                  >
                    <ChevronDown size={22} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 2rem 1.6rem',
                      paddingLeft: '3.6rem',
                      color: '#4B5563',
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid #EAEAEA'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
