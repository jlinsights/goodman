import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import ServicesShowcase from "@/components/ServicesShowcase";
import GSASection from "@/components/GSASection";
import PartnerHubSection from "@/components/PartnerHubSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBadges />
      <ServicesShowcase />
      <GSASection />
      <PartnerHubSection />
      <ContactSection />
    </main>
  );
}
