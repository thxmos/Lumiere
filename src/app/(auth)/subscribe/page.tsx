import { APP_NAME } from "@/config/constants/app";
import Navbar from "@/shared/components/layouts/nav-bar";
import Pricing from "@/app/dashboard/user-settings/pricing/pricing";

export default function SubscribePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {APP_NAME} Subscription Plans
            </h1>
            <p className="text-xl text-muted-foreground">
              Boost your productivity with our amazing tools
            </p>
          </header>
          <Pricing />
        </main>
      </div>
    </>
  );
}
