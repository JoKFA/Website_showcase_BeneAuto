import { TrustSignals, Testimonials } from "@/components/domain/trust";
import {
  CtaSection,
  FeaturedFleetSection,
  HeroSection,
  WhyChooseUsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="bg-neutral-50">
      <HeroSection />
      <FeaturedFleetSection />
      <TrustSignals />
      <Testimonials />
      <WhyChooseUsSection />
      <CtaSection />
    </main>
  );
}
