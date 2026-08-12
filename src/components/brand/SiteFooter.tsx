import { Link } from "@tanstack/react-router";

import { BRAND, CONTACT, NAV, SOCIALS } from "@/lib/brand";
import { REA } from "@/lib/rea";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-ink px-6 pb-10 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-14 border-b border-current/15 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-semibold uppercase tracking-[0.24em]">{BRAND.fullName}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-65">
              {BRAND.jobTitle} · {BRAND.agency}. {BRAND.positioning}
            </p>
            <a
              href={CONTACT.blinq}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-current/40 px-5 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-current/10"
            >
              Save my digital card
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow opacity-50">Explore</p>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow opacity-50">Connect</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`tel:${CONTACT.phoneRaw}`} className="opacity-70 hover:opacity-100">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="break-all opacity-70 hover:opacity-100">
                  {CONTACT.email}
                </a>
              </li>
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-70 hover:opacity-100"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[0.6875rem] uppercase tracking-[0.18em] opacity-45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BRAND.fullName} · {BRAND.agency}
          </p>
          <p>
            {REA.agencyName.replace(" - SA (RLA300185)", " SA")} · {REA.licence} ·{" "}
            <a href={REA.profileUrl} target="_blank" rel="noreferrer" className="hover:opacity-100">
              REA profile
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
