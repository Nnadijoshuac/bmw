"use client";

import { NAV_LINKS } from "../constants/nav-links";

export default function Navbar() {
  return (
    <nav className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between rounded-full border border-white/60 bg-white/40 px-4 py-3 backdrop-blur md:left-16 md:right-16 md:top-8">
      <div className="text-sm font-bold uppercase tracking-[0.12em] text-zinc-900">BMW M4 GT3</div>
      <ul className="flex list-none flex-wrap items-center gap-3 p-0 text-xs font-semibold text-zinc-800 md:gap-6 md:text-sm">
        {NAV_LINKS.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a href={link.href} className="transition-opacity hover:opacity-70">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
