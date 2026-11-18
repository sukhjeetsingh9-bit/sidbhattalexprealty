import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/brand/LeadForm";
import {
  CTA,
  Eyebrow,
  Lead,
  Notice,
  NumberedCard,
  PageHero,
  Reveal,
  Section,
  SectionTitle,
} from "@/components/brand/primitives";
import { REA } from "@/lib/rea";
import heroHome from "@/assets/hero-home.jpg";
import interior from "@/assets/interior-1.jpg";

const TITLE = "Selling Your Home | Sid Bhattal, eXp Realty";
const DESCRIPTION =
  "Appraisals, pricing strategy, presentation and campaign management for sellers in North-Eastern Adelaide and across South Australia.";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="For sellers"
        title="The price you achieve is decided before the first inspection."
        lead="Preparation, evidence and method of sale do most of the work. Everything else is execution."
        image={heroHome}
        alt="Modern home presented for sale at dusk"
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Campaign structure</Eyebrow>
            <SectionTitle>Five stages, no surprises.</SectionTitle>
            <Lead>
              You'll know what happens each week, what feedback we're getting and what it means for
              price. In writing.
            </Lead>
            <div className="mt-10">
              <CTA href="#appraisal-form">Request an appraisal</CTA>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-10">
              <NumberedCard
                index={1}
                title="Appraisal"
                body="A written price range built on comparable sales, land, condition and current buyer depth — not a number designed to win the listing."
              />
              <NumberedCard
                index={2}
                title="Preparation"
                body="A prioritised list of what actually returns money: decluttering, repairs, styling, landscaping and access."
              />
              <NumberedCard
                index={3}
                title="Method and marketing"
                body="Auction, private treaty or expressions of interest, chosen for your property. Photography, copy and portal presence handled."
              />
              <NumberedCard
                index={4}
                title="Campaign management"
                body="Open inspections, private appointments, buyer qualification and weekly written reporting."
              />
              <NumberedCard
                index={5}
                title="Negotiation to settlement"
                body="Offer comparison beyond headline price — conditions, finance strength and timelines — then contract and settlement coordination."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <Eyebrow>Presentation</Eyebrow>
            <SectionTitle>Buyers price what they can picture.</SectionTitle>
            <Lead>
              Styling is not decoration. It removes the mental discount buyers apply to anything
              they'd have to fix, guess at or work around.
            </Lead>
            <ul className="mt-12 space-y-5 text-base opacity-75">
              {[
                "Light, flow and storage read first — clear them before anything cosmetic.",
                "Street appeal sets the expectation the interior has to meet.",
                "Small deferred repairs cost far more in negotiation than they do to fix.",
                "Photography and floor plans are the campaign, not an add-on to it.",
              ].map((line) => (
                <li key={line} className="flex gap-4 border-t border-current/15 pt-5">
                  <span className="eyebrow mt-1 text-accent">·</span>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={interior}
              alt="Styled interior prepared for open inspection"
              loading="lazy"
              width={1440}
              height={1080}
              className="aspect-4/5 w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Appraisal</Eyebrow>
            <SectionTitle>Start with the evidence.</SectionTitle>
            <Notice>
              No guaranteed prices, timeframes or results are offered on this site. Past sales
              results and client reviews are verified and published on realestate.com.au (
              {REA.licence}).
            </Notice>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="appraisal-form"
              title="Request a property appraisal"
              subject="Appraisal request"
              fields={[
                { name: "address", label: "Property address", required: true },
                {
                  name: "type",
                  label: "Property type",
                  type: "select",
                  options: ["House", "Townhouse", "Unit or apartment", "Land", "Other"],
                },
                {
                  name: "reason",
                  label: "Reason for selling",
                  type: "select",
                  options: ["Upsizing", "Downsizing", "Relocating", "Investment review", "Estate", "Other"],
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
    </>
  );
}
