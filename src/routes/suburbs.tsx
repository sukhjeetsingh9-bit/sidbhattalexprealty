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
} from "@/components/brand/primitives";
import { DATA_NOTICE, SUBURBS } from "@/lib/brand";
import suburbAerial from "@/assets/suburb-aerial.jpg";

const TITLE = "Suburb Intelligence | North-Eastern Adelaide | Sid Bhattal";
const DESCRIPTION =
  "Suburb-level knowledge across Tea Tree Gully, Campbelltown, Salisbury and Port Adelaide Enfield council areas, with sourced data as it is verified.";

export const Route = createFileRoute("/suburbs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: SuburbsPage,
});

const COUNCILS = Array.from(new Set(SUBURBS.map((s) => s.council)));

function SuburbsPage() {
  return (
    <>
      <PageHero
        eyebrow="Suburb intelligence"
        title="Local knowledge is specific, or it isn't knowledge."
        lead="Council area, zoning, land size patterns, school zones and buyer type change suburb to suburb — sometimes street to street."
        image={suburbAerial}
        alt="Aerial view of leafy Adelaide suburban streets"
      />

      <Section>
        <Reveal>
          <Eyebrow>Coverage</Eyebrow>
          <SectionTitle>Suburbs by council area.</SectionTitle>
          <Lead>
            Core coverage sits in North-Eastern Adelaide. Suburb-level medians, growth and rental
            figures will be added with sources attached.
          </Lead>
        </Reveal>

        <div className="mt-16 space-y-16">
          {COUNCILS.map((council, ci) => (
            <Reveal key={council} delay={ci * 80}>
              <div className="border-t border-border pt-8">
                <p className="eyebrow text-accent">{council}</p>
                <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {SUBURBS.filter((s) => s.council === council).map((s) => (
                    <li key={s.name} className="group border-b border-border pb-5">
                      <p className="text-2xl font-semibold">{s.name}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] opacity-50">
                        {DATA_NOTICE}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Notice>
          Suburb statistics are intentionally omitted until they can be published with a source and
          measurement date.
        </Notice>
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
