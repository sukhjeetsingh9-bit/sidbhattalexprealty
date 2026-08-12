import { createFileRoute, Link } from "@tanstack/react-router";

import { LeadForm } from "@/components/brand/LeadForm";
import {
  Eyebrow,
  Lead,
  Notice,
  PageHero,
  Reveal,
  Section,
  SectionTitle,
} from "@/components/brand/primitives";
import { BRAND, CONTACT } from "@/lib/brand";

import hero from "@/assets/suburb-aerial.jpg";

const TITLE = "Into Spring 2026: Adelaide Selling Season Outlook | Sid Bhattal";
const DESCRIPTION =
  "How the spring 2026 selling season is shaping up across North-Eastern Adelaide: listing volumes, buyer demand, campaign timing and how to prepare.";

export const Route = createFileRoute("/into-spring-2026")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpringPage,
});

function SpringPage() {
  return (
    <>
      <PageHero
        eyebrow="Market update"
        title="Into spring 2026."
        lead="What the spring selling season typically rewards, and how to decide whether it suits your property and your timeline."
        image={hero}
        alt="Aerial view of an Adelaide suburb"
      />

      <Section>
        <Reveal>
          <Eyebrow>Why spring matters</Eyebrow>
          <SectionTitle>More buyers, and more competition for them.</SectionTitle>
          <Lead>
            Spring brings gardens back to life, longer inspection windows and a noticeable lift in
            buyer activity. It also brings more listings, so a property that is under-prepared is
            easier to overlook than at any other point in the year.
          </Lead>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {[
            {
              h: "Listing volumes rise first",
              p: "Supply usually builds before demand peaks. Coming to market slightly ahead of the wave means fewer directly comparable homes competing for the same buyers in your price bracket.",
            },
            {
              h: "Buyer urgency changes",
              p: "Buyers who have missed out earlier in the year arrive with finance approved and clearer expectations. They move quickly on well-presented homes and hesitate on anything that feels unresolved.",
            },
            {
              h: "Presentation carries more weight",
              p: "With more choice available, styling, photography and the condition of outdoor spaces move from nice-to-have to decisive.",
            },
            {
              h: "Timing beats guesswork",
              p: "Campaign length, method of sale and launch date should be set against what is actually listed in your suburb at the time, not a generic calendar.",
            },
          ].map((b, i) => (
            <Reveal key={b.h} delay={i * 80}>
              <article className="border-t border-border pt-6">
                <h3 className="text-2xl font-semibold">{b.h}</h3>
                <p className="mt-4 leading-relaxed opacity-70">{b.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <Reveal>
          <Eyebrow>Preparation</Eyebrow>
          <SectionTitle>A sensible six-week runway.</SectionTitle>
        </Reveal>
        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {[
            {
              n: "01",
              h: "Weeks 6–5",
              p: "Appraisal, method of sale and price strategy. Book trades for anything that a buyer would read as deferred maintenance.",
            },
            {
              n: "02",
              h: "Weeks 4–3",
              p: "Repairs completed, decluttering done, gardens cut back and given time to recover before photography.",
            },
            {
              n: "03",
              h: "Weeks 2–1",
              p: "Styling, photography and copy finalised, contract documentation prepared, launch date locked to the strongest open window.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <article className="border-t border-current/15 pt-6">
                <p className="eyebrow text-accent">{s.n}</p>
                <h3 className="mt-4 text-2xl font-semibold">{s.h}</h3>
                <p className="mt-4 leading-relaxed opacity-70">{s.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Notice>
          General information only. Market conditions vary by suburb, price bracket and property
          type — ask for a suburb-specific read before setting a campaign date.
        </Notice>
      </Section>

      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Next step</Eyebrow>
            <SectionTitle>Ask for a spring timing read.</SectionTitle>
            <Lead>
              {BRAND.fullName} — Real Estate Agent | {BRAND.agency}. {BRAND.positioning}
            </Lead>
            <p className="mt-6 text-sm leading-relaxed opacity-70">
              Prefer to talk it through? Email {CONTACT.email} or call {CONTACT.phoneDisplay}.
            </p>
            <Link
              to="/resources"
              className="eyebrow mt-8 inline-flex items-center gap-2 border-b border-current/40 pb-1 transition-colors hover:border-accent hover:text-accent"
            >
              Back to resources
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="spring-timing"
              title="Spring timing enquiry"
              subject="Spring 2026 timing enquiry"
              fields={[
                { name: "address", label: "Property address", type: "text", required: true },
                {
                  name: "timeline",
                  label: "When are you thinking of selling",
                  type: "select",
                  options: ["Within 6 weeks", "This spring", "Later in 2026", "Still deciding"],
                },
                { name: "notes", label: "Anything I should know", type: "textarea" },
              ]}
              submitLabel="Request a timing read"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
