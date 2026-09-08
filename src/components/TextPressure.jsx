import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Smooth cubic ease-out interpolation for dramatic, tactile elastic pressure
const getAttr = (distance, maxDist, minVal, maxVal) => {
  const norm = Math.max(0, Math.min(1, 1 - distance / maxDist));
  const ease = 1 - Math.pow(1 - norm, 3);
  return minVal + ease * (maxVal - minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure = ({
  text = 'Surprise',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght@8..144,-10..0,25..151,100..1000&display=swap',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#F8DC6C',
  strokeColor = '#FF0000',
  className = '',

  minFontSize = 42
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: -9999, y: -9999 });
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const isHoveringRef = useRef(false);
  const lastInteractionTimeRef = useRef(0);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = useMemo(() => text.split(''), [text]);

  // Global mouse & touch tracking
  useEffect(() => {
    const handleMouseMove = e => {
      isHoveringRef.current = true;
      lastInteractionTimeRef.current = Date.now();
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = e => {
      const t = e.touches[0];
      if (t) {
        isHoveringRef.current = true;
        lastInteractionTimeRef.current = Date.now();
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
      }
    };

    const handleTouchStart = e => {
      const t = e.touches[0];
      if (t) {
        isHoveringRef.current = true;
        lastInteractionTimeRef.current = Date.now();
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
      }
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      cursorRef.current.x = -9999;
      cursorRef.current.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Compute responsive font size based on container width accounting for max expansion
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    // Scale font size so even at max wdth (151) and max scale (1.18), text stays within container
    let newFontSize = containerW / (chars.length * 0.86);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0 && containerH > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 60);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  // Ultra-Dynamic 60FPS Variable Font Physics & Idle Wave Loop
  useEffect(() => {
    let rafId;

    const animate = () => {
      const now = Date.now();
      const isIdle = !isHoveringRef.current || (now - lastInteractionTimeRef.current > 3500);

      // Fast, snappy spring lerp when active
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.16;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.16;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = Math.max(titleRect.width * 0.7, 340);
        const timeSec = now * 0.0025;

        spansRef.current.forEach((span, idx) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);
          const isNearMouse = d < maxDist && cursorRef.current.x > -1000;

          let wdth = 90;
          let wght = 750;
          let slntVal = '0';
          let scaleVal = '1.000';
          let translateYVal = '0.00';
          let newShadow = 'none';
          let newColor = textColor;
          let alphaVal = '1.00';

          if (isNearMouse) {
            // High-intensity cursor response
            const norm = Math.max(0, Math.min(1, 1 - d / maxDist));
            const ease = 1 - Math.pow(1 - norm, 3);

            wdth = width ? Math.round(getAttr(d, maxDist, 60, 151)) : 100;
            wght = weight ? Math.round(getAttr(d, maxDist, 350, 1000)) : 800;
            slntVal = italic ? (-(ease * 10)).toFixed(1) : '0';
            alphaVal = alpha ? getAttr(d, maxDist, 0.5, 1).toFixed(2) : '1.00';

            scaleVal = (1 + ease * 0.18).toFixed(3);
            translateYVal = (-ease * 9).toFixed(2);

            const glowIntensity = (ease * 32).toFixed(1);
            const glowOpacity = (ease * 0.9).toFixed(2);
            newShadow = ease > 0.05
              ? `0 0 ${glowIntensity}px rgba(248, 220, 108, ${glowOpacity}), 0 ${ease * 8}px 22px rgba(0, 0, 0, 0.6)`
              : 'none';

            newColor = ease > 0.35 ? '#FFFBD9' : textColor;
          } else if (isIdle) {
            // Mesmerizing idle wave when not hovered
            const wave = Math.sin(timeSec + idx * 0.75);
            const waveNorm = (wave + 1) / 2; // 0 to 1

            wdth = width ? Math.round(75 + waveNorm * 45) : 100;
            wght = weight ? Math.round(600 + waveNorm * 300) : 800;
            slntVal = italic ? (-(waveNorm * 5)).toFixed(1) : '0';

            const subtleScale = (1 + waveNorm * 0.05).toFixed(3);
            scaleVal = subtleScale;
            translateYVal = (-waveNorm * 3).toFixed(2);

            if (waveNorm > 0.6) {
              const idleGlow = ((waveNorm - 0.6) * 25).toFixed(1);
              newShadow = `0 0 ${idleGlow}px rgba(248, 220, 108, 0.35)`;
            }
          }

          // Apply CSS font-variation-settings
          const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'slnt' ${slntVal}`;
          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }

          // Apply transform
          const newTransform = `scale(${scaleVal}) translateY(${translateYVal}px)`;
          if (span.style.transform !== newTransform) {
            span.style.transform = newTransform;
          }

          // Apply text shadow
          if (span.style.textShadow !== newShadow) {
            span.style.textShadow = newShadow;
          }

          // Apply text color
          if (span.style.color !== newColor && !stroke) {
            span.style.color = newColor;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, textColor, stroke]);

  const dynamicClassName = [className, flex ? 'tp-flex' : '', stroke ? 'tp-stroke' : ''].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <style>{`
        .tp-flex {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.04em;
        }

        .tp-stroke span {
          position: relative;
          color: ${textColor};
        }
        .tp-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
          font-family: '${fontFamily}', 'Roboto Flex', sans-serif !important;
          font-optical-sizing: auto;
          font-style: normal;
        }

        .text-pressure-char {
          display: inline-block;
          transform-origin: center bottom;
          will-change: font-variation-settings, transform, text-shadow, color;
          transition: transform 0.06s cubic-bezier(0.2, 0, 0, 1), color 0.12s ease;
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily: `'${fontFamily}', 'Roboto Flex', sans-serif`,
          fontSize: `${fontSize}px`,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'left center',
          margin: 0,
          textAlign: 'left',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 800,
          width: '100%'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            className="text-pressure-char"
            data-char={char}
            style={{
              color: stroke ? undefined : textColor
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
