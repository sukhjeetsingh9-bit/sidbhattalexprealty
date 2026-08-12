import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BRAND, CONTACT, NAV } from "@/lib/brand";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "border-b border-border bg-background/95 text-foreground backdrop-blur"
            : "text-ink-foreground"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="flex items-baseline gap-3" onClick={() => setOpen(false)}>
            <span className="text-base font-semibold uppercase tracking-[0.3em]">
              {BRAND.lastName}
            </span>
            <span className="hidden text-[0.625rem] font-medium uppercase tracking-[0.28em] opacity-60 sm:inline">
              {BRAND.agency}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] opacity-70 transition-opacity hover:opacity-100"
                activeProps={{ className: "opacity-100 text-accent" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="hidden items-center gap-2 border border-current/40 px-4 py-2.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-current/10 md:inline-flex"
            >
              <Phone className="size-3.5" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center border border-current/30 lg:hidden"
            >
              {open ? <Menu className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink text-ink-foreground lg:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-base font-semibold uppercase tracking-[0.3em]">
              {BRAND.lastName}
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center border border-current/30"
            >
              <X className="size-4" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-16">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-current/10 py-4 text-2xl font-semibold tracking-tight"
                activeProps={{ className: "text-accent" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="mt-8 inline-flex items-center justify-center gap-2 border border-current/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              <Phone className="size-3.5" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
