import { Button } from "@/modules/shared/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section id="cta" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers and start seeing results today.
          Try our solution risk-free with a 30-day money-back guarantee.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="text-lg px-8 py-6"
        >
          <Link href="/signup">Start Your Free Trial</Link>
        </Button>
      </div>
    </section>
  );
}
