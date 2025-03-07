import Footer from "@/shared/components/landing-page/footer";
import FeaturesSection from "@/shared/components/landing-page/features-section";
import HeroSection from "@/shared/components/landing-page/hero-section";
import SubscribeSection from "@/shared/components/landing-page/subscribe-section";
import Navbar from "@/shared/components/layouts/nav-header/nav-bar";

export default async function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-background text-foreground overflow-scroll w-full">
        <main className="flex-1 mb-16">
          <HeroSection />
          <FeaturesSection />
          <SubscribeSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
