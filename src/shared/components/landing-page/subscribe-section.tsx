import Link from "next/link";
import { Button } from "@components/ui/button";
import { SparklesIcon } from "lucide-react";

const SubscribeSection = () => {
  return (
    <div className="min-h-96 bg-black/[0.96] p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join today and get a free profile page.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <Link href="/auth">
            <Button>
              <SparklesIcon className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
