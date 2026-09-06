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

// Continuous ambient floating confetti background for the Hero section
export function HeroAmbientConfetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    // Gold, champagne, pearl and warm sparkle palette
    const colors = ["#F8DC6C", "#FFFFFF", "#F59E0B", "#FFEAA7", "#E17055", "#FDCB6E"];

    // Initial burst
    myConfetti({
      particleCount: 50,
      spread: 100,
      origin: { x: 0.5, y: 0.3 },
      colors,
      gravity: 0.7,
      scalar: 1.1,
    });

    let animationFrameId;
    let lastFire = Date.now();

    const loop = () => {
      const now = Date.now();
      // Gentle intermittent falling confetti every 800ms
      if (now - lastFire > 850) {
        lastFire = now;
        myConfetti({
          particleCount: 3,
          angle: 60,
          spread: 45,
          origin: { x: 0, y: Math.random() * 0.4 + 0.1 },
          colors,
          gravity: 0.6,
          scalar: Math.random() * 0.4 + 0.8,
          drift: 0.2,
        });

        myConfetti({
          particleCount: 3,
          angle: 120,
          spread: 45,
          origin: { x: 1, y: Math.random() * 0.4 + 0.1 },
          colors,
          gravity: 0.6,
          scalar: Math.random() * 0.4 + 0.8,
          drift: -0.2,
        });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      myConfetti.reset();
    };
  }, []);

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

// Side Cannons trigger helper
export function triggerSideCannons() {
  const end = Date.now() + 2.5 * 1000;
  const colors = ["#F8DC6C", "#FFFFFF", "#F59E0B", "#FFEAA7", "#FD79A8"];

  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 60,
      startVelocity: 55,
      origin: { x: 0, y: 0.65 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 60,
      startVelocity: 55,
      origin: { x: 1, y: 0.65 },
      colors: colors,
      zIndex: 9999,
    });
    requestAnimationFrame(frame);
  };
  frame();
}
