import HeroScene from "./hero-scene";

export default function HomePage() {
  return (
    <main className="page">
      <nav className="navbar">
        <div className="brand">BMW M4 GT3</div>
        <ul className="navLinks">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#specs">Specs</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>
      </nav>
      <HeroScene />
    </main>
  );
}
