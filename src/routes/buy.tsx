import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/brand/LeadForm";
import {
  Eyebrow,
  Lead,
  Notice,
  NumberedCard,
  PageHero,
  Reveal,
  Section,
  SectionTitle,
} from "@/components/brand/primitives";
import { DATA_NOTICE, SUBURBS } from "@/lib/brand";
import interior from "@/assets/interior-1.jpg";

const TITLE = "Buying in North-Eastern Adelaide | Sid Bhattal";
const DESCRIPTION =
  "Buyer guidance across North-Eastern Adelaide and South Australia: briefs, inspections, negotiation and off-market registration with Sid Bhattal, eXp Realty.";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  return (
    <>
      <PageHero
        eyebrow="For buyers"
        title="Buy with someone who knows the difference between streets."
        lead="Two homes with the same floor plan can be worth very different money three streets apart. That local read is the whole job."
        image={interior}
        alt="Light-filled living space in an Adelaide home"
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <SectionTitle>A brief, then real shortlists.</SectionTitle>
            <Lead>
              Most buyers lose months on properties that were never right. We start with a written
              brief so everything after that is filtered.
            </Lead>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-10">
              <NumberedCard
                index={1}
                title="Define the brief"
                body="Budget and finance position, must-haves, deal-breakers, school zones, commute, land size and renovation appetite."
              />
              <NumberedCard
                index={2}
                title="Shortlist and inspect"
                body="On-market options plus anything I hear about early. Honest commentary on condition, zoning and resale."
              />
              <NumberedCard
                index={3}
                title="Due diligence"
                body="Form 1, building and pest, easements, encumbrances and title notes reviewed before you commit."
              />
              <NumberedCard
                index={4}
                title="Negotiate and settle"
                body="Offer structure, conditions and timelines managed through to settlement, with your solicitor or conveyancer looped in."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <Reveal>
          <Eyebrow>Where I search</Eyebrow>
          <SectionTitle>Core suburbs and beyond.</SectionTitle>
          <Lead>
            North-Eastern Adelaide is home ground. Enquiries elsewhere in South Australia are
            welcome — I'll tell you honestly if someone closer to the street is a better fit.
          </Lead>
        </Reveal>
        <Reveal delay={120}>
          <ul className="mt-14 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUBURBS.map((s) => (
              <li key={s.name} className="border-t border-current/15 pt-4">
                <p className="text-lg font-semibold">{s.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-50">{s.council}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <LeadForm
              id="buyer-registration"
              title="Buyer registration"
              subject="Buyer registration"
              intro="Register your brief and I'll match you to suitable listings as they come through."
              fields={[
                { name: "areas", label: "Suburbs of interest", required: true },
                {
                  name: "budget",
                  label: "Budget range",
                  type: "select",
                  options: [
                    "Under $500k",
                    "$500k - $700k",
                    "$700k - $900k",
                    "$900k - $1.2m",
                    "$1.2m+",
                  ],
                },
                {
                  name: "finance",
                  label: "Finance status",
                  type: "select",
                  options: ["Pre-approved", "In application", "Not started", "Cash buyer"],
                },
                { name: "brief", label: "What you're looking for", type: "textarea" },
              ]}
              submitLabel="Register my brief"
            />
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="off-market"
              title="Off-market register"
              subject="Off-market registration"
              intro="Some owners prefer a quiet sale. Register to be contacted first when something suitable comes up."
              fields={[
                { name: "areas", label: "Target suburbs", required: true },
                {
                  name: "type",
                  label: "Property type",
                  type: "select",
                  options: ["House", "Townhouse", "Unit or apartment", "Land", "Any"],
                },
                { name: "notes", label: "Notes", type: "textarea" },
              ]}
              submitLabel="Join the register"
            />
            <Notice>
              Off-market opportunities depend on owner instructions and are never guaranteed.
              Volume and frequency figures: {DATA_NOTICE}
            </Notice>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
