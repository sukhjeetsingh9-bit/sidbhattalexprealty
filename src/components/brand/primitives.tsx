import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ---------- Scroll reveal ---------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-shown={shown ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Layout ---------- */

export function Section({
  children,
  tone = "light",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "light" | "ink" | "stone";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 py-20 md:px-10 md:py-28 lg:py-32",
        tone === "ink" && "section-ink",
        tone === "stone" && "bg-muted",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-accent", className)}>
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
  as: As = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={cn(
        "mt-6 text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed opacity-75 md:text-xl", className)}>
      {children}
    </p>
  );
}

/* ---------- Actions ---------- */

const baseBtn =
  "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300";

export function CTA({
  to,
  href,
  children,
  variant = "solid",
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghostLight";
  className?: string;
}) {
  const styles = cn(
    baseBtn,
    variant === "solid" && "bg-foreground text-background hover:bg-accent",
    variant === "outline" &&
      "border border-current text-foreground hover:bg-foreground hover:text-background",
    variant === "ghostLight" && "border border-current/40 hover:bg-current/10",
    className,
  );

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={styles}>
      {children}
    </Link>
  );
}

/* ---------- Content blocks ---------- */

export function StatBlock({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="border-t border-current/15 pt-6">
      <p className="eyebrow opacity-60">{label}</p>
      <p className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">{value}</p>
      {detail ? <p className="mt-2 text-sm opacity-60">{detail}</p> : null}
    </div>
  );
}

export function NumberedCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div className="group border-t border-current/15 pt-8">
      <span className="eyebrow text-accent">{String(index).padStart(2, "0")}</span>
      <h3 className="mt-5 text-xl font-semibold md:text-2xl">{title}</h3>
      <p className="mt-4 text-[0.95rem] leading-relaxed opacity-70">{body}</p>
    </div>
  );
}

export function PropertyCard({
  image,
  suburb,
  headline,
  meta,
  status,
}: {
  image: string;
  suburb: string;
  headline: string;
  meta: string[];
  status: string;
}) {
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-muted">
        <img
          src={image}
          alt={`${headline} in ${suburb}`}
          loading="lazy"
          width={1200}
          height={900}
          className="aspect-4/3 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 bg-background/90 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-foreground">
          {status}
        </span>
      </div>
      <div className="pt-5">
        <p className="eyebrow text-accent">{suburb}</p>
        <h3 className="mt-3 text-xl font-semibold">{headline}</h3>
        <p className="mt-3 text-sm opacity-65">{meta.join("  ·  ")}</p>
      </div>
    </article>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 border-l-2 border-accent/60 pl-4 text-sm leading-relaxed opacity-60">
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  alt: string;
}) {
  return (
    <header className="section-ink relative overflow-hidden">
      <img
        src={image}
        alt={alt}
        width={1920}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle as="h1" className="max-w-4xl">
          {title}
        </SectionTitle>
        <Lead>{lead}</Lead>
      </div>
    </header>
  );
}
