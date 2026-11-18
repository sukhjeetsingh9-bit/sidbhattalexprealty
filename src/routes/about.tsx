import { createFileRoute } from "@tanstack/react-router";

import {
  CTA,
  Eyebrow,
  Lead,
  Notice,
  PageHero,
  Reveal,
  Section,
  SectionTitle,
} from "@/components/brand/primitives";
import { BRAND, CONTACT, SOCIALS } from "@/lib/brand";
import { REA, REA_RATING, REA_SOLD_TOTAL } from "@/lib/rea";
import heroHome from "@/assets/hero-home.jpg";

const TITLE = "About Sid Bhattal | Real Estate Agent, eXp Realty";
const DESCRIPTION =
  "Sid Bhattal is a Real Estate Agent with eXp Realty, focused on North-Eastern Adelaide with reach across South Australia.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Say the number you believe",
    body: "An inflated appraisal wins listings and loses campaigns. I'd rather have a harder first conversation than a longer one on the market.",
  },
  {
    title: "Local before general",
    body: "North-Eastern Adelaide is the ground I know street by street. That specificity is what separates a price guide from a guess.",
  },
  {
    title: "Direct access",
    body: "You deal with me. Calls, inspections, feedback and negotiation come from the same person throughout.",
  },
  {
    title: "Evidence in writing",
    body: "Comparables, buyer feedback and recommendations documented, so decisions are made on record rather than in passing.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Sid Bhattal — Real Estate Agent, eXp Realty."
        lead={BRAND.positioning}
        image={heroHome}
        alt="Contemporary Adelaide home at dusk"
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <img
              src="/rea/sid-profile.jpg"
              alt={`${BRAND.fullName} — ${BRAND.jobTitle}, ${BRAND.agency}`}
              loading="lazy"
              width={800}
              height={800}
              className="aspect-4/5 w-full object-cover object-top"
            />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Approach</Eyebrow>
            <SectionTitle>Fewer promises. More evidence.</SectionTitle>
            <p className="mt-8 text-lg leading-relaxed opacity-75">
              I work with owners, buyers, investors and developers across North-Eastern Adelaide,
              and with clients further afield through {BRAND.agency}'s South Australian network. The
              method doesn't change with the price bracket: understand the property properly, price
              it on evidence, prepare it well, and negotiate hard on the client's behalf.
            </p>
            <p className="mt-6 text-lg leading-relaxed opacity-75">
              What you won't find here are invented statistics, borrowed testimonials or guaranteed
              outcomes. When those things exist and can be verified, they'll be published with their
              source.
            </p>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="border-t border-border pt-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <Reveal>
          <Eyebrow>Credentials</Eyebrow>
          <SectionTitle>Verified details only.</SectionTitle>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border-t border-current/15 pt-6">
              <p className="eyebrow opacity-55">Role</p>
              <p className="mt-4 text-xl font-semibold">
                {BRAND.jobTitle}, {BRAND.agency}
              </p>
            </div>
            <div className="border-t border-current/15 pt-6">
              <p className="eyebrow opacity-55">Core area</p>
              <p className="mt-4 text-xl font-semibold">{BRAND.region}</p>
            </div>
            <div className="border-t border-current/15 pt-6">
              <p className="eyebrow opacity-55">Awards &amp; results</p>
              <p className="mt-4 text-xl font-semibold">
                {REA_RATING.score.toFixed(1)} ★ ({REA_RATING.count} reviews) · {REA_SOLD_TOTAL} sold
                (12m)
              </p>
            </div>
          </div>
          <Notice>
            {REA.agencyName} · {REA.licence} · {REA.sourceLabel} (updated {REA.sourcedOn}).
          </Notice>
        </Reveal>
      </Section>

      <Section tone="stone">
        <Reveal>
          <Eyebrow>Connect</Eyebrow>
          <SectionTitle>Reach me directly.</SectionTitle>
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6 text-lg">
            <a href={`tel:${CONTACT.phoneRaw}`} className="font-semibold hover:text-accent">
              {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="font-semibold hover:text-accent">
              {CONTACT.email}
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:text-accent"
              >
                {s.handle}
              </a>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <CTA to="/contact">Contact Sid</CTA>
            <CTA href={CONTACT.blinq} variant="outline">
              Digital business card
            </CTA>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
