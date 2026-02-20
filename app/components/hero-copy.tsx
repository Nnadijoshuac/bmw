"use client";

export default function HeroCopy() {
  return (
    <div className="relative z-20 ml-4 max-w-xl pt-32 text-zinc-900 md:ml-16 md:pt-40">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 md:text-sm">Motorsport Engineering</p>
      <h1 className="mt-3 text-5xl font-black leading-none md:text-7xl">BMW M4 GT3</h1>
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-700 md:text-base">
        Precision-built for endurance racing, combining aggressive aerodynamics,
        race-ready balance, and unmistakable BMW M performance DNA.
      </p>
      <button
        type="button"
        className="mt-6 rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
      >
        Explore the Car
      </button>
    </div>
  );
}