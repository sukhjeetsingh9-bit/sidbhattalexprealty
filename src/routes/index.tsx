import { createFileRoute, Link } from "@tanstack/react-router";

import { BrandMarquee } from "@/components/brand/BrandLogo";
import { LeadForm } from "@/components/brand/LeadForm";
import {
  CTA,
  Eyebrow,
  Lead,
  Notice,
  NumberedCard,
  Reveal,
  Section,
  SectionTitle,
  StatBlock,
} from "@/components/brand/primitives";
import { ForSaleSection, RecentlySoldSection, ReviewsSection } from "@/components/brand/rea";
import { BRAND, CONTACT, MARKET_METRICS, MARKET_METRICS_SOURCE, SUBURBS } from "@/lib/brand";
import { REA, REA_RATING, REA_SOLD_TOTAL } from "@/lib/rea";
import heroHome from "@/assets/hero-home.jpg";
import interior from "@/assets/interior-1.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import land from "@/assets/land.jpg";

const TITLE = "Sid Bhattal | North-Eastern Adelaide Real Estate Agent";
const DESCRIPTION =
  "Sid Bhattal, Real Estate Agent with eXp Realty. North-Eastern Adelaide expertise with South Australia-wide reach. Appraisals, buyer advocacy and off-market access.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="section-ink relative min-h-[92svh] overflow-hidden">
        <img
          src={heroHome}
          alt="Contemporary North-Eastern Adelaide home at dusk"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto flex min-h-[92svh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-40 md:px-10 md:pb-24">
          <Eyebrow>{BRAND.agency} · South Australia</Eyebrow>
          <h1 className="mt-8 max-w-4xl text-[3rem] font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Property advice with
            <br />
            local weight.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed opacity-75 md:text-xl">
            {BRAND.positioning} Considered campaigns, honest price guidance and buyers looked after
            properly — from first inspection to settlement.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <CTA to="/sell" variant="ghostLight">
              Request an appraisal
            </CTA>
            <CTA to="/properties" variant="ghostLight">
              View properties
            </CTA>
          </div>
        </div>
      </section>

      {/* Animated Brand & Credentials Marquee */}
      <BrandMarquee />

      {/* Intro / positioning */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Who I work with</Eyebrow>
            <SectionTitle>Two journeys, handled with the same care.</SectionTitle>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed opacity-75">
              I'm {BRAND.fullName}, a {BRAND.jobTitle.toLowerCase()} with {BRAND.agency}. My work
              sits in the north-east of Adelaide — the pockets, streets and school zones that change
              what a home is genuinely worth — while eXp's network lets me act right across{" "}
              {BRAND.state}.
            </p>
            <p className="mt-6 text-lg leading-relaxed opacity-75">
              Sellers get a campaign built around evidence, not optimism. Buyers get someone who
              tells them when to walk away. Both get direct access to me, not a call centre.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <Link to="/sell" className="group border-t border-border pt-6">
                <p className="eyebrow text-accent">For sellers</p>
                <p className="mt-3 text-xl font-semibold">Appraisal &amp; campaign strategy</p>
                <p className="mt-2 text-sm opacity-60">Pricing, method of sale, presentation.</p>
              </Link>
              <Link to="/buy" className="group border-t border-border pt-6">
                <p className="eyebrow text-accent">For buyers</p>
                <p className="mt-3 text-xl font-semibold">Search &amp; off-market access</p>
                <p className="mt-2 text-sm opacity-60">Briefs, inspections, negotiation.</p>
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Editorial image + process */}
      <Section tone="ink">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <img
              src={interior}
              alt="Warm, minimally styled living room prepared for sale"
              loading="lazy"
              width={1440}
              height={1080}
              className="aspect-4/5 w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>The process</Eyebrow>
            <SectionTitle>A campaign is a sequence, not a slogan.</SectionTitle>
            <div className="mt-14 grid gap-10">
              <NumberedCard
                index={1}
                title="Understand the property"
                body="Walkthrough, land and zoning notes, condition, and the comparable evidence that buyers will use against you."
              />
              <NumberedCard
                index={2}
                title="Set the range honestly"
                body="A price range you can defend, with the method of sale chosen for your property and timeline — not for my week."
              />
              <NumberedCard
                index={3}
                title="Present and negotiate"
                body="Preparation, photography, inspections, then structured negotiation with written feedback throughout."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Active listings — genuine REA data */}
      <ForSaleSection />

      {/* Recently sold — genuine REA data */}
      <RecentlySoldSection tone="stone" limit={6} />

      {/* Client reviews — genuine REA data */}
      <ReviewsSection />

      {/* Suburbs strip */}
      <Section tone="ink">
        <Reveal>
          <Eyebrow>Core coverage &amp; indicative medians</Eyebrow>
          <SectionTitle>North-Eastern Adelaide, street by street.</SectionTitle>
        </Reveal>
        <Reveal delay={120}>
          <ul className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUBURBS.slice(0, 12).map((s) => (
              <li
                key={s.name}
                className="flex items-baseline justify-between border-t border-current/15 pt-4"
              >
                <span className="text-lg font-semibold opacity-85 md:text-xl">{s.name}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {s.medianHouse}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <CTA to="/suburbs" variant="ghostLight">
              Suburb intelligence
            </CTA>
          </div>
        </Reveal>
      </Section>

      {/* Appraisal CTA + form (with small studio portrait badge at the bottom) */}
      <Section tone="stone" id="appraisal">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Appraisal</Eyebrow>
            <SectionTitle>What is your property worth today?</SectionTitle>
            <Lead>
              A written appraisal with comparable evidence, a defensible price range and a
              recommended method of sale. No obligation, no pressure.
            </Lead>

            {/* Small compact agent snapshot card at bottom with studio background */}
            <div className="mt-8 inline-flex items-center gap-4 rounded-sm bg-ink px-5 py-3.5 text-ink-foreground shadow-sm">
              <img
                src="/rea/sid-profile.jpg"
                alt={`${BRAND.fullName} — ${BRAND.jobTitle}, ${BRAND.agency}`}
                loading="lazy"
                width={56}
                height={56}
                className="size-12 shrink-0 rounded-full border border-accent/50 object-cover object-top"
              />
              <div className="text-xs leading-snug">
                <p className="font-semibold uppercase tracking-[0.16em]">{BRAND.fullName}</p>
                <p className="mt-0.5 opacity-70">
                  {BRAND.jobTitle} · {BRAND.agency} ({REA.licence})
                </p>
                <p className="mt-0.5 text-[0.6875rem] text-accent">
                  <a href={`tel:${CONTACT.phoneRaw}`} className="hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>{" "}
                  ·{" "}
                  <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </div>

            <Notice>
              {REA.sourceLabel} · updated {REA.sourcedOn}. {REA_RATING.score.toFixed(1)} ★ from{" "}
              {REA_RATING.count} verified reviews · {REA_SOLD_TOTAL} properties sold.
            </Notice>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="appraisal-form"
              title="Request a property appraisal"
              subject="Appraisal request"
              intro="Tell me about the property and I'll come back with the evidence and a suggested approach."
              fields={[
                { name: "address", label: "Property address", required: true },
                {
                  name: "type",
                  label: "Property type",
                  type: "select",
                  options: ["House", "Townhouse", "Unit or apartment", "Land", "Other"],
                },
                {
                  name: "timeline",
                  label: "Timeline",
                  type: "select",
                  options: ["Researching", "0-3 months", "3-6 months", "6-12 months"],
                },
                { name: "notes", label: "Anything I should know", type: "textarea" },
              ]}
              submitLabel="Request appraisal"
            />
          </Reveal>
        </div>
      </Section>

      {/* Compact Market Snapshot strip at the bottom with dark contrasting background */}
      <section className="section-ink border-t border-current/15 px-6 py-10 md:px-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col justify-between gap-4 border-b border-current/15 pb-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-accent">Market snapshot</span>
              <span className="text-xs opacity-60">
                · Greater Adelaide &amp; North-Eastern corridor benchmarks
              </span>
            </div>
            <Link
              to="/market"
              className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-accent hover:underline"
            >
              Full market insights →
            </Link>
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
