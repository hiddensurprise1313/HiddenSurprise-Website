import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Smooth normalized interpolation: returns maxVal when distance=0, minVal when distance >= maxDist
const getAttr = (distance, maxDist, minVal, maxVal) => {
  const norm = Math.max(0, Math.min(1, 1 - distance / maxDist));
  return minVal + norm * (maxVal - minVal);
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

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const hasInteractedRef = useRef(false);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = useMemo(() => text.split(''), [text]);

  // Track global mouse position for fluid interaction across the page
  useEffect(() => {
    const handleMouseMove = e => {
      hasInteractedRef.current = true;
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = e => {
      const t = e.touches[0];
      if (t) {
        hasInteractedRef.current = true;
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Initial center resting position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const initialPos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      mouseRef.current = { ...initialPos };
      cursorRef.current = { ...initialPos };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Compute responsive font size based on container width
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 1.75);
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

  // 60FPS Variable font physics animation loop
  useEffect(() => {
    let rafId;

    const animate = () => {
      // Smooth lerp trailing
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.12;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        // Dynamic influence radius around the title
        const maxDist = Math.max(titleRect.width * 0.6, 260);

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          // Variable font axes calculations within strict valid font limits
          const wdth = width ? Math.round(getAttr(d, maxDist, 45, 151)) : 100;
          const wght = weight ? Math.round(getAttr(d, maxDist, 300, 950)) : 800;
          const norm = Math.max(0, Math.min(1, 1 - d / maxDist));
          const slntVal = italic ? (-(norm * 10)).toFixed(1) : 0;
          const alphaVal = alpha ? getAttr(d, maxDist, 0.4, 1).toFixed(2) : 1;

          // CSS font-variation-settings for Roboto Flex
          const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'slnt' ${slntVal}`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== String(alphaVal)) {
            span.style.opacity = alphaVal;
          }

          // Subtle physical micro-scale for enhanced tactile feel
          const scaleVal = (1 + norm * 0.08).toFixed(3);
          const newTransform = `scale(${scaleVal})`;
          if (span.style.transform !== newTransform) {
            span.style.transform = newTransform;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

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
          will-change: font-variation-settings, transform;
          transition: transform 0.05s ease-out;
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
