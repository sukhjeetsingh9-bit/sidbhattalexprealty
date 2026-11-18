import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/brand/LeadForm";
import {
  Eyebrow,
  Lead,
  Notice,
  PageHero,
  Reveal,
  Section,
  SectionTitle,
  StatBlock,
} from "@/components/brand/primitives";
import { MARKET_METRICS, MARKET_METRICS_SOURCE, SUBURBS } from "@/lib/brand";
import { REA, REA_DISCLAIMER, REA_SNAPSHOT } from "@/lib/rea";
import suburbAerial from "@/assets/suburb-aerial.jpg";

const TITLE = "Adelaide Market Insights | Sid Bhattal";
const DESCRIPTION =
  "A sourced, dated view of the North-Eastern Adelaide and South Australian property market — no unverified statistics or guaranteed forecasts.";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: MarketPage,
});

const THEMES = [
  {
    title: "Buyer depth",
    body: "How many qualified buyers are genuinely active at your price point, and what that does to method of sale.",
  },
  {
    title: "Supply and listings",
    body: "New listings versus total stock on market. Thin supply and thin demand look identical on a portal, and behave nothing alike.",
  },
  {
    title: "Finance conditions",
    body: "Rate settings and serviceability shift borrowing capacity, which shows up in offers weeks before it shows up in medians.",
  },
  {
    title: "Selling period",
    body: "Days on market by property type tells you more about pricing accuracy than any headline growth figure.",
  },
];

function MarketPage() {
  return (
    <>
      <PageHero
        eyebrow="Market insights"
        title="Figures with a source and a date, or not at all."
        lead="Property marketing is full of numbers with no origin. Anything published here will name where it came from and when it was measured."
        image={suburbAerial}
        alt="Aerial view of an Adelaide suburb"
      />

      <Section>
        <Reveal>
          <Eyebrow>Verified performance</Eyebrow>
          <SectionTitle>My last 12 months, published by REA.</SectionTitle>
          <Lead>
            These figures come straight from my realestate.com.au agent profile and cover properties
            sold as lead and secondary agent.
          </Lead>
        </Reveal>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {REA_SNAPSHOT.map((m, i) => (
            <Reveal key={m.label} delay={i * 100}>
              <StatBlock label={m.label} value={m.value} />
            </Reveal>
          ))}
        </div>
        <Notice>
          {REA.sourceLabel} · updated {REA.sourcedOn}. {REA_DISCLAIMER}{" "}
          <a href={REA.profileUrl} target="_blank" rel="noreferrer" className="text-accent">
            View the profile
          </a>
          .
        </Notice>
      </Section>

      <Section tone="stone">
        <Reveal>
          <Eyebrow>Suburb benchmarks</Eyebrow>
          <SectionTitle>North-Eastern Adelaide house medians.</SectionTitle>
          <Lead>
            Indicative suburb-level house medians across Tea Tree Gully, Campbelltown, Port Adelaide
            Enfield and Salisbury councils. Street position, allotment size and condition shift
            individual values significantly.
          </Lead>
        </Reveal>
        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {SUBURBS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 6) * 60}>
              <div className="border-t border-border pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold">{s.name}</h3>
                  <span className="text-lg font-semibold text-accent">{s.medianHouse}</span>
                </div>
                <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.16em] opacity-50">
                  {s.council}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed opacity-70">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Notice>
          Indicative 2026 house price benchmarks for client guidance. Request a property-specific
          appraisal below for recent comparable sales on your street.
        </Notice>
      </Section>

      <Section tone="ink">
        <Reveal>
          <Eyebrow>What actually moves price</Eyebrow>
          <SectionTitle>Four things worth watching.</SectionTitle>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {THEMES.map((t, i) => (
            <Reveal key={t.title} delay={i * 100}>
              <div className="border-t border-current/15 pt-6">
                <h3 className="text-2xl font-semibold">{t.title}</h3>
                <p className="mt-4 leading-relaxed opacity-70">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Tailored</Eyebrow>
            <SectionTitle>Request a market update for your street.</SectionTitle>
            <Lead>
              A short written summary of recent comparable activity around your address, with the
              sources listed.
            </Lead>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="market-update"
              title="Market snapshot request"
              subject="Market snapshot request"
              fields={[
                { name: "suburb", label: "Suburb or street", required: true },
                {
                  name: "interest",
                  label: "You are",
                  type: "select",
                  options: ["Owner", "Buyer", "Investor", "Just researching"],
                },
                { name: "notes", label: "What you'd like to know", type: "textarea" },
              ]}
              submitLabel="Request update"
            />
          </Reveal>
        </div>
      </Section>

      {/* Compact Market Snapshot strip at the bottom with dark contrasting background */}
      <section className="section-ink border-t border-current/15 px-6 py-10 md:px-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex items-center gap-3 border-b border-current/15 pb-4">
            <span className="eyebrow text-accent">Market snapshot</span>
            <span className="text-xs opacity-60">
              · Greater Adelaide &amp; North-Eastern corridor benchmarks
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {MARKET_METRICS.map((m) => (
              <div key={m.label}>
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] opacity-55">
                  {m.label}
                </p>
                <p className="mt-1.5 text-lg font-semibold md:text-xl">{m.value}</p>
                <p className="mt-0.5 text-xs opacity-55">{m.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[0.6875rem] opacity-45">{MARKET_METRICS_SOURCE}</p>
        </div>
      </section>
    </>
  );
}
