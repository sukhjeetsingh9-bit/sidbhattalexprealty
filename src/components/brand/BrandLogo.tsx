import { useEffect, useState } from "react";

import { BRAND } from "@/lib/brand";
import { REA } from "@/lib/rea";
import { cn } from "@/lib/utils";

const SUBTITLES = [
  `${BRAND.agency} · South Australia`,
  `${BRAND.region} · ${REA.licence}`,
  "5.0 ★ Verified Agent · realestate.com.au",
] as const;

export function BrandLogo({
  size = "default",
  className,
}: {
  size?: "default" | "large";
  className?: string;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % SUBTITLES.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={cn("group inline-flex items-center gap-3.5 select-none", className)}>
      {/* Animated Architectural Crest / Monogram */}
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center border border-current/25 bg-current/[0.04] transition-all duration-500 group-hover:border-accent group-hover:bg-accent/10",
          size === "large" ? "size-12" : "size-10",
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className={cn(
            "transition-transform duration-500 group-hover:scale-105",
            size === "large" ? "size-7" : "size-6",
          )}
        >
          {/* Architectural roofline */}
          <path
            d="M4 17.5L18 6.5L32 17.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent brand-crest-line"
          />
          {/* Minimalist pillar lines */}
          <path
            d="M9.5 16V28.5H26.5V16"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
          {/* SB Monogram */}
          <text
            x="18"
            y="24.5"
            textAnchor="middle"
            fill="currentColor"
            className="text-[9.5px] font-bold tracking-[0.14em]"
          >
            SB
          </text>
        </svg>
        {/* Subtle live bronze pulse dot in top-right corner of crest */}
        <span className="absolute -right-1 -top-1 flex size-2">
          <span className="brand-pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
      </span>

      {/* Kinetic Typography Lockup */}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "brand-logo-shimmer font-semibold uppercase tracking-[0.26em] transition-all duration-500 group-hover:tracking-[0.3em]",
            size === "large" ? "text-xl md:text-2xl" : "text-sm sm:text-base",
          )}
        >
          {BRAND.fullName}
        </span>
        <span className="relative mt-1.5 flex items-center gap-2 overflow-hidden">
          <span
            key={SUBTITLES[idx]}
            className="animate-in fade-in slide-in-from-bottom-1 duration-500 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {SUBTITLES[idx]}
          </span>
        </span>
        <span className="mt-1 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
      </span>
    </span>
  );
}

const MARQUEE_ITEMS = [
  "SID BHATTAL · EXP REALTY",
  "NORTH-EASTERN ADELAIDE SPECIALIST",
  "5.0 ★ VERIFIED RATING ON REALESTATE.COM.AU",
  "$701K MEDIAN SOLD PRICE (12M)",
  "29 MEDIAN DAYS ON MARKET",
  "SOUTH AUSTRALIA-WIDE REACH · RLA 300185",
  "EVIDENCE-BASED APPRAISALS & OFF-MARKET ACCESS",
] as const;

export function BrandMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="section-ink overflow-hidden border-y border-current/15 py-3.5"
      aria-label="Brand highlights"
    >
      <div className="brand-marquee-track items-center">
        {items.map((text, i) => (
          <div key={`${text}-${i}`} className="flex shrink-0 items-center">
            <span className="px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] opacity-80">
              {text}
            </span>
            <span className="inline-block size-1.5 rotate-45 bg-accent opacity-80" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}
