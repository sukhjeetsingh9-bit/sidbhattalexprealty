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
import { MARKET_METRICS, MARKET_METRICS_SOURCE } from "@/lib/brand";
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
          <Eyebrow>Snapshot</Eyebrow>
          <SectionTitle>Current market snapshot.</SectionTitle>
          <Lead>
            Key benchmarks across Greater Adelaide and the North-Eastern suburbs, alongside verified
            campaign metrics.
          </Lead>
        </Reveal>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {MARKET_METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 100}>
              <StatBlock label={m.label} value={m.value} detail={m.detail} />
            </Reveal>
          ))}
        </div>
        <Notice>{MARKET_METRICS_SOURCE}</Notice>
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
    </>
  );
}
