import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/brand/LeadForm";
import {
  Eyebrow,
  Lead,
  PageHero,
  Reveal,
  Section,
  SectionTitle,
} from "@/components/brand/primitives";
import { BRAND, CONTACT } from "@/lib/brand";
import interior from "@/assets/interior-1.jpg";

const TITLE = "Submit Your Property Offer | Sid Bhattal";
const DESCRIPTION =
  "Submit your property offer directly to Sid Bhattal, Real Estate Agent with eXp Realty. Confidential and used only for contract preparation.";

export const Route = createFileRoute("/offer")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: OfferPage,
});

function OfferPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        title="Submit Your Property Offer"
        lead={`Complete the form below to submit your offer directly to ${BRAND.fullName}. All information is kept strictly confidential and used only for contract preparation.`}
        image={interior}
        alt="Calm interior with natural light"
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <SectionTitle>Straight to Sid.</SectionTitle>
            <Lead>
              Your offer details are sent directly to me at {CONTACT.email} — no third party, no
              marketing lists. I&apos;ll confirm receipt, review the terms with the vendor and come
              back to you personally.
            </Lead>
            <p className="mt-8 text-sm leading-relaxed opacity-65">
              Prefer to talk it through first? Call {CONTACT.phoneDisplay}. Offers are not binding
              until a contract is signed by all parties.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm
              id="property-offer"
              title="Property offer details"
              subject="Property offer"
              intro="Include as much detail as you can — anything missing, I'll follow up."
              fields={[
                { name: "property", label: "Property address", required: true },
                { name: "offerAmount", label: "Offer amount (AUD)", required: true },
                { name: "deposit", label: "Deposit amount" },
                { name: "settlement", label: "Preferred settlement period" },
                {
                  name: "finance",
                  label: "Finance",
                  type: "select",
                  options: [
                    "Cash — no finance required",
                    "Pre-approved finance",
                    "Finance subject to approval",
                  ],
                },
                {
                  name: "conditions",
                  label: "Conditions (building & pest, finance, sale of home, other)",
                  type: "textarea",
                },
                {
                  name: "solicitor",
                  label: "Your solicitor or conveyancer",
                },
                { name: "notes", label: "Anything else I should know", type: "textarea" },
              ]}
              submitLabel="Submit offer to Sid"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
