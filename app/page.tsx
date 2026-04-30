import dynamic from "next/dynamic";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";

const StatsBar = dynamic(() => import("@/components/sections/StatsBar"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Product = dynamic(() => import("@/components/sections/Product"));
const WhyBlackLynx = dynamic(() => import("@/components/sections/WhyBlackLynx"));
const Vision = dynamic(() => import("@/components/sections/Vision"));
const EarlyAccess = dynamic(() => import("@/components/sections/EarlyAccess"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <HowItWorks />
        <Product />
        <WhyBlackLynx />
        <Vision />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
