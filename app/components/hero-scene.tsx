"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroCopy from "./hero-copy";
import CarCanvas from "./car-canvas";
import TrackLines from "./track-lines";

export default function HeroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const carWrapRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLDivElement>(null);
  const scrollXRef = useRef(0);
  const mouseXRef = useRef(0);
  const LEFT_SHIFT_PX = 260;

  useEffect(() => {
    const carEl = carWrapRef.current;
    if (!carEl) return;

    const carXTo = gsap.quickTo(carEl, "x", { duration: 0.4, ease: "power3.out" });
    const applyCarX = () => carXTo(scrollXRef.current + mouseXRef.current);

    const onScroll = () => {
      if (!heroRef.current) return;
      const sectionTop = heroRef.current.offsetTop;
      const sectionScrollLength = Math.max(
        heroRef.current.offsetHeight - window.innerHeight,
        1
      );
      const local = window.scrollY - sectionTop;
      const p = Math.min(Math.max(local / sectionScrollLength, 0), 1);
      setScrollProgress(p);
      scrollXRef.current = -LEFT_SHIFT_PX * p;
      applyCarX();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const carEl = carWrapRef.current;
    const lineOneEl = lineOneRef.current;
    if (!heroEl || !carEl || !lineOneEl) return;

    const carXTo = gsap.quickTo(carEl, "x", { duration: 0.35, ease: "power3.out" });
    const l1XTo = gsap.quickTo(lineOneEl, "x", { duration: 0.35, ease: "power3.out" });
    const l1YTo = gsap.quickTo(lineOneEl, "y", { duration: 0.35, ease: "power3.out" });
    const applyCarX = () => carXTo(scrollXRef.current + mouseXRef.current);

    const onMove = (event: MouseEvent) => {
      const rect = stickyRef.current?.getBoundingClientRect() ?? heroEl.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      const sectionTop = heroEl.offsetTop;
      const sectionScrollLength = Math.max(heroEl.offsetHeight - window.innerHeight, 1);
      const local = window.scrollY - sectionTop;
      const p = Math.min(Math.max(local / sectionScrollLength, 0), 1);
      scrollXRef.current = -LEFT_SHIFT_PX * p;
      mouseXRef.current = nx * -24;
      applyCarX();
      l1XTo(nx * -16);
      l1YTo(ny * -10);
    };

    const onLeave = () => {
      const sectionTop = heroEl.offsetTop;
      const sectionScrollLength = Math.max(heroEl.offsetHeight - window.innerHeight, 1);
      const local = window.scrollY - sectionTop;
      const p = Math.min(Math.max(local / sectionScrollLength, 0), 1);
      scrollXRef.current = -LEFT_SHIFT_PX * p;
      mouseXRef.current = 0;
      applyCarX();
      l1XTo(0);
      l1YTo(0);
    };

    heroEl.addEventListener("mousemove", onMove);
    heroEl.addEventListener("mouseleave", onLeave);
    return () => {
      heroEl.removeEventListener("mousemove", onMove);
      heroEl.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-[210vh]">
      <div ref={stickyRef} className="sticky top-0 relative h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-[-10%] z-10 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.42),rgba(255,255,255,0)_60%)]" />
      <TrackLines ref={lineOneRef} variant="one" />
      <HeroCopy />
      <div ref={carWrapRef} className="absolute right-[-36vw] top-[4vh] z-10 h-[110vh] w-[120vw] max-[960px]:right-[-44vw] max-[960px]:top-[44vh] max-[960px]:h-[68dvh] max-[960px]:w-[120vw]">
        <CarCanvas scrollProgress={scrollProgress} />
      </div>
      </div>
    </section>
  );
}
