import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero, Marquee } from "@/components/site/Hero";
import { Calculator, GlobalStats } from "@/components/site/Calculator";
import {
  WhyExp,
  ModelSection,
  Benefits,
  TechStack,
  YourBrand,
  RentRoll,
  Luxury,
  Culture,
  Testimonials,
  Contact,
  Footer,
} from "@/components/site/Sections";
import { ChatWidget } from "@/components/site/ChatWidget";

const TITLE = "The Model eXplained | eXp Realty Australia";
const DESCRIPTION =
  "Discover a smarter way to build your real estate business. Earn more, scale faster, and create long term income through a modern, agent first model.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <WhyExp />
        <ModelSection />
        <Calculator />
        <GlobalStats />
        <Benefits />
        <TechStack />
        <YourBrand />
        <RentRoll />
        <Luxury />
        <Culture />
        <Testimonials />
        <Contact />
        <Marquee />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
