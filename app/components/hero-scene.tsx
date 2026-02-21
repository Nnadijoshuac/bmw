"use client";

import { useEffect, useRef, useState } from "react";
import HeroCopy from "./hero-copy";
import CarCanvas from "./car-canvas";

export default function HeroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);
  const touchYRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevOverscroll = body.style.overscrollBehavior;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    const setProgress = (value: number) => {
      const next = Math.min(Math.max(value, 0), 1);
      progressRef.current = next;
      setScrollProgress(next);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
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
      root.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.overscrollBehavior = prevOverscroll;
    };
  }, []);

  return (
    <section id="overview" className="relative h-screen overflow-hidden">
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CarCanvas scrollProgress={scrollProgress} />
        </div>
        <HeroCopy />
      </div>
    </section>
  );
}
