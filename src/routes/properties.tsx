import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/brand/LeadForm";
import {
  Eyebrow,
  Lead,
  Notice,
  PageHero,
  PropertyCard,
  Reveal,
  Section,
  SectionTitle,
} from "@/components/brand/primitives";
import { SHOWCASE_NOTE } from "@/lib/brand";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import land from "@/assets/land.jpg";
import suburbAerial from "@/assets/suburb-aerial.jpg";

const TITLE = "Properties | Sid Bhattal, eXp Realty South Australia";
const DESCRIPTION =
  "Current and upcoming property presentations from Sid Bhattal — houses, townhouses, land and development sites across North-Eastern Adelaide.";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PropertiesPage,
});

const CATEGORIES = [
  {
    image: property1,
    suburb: "North-Eastern Adelaide",
    headline: "Established family homes",
    meta: ["Land holdings", "School zones"],
    status: "Example",
  },
  {
    image: property2,
    suburb: "Metro Adelaide",
    headline: "Townhouses & low-maintenance living",
    meta: ["Downsizers", "Investors"],
    status: "Example",
  },
  {
    image: land,
    suburb: "South Australia",
    headline: "Land & development sites",
    meta: ["Division potential", "Zoning review"],
    status: "Example",
  },
  {
    image: suburbAerial,
    suburb: "Regional & metro fringe",
    headline: "Lifestyle & fringe holdings",
    meta: ["Acreage", "Lifestyle"],
    status: "Example",
  },
];

function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Every property gets a proper presentation."
        lead="Live listings, upcoming campaigns and recent results will appear here as they are verified."
        image={property2}
        alt="Contemporary townhouse facade"
      />

      <Section>
        <Reveal>
          <Eyebrow>What I list</Eyebrow>
          <SectionTitle>Categories I work across.</SectionTitle>
          <Lead>
            From first homes through to development sites. If it's in North-Eastern Adelaide, it's
            in my patch — and eXp's network covers the rest of the state.
          </Lead>
        </Reveal>
        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.headline} delay={i * 100}>
              <PropertyCard {...c} />
            </Reveal>
          ))}
        </div>
        <Notice>{SHOWCASE_NOTE}</Notice>
      </Section>

      <Section tone="ink">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>Land &amp; development</Eyebrow>
            <SectionTitle>Sites, divisions and builder enquiries.</SectionTitle>
            <Lead>
              Frontage, depth, services, zoning and overlays decide feasibility long before price
              does. Send the details and I'll tell you what the market is likely to see.
            </Lead>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="land-enquiry"
              title="Land &amp; development enquiry"
              subject="Land and development enquiry"
              tone="ink"
              fields={[
                { name: "address", label: "Site address or locality", required: true },
                { name: "size", label: "Approximate land size" },
                {
                  name: "intent",
                  label: "Your position",
                  type: "select",
                  options: ["Owner considering selling", "Developer buying", "Builder", "Investor"],
                },
                { name: "notes", label: "Zoning, frontage or division notes", type: "textarea" },
              ]}
              submitLabel="Send enquiry"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
