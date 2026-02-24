"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroCopy from "./hero-copy";
import CarCanvas from "./car-canvas";

export default function HeroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blinkSignal, setBlinkSignal] = useState(0);
  const progressRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const secondCopyRef = useRef<HTMLDivElement>(null);
  const statsCardsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastFeedbackRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevOverscroll = body.style.overscrollBehavior;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    audioRef.current = new Audio("/bmw_m4_gt3.MP3");
    audioRef.current.preload = "auto";

    const triggerStartPoseFeedback = () => {
      const now = performance.now();
      if (now - lastFeedbackRef.current < 900) return;
      lastFeedbackRef.current = now;
      setBlinkSignal((prev) => prev + 1);

      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      void audio.play().catch(() => {
        // Ignore play() rejection from browser policies.
      });
    };

    const setProgress = (value: number) => {
      const next = Math.min(Math.max(value, 0), 1);
      progressRef.current = next;
      setScrollProgress(next);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY < 0 && progressRef.current <= 0.0001) {
        triggerStartPoseFeedback();
      }
      setProgress(progressRef.current + event.deltaY * 0.0012);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchYRef.current === null || event.touches.length === 0) return;
      event.preventDefault();
      const currentY = event.touches[0].clientY;
      const delta = touchYRef.current - currentY;
      touchYRef.current = currentY;
      if (delta < 0 && progressRef.current <= 0.0001) {
        triggerStartPoseFeedback();
      }
      setProgress(progressRef.current + delta * 0.0016);
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      let next = progressRef.current;

      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        next += 0.08;
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        if (progressRef.current <= 0.0001) triggerStartPoseFeedback();
        next -= 0.08;
      } else if (event.key === "Home") {
        next = 0;
      } else if (event.key === "End") {
        next = 1;
      } else {
        return;
      }

      event.preventDefault();
      setProgress(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      root.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.overscrollBehavior = prevOverscroll;
    };
  }, []);

  useEffect(() => {
    const firstEl = firstCopyRef.current;
    const secondEl = secondCopyRef.current;
    const cardsEl = statsCardsRef.current;
    if (!firstEl || !secondEl || !cardsEl) return;

    const outPhase = Math.min(Math.max((scrollProgress - 0.08) / 0.34, 0), 1);
    const inPhase = Math.min(Math.max((scrollProgress - 0.34) / 0.26, 0), 1);
    const secondOutPhase = Math.min(Math.max((scrollProgress - 0.72) / 0.2, 0), 1);
    const secondInVisibility = inPhase;
    const cardsInPhase = Math.min(Math.max((scrollProgress - 0.83) / 0.15, 0), 1);

    gsap.to(firstEl, {
      opacity: 1 - outPhase,
      duration: 0.45,
      ease: "power1.out",
      overwrite: "auto",
    });

    gsap.to(secondEl, {
      // Cinematic pan-in, then strong pan-away with depth and motion blur.
      x: 32 * (1 - inPhase) + 900 * secondOutPhase,
      y: 12 * (1 - inPhase) - 72 * secondOutPhase,
      z: -240 * (1 - inPhase) - 760 * secondOutPhase,
      rotationY: -34 * (1 - inPhase) - 24 * secondOutPhase,
      rotationX: 5 * (1 - inPhase) + 10 * secondOutPhase,
      filter: `blur(${6 * (1 - inPhase) + 8 * secondOutPhase}px)`,
      transformPerspective: 1200,
      transformOrigin: "100% 0%",
      opacity: secondInVisibility,
      duration: 0.5,
      ease: "power2.out",
      force3D: true,
      overwrite: "auto",
    });

    gsap.to(cardsEl, {
      opacity: cardsInPhase,
      y: 36 * (1 - cardsInPhase),
      z: -120 * (1 - cardsInPhase),
      rotationX: 9 * (1 - cardsInPhase),
      filter: `blur(${4 * (1 - cardsInPhase)}px)`,
      transformPerspective: 1200,
      transformOrigin: "50% 100%",
      duration: 0.52,
      ease: "power3.out",
      force3D: true,
      overwrite: "auto",
    });
  }, [scrollProgress]);

  return (
    <section id="overview" className="relative h-screen overflow-hidden bg-[#e4e4e4]">
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 z-10">
          <CarCanvas scrollProgress={scrollProgress} />
        </div>
        <HeroCopy firstCopyRef={firstCopyRef} secondCopyRef={secondCopyRef} statsCardsRef={statsCardsRef} />
      </div>
    </section>
  );
}
