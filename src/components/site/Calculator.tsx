import { useState } from "react";
import { SectionHeading } from "./Sections";

type Mode = "ica" | "coe";

const fmt = (n: number) =>
  n.toLocaleString("en-AU", { maximumFractionDigits: 0, minimumFractionDigits: 0 });

export function Calculator() {
  const [mode, setMode] = useState<Mode>("ica");
  const [gci, setGci] = useState("300000");
  const [split, setSplit] = useState("60");
  const [franchise, setFranchise] = useState("6");
  const [result, setResult] = useState<{ exp: number; current: number } | null>(null);

  const calculate = () => {
    const g = Math.max(0, Number(gci) || 0);
    const s = Math.min(100, Math.max(0, Number(split) || 0));
    const f = Math.min(100, Math.max(0, Number(franchise) || 0));

    // 75% split up to $100,000 GCI (the $25,000 cap), then 100% for the rest of the year.
    const capGci = 100000;
    const exp = Math.min(g, capGci) * 0.75 + Math.max(0, g - capGci);
    const current = g * (Math.max(0, s - f) / 100);
    setResult({ exp, current });
  };

  return (
    <section id="calculator" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <SectionHeading
          eyebrow="Commission Calculator"
          gold="Commission"
          rest="Calculator"
          sub="Put a CAP on how much commission you pay OUT on annually!"
        />
        <div className="mx-auto mt-6 max-w-2xl space-y-3 text-center text-sm leading-relaxed text-foreground/70">
          <p>
            Enjoy a high paying agent commission split, with less going to the model. No desk fees, no
            royalty fees, and no franchise fees.
          </p>
          <p>
            Once you reach $100,000 in Gross Commission Income (GCI) for your anniversary year, you retain
            up to 100 percent of your commission for the remainder of the year.
          </p>
          <p>
            Use the commission comparison calculator below. Select Independent Contractor if you hold your
            full agent licence, or Commission Only Employee if you hold a sales representative licence.
          </p>
        </div>

        <div className="card-surface mt-12 p-6 md:p-9">
          <div className="mx-auto flex max-w-md rounded-md border border-border bg-background p-1">
            {(
              [
                { id: "ica", label: "Independent Contractor (ICA)" },
                { id: "coe", label: "Commission Only Employee (COE)" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMode(t.id)}
                className={`flex-1 rounded-sm px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  mode === t.id ? "bg-gold text-primary-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold">{mode === "ica" ? "ICA" : "COE"} Calculator</h3>
          <p className="mt-1 text-sm text-foreground/60">
            75% split up to $100,000 GCI, then 100% after cap
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <Field
                label="Total Annual Earned Commissions (GCI) ($)"
                value={gci}
                onChange={setGci}
              />
              <Field label="Your Current Commission Split (%)" value={split} onChange={setSplit} />
              <Field label="Franchise Fees (%)" value={franchise} onChange={setFranchise} />
              <button
                type="button"
                onClick={calculate}
                className="w-full rounded-md bg-gold px-6 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
              >
                Calculate
              </button>
            </div>

            <div className="rounded-lg border border-border bg-background p-7">
              {result ? (
                <div className="space-y-6">
                  <div>
                    <p className="eyebrow">Your earnings at eXp</p>
                    <p className="mt-2 text-4xl font-black text-gold">${fmt(result.exp)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50">
                      Your current model
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground/80">${fmt(result.current)}</p>
                  </div>
                  <div className="border-t border-border pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50">
                      Difference
                    </p>
                    <p
                      className={`mt-2 text-2xl font-bold ${
                        result.exp - result.current >= 0 ? "text-gold" : "text-destructive"
                      }`}
                    >
                      {result.exp - result.current >= 0 ? "+" : "-"}$
                      {fmt(Math.abs(result.exp - result.current))}
                    </p>
                  </div>
                  {mode === "coe" ? (
                    <p className="text-xs text-foreground/50">
                      Commission Only Employee figures are shown before statutory superannuation and PAYG
                      withholding, which eXp processes on your behalf.
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-foreground/60">
                  Enter your details and click Calculate to see your potential earnings at eXp Realty
                  Australia
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium tracking-wide text-foreground/70">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold/60"
      />
    </label>
  );
}

export function GlobalStats() {
  const stats = [
    { value: "83,000+", label: "GLOBAL AGENTS" },
    { value: "24+", label: "COUNTRIES" },
    { value: "6", label: "CONTINENTS" },
  ];
  return (
    <section className="border-y border-border bg-surface/40 py-16">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid gap-8 text-center md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black text-gold md:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-foreground/60">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-foreground/60">
          Join agents across the globe, in these countries and across these continents, all with one common
          objective: keeping more together.
        </p>
      </div>
    </section>
  );
}
