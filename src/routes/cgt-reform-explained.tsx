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

import hero from "@/assets/interior-1.jpg";

const TITLE = "CGT Reform Explained for Property Owners | Sid Bhattal";
const DESCRIPTION =
  "A plain-English explainer on capital gains tax and proposed reform: how CGT works on property, who it affects, and what to review with your accountant.";

export const Route = createFileRoute("/cgt-reform-explained")({
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
  component: CgtPage,
});

function CgtPage() {
  return (
    <>
      <PageHero
        eyebrow="Explainer"
        title="CGT reform, explained."
        lead="What capital gains tax actually does to a property decision, and which parts of a reform debate are worth your attention as an owner."
        image={hero}
        alt="Calm interior with natural light"
      />

      <Section>
        <Reveal>
          <Eyebrow>The basics</Eyebrow>
          <SectionTitle>How CGT works on property today.</SectionTitle>
          <Lead>
            Capital gains tax is not a separate tax. A gain on an asset is added to your assessable
            income in the year the contract is signed, and taxed at your marginal rate.
          </Lead>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {[
            {
              h: "Main residence exemption",
              p: "The home you actually live in is generally exempt. Partial exemptions apply where a property has been both a home and an income-producing asset.",
            },
            {
              h: "The 50 per cent discount",
              p: "Individuals who have held an asset for more than twelve months generally include only half the gain. Holding period is measured from contract date, not settlement.",
            },
            {
              h: "Cost base matters",
              p: "Purchase price, stamp duty, legal fees and capital improvements reduce the taxable gain. Poor record-keeping is the most common reason owners overpay.",
            },
            {
              h: "Timing is a lever",
              p: "Because the gain lands in one income year, the contract date interacts with income, retirement and loss carry-forwards more than most owners expect.",
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
          <Eyebrow>What reform debates target</Eyebrow>
          <SectionTitle>Three recurring proposals.</SectionTitle>
          <Lead>
            Reform proposals come and go, and none apply until legislated. These are the levers most
            commonly discussed.
          </Lead>
        </Reveal>
        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {[
            {
              n: "01",
              h: "Reducing the discount",
              p: "Lowering the 50 per cent discount would raise the effective tax on longer-held investment property while leaving owner-occupied homes untouched.",
            },
            {
              n: "02",
              h: "Narrowing deductions",
              p: "Changes to how losses on investment property offset other income would alter holding costs more than sale-day outcomes.",
            },
            {
              n: "03",
              h: "Transitional rules",
              p: "Grandfathering existing holdings is the usual approach, which is why the announcement date often matters as much as the start date.",
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
          General information only, not tax or financial advice. Confirm your position with a
          registered tax agent or accountant before acting.
        </Notice>
      </Section>

      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Next step</Eyebrow>
            <SectionTitle>Reviewing whether to hold or sell?</SectionTitle>
            <Lead>
              {BRAND.fullName} — Real Estate Agent | {BRAND.agency}. {BRAND.positioning}
            </Lead>
            <p className="mt-6 text-sm leading-relaxed opacity-70">
              Email {CONTACT.email} or call {CONTACT.phoneDisplay} to talk through current value and
              timing. Tax treatment stays with your accountant.
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
              id="cgt-review"
              title="Hold or sell review"
              subject="Hold or sell review enquiry"
              fields={[
                { name: "address", label: "Property address", type: "text", required: true },
                {
                  name: "ownership",
                  label: "How is it currently used",
                  type: "select",
                  options: ["Owner-occupied", "Investment / rented", "Vacant", "Mixed use"],
                },
                { name: "notes", label: "What are you weighing up", type: "textarea" },
              ]}
              submitLabel="Request a review"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
