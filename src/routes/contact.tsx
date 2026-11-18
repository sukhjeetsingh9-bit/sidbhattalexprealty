import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";

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
import { BRAND, CONTACT, DATA_NOTICE, SOCIALS } from "@/lib/brand";
import interior from "@/assets/interior-1.jpg";

const TITLE = "Contact Sid Bhattal | eXp Realty South Australia";
const DESCRIPTION =
  "Call, email or message Sid Bhattal — Real Estate Agent with eXp Realty, servicing North-Eastern Adelaide and South Australia.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const channels = [
    { icon: Phone, label: "Call", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneRaw}` },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Message Sid", href: CONTACT.whatsapp },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation, not a commitment."
        lead={`${BRAND.jobTitle} · ${BRAND.agency}. ${BRAND.positioning}`}
        image={interior}
        alt="Quiet interior with morning light"
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Direct channels</Eyebrow>
            <SectionTitle>Reach me.</SectionTitle>
            <div className="mt-8 flex items-center gap-5 border-t border-border pt-6">
              <img
                src="/rea/sid-profile.jpg"
                alt={`${BRAND.fullName} — ${BRAND.jobTitle}, ${BRAND.agency}`}
                loading="lazy"
                width={96}
                height={120}
                className="h-24 w-20 shrink-0 object-cover object-top"
              />
              <div>
                <p className="text-lg font-semibold">{BRAND.fullName}</p>
                <p className="mt-0.5 text-sm opacity-65">
                  {BRAND.jobTitle} · {BRAND.agency}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-accent">
                  North-Eastern Adelaide &amp; SA-wide
                </p>
              </div>
            </div>
            <ul className="mt-8 space-y-8">
              {channels.map((c) => (
                <li key={c.label} className="border-t border-border pt-6">
                  <p className="eyebrow flex items-center gap-3 opacity-55">
                    <c.icon className="size-3.5" aria-hidden />
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-3 block break-all text-xl font-semibold hover:text-accent"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
              <li className="border-t border-border pt-6">
                <p className="eyebrow opacity-55">Social &amp; profile</p>
                <div className="mt-3 flex flex-col gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-semibold hover:text-accent"
                    >
                      {s.handle}
                    </a>
                  ))}
                  <a
                    href={CONTACT.blinq}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold hover:text-accent"
                  >
                    Digital business card
                  </a>
                </div>
              </li>
            </ul>
            <Notice>Office address and opening hours: {DATA_NOTICE}</Notice>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm
              id="contact-form"
              title="Send a message"
              subject="Website enquiry"
              intro="Sellers, buyers, investors and developers all welcome. I'll reply personally."
              fields={[
                {
                  name: "topic",
                  label: "What's this about",
                  type: "select",
                  required: true,
                  options: [
                    "Appraisal request",
                    "Buying enquiry",
                    "Off-market register",
                    "Land or development",
                    "Market or suburb question",
                    "Something else",
                  ],
                },
                { name: "suburb", label: "Suburb" },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
              submitLabel="Send message"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
