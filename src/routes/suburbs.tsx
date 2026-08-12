import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/brand/LeadForm";
import { SuburbDirectory } from "@/components/brand/SuburbDirectory";
import {
  Eyebrow,
  Lead,
  Notice,
  PageHero,
  Reveal,
  Section,
  SectionTitle,
} from "@/components/brand/primitives";
import { REGIONAL_AREAS } from "@/lib/service-areas";
import suburbAerial from "@/assets/suburb-aerial.jpg";

const TITLE = "Suburb & Council Directory | South Australia | Sid Bhattal";
const DESCRIPTION =
  "A council-by-council directory of Adelaide metropolitan suburbs and regional South Australia. North-Eastern Adelaide is the primary local market, with SA-wide reach.";

export const Route = createFileRoute("/suburbs")({
  validateSearch: (search: Record<string, unknown>) => ({
    suburb: typeof search["suburb"] === "string" ? search["suburb"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SuburbsPage,
});

function SuburbsPage() {
  const { suburb } = Route.useSearch();

  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title="Local knowledge is specific, or it isn't knowledge."
        lead="Council area, zoning, land size patterns, school zones and buyer type change suburb to suburb — sometimes street to street."
        image={suburbAerial}
        alt="Aerial view of leafy Adelaide suburban streets"
      />

      <Section>
        <Reveal>
          <Eyebrow>Directory</Eyebrow>
          <SectionTitle>Councils and suburbs, properly organised.</SectionTitle>
          <Lead>
            North-Eastern Adelaide — Tea Tree Gully, Campbelltown, Salisbury and Port Adelaide
            Enfield — is the primary local market. Beyond that, service continues South
            Australia-wide, supported by professional connections. Search a suburb or open a council
            to see its coverage.
          </Lead>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <SuburbDirectory />
        </Reveal>

        <Notice>
          Council groupings follow current South Australian local government boundaries. A small
          number of suburbs straddle two councils; ask if boundary detail matters for your property.
        </Notice>
      </Section>

      <Section tone="stone">
        <Reveal>
          <Eyebrow>Regional South Australia</Eyebrow>
          <SectionTitle>Beyond the metropolitan councils.</SectionTitle>
          <Lead>
            Regional enquiries are welcome and handled through established professional connections.
            Where a local specialist is the better outcome, you'll be told so directly.
          </Lead>
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONAL_AREAS.map((r, i) => (
            <Reveal key={r.region} delay={i * 60}>
              <div className="border-t border-border pt-5">
                <p className="text-lg font-semibold">{r.region}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-60">{r.towns}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>Ask</Eyebrow>
            <SectionTitle>Want the read on one suburb?</SectionTitle>
            <Lead>
              Tell me the suburb and what you're trying to decide. You'll get a straight answer,
              including when the answer is "not that one".
            </Lead>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="suburb-request"
              title="Suburb intelligence request"
              subject="Suburb intelligence request"
              tone="ink"
              defaults={suburb ? { suburb } : {}}
              fields={[
                { name: "suburb", label: "Suburb", required: true },
                {
                  name: "goal",
                  label: "What you're deciding",
                  type: "select",
                  options: ["Where to buy", "Whether to sell", "Investment yield", "Development potential"],
                },
                { name: "notes", label: "Details", type: "textarea" },
              ]}
              submitLabel="Send request"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
