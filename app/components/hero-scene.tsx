"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroCopy from "./hero-copy";
import CarCanvas from "./car-canvas";
import TrackLines from "./track-lines";

export default function HeroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const carWrapRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLDivElement>(null);
  const lineTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = Math.max(window.innerHeight * 1.1, 1);
      const p = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const carEl = carWrapRef.current;
    const lineOneEl = lineOneRef.current;
    const lineTwoEl = lineTwoRef.current;
    if (!heroEl || !carEl || !lineOneEl || !lineTwoEl) return;

    const carXTo = gsap.quickTo(carEl, "x", { duration: 0.35, ease: "power3.out" });
    const carYTo = gsap.quickTo(carEl, "y", { duration: 0.35, ease: "power3.out" });
    const l1XTo = gsap.quickTo(lineOneEl, "x", { duration: 0.35, ease: "power3.out" });
    const l1YTo = gsap.quickTo(lineOneEl, "y", { duration: 0.35, ease: "power3.out" });
    const l2XTo = gsap.quickTo(lineTwoEl, "x", { duration: 0.35, ease: "power3.out" });
    const l2YTo = gsap.quickTo(lineTwoEl, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      carXTo(nx * -24);
      carYTo(ny * -18);
      l1XTo(nx * -16);
      l1YTo(ny * -10);
      l2XTo(nx * -16);
      l2YTo(ny * -10);
    };

    const onLeave = () => {
      carXTo(0);
      carYTo(0);
      l1XTo(0);
      l1YTo(0);
      l2XTo(0);
      l2YTo(0);
    };

    heroEl.addEventListener("mousemove", onMove);
    heroEl.addEventListener("mouseleave", onLeave);
    return () => {
      heroEl.removeEventListener("mousemove", onMove);
      heroEl.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-[-10%] z-10 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.42),rgba(255,255,255,0)_60%)]" />
      <TrackLines ref={lineOneRef} variant="one" />
      <TrackLines ref={lineTwoRef} variant="two" />
      <HeroCopy />
      <div ref={carWrapRef} className="absolute bottom-[-14vh] right-[-36vw] z-10 h-[110vh] w-[120vw] max-[960px]:bottom-[-12vh] max-[960px]:right-[-44vw] max-[960px]:h-[68dvh] max-[960px]:w-[120vw]">
        <CarCanvas scrollProgress={scrollProgress} />
      </div>
    </section>
  );
}