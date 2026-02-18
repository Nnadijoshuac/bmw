import HeroScene from "./components/hero-scene";
import Navbar from "./components/navbar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <HeroScene />
    </main>
  );
}