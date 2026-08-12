import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Globe,
  Monitor,
  ShieldCheck,
  Users,
  Play,
  ArrowRight,
  Mail,
  Phone,
  Share2,
} from "lucide-react";
import {
  WHY_CARDS,
  BENEFIT_VIDEOS,
  BENEFIT_CARDS,
  TECH_LOGOS,
  BRAND_ITEMS,
  BRAND_PROMISES,
  RENT_ROLL,
  LUXURY,
  VALUES,
  TESTIMONIALS,
  MAILTO,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  BLINQ,
  SOCIALS,
} from "./data";

const ICONS = {
  dollar: DollarSign,
  trend: TrendingUp,
  globe: Globe,
  monitor: Monitor,
  shield: ShieldCheck,
  users: Users,
} as const;

export function SectionHeading({
  eyebrow,
  gold,
  rest,
  sub,
}: {
  eyebrow?: string;
  gold: string;
  rest?: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold leading-tight md:text-5xl">
        <span className="text-gold">{gold}</span>
        {rest ? <span className="text-foreground"> {rest}</span> : null}
      </h2>
      {sub ? <p className="mt-5 text-base leading-relaxed text-foreground/70 md:text-lg">{sub}</p> : null}
    </div>
  );
}

function YouTube({ id, title, autoplay = false }: { id: string; title: string; autoplay?: boolean }) {
  const params = autoplay
    ? `autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
    : "rel=0&modestbranding=1";
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface">
      <iframe
        src={`https://www.youtube.com/embed/${id}?${params}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full"
      />
    </div>
  );
}

export function WhyExp() {
  return (
    <section id="why-exp" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading
          gold="Why Entrepreneurial Agents"
          rest="Choose eXp"
          sub="We've reimagined what a real estate model should be. More freedom. More growth. More legacy. More you."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CARDS.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <article key={card.title} className="card-surface p-7 transition-colors hover:border-gold/40">
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-gold/10 text-gold">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ModelSection() {
  return (
    <section id="model" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          gold="The Model"
          rest="eXplained"
          sub="Find out in 10 minutes how eXp Realty has positively impacted and changed the trajectory of more than 83,000 agents' lives across the globe."
        />
        <div className="mt-12">
          <YouTube id="GeAYNV7ClCY" title="eXp Realty Australia — The Model Explained" />
        </div>
        <div className="mt-8 text-center">
          <a
            href={MAILTO}
            className="inline-flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            CONTACT
          </a>
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading eyebrow="Benefits" gold="Build Equity" rest="& Legacy at eXp" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {BENEFIT_VIDEOS.map((v) => (
            <div key={v.id}>
              <YouTube id={v.id} title={v.title} />
              <h3 className="mt-4 text-sm font-semibold tracking-wide text-foreground/85">{v.title}</h3>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {BENEFIT_CARDS.map((c) => (
            <article key={c.title} className="card-surface p-7">
              <h3 className="text-lg font-semibold text-gold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">{c.intro}</p>
              {c.bullets.length ? (
                <ul className="mt-4 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-foreground/70">
                      <span className="text-gold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-5 border-t border-border pt-4 text-xs uppercase tracking-[0.14em] text-foreground/55">
                {c.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechStack() {
  return (
    <section id="tech" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading
          gold="Technology"
          rest="That Powers You"
          sub="All your tech stack needs, rolled into one cost effective monthly subscription."
        />
        <p className="mt-5 text-center text-sm font-semibold tracking-[0.12em] text-gold">
          ALL SUBSCRIPTIONS INCLUDED IN YOUR MONTHLY $275 INVESTMENT.
        </p>

        <div className="card-surface mt-12 grid grid-cols-3 gap-6 p-8 sm:grid-cols-4 lg:grid-cols-6">
          {TECH_LOGOS.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-9 w-auto max-w-full object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="card-surface overflow-hidden">
            <img src="/site/microsite-preview.png" alt="AI generated microsite example" loading="lazy" className="w-full" />
            <div className="p-7">
              <h3 className="text-lg font-semibold">FREE AI Agent Sites</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Every agent receives a FREE AI-powered personal microsite — a stunning, auto-generated
                digital presence to showcase your brand and listings.
              </p>
              <a
                href="https://me.expaustralia.com.au/tim-hosking"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold"
              >
                View Example Site <ArrowRight className="size-4" />
              </a>
            </div>
          </article>
          <article className="card-surface overflow-hidden">
            <img src="/site/lyvve-preview.png" alt="Lyvve.com — The World Listed" loading="lazy" className="w-full" />
            <div className="p-7">
              <h3 className="text-lg font-semibold">The World Listed</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                All eXp Realty listings are automatically showcased on lyvve.com — giving your properties
                instant global exposure to international buyers.
              </p>
              <a
                href="https://lyvve.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold"
              >
                Explore Lyvve <ArrowRight className="size-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function YourBrand() {
  return (
    <section id="your-brand" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading
          eyebrow="Your Brand"
          gold="Your Brand."
          rest="Your Identity."
          sub="Keep your personal brand front and centre. Brand it with us or brand it your way. Either way, we are here to support you in building a business that reflects your integrity, knowledge, and the relationships you have worked hard to create."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BRAND_ITEMS.map((item) => (
            <article key={item.title} className="card-surface group overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BRAND_PROMISES.map((p) => (
            <div key={p.title} className="card-surface p-7 text-center">
              <h3 className="text-base font-semibold text-gold">{p.title}</h3>
              <p className="mt-3 text-sm text-foreground/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RentRoll() {
  return (
    <section id="rent-roll" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading
          eyebrow="Rent Roll"
          gold="Rent Roll"
          rest="Ownership"
          sub="Industry agents are taking control by building, scaling, and owning their own rent roll assets, without necessarily having to manage it themselves."
        />
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-foreground/60">
          We have 4 cutting edge tailored solutions for you to kickstart building and owning your own rent
          roll asset from this day forward.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {RENT_ROLL.map((r) => (
            <article key={r.n} className="card-surface p-7">
              <span className="text-3xl font-black text-gold/30">{r.n}</span>
              <h3 className="mt-4 text-base font-semibold">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{r.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Luxury() {
  return (
    <section id="global-luxury" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading
          eyebrow="Now Available in Australia"
          gold="eXp"
          rest="Luxury"
          sub="Join an elite global luxury division. Elevate your brand, access exclusive marketing tools, and connect with the world's top luxury agents."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {LUXURY.map((l) => (
            <article key={l.title} className="card-surface group relative overflow-hidden">
              <img
                src={l.src}
                alt={l.title}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-x-0 bottom-0 bg-background/80 p-6 backdrop-blur-sm">
                <h3 className="text-base font-semibold text-gold">{l.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">{l.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="https://join.expluxury.com/australia/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            LEARN MORE
          </a>
        </div>
      </div>
    </section>
  );
}

export function Culture() {
  return (
    <section id="culture" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading
          eyebrow="What Drives Us"
          gold="eXp Realty"
          rest="Core Values"
          sub="Our 9 core values are more than words, they shape our culture, drive our vision, and define how we collaborate, innovate, empower, and grow together."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <article key={v.title} className="card-surface flex items-center gap-5 p-6">
              <img src={v.src} alt={v.title} loading="lazy" className="size-16 shrink-0 rounded-md object-cover" />
              <div>
                <h3 className="text-sm font-bold tracking-[0.14em] text-gold">{v.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{v.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading
          eyebrow="Real Stories"
          gold="Agent"
          rest="Testimonials"
          sub="Hear directly from agents who made the move to eXp Realty and how it transformed their businesses and lives."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_320px]">
          <YouTube id={current?.id ?? TESTIMONIALS[0]!.id} title={current?.title ?? ""} />
          <div className="flex flex-col gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 rounded-md border px-5 py-4 text-left text-xs font-semibold tracking-[0.12em] transition-colors ${
                  i === active
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-border bg-surface text-foreground/70 hover:border-gold/30"
                }`}
              >
                <Play className="size-4 shrink-0" />
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div className="purple-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <SectionHeading
          gold="Ready To"
          rest="Collaborate?"
          sub="Take the step to go into business for yourself, yet never by yourself. More freedom, more income, more equity, more balance, and more control. Book a confidential consultation today."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <a href={MAILTO} className="card-surface flex flex-col items-center gap-3 p-7 hover:border-gold/40">
            <Mail className="size-5 text-gold" />
            <span className="text-xs font-semibold tracking-[0.16em]">EMAIL US</span>
            <span className="text-xs text-foreground/60">{CONTACT_EMAIL}</span>
          </a>
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="card-surface flex flex-col items-center gap-3 p-7 hover:border-gold/40"
          >
            <Phone className="size-5 text-gold" />
            <span className="text-xs font-semibold tracking-[0.16em]">CALL US</span>
            <span className="text-xs text-foreground/60">{CONTACT_PHONE}</span>
          </a>
          <a
            href={BLINQ}
            target="_blank"
            rel="noreferrer"
            className="card-surface flex flex-col items-center gap-3 p-7 hover:border-gold/40"
          >
            <Share2 className="size-5 text-gold" />
            <span className="text-xs font-semibold tracking-[0.16em]">CONNECT ALL CHANNELS</span>
            <span className="text-xs text-foreground/60">blinq.me</span>
          </a>
        </div>
        <a
          href={MAILTO}
          className="mt-10 inline-flex rounded-md bg-gold px-9 py-4 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
        >
          CONTACT
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-4 lg:px-8">
        <img src="/site/exp-realty-logo.png" alt="eXp Realty" className="h-8 w-auto" />
        <div className="flex flex-wrap items-center justify-center gap-5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium tracking-[0.14em] text-foreground/60 transition-colors hover:text-gold"
            >
              {s.label.toUpperCase()}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs tracking-[0.14em] text-foreground/50">
          <a href={MAILTO} className="hover:text-gold">
            CONTACT
          </a>
          <a href="https://lifeatexp.com.au/privacy/" target="_blank" rel="noreferrer" className="hover:text-gold">
            PRIVACY POLICY
          </a>
        </div>
        <p className="text-xs text-foreground/40">© {new Date().getFullYear()} eXp Realty. All rights reserved.</p>
      </div>
    </footer>
  );
}
