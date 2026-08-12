import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { COUNCIL_AREAS, REGIONS } from "@/lib/service-areas";
import { cn } from "@/lib/utils";

export function SuburbDirectory() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [open, setOpen] = useState<string[]>([COUNCIL_AREAS[0]?.council ?? ""]);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return COUNCIL_AREAS.map((c) => ({
      ...c,
      matches: q
        ? c.suburbs.filter((s) => s.toLowerCase().includes(q))
        : [...c.suburbs],
      councilMatch: q ? c.council.toLowerCase().includes(q) : false,
    }))
      .filter((c) => (region === "All" ? true : c.region === region))
      .filter((c) => (q ? c.matches.length > 0 || c.councilMatch : true))
      .map((c) => ({ ...c, matches: c.matches.length ? c.matches : [...c.suburbs] }));
  }, [q, region]);

  const total = filtered.reduce((n, c) => n + c.matches.length, 0);
  const isOpen = (council: string) => Boolean(q) || open.includes(council);

  const toggle = (council: string) =>
    setOpen((prev) =>
      prev.includes(council) ? prev.filter((c) => c !== council) : [...prev, council],
    );

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-border py-6 md:flex-row md:items-center md:justify-between">
        <label className="w-full md:max-w-sm">
          <span className="eyebrow block opacity-55">Search suburb or council</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Modbury, Salisbury, Glenelg"
            className="mt-3 w-full border-b border-current/25 bg-transparent px-0 py-2.5 text-base outline-none transition-colors placeholder:opacity-40 focus:border-accent"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {["All", ...REGIONS].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              className={cn(
                "rounded-sm border px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-colors",
                region === r
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-current/20 opacity-65 hover:border-accent hover:opacity-100",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm opacity-55">
        {filtered.length} council {filtered.length === 1 ? "area" : "areas"} · {total} suburbs
      </p>

      <div className="mt-10 space-y-4">
        {filtered.map((c) => (
          <div key={c.council} className="border-t border-border">
            <button
              type="button"
              onClick={() => toggle(c.council)}
              aria-expanded={isOpen(c.council)}
              className="flex w-full items-baseline justify-between gap-6 py-6 text-left"
            >
              <span>
                <span className="eyebrow text-accent">
                  {c.region}
                  {c.focus ? " · Primary market" : ""}
                </span>
                <span className="mt-3 block text-2xl font-semibold md:text-3xl">{c.council}</span>
                {c.note ? <span className="mt-2 block text-sm opacity-60">{c.note}</span> : null}
              </span>
              <span className="shrink-0 text-sm tabular-nums opacity-50">
                {c.matches.length} · {isOpen(c.council) ? "−" : "+"}
              </span>
            </button>

            {isOpen(c.council) ? (
              <ul className="grid gap-x-8 gap-y-3 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                {c.matches.map((s) => (
                  <li key={`${c.council}-${s}`}>
                    <Link
                      to="/suburbs"
                      hash="suburb-request"
                      search={{ suburb: s }}
                      className="group flex items-baseline justify-between border-b border-border py-2 text-base transition-colors hover:border-accent"
                    >
                      <span className="font-medium">{s}</span>
                      <span className="eyebrow opacity-0 transition-opacity group-hover:opacity-60">
                        Enquire
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}

        {filtered.length === 0 ? (
          <p className="border-t border-border py-10 opacity-60">
            No council or suburb matches “{query}”. Send an enquiry and I&apos;ll confirm coverage
            directly.
          </p>
        ) : null}
      </div>
    </div>
  );
}
