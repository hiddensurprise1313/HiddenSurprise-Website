import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import confetti from "canvas-confetti";

export const ConfettiContext = createContext(null);

const ConfettiComponent = forwardRef((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    className,
    style,
    ...rest
  } = props;

  const canvasNodeRef = useRef(null);
  const instanceRef = useRef(null);
  const optionsRef = useRef(options);
  const globalOptionsRef = useRef(globalOptions);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    globalOptionsRef.current = globalOptions;
  }, [globalOptions]);

  useEffect(() => {
    if (canvasNodeRef.current && !instanceRef.current) {
      instanceRef.current = confetti.create(canvasNodeRef.current, {
        resize: true,
        useWorker: true,
        ...globalOptionsRef.current,
      });
    }

    return () => {
      instanceRef.current?.reset();
      instanceRef.current = null;
    };
  }, []);

  const fire = useCallback(async (opts = {}) => {
    try {
      await instanceRef.current?.({
        ...optionsRef.current,
        ...opts,
      });
    } catch (error) {
      console.error("Confetti error:", error);
    }
  }, []);

  const api = useMemo(() => ({ fire }), [fire]);

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      void fire();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas
        ref={canvasNodeRef}
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          ...style,
        }}
        {...rest}
      />
      {children}
    </ConfettiContext.Provider>
  );
});

ConfettiComponent.displayName = "Confetti";

export const Confetti = ConfettiComponent;

// Ultra-vibrant, high-saturation celebration colors (Default & Photowall)
export const VIBRANT_CELEBRATION_COLORS = [
  "#FFD700", // Vivid Pure Gold
  "#FF007F", // Electric Neon Pink / Magenta
  "#00F2FE", // Electric Cyan
  "#7928CA", // Neon Royal Purple
  "#FF3366", // Radiant Crimson
  "#FF6B00", // Vivid Amber Orange
  "#00FF87", // Neon Green
  "#FF0055", // Bright Fuchsia
  "#9B51E0", // Vibrant Violet
  "#FFAA00"  // Radiant Deep Gold
];

// Pure High-Contrast Electric Rainbow Celebration Palette
export const HERO_TRUE_RAINBOW_COLORS = [
  "#FF0033", // Vivid Electric Red
  "#FF007F", // Neon Magenta Pink
  "#FF00E5", // Hot Fuchsia
  "#8A00FF", // Vivid Royal Purple
  "#0055FF", // Electric Blue
  "#00D4FF", // Bright Electric Cyan
  "#00E676", // Vivid Emerald Green
  "#00FF66", // Bright Neon Green
  "#FFDD00", // Pure Sunshine Yellow
  "#FF6A00", // Vivid Electric Orange
  "#FF1493", // Party Pink
  "#A786FF"  // Sparkle Lavender Violet
];

export const HOME_RAINBOW_CELEBRATION_COLORS = HERO_TRUE_RAINBOW_COLORS;

// Celebratory Confetti Canvas:
// - On Mobile: Fires ONLY a single, clean center confetti burst once when in view (No side cannons, zero clutter)
// - On Desktop: Runs rich ambient flutter / side cannons as configured
export function SideConfettiCanvas({
  showSideCannons = true,
  showMainRain = true,
  density = "medium",
  speed = "medium",
  colors = VIBRANT_CELEBRATION_COLORS,
  sideColors = null
}) {
  const canvasRef = useRef(null);
  const activeSideColors = sideColors || colors;
  const hasFiredMobileRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: false,
    });

    const isMobile = window.innerWidth <= 768;

    // === MOBILE MODE: ONE-TIME CENTER CONFETTI ONLY ===
    if (isMobile) {
      const fireMobileCenterOnce = () => {
        if (hasFiredMobileRef.current) return;
        hasFiredMobileRef.current = true;

        myConfetti({
          particleCount: density === "high" ? 40 : 28,
          spread: 75,
          origin: { x: 0.5, y: 0.35 },
          colors: colors,
          gravity: 0.45,
          scalar: 1.0,
          ticks: 220,
          shapes: ["square", "circle"],
        });
      };

      // Fire when section enters viewport or immediately if already visible
      let observer;
      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                fireMobileCenterOnce();
                observer?.disconnect();
              }
            });
          },
          { threshold: 0.15 }
        );
        observer.observe(canvasRef.current);
      } else {
        fireMobileCenterOnce();
      }

      return () => {
        observer?.disconnect();
        myConfetti.reset();
      };
    }

    // === DESKTOP MODE: CONTINUOUS FLUTTER & SIDE CANNONS ===
    const gravityVal = speed === "medium" ? 0.38 : speed === "slow" ? 0.28 : 0.58;
    const startVelRain = speed === "medium" ? 6 : speed === "slow" ? 4 : 8;
    const startVelCannon = speed === "medium" ? 36 : speed === "slow" ? 28 : 46;

    if (showMainRain) {
      myConfetti({
        particleCount: density === "high" ? 65 : density === "medium" ? 35 : 20,
        spread: 110,
        origin: { x: 0.5, y: 0.2 },
        colors,
        gravity: gravityVal,
        scalar: 1.15,
        ticks: 320,
      });
    }

    let animationFrameId;
    let frame = 0;

    const mainInterval = density === "high" ? 2 : density === "medium" ? 4 : 7;
    const mainParticleCount = density === "high" ? 2 : 1;
    const sideInterval = density === "high" ? 3 : density === "medium" ? 6 : 9;
    const sideParticleCount = density === "high" ? 4 : density === "medium" ? 3 : 1;

    const loop = () => {
      frame++;

      // 1. Continuous Main Confetti Shower from Top
      if (showMainRain && frame % mainInterval === 0) {
        myConfetti({
          particleCount: mainParticleCount,
          angle: Math.random() * 20 + 80,
          spread: 60,
          startVelocity: Math.random() * 6 + startVelRain,
          origin: { x: Math.random(), y: -0.05 },
          colors,
          gravity: Math.random() * 0.15 + (gravityVal - 0.05),
          scalar: Math.random() * 0.4 + 0.85,
          drift: (Math.random() - 0.5) * 0.5,
          ticks: 380,
          shapes: ["square", "circle"],
        });
      }

      // 2. Continuous Colorful Side Cannons from Left & Right
      if (showSideCannons && frame % sideInterval === 0) {
        // Left Side Cannon
        myConfetti({
          particleCount: sideParticleCount,
          angle: 60,
          spread: 60,
          startVelocity: Math.random() * 10 + startVelCannon,
          origin: { x: 0, y: 0.62 },
          colors: activeSideColors,
          gravity: gravityVal + 0.08,
          scalar: Math.random() * 0.35 + 0.95,
          drift: 0.18,
          ticks: 280,
          shapes: ["square", "circle"],
        });

        // Right Side Cannon
        myConfetti({
          particleCount: sideParticleCount,
          angle: 120,
          spread: 60,
          startVelocity: Math.random() * 10 + startVelCannon,
          origin: { x: 1, y: 0.62 },
          colors: activeSideColors,
          gravity: gravityVal + 0.08,
          scalar: Math.random() * 0.35 + 0.95,
          drift: -0.18,
          ticks: 280,
          shapes: ["square", "circle"],
        });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      myConfetti.reset();
    };
  }, [showSideCannons, showMainRain, density, speed, colors, activeSideColors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}

export const HeroAmbientConfetti = SideConfettiCanvas;

// Interactive Cannons / Celebration trigger:
// - On Mobile: Fires a single, clean center burst one time (NO dual side cannons)
// - On Desktop: Fires dynamic celebratory side cannons for 2.5s
export function triggerSideCannons(customColors = HOME_RAINBOW_CELEBRATION_COLORS) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const colors = customColors;

  if (isMobile) {
    // Single clean center burst on mobile
    confetti({
      particleCount: 32,
      spread: 75,
      origin: { x: 0.5, y: 0.45 },
      colors: colors,
      scalar: 1.0,
      gravity: 0.48,
      ticks: 200,
      zIndex: 9999,
    });
    return;
  }

  // Desktop: Dual side cannons
  const end = Date.now() + 2.5 * 1000;
  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 65,
      startVelocity: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      scalar: 1.1,
      gravity: 0.5,
      zIndex: 9999,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 65,
      startVelocity: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      scalar: 1.1,
      gravity: 0.5,
      zIndex: 9999,
    });
    requestAnimationFrame(frame);
  };
  frame();
}
