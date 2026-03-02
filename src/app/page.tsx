import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { Integrations } from "@/components/landing/Integrations";
import { Navbar } from "@/components/landing/Navbar";
import { PricingSection } from "@/components/landing/PricingSection";

export default function Homepage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Integrations/>
      <Footer />
      {/* <div>Home Page</div>
      <Link className="mt-10" href={"sign-in"}>
        Login
      </Link>
      <Link className="mt-5" href={"admin-dashboard"}>
        Dashboard
      </Link> */}
    </div>
  );
}
