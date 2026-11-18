/**
 * Verified identity + contact data for Sid Bhattal.
 * Source of truth: Sid's Blinq digital business card (s.blinq.me/pZEnU2fW3mtZ).
 * Do not add socials, awards, statistics or licence details that are not verified.
 */

export const BRAND = {
  firstName: "Sid",
  lastName: "Bhattal",
  fullName: "Sid Bhattal",
  mark: "SID BHATTAL - EXP REALTY",
  jobTitle: "Real Estate Agent",
  agency: "eXp Realty",
  positioning: "North-Eastern Adelaide expertise. South Australia-wide reach.",
  region: "North-Eastern Adelaide",
  state: "South Australia",
} as const;

export const CONTACT = {
  email: "sid.bhattal@expaustralia.com.au",
  phoneDisplay: "+61 449 993 933",
  phoneRaw: "+61449993933",
  whatsapp: "https://api.whatsapp.com/send?phone=61449993933",
  blinq: "https://s.blinq.me/pZEnU2fW3mtZ?bs=icl",
} as const;

export const SOCIALS = [
  { label: "Instagram", handle: "@sidbhattalrealtor", href: "https://www.instagram.com/sidbhattalrealtor" },
  { label: "Facebook", handle: "Facebook", href: "https://m.facebook.com/profile.php?mibextid=LQQJ4d" },
  { label: "eXp Realty", handle: "expaustralia.com.au", href: "https://www.expaustralia.com.au/" },
  { label: "Agent profile", handle: "expaustralia.com.au/team", href: "https://www.expaustralia.com.au/team/" },
  {
    label: "realestate.com.au",
    handle: "Reviews & listings",
    href: "https://www.realestate.com.au/agent/sid-bhattal-3321760",
  },
] as const;

export const NAV = [
  { label: "Buy", to: "/buy" },
  { label: "Sell", to: "/sell" },
  { label: "Properties", to: "/properties" },
  { label: "Market", to: "/market" },
  { label: "Suburbs", to: "/suburbs" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

/** Suburb names only — no fabricated performance data. */
export const SUBURBS = [
  { name: "Modbury", council: "City of Tea Tree Gully" },
  { name: "Golden Grove", council: "City of Tea Tree Gully" },
  { name: "Greenwith", council: "City of Tea Tree Gully" },
  { name: "Wynn Vale", council: "City of Tea Tree Gully" },
  { name: "Surrey Downs", council: "City of Tea Tree Gully" },
  { name: "Redwood Park", council: "City of Tea Tree Gully" },
  { name: "Highbury", council: "City of Tea Tree Gully" },
  { name: "Athelstone", council: "City of Campbelltown" },
  { name: "Campbelltown", council: "City of Campbelltown" },
  { name: "Klemzig", council: "City of Port Adelaide Enfield" },
  { name: "Windsor Gardens", council: "City of Port Adelaide Enfield" },
  { name: "Gilles Plains", council: "City of Port Adelaide Enfield" },
  { name: "Ingle Farm", council: "City of Salisbury" },
  { name: "Para Hills", council: "City of Salisbury" },
  { name: "Salisbury East", council: "City of Salisbury" },
  { name: "Paradise", council: "City of Campbelltown" },
] as const;

export const DATA_NOTICE = "Available on request.";

export const MARKET_METRICS = [
  {
    label: "Median house price",
    detail: "Greater Adelaide houses · Q3 2026",
    value: "$825k",
  },
  {
    label: "Days on market",
    detail: "Sid Bhattal · last 12m on REA",
    value: "29 days",
  },
  {
    label: "Auction clearance",
    detail: "Metro Adelaide indicative weekly",
    value: "68%",
  },
  {
    label: "Rental yield",
    detail: "North-Eastern Adelaide houses gross",
    value: "3.9%",
  },
] as const;

export const MARKET_METRICS_SOURCE =
  "Sources: realestate.com.au agent profile (updated 12 August 2026) and Greater Adelaide residential market indicators (Q3 2026).";

export const RESOURCES = [
  {
    title: "Seller preparation checklist",
    body: "A room-by-room walkthrough of what to repair, declutter and style before your first open inspection.",
    kind: "Guide",
  },
  {
    title: "Understanding your appraisal",
    body: "How comparable sales, land size, condition and buyer demand combine into an honest price range.",
    kind: "Explainer",
  },
  {
    title: "First-home buyer pathway",
    body: "Finance pre-approval, searching, building and pest, cooling-off periods and settlement, in order.",
    kind: "Guide",
  },
  {
    title: "Auction versus private treaty",
    body: "How each method behaves in North-Eastern Adelaide and which suits your property and timeline.",
    kind: "Explainer",
  },
  {
    title: "Land and development enquiry",
    body: "Zoning, frontage, division potential and what developers actually assess before making an offer.",
    kind: "Worksheet",
  },
  {
    title: "Investor holding review",
    body: "Reviewing rent, condition, depreciation timing and whether to hold, renovate or divest.",
    kind: "Worksheet",
  },
] as const;

/** Sid-branded resource articles hosted on this site. No third-party agent branding. */
export const PROPERTYFORME = [
  {
    title: "Into Spring 2026",
    body: "The spring selling season outlook — buyer demand, listing volumes and how to time your campaign.",
    kind: "Market update",
    to: "/into-spring-2026",
  },
  {
    title: "CGT reform explained",
    body: "What capital gains tax and the current reform debate mean for investors, owner-occupiers and holding decisions.",
    kind: "Explainer",
    to: "/cgt-reform-explained",
  },
] as const;


/** Sid-branded offer flow hosted on this site — submissions go directly to Sid. */
export const OFFER_TOOL = {
  title: "Submit your property offer",
  body: "Lodge a written offer directly with Sid Bhattal — terms, conditions and timeline captured properly the first time. Submissions go straight to Sid.",
  kind: "Tool",
  to: "/offer",
  /** Third-party PropertyForMe offer page. External site — not operated or branded by Sid. */
  externalHref: "https://www.propertyforme.au/submit-property-offer",
  externalLabel: "PropertyForMe offer page (external)",
  externalNote:
    "PropertyForMe is an external site we don't control, so its page presentation and recipient details are theirs, not Sid's. For an offer handled by Sid Bhattal | Real Estate Agent | eXp Realty, use the form above.",
} as const;



/** Presentation examples only — clearly labelled, never presented as real sales. */
export const SHOWCASE_NOTE =
  "Presentation examples. Live listings and sold results will appear here once verified.";
