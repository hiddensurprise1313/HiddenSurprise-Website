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

// Rich continuous celebration confetti rain & floating side fountains for Home and 3D Photowall
export function SideConfettiCanvas({ density = "normal" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    // Rich luxury party colors: Gold, Champagne, Rose Gold, Warm Amber, Pearl White, Coral, Violet
    const colors = [
      "#F8DC6C",
      "#FFFFFF",
      "#F59E0B",
      "#FFEAA7",
      "#FD79A8",
      "#FF7675",
      "#FDCB6E",
      "#A786FF",
      "#00CEC9"
    ];

    // Grand opening celebration burst
    myConfetti({
      particleCount: density === "high" ? 80 : 50,
      spread: 120,
      origin: { x: 0.5, y: 0.25 },
      colors,
      gravity: 0.6,
      scalar: 1.15,
      ticks: 300,
    });

    let animationFrameId;
    let lastRainTime = Date.now();
    let lastCannonTime = Date.now();

    const loop = () => {
      const now = Date.now();

      // Continuous gentle falling confetti shower from top every 220ms
      if (now - lastRainTime > 220) {
        lastRainTime = now;

        // Top rain at random horizontal positions
        myConfetti({
          particleCount: density === "high" ? 4 : 3,
          angle: Math.random() * 30 + 75, // 75 to 105 degrees downwards
          spread: 50,
          origin: { x: Math.random(), y: -0.05 },
          colors,
          gravity: Math.random() * 0.3 + 0.45,
          scalar: Math.random() * 0.4 + 0.8,
          drift: (Math.random() - 0.5) * 0.5,
          ticks: 350,
        });
      }

      // Side ambient bursts every 1.2 seconds for dynamic celebratory energy
      if (now - lastCannonTime > 1200) {
        lastCannonTime = now;

        // Left side fountain
        myConfetti({
          particleCount: density === "high" ? 7 : 5,
          angle: 55,
          spread: 45,
          startVelocity: 35,
          origin: { x: 0, y: Math.random() * 0.3 + 0.35 },
          colors,
          gravity: 0.55,
          scalar: 0.9,
          ticks: 280,
        });

        // Right side fountain
        myConfetti({
          particleCount: density === "high" ? 7 : 5,
          angle: 125,
          spread: 45,
          startVelocity: 35,
          origin: { x: 1, y: Math.random() * 0.3 + 0.35 },
          colors,
          gravity: 0.55,
          scalar: 0.9,
          ticks: 280,
        });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      myConfetti.reset();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
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
