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
import { DATA_NOTICE, RESOURCES } from "@/lib/brand";
import interior from "@/assets/interior-1.jpg";

const TITLE = "Property Resources & Guides | Sid Bhattal";
const DESCRIPTION =
  "Practical guides for South Australian sellers, buyers and investors: appraisals, preparation checklists, auction versus private treaty and due diligence.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Plain explanations, no sales pitch attached."
        lead="The parts of a property transaction people are quietly unsure about, written out properly."
        image={interior}
        alt="Calm interior with natural light"
      />

      <Section>
        <Reveal>
          <Eyebrow>Library</Eyebrow>
          <SectionTitle>Guides and worksheets.</SectionTitle>
          <Lead>
            Request any of these and I'll send it through directly. Downloadable versions are being
            prepared.
          </Lead>
        </Reveal>
        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <article className="border-t border-border pt-6">
                <p className="eyebrow text-accent">{r.kind}</p>
                <h3 className="mt-4 text-2xl font-semibold">{r.title}</h3>
                <p className="mt-4 leading-relaxed opacity-70">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Notice>Download links and publication dates: {DATA_NOTICE}</Notice>
      </Section>

      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Request</Eyebrow>
            <SectionTitle>Ask for a guide.</SectionTitle>
            <Lead>Tell me which one you want and I'll email it across.</Lead>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm
              id="resource-request"
              title="Resource request"
              subject="Resource request"
              fields={[
                {
                  name: "resource",
                  label: "Which resource",
                  type: "select",
                  required: true,
                  options: RESOURCES.map((r) => r.title),
                },
                { name: "notes", label: "Anything specific you need covered", type: "textarea" },
              ]}
              submitLabel="Send me the guide"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
