import HeroScene from "./components/hero-scene";
import Navbar from "./components/navbar";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroScene />
      <section
        id="specs"
        className="relative z-20 min-h-[115vh] bg-gradient-to-b from-transparent to-white/55 px-6 py-24 md:px-16"
      >
        <h2 className="text-3xl font-black text-zinc-900 md:text-5xl">M4 GT3 Performance</h2>
        <p className="mt-4 max-w-2xl text-zinc-700">
          Scroll area for transition timing. As you scroll, the car rotates until it reaches
          a full 180° orientation.
        </p>
      </section>
    </main>
  );
}
