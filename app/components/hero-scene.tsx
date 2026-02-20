"use client";

import HeroCopy from "./hero-copy";
import CarCanvas from "./car-canvas";

export default function HeroScene() {
  return (
    <section id="overview" className="relative h-screen overflow-hidden">
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CarCanvas />
        </div>
        <HeroCopy />
      </div>
    </section>
  );
}
