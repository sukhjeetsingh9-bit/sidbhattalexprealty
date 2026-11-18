import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ChatWidget } from "@/components/brand/ChatWidget";
import { Toaster } from "@/components/ui/sonner";
import { BRAND, CONTACT, SOCIALS, SUBURBS } from "@/lib/brand";
import { REA, REA_RATING } from "@/lib/rea";
import { reportLovableError } from "../lib/lovable-error-reporting";

const SITE_URL = "https://adelaideproperty.life";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const REAL_ESTATE_AGENT_LD_JSON = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: `${BRAND.fullName} | ${BRAND.agency}`,
  description:
    "Sid Bhattal, Real Estate Agent with eXp Realty (RLA 300185). North-Eastern Adelaide expertise with South Australia-wide reach.",
  url: SITE_URL,
  image: `${SITE_URL}/rea/sid-profile.jpg`,
  telephone: CONTACT.phoneRaw,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
  areaServed: SUBURBS.map((s) => ({
    "@type": "Place",
    name: `${s.name}, South Australia`,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: REA_RATING.score.toFixed(1),
    reviewCount: String(REA_RATING.count),
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [REA.profileUrl, ...SOCIALS.map((s) => s.href)],
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sid Bhattal | North-Eastern Adelaide Real Estate Agent" },
      {
        name: "description",
        content:
          "Sid Bhattal, Real Estate Agent with eXp Realty. North-Eastern Adelaide expertise with South Australia-wide reach.",
      },
      { name: "author", content: "Sid Bhattal" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sid Bhattal | eXp Realty" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: REAL_ESTATE_AGENT_LD_JSON }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const removeBadge = () => {
      document.getElementById("lovable-badge")?.remove();
    };
    removeBadge();
    const observer = new MutationObserver(removeBadge);
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <ChatWidget />
      <Toaster />
    </QueryClientProvider>
  );
}
