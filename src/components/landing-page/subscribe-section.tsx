import Link from "next/link";
import { Button } from "../ui/button";
import { ParallaxLayout } from "./parallax-layout";

const SubscribeSection = () => {
  return (
    <ParallaxLayout>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join today and get a free profile page.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </ParallaxLayout>
  );
};

export default SubscribeSection;
