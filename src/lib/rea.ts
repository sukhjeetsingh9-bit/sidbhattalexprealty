/**
 * Verified realestate.com.au (REA) data for Sid Bhattal.
 *
 * SOURCE OF TRUTH: https://www.realestate.com.au/agent/sid-bhattal-3321760
 * REA does not offer a public API for agent profiles, so this file mirrors the
 * public profile. To refresh: open the profile above and update the values here.
 * NEVER invent reviews, ratings, prices, sold results or property details.
 *
 * Review text shown on the REA profile is truncated by REA itself; where that is
 * the case `truncated: true` renders a "read the full review on REA" link.
 */

export const REA = {
  agentId: "3321760",
  profileUrl: "https://www.realestate.com.au/agent/sid-bhattal-3321760",
  reviewsUrl: "https://www.realestate.com.au/agent/sid-bhattal-3321760",
  appraisalUrl: "https://www.realestate.com.au/appraisal?agentIds=3321760",
  agencyName: "eXp Real Estate Australia - SA (RLA300185)",
  agencyUrl: "https://www.realestate.com.au/agency/exp-real-estate-australia-sa-rla300185-QARHNN",
  licence: "RLA 300185",
  /** Date this file was last reconciled against the REA profile (UTC). */
  sourcedOn: "12 August 2026",
  sourceLabel: "Source: realestate.com.au agent profile",
} as const;

export const REA_RATING = {
  score: 5.0,
  count: 10,
} as const;

/** Performance snapshot published by REA (last 12 months). */
export const REA_SNAPSHOT = [
  { label: "Median sold price", value: "$701k" },
  { label: "Median days advertised", value: "29" },
  { label: "Properties sold (lead agent)", value: "7" },
  { label: "Properties sold (secondary agent)", value: "3" },
] as const;

export type ReaListing = {
  id: string;
  status: "For sale" | "Sold";
  price: string;
  address: string;
  suburb: string;
  propertyType: string;
  beds?: number;
  baths?: number;
  cars?: number;
  landSize?: string;
  soldDate?: string;
  image?: string;
  url: string;
};

/**
 * Current listings for sale, exactly as published on realestate.com.au.
 * Add/remove entries here as campaigns go live or settle.
 */
export const REA_FOR_SALE: ReaListing[] = [
  {
    id: "204611544",
    status: "For sale",
    price: "Best Offers",
    address: "Lot 21, 1 Monty Road",
    suburb: "Valley View, SA 5093",
    propertyType: "Residential land",
    landSize: "381m² (approx)",
    image: "/rea/valley-view-lot21.jpg",
    url: "https://www.realestate.com.au/property-residential+land-sa-valley+view-204611544",
  },
];

/** Recently sold, exactly as published on the REA profile. */
export const REA_SOLD: ReaListing[] = [
  {
    id: "150714236",
    status: "Sold",
    price: "$650,000",
    address: "13 Anson Street East",
    suburb: "Blair Athol, SA",
    propertyType: "House",
    beds: 2,
    baths: 1,
    cars: 2,
    soldDate: "Sold 10 Apr 2026",
    image: "/rea/blair-athol.jpg",
    url: "https://www.realestate.com.au/sold/property-house-sa-blair+athol-150714236",
  },
  {
    id: "150040364",
    status: "Sold",
    price: "$920,000",
    address: "51a Wandana Avenue",
    suburb: "Gilles Plains, SA",
    propertyType: "House",
    beds: 4,
    baths: 2,
    cars: 3,
    soldDate: "Sold 13 Mar 2026",
    image: "/rea/gilles-plains.jpg",
    url: "https://www.realestate.com.au/sold/property-house-sa-gilles+plains-150040364",
  },
  {
    id: "150885940",
    status: "Sold",
    price: "$770,000",
    address: "8 Folkstone Street",
    suburb: "Modbury Heights, SA",
    propertyType: "House",
    beds: 3,
    baths: 1,
    cars: 0,
    soldDate: "Sold 09 Feb 2026",
    image: "/rea/modbury-heights.jpg",
    url: "https://www.realestate.com.au/sold/property-house-sa-modbury+heights-150885940",
  },
];

export const REA_SOLD_TOTAL = 10;

export type ReaReview = {
  score: number;
  verified: true;
  role: string;
  when: string;
  body: string;
  truncated?: boolean;
};

/** Latest verified reviews published on the REA profile. */
export const REA_REVIEWS: ReaReview[] = [
  {
    score: 5.0,
    verified: true,
    role: "Seller of house in Modbury Heights, SA",
    when: "2 months ago",
    body: "Open and approachable right from the start. Exceeded all expectations!",
  },
  {
    score: 5.0,
    verified: true,
    role: "Seller of house in Gilles Plains, SA",
    when: "3 months ago",
    body: "We had an excellent customer service experience, including outstanding after-sale support for our property. Sid went above and beyond to help us sell …",
    truncated: true,
  },
  {
    score: 5.0,
    verified: true,
    role: "Buyer of retirement living in Smithfield, SA",
    when: "5 months ago",
    body: "Sid was a wonderful agent, very friendly, professional & knowledgeable. He dealt with any issues we had & I'm very happy in my new home he sold me. T…",
    truncated: true,
  },
];

export const REA_DISCLAIMER =
  "Ratings, reviews and sold results are published by realestate.com.au and cover the last 12 months as lead and secondary agent. They may not include off-market or private sales.";
