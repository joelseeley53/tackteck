import { createFileRoute } from "@tanstack/react-router";

import ogImage from "@/assets/og-tacktech.jpg.asset.json";
import {
  About,
  CtaBand,
  Contact,
  FiveTs,
  Footer,
  Hero,
  Navbar,
  Problem,
  Process,
  Services,
  WhoWeServe,
  WhyTackTech,
  Work,
} from "@/components/landing-sections";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/")({
  loader: () => getRequestOrigin(),
  component: Index,
  head: ({ loaderData }) => {
    const imageUrl = `${loaderData}${ogImage.url}`;
    const description = "TackTech designs and builds practical digital systems for organisations, businesses and institutions in Kenya.";
    return {
      meta: [
        { title: "TackTech | Technology with Purpose" },
        { name: "description", content: description },
        { property: "og:title", content: "TackTech | Technology with Purpose" },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { property: "og:image", content: imageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "TackTech | Technology with Purpose" },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: "/" }],
    };
  },
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Process />
        <Work />
        <WhyTackTech />
        <WhoWeServe />
        <FiveTs />
        <About />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
