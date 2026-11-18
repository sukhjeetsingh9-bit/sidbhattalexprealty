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
  sourcedOn: "November 2026",
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
  status: "For sale" | "Under offer" | "Sold";
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
 * Current listings for sale on realestate.com.au.
 * All previous campaigns (Monty Rd, Wright Rd, Cowled St, Edward St, Rodam Ct) have now been
 * sold or completed and moved to REA_SOLD below so no dead `/property-...` links appear.
 */
export const REA_FOR_SALE: ReaListing[] = [];


/** Recently sold & completed campaigns, linked to their REA sold records or live agent profile. */
export const REA_SOLD: ReaListing[] = [
  {
    id: "204611544",
    status: "Sold",
    price: "$536,000",
    address: "Lot 21, 1 Monty Road",
    suburb: "Valley View, SA 5093",
    propertyType: "Residential land",
    landSize: "381m² (approx)",
    soldDate: "Sold Aug 2026",
    image: "/rea/valley-view-lot21.jpg",
    url: "https://www.realestate.com.au/sold/property-residential+land-sa-valley+view-204611544",
  },
  {
    id: "204419232",
    status: "Sold",
    price: "$75,000",
    address: "22 Cowled Street",
    suburb: "Whyalla Norrie, SA 5608",
    propertyType: "Residential land",
    landSize: "471m²",
    soldDate: "Sold Jun 2026",
    image: "/rea/whyalla-norrie-22.jpg",
    url: "https://www.realestate.com.au/sold/property-residential+land-sa-whyalla+norrie-204419232",
  },
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
  {
    id: "151810124",
    status: "Sold",
    price: "Sold",
    address: "3 Rodam Court",
    suburb: "Parafield Gardens, SA 5107",
    propertyType: "House",
    beds: 3,
    baths: 2,
    cars: 4,
    landSize: "814m²",
    soldDate: "Campaign completed",
    image: "/rea/parafield-gardens-3.jpg",
    url: "https://www.realestate.com.au/agent/sid-bhattal-3321760",
  },
  {
    id: "204445192",
    status: "Sold",
    price: "Sold",
    address: "285 Wright Road",
    suburb: "Valley View, SA 5093",
    propertyType: "Residential land",
    landSize: "683m²",
    soldDate: "Campaign completed",
    image: "/rea/wright-285.jpg",
    url: "https://www.realestate.com.au/agent/sid-bhattal-3321760",
  },
  {
    id: "204445204",
    status: "Sold",
    price: "Sold",
    address: "285A Wright Road",
    suburb: "Valley View, SA 5093",
    propertyType: "Residential land",
    soldDate: "Campaign completed",
    image: "/rea/wright-285a.jpg",
    url: "https://www.realestate.com.au/agent/sid-bhattal-3321760",
  },
  {
    id: "204354868",
    status: "Sold",
    price: "Sold",
    address: "Lot 53, 10-16 Edward Street",
    suburb: "Mannum, SA 5238",
    propertyType: "Residential land",
    landSize: "804.64m²",
    soldDate: "Campaign completed",
    image: "/rea/mannum-lot53.jpg",
    url: "https://www.realestate.com.au/agent/sid-bhattal-3321760",
  },
];

export const REA_SOLD_TOTAL = 12;

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
