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

// Ultra-vibrant, high-saturation celebration colors
const VIBRANT_CELEBRATION_COLORS = [
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

// Rich continuous celebration confetti rain & streaming side cannons for Home and 3D Photowall
export function SideConfettiCanvas({
  showSideCannons = true,
  showMainRain = true,
  density = "medium"
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: false,
    });

    const colors = VIBRANT_CELEBRATION_COLORS;

    // Initial grand celebration fanfare (only if main rain is enabled)
    if (showMainRain) {
      myConfetti({
        particleCount: density === "high" ? 65 : density === "medium" ? 35 : 20,
        spread: 110,
        origin: { x: 0.5, y: 0.2 },
        colors,
        gravity: 0.6,
        scalar: 1.15,
        ticks: 300,
      });
    }

    let animationFrameId;
    let frame = 0;

    // Density timing configuration
    const mainInterval = density === "high" ? 2 : density === "medium" ? 4 : 7;
    const mainParticleCount = density === "high" ? 2 : 1;
    const sideInterval = density === "high" ? 3 : density === "medium" ? 6 : 9;
    const sideParticleCount = density === "high" ? 2 : 1;

    const loop = () => {
      frame++;

      // 1. Continuous Main Confetti Shower from Top
      if (showMainRain && frame % mainInterval === 0) {
        myConfetti({
          particleCount: mainParticleCount,
          angle: Math.random() * 20 + 80, // 80 to 100 degrees downward
          spread: 60,
          startVelocity: Math.random() * 8 + 6,
          origin: { x: Math.random(), y: -0.05 },
          colors,
          gravity: Math.random() * 0.25 + 0.45,
          scalar: Math.random() * 0.4 + 0.85,
          drift: (Math.random() - 0.5) * 0.6,
          ticks: 360,
          shapes: ["square", "circle"],
        });
      }

      // 2. Continuous Celebratory Side Cannons from Left & Right
      if (showSideCannons && frame % sideInterval === 0) {
        // Left Side Cannon (angled towards center-right)
        myConfetti({
          particleCount: sideParticleCount,
          angle: 60,
          spread: 55,
          startVelocity: Math.random() * 14 + 40,
          origin: { x: 0, y: 0.62 },
          colors,
          gravity: 0.65,
          scalar: Math.random() * 0.35 + 0.9,
          drift: 0.2,
          ticks: 240,
          shapes: ["square", "circle"],
        });

        // Right Side Cannon (angled towards center-left)
        myConfetti({
          particleCount: sideParticleCount,
          angle: 120,
          spread: 55,
          startVelocity: Math.random() * 14 + 40,
          origin: { x: 1, y: 0.62 },
          colors,
          gravity: 0.65,
          scalar: Math.random() * 0.35 + 0.9,
          drift: -0.2,
          ticks: 240,
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
  }, [showSideCannons, showMainRain, density]);

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

// Side Cannons trigger helper
export function triggerSideCannons() {
  const end = Date.now() + 3 * 1000;
  const colors = VIBRANT_CELEBRATION_COLORS;

  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 65,
      startVelocity: 60,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      scalar: 1.1,
      zIndex: 9999,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 65,
      startVelocity: 60,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      scalar: 1.1,
      zIndex: 9999,
    });
    requestAnimationFrame(frame);
  };
  frame();
}

