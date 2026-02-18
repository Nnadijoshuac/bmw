"use client";

import CarViewer from "./car-viewer";
import TrackLines from "./track-lines";

export default function HeroScene() {
  return (
    <section className="hero">
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
