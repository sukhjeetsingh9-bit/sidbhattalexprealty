import { MAILTO, MARQUEE_ITEMS } from "./data";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="purple-glow pointer-events-none absolute inset-x-0 top-0 h-[70vh]" />
      <div className="relative mx-auto max-w-[1400px] px-4 text-center lg:px-8">
        <h1 className="text-gold-gradient font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tight md:text-[9.5vw]">
          Where the pros go to grow
        </h1>
        <h2 className="mt-6 text-2xl font-bold uppercase tracking-wide text-foreground md:text-5xl">
          Make <span className="text-gold">bold</span> moves
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
          eXp Realty is the fastest growing real estate model in history, and the largest agent owned
          independent real estate company in the world. Here is how the eXp model empowers industry
          agents in Australia.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#model"
            className="rounded-md bg-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            WATCH THE MODEL EXPLAINED
          </a>
          <a
            href={MAILTO}
            className="rounded-md border border-gold/60 px-7 py-3.5 text-sm font-semibold tracking-wide text-gold transition-colors hover:bg-gold/10"
          >
            CONTACT
          </a>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

export function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative mt-16 overflow-hidden border-y border-border bg-surface/60 py-4">
      <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-6">
            <span className="text-xs font-semibold tracking-[0.28em] text-foreground/60 md:text-sm">
              {item}
            </span>
            <span className="text-gold">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
