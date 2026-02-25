"use client";
import { useEffect, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Navbar() {
  const [barOpacity, setBarOpacity] = useState(1);

  useEffect(() => {
    const onHeroProgress = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      const progress = typeof customEvent.detail === "number" ? customEvent.detail : 0;
      const videoProgress = clamp((progress - 1.15) / 0.45, 0, 1);
      setBarOpacity(1 - videoProgress);
    };

    window.addEventListener("hero-progress", onHeroProgress as EventListener);
    return () => {
      window.removeEventListener("hero-progress", onHeroProgress as EventListener);
    };
  }, []);

  return (
    <div className="absolute left-1/2 top-4 z-30 flex w-[min(96vw,1120px)] -translate-x-1/2 items-center justify-center gap-3 md:top-8 md:gap-4">
      <img src="/BMW_Logo.webp" alt="BMW logo" className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11" />
      <nav
        className="flex h-8 w-[min(74vw,760px)] items-center justify-end overflow-hidden rounded-l-full rounded-r-sm border border-white/60 bg-white/40 pl-5 pr-0 py-0.5 backdrop-blur md:h-9 md:pl-6"
        style={{ opacity: barOpacity }}
      >
        <span className="mr-auto text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 md:text-base">M4 GT3</span>
        <img src="/m.png" alt="BMW M stripes" className="h-full w-auto translate-x-[65px] translate-y-[2px] origin-right scale-[4.2] object-contain" />
      </nav>
    </div>
  );
}
