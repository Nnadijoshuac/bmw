"use client";

import { Orbitron, Rajdhani } from "next/font/google";
import type { RefObject } from "react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

type HeroCopyProps = {
  firstCopyRef: RefObject<HTMLDivElement | null>;
  secondCopyRef: RefObject<HTMLDivElement | null>;
  statsCardsRef: RefObject<HTMLDivElement | null>;
};

function SpeedometerIcon() {
  return <img src="/speed.png" alt="Speedometer" loading="lazy" />;
}

function TurboIcon() {
  return <img src="/turbo.png" alt="Turbo" loading="lazy" />;
}

function HorsepowerIcon() {
  return <img src="/hp.png" alt="Horsepower" loading="lazy" />;
}

export default function HeroCopy({ firstCopyRef, secondCopyRef, statsCardsRef }: HeroCopyProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div ref={firstCopyRef} className="absolute left-4 top-24 z-20 max-w-xl text-zinc-900 md:left-16 md:top-30">
        <h1 className={`${orbitron.className} mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[0.03em] md:text-5xl`}>
          <span className="block text-zinc-700">No Compromise.</span>
          <span className="block text-zinc-700">No Comfort.</span>
          <span className="mt-2 block text-zinc-950 [text-shadow:0_2px_0_rgba(255,255,255,0.18),0_14px_28px_rgba(0,0,0,0.32)] md:mt-3">
            No Mercy.
          </span>
        </h1>
        <p className={`${orbitron.className} mt-4 max-w-md text-xs font-semibold uppercase leading-snug tracking-[0.08em] text-zinc-800 md:text-sm`}>
          Race-bred engineering. Nothing else.
        </p>
      </div>

      <div
        ref={secondCopyRef}
        className="absolute right-4 top-36 z-20 max-w-2xl text-right text-zinc-900 opacity-0 md:right-16 md:top-40"
      >
        <h2
          className={`${orbitron.className} whitespace-nowrap text-3xl font-black uppercase leading-[0.95] tracking-[0.04em] text-right text-zinc-950 md:text-5xl`}
        >
          1,250 kg (2,755 lbs)
        </h2>
        <p className={`${orbitron.className} mt-3 text-right text-xs font-semibold uppercase leading-snug tracking-[0.075em] text-zinc-800 md:text-sm`}>
          For context, that is dramatically lighter than the road-going M4. Carbon-fiber body
          panels, stripped interior, racing electronics. Everything unnecessary is gone.
        </p>
      </div>

      <div
        ref={statsCardsRef}
        className={`${rajdhani.className} stats-wrap absolute bottom-36 left-4 z-0 w-[min(96vw,1100px)] opacity-0 md:bottom-40 md:left-16`}
      >
        <div className="stats-grid">
          <article className="glass-card glow-blue card-first-up">
            <div className="icon-badge">
              <SpeedometerIcon />
            </div>
            <p className="card-kicker">Top Speed</p>
            <p className="card-title">290 KM/H</p>
            <p className="card-sub">(~180 MPH)</p>
          </article>

          <article className="glass-card glow-blue card-mid-up">
            <div className="icon-badge">
              <TurboIcon />
            </div>
            <p className="card-kicker">Engine</p>
            <p className="card-title">3.0-LITER</p>
            <p className="card-sub">TWIN-TURBO INLINE-SIX (P58)</p>
          </article>

          <article className="glass-card glow-red horsepower-card">
            <div className="icon-badge">
              <HorsepowerIcon />
            </div>
            <p className="card-kicker">Output</p>
            <p className="card-title">590</p>
            <p className="card-sub">HORSEPOWER</p>
          </article>
        </div>
      </div>

      <style jsx>{`
        .stats-wrap {
          pointer-events: none;
          font-family:
            Inter,
            "Segoe UI",
            Roboto,
            system-ui,
            -apple-system,
            sans-serif;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          align-items: end;
          justify-items: center;
        }

        .glass-card {
          --edge: rgba(92, 122, 160, 0.62);
          --base-lift: 0px;
          position: relative;
          width: 100%;
          max-width: 256px;
          min-height: 218px;
          aspect-ratio: 1 / 0.95;
          padding: 16px 14px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.28) 0%, rgba(220, 228, 238, 0.14) 34%, rgba(22, 28, 40, 0.22) 100%),
            rgba(22, 28, 38, 0.18);
          backdrop-filter: blur(12px) saturate(118%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.36),
            inset 0 -16px 24px rgba(10, 14, 22, 0.2),
            inset 0 0 0 1px color-mix(in srgb, var(--edge) 28%, transparent),
            inset 0 0 18px color-mix(in srgb, var(--edge) 16%, transparent),
            0 12px 24px rgba(8, 10, 16, 0.28);
          transition:
            transform 260ms ease,
            box-shadow 260ms ease,
            border-color 260ms ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          text-align: center;
          transform: translateY(var(--base-lift));
        }

        .glass-card::before {
          content: "";
          position: absolute;
          right: -18%;
          top: -34%;
          width: 68%;
          height: 58%;
          border-radius: 90px;
          background: linear-gradient(130deg, rgba(255, 255, 255, 0.52), rgba(255, 255, 255, 0.02));
          filter: blur(10px);
          opacity: 0.42;
          pointer-events: none;
        }

        .glass-card::after {
          content: "";
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: -34px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, color-mix(in srgb, var(--edge) 44%, #a7d2ff 24%), transparent 70%);
          opacity: 0.36;
          filter: blur(8px);
          pointer-events: none;
        }

        .glass-card:hover {
          transform: translateY(calc(var(--base-lift) - 6px));
          border-color: rgba(255, 255, 255, 0.28);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.34),
            inset 0 -14px 20px rgba(10, 14, 22, 0.22),
            inset 0 0 0 1px color-mix(in srgb, var(--edge) 28%, transparent),
            inset 0 0 18px color-mix(in srgb, var(--edge) 18%, transparent),
            0 14px 24px rgba(8, 10, 16, 0.3);
        }

        .glass-card:hover .icon-badge::after {
          transform: translateX(130%);
          opacity: 0.7;
        }

        .glow-blue {
          --edge: rgba(96, 134, 178, 0.66);
        }

        .glow-red {
          --edge: rgba(166, 98, 98, 0.62);
        }

        .card-first-up {
          --base-lift: -24px;
        }

        .card-mid-up {
          --base-lift: -70px;
        }

        .icon-badge {
          position: absolute;
          top: -8px;
          right: 8px;
          bottom: 70px;
          left: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          border-radius: 16px;
          pointer-events: none;
          z-index: 0;
        }

        .icon-badge :global(img) {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform: translateY(18px) scale(1.18);
          opacity: 0.26;
          filter: grayscale(0.15) contrast(1.05) drop-shadow(0 0 10px color-mix(in srgb, var(--edge) 16%, transparent));
        }

        .icon-badge::after {
          content: "";
          position: absolute;
          top: 6px;
          left: -54px;
          width: 42px;
          height: 46px;
          border-radius: 16px;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0));
          transform: translateX(0);
          opacity: 0;
          filter: blur(3px);
          transition: transform 420ms ease, opacity 420ms ease;
          pointer-events: none;
        }

        .horsepower-card .icon-badge :global(img) {
          transform: translateY(18px) scale(1.34);
        }

        .card-kicker,
        .card-title,
        .card-sub {
          position: relative;
          z-index: 1;
        }

        .card-kicker {
          position: absolute;
          top: 12px;
          left: 0;
          right: 0;
          margin: 0;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(224, 230, 238, 0.82);
          z-index: 2;
          text-shadow:
            0 1px 0 rgba(255, 255, 255, 0.24),
            0 -1px 0 rgba(10, 16, 26, 0.42);
        }

        .card-title {
          margin: 0;
          width: 100%;
          font-size: clamp(1.9rem, 2.5vw, 2.35rem);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 0.94;
          font-weight: 900;
          color: #dfe6ef;
          transform: translateY(-14px);
          text-shadow:
            0 1px 0 rgba(255, 255, 255, 0.3),
            0 -1px 0 rgba(8, 14, 22, 0.5),
            0 3px 8px rgba(14, 20, 32, 0.22);
        }

        .card-sub {
          margin: 0;
          width: 100%;
          font-size: 11px;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(214, 222, 232, 0.88);
          line-height: 1.35;
          transform: translateY(-10px);
          text-shadow:
            0 1px 0 rgba(255, 255, 255, 0.2),
            0 -1px 0 rgba(10, 16, 26, 0.38);
        }

        @media (min-width: 600px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(280px, 1fr));
            gap: 10px;
          }
        }

        @media (min-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(3, minmax(280px, 1fr));
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
