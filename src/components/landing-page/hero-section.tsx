import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/utils/constants/constants";
import Link from "next/link";
import { ParallaxLayout } from "./parallax-layout";

export default function HeroSection() {
  return (
    <ParallaxLayout>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Manage your links with {APP_NAME}
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Create your personalized profile page to showcase all your
              important links in one place. Share your social media, portfolio,
              music, and more with a single, customizable URL.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/auth" passHref>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </ParallaxLayout>
  );
}
