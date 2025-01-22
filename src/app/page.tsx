import Footer from "@/components/landing-page-sections/footer";
import FeaturesSection from "@/components/landing-page-sections/features-section";
import HeroSection from "@/components/landing-page-sections/hero-section";
import SubscribeSection from "@/components/landing-page-sections/subscribe-section";
import Navbar from "@/components/nav-bar/nav-bar";

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
