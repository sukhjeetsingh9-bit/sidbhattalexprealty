import { CTA, Eyebrow, Notice, Reveal, Section, SectionTitle } from "@/components/brand/primitives";
import {
  REA,
  REA_DISCLAIMER,
  REA_FOR_SALE,
  REA_RATING,
  REA_REVIEWS,
  REA_SOLD,
  REA_SOLD_TOTAL,
  type ReaListing,
  type ReaReview,
} from "@/lib/rea";
import { cn } from "@/lib/utils";

/* ---------- Stars ---------- */

function Stars({ score, className }: { score: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 text-accent", className)}
      aria-label={`${score} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            fill={i < Math.round(score) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
            d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"
          />
        </svg>
      ))}
    </span>
  );
}

/* ---------- Listings ---------- */

export function ListingCard({ listing }: { listing: ReaListing }) {
  const specs = [
    listing.beds != null ? `${listing.beds} bed` : null,
    listing.baths != null ? `${listing.baths} bath` : null,
    listing.cars != null ? `${listing.cars} car` : null,
    listing.landSize ?? null,
  ].filter(Boolean) as string[];

  return (
    <article className="group">
      <a href={listing.url} target="_blank" rel="noreferrer" className="block">
        <div className="relative overflow-hidden bg-muted">
          {listing.image ? (
            <img
              src={listing.image}
              alt={`${listing.address}, ${listing.suburb}`}
              loading="lazy"
              width={800}
              height={480}
              className="aspect-4/3 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="aspect-4/3 w-full" />
          )}
          <span className="absolute left-4 top-4 bg-background/90 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-foreground">
            {listing.status}
          </span>
        </div>
        <div className="pt-5">
          <p className="eyebrow text-accent">{listing.suburb}</p>
          <h3 className="mt-3 text-xl font-semibold">{listing.address}</h3>
          <p className="mt-2 text-lg font-semibold">{listing.price}</p>
          <p className="mt-3 text-sm opacity-65">
            {[listing.propertyType, ...specs].join("  ·  ")}
          </p>
          {listing.soldDate ? (
            <p className="mt-2 text-xs uppercase tracking-[0.18em] opacity-50">
              {listing.soldDate}
            </p>
          ) : null}
          <span className="mt-5 inline-block border-b border-current/40 pb-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em] opacity-70 transition-opacity group-hover:opacity-100">
            View on realestate.com.au
          </span>
        </div>
      </a>
    </article>
  );
}

export function ForSaleSection({ tone = "light" }: { tone?: "light" | "ink" | "stone" }) {
  return (
    <Section tone={tone} id="for-sale">
      <Reveal>
        <Eyebrow>Properties for sale</Eyebrow>
        <SectionTitle>Currently on the market.</SectionTitle>
      </Reveal>
      {REA_FOR_SALE.length ? (
        <>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {REA_FOR_SALE.map((l, i) => (
              <Reveal key={l.id} delay={i * 100}>
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <CTA href={REA.profileUrl} variant="outline" className="mt-14">
              View all listings on realestate.com.au
            </CTA>
          </Reveal>
        </>
      ) : (
        <Reveal delay={100}>
          <div className="mt-14 border-t border-current/15 pt-8">
            <p className="max-w-2xl text-lg leading-relaxed opacity-75">
              There are currently no publicly advertised properties for sale under Sid Bhattal on
              realestate.com.au. New campaigns appear here as soon as they go live — and several
              properties are handled off-market before they are advertised.
            </p>
            <CTA href={REA.profileUrl} variant="outline" className="mt-8">
              View Sid's live REA profile
            </CTA>
          </div>
        </Reveal>
      )}
      <Notice>
        {REA.sourceLabel} · updated {REA.sourcedOn}. {REA_DISCLAIMER}
      </Notice>
    </Section>
  );
}

export function RecentlySoldSection({
  tone = "stone",
  limit,
}: {
  tone?: "light" | "ink" | "stone";
  limit?: number;
}) {
  const listings = limit ? REA_SOLD.slice(0, limit) : REA_SOLD;

  return (
    <Section tone={tone} id="recently-sold">
      <Reveal>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Recently sold</Eyebrow>
            <SectionTitle>Verified results, straight from REA.</SectionTitle>
          </div>
          <a
            href={REA.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 border-b border-current/40 pb-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em] opacity-70 hover:opacity-100"
          >
            All {REA_SOLD_TOTAL} sold properties
          </a>
        </div>
      </Reveal>
      <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l, i) => (
          <Reveal key={l.id} delay={i * 100}>
            <ListingCard listing={l} />
          </Reveal>
        ))}
      </div>
      <Notice>
        {REA.sourceLabel} · updated {REA.sourcedOn}. {REA_DISCLAIMER}
      </Notice>
    </Section>
  );
}

/* ---------- Reviews ---------- */

function ReviewCard({ review }: { review: ReaReview }) {
  return (
    <figure className="flex h-full flex-col border-t border-current/15 pt-8">
      <div className="flex items-center gap-3">
        <Stars score={review.score} />
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] opacity-55">
          Verified review
        </span>
      </div>
      <blockquote className="mt-6 flex-1 text-lg leading-relaxed">{review.body}</blockquote>
      {review.truncated ? (
        <a
          href={REA.reviewsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Read the full review on REA
        </a>
      ) : null}
      <figcaption className="mt-6 text-sm opacity-60">
        {review.role} · {review.when}
      </figcaption>
    </figure>
  );
}

export function ReviewsSection({ tone = "light" }: { tone?: "light" | "ink" | "stone" }) {
  return (
    <Section tone={tone} id="reviews">
      <Reveal>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>What my clients say</Eyebrow>
            <SectionTitle>{REA_RATING.score.toFixed(1)} from {REA_RATING.count} verified reviews.</SectionTitle>
            <div className="mt-6 flex items-center gap-3">
              <Stars score={REA_RATING.score} className="scale-125 origin-left" />
              <span className="text-sm opacity-65">
                Rated on realestate.com.au
              </span>
            </div>
          </div>
          <a
            href={REA.reviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 border-b border-current/40 pb-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em] opacity-70 hover:opacity-100"
          >
            View all reviews on REA
          </a>
        </div>
      </Reveal>
      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {REA_REVIEWS.map((r, i) => (
          <Reveal key={r.role + r.when} delay={i * 100}>
            <ReviewCard review={r} />
          </Reveal>
        ))}
      </div>
      <Notice>
        {REA.sourceLabel} · updated {REA.sourcedOn}. Reviews are collected and verified by
        realestate.com.au, not by this website.
      </Notice>
    </Section>
  );
}
