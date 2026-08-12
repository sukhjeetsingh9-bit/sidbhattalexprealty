import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, MAILTO, BLINQ } from "./data";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 lg:px-8">
        <a href="#top" className="shrink-0">
          <img src="/site/exp-realty-logo.png" alt="eXp Realty" className="h-8 w-auto" />
        </a>

        <nav className="ml-4 hidden flex-1 items-center gap-4 xl:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium tracking-[0.08em] text-foreground/70 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <a
            href={MAILTO}
            className="rounded-md bg-gold px-5 py-2.5 text-[13px] font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            CONTACT
          </a>
          <a
            href={BLINQ}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-purple px-5 py-2.5 text-[13px] font-semibold tracking-wide text-secondary-foreground transition-opacity hover:opacity-90"
          >
            PARTNER WITH ME
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto text-foreground xl:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 pb-6 pt-2 xl:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-xs font-medium tracking-[0.12em] text-foreground/80"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={MAILTO}
              className="rounded-md bg-gold px-5 py-3 text-center text-[13px] font-semibold text-primary-foreground"
            >
              CONTACT
            </a>
            <a
              href={BLINQ}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-purple px-5 py-3 text-center text-[13px] font-semibold text-secondary-foreground"
            >
              PARTNER WITH ME
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
