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

// Rich continuous celebration confetti rain & streaming side cannons for Home and 3D Photowall
export function SideConfettiCanvas({
  showSideCannons = true,
  showMainRain = true,
  density = "high"
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: false,
    });

    // Rich luxury celebration palette: Gold, Champagne, Rose Pink, Amber Gold, Violet, Cyan, Pearl White
    const colors = [
      "#F8DC6C",
      "#FFFFFF",
      "#F59E0B",
      "#FFEAA7",
      "#FD79A8",
      "#FF7675",
      "#FDCB6E",
      "#A786FF",
      "#00CEC9",
      "#E84393"
    ];

    // Initial grand celebration fanfare
    myConfetti({
      particleCount: density === "high" ? 65 : 40,
      spread: 110,
      origin: { x: 0.5, y: 0.2 },
      colors,
      gravity: 0.6,
      scalar: 1.1,
      ticks: 300,
    });

    let animationFrameId;
    let frame = 0;

    const loop = () => {
      frame++;

      // 1. Continuous Main Confetti Shower from Top (fired every 2 frames for a constant, smooth cascade)
      if (showMainRain && frame % 2 === 0) {
        myConfetti({
          particleCount: density === "high" ? 2 : 1,
          angle: Math.random() * 20 + 80, // 80 to 100 degrees downward
          spread: 60,
          startVelocity: Math.random() * 8 + 6,
          origin: { x: Math.random(), y: -0.05 },
          colors,
          gravity: Math.random() * 0.25 + 0.45,
          scalar: Math.random() * 0.4 + 0.75,
          drift: (Math.random() - 0.5) * 0.6,
          ticks: 360,
          shapes: ["square", "circle"],
        });
      }

      // 2. Continuous Celebratory Side Cannons from Left & Right (fired every 3 frames for streaming arcs)
      if (showSideCannons && frame % 3 === 0) {
        // Left Side Cannon (angled towards center-right)
        myConfetti({
          particleCount: density === "high" ? 2 : 1,
          angle: 60,
          spread: 55,
          startVelocity: Math.random() * 14 + 42,
          origin: { x: 0, y: 0.62 },
          colors,
          gravity: 0.65,
          scalar: Math.random() * 0.35 + 0.8,
          drift: 0.2,
          ticks: 240,
          shapes: ["square", "circle"],
        });

        // Right Side Cannon (angled towards center-left)
        myConfetti({
          particleCount: density === "high" ? 2 : 1,
          angle: 120,
          spread: 55,
          startVelocity: Math.random() * 14 + 42,
          origin: { x: 1, y: 0.62 },
          colors,
          gravity: 0.65,
          scalar: Math.random() * 0.35 + 0.8,
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
  const colors = [
    "#F8DC6C",
    "#FFFFFF",
    "#F59E0B",
    "#FFEAA7",
    "#FD79A8",
    "#FF7675",
    "#00CEC9",
    "#6C5CE7"
  ];

  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      startVelocity: 60,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      startVelocity: 60,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      zIndex: 9999,
    });
    requestAnimationFrame(frame);
  };
  frame();
}
