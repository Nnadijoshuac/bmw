"use client";

import { useRef } from "react";
import CarViewer from "./car-viewer";
import TrackLines from "./track-lines";

export default function HeroScene() {
  const heroRef = useRef(null);
  const frameRef = useRef(null);

  const updateMouseVars = (x, y) => {
    if (!heroRef.current) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const normalizedX = x / 240;
      const normalizedY = y / 160;
      const parallaxX = normalizedX * -20;
      const parallaxY = normalizedY * -14;
      const lightPosX = 52 + normalizedX * 28;
      const lightPosY = 38 + normalizedY * 20;
      const lightStrength = 0.65 + (1 - Math.min(1, Math.hypot(normalizedX, normalizedY))) * 0.35;

      heroRef.current?.style.setProperty("--parallax-x", `${parallaxX.toFixed(2)}px`);
      heroRef.current?.style.setProperty("--parallax-y", `${parallaxY.toFixed(2)}px`);
      heroRef.current?.style.setProperty("--light-x", `${lightPosX.toFixed(2)}%`);
      heroRef.current?.style.setProperty("--light-y", `${lightPosY.toFixed(2)}%`);
      heroRef.current?.style.setProperty("--light-strength", lightStrength.toFixed(3));
    });
  };

  const handleMouseMove = (event) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    const clampedX = Math.max(-240, Math.min(240, offsetX));
    const clampedY = Math.max(-160, Math.min(160, offsetY));
    updateMouseVars(clampedX, clampedY);
  };

  const handleMouseLeave = () => {
    updateMouseVars(0, 0);
  };

  return (
    <section
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <TrackLines className="trackLines--one" />
      <TrackLines className="trackLines--two" />

      <div className="heroCopy">
        <p className="eyebrow">Motorsport Engineering</p>
        <h1>BMW M4 GT3</h1>
        <p>
          Precision-built for endurance racing, combining aggressive aerodynamics,
          race-ready balance, and unmistakable BMW M performance DNA.
        </p>
        <button type="button">Explore the Car</button>
      </div>

      <div className="heroCar" aria-label="BMW M4 GT3 model">
        <CarViewer />
      </div>
    </section>
  );
}
