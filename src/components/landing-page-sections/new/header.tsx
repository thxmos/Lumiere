import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          YourBrand
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="#features"
                className="text-gray-600 hover:text-primary"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-primary"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-primary"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>
        <Button asChild>
          <Link href="#cta">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
