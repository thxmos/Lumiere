import Link from "next/link";
import { SunMoonIcon } from "lucide-react";
import { APP_NAME } from "@/constants/app";
import DropdownMenu from "./nav-bar-menu";
import { validateServerSession } from "@/utils/security/auth";

const Navbar = async () => {
  const user = await validateServerSession();

  const navLinks = [
    {
      name: "Features",
      url: "/#features",
    },
    {
      name: "Pricing",
      url: "/#pricing",
    },
    {
      name: "Contact",
      url: "/#contact",
    },
  ];

  return (
    <header
      className="px-4 lg:px-6 min-h-16 flex items-center border-b border-secondary bg-black/[0.96] backdrop-blur"
      role="banner"
    >
      <Link
        className="flex items-center justify-center space-x-2 relative"
        href="/"
        aria-label={"Home Page"}
      >
        <div className="animate-gradient-x bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 bg-[length:200%_auto] bg-clip-text text-transparent transition-all flex items-center justify-center space-x-2">
          <SunMoonIcon
            className="h-10 w-10 text-yellow-500"
            aria-hidden="true"
          />
          <p className="text-2xl font-bold">{APP_NAME}</p>
        </div>
      </Link>

      <nav
        className="ml-auto flex gap-4 sm:gap-6 items-center"
        aria-label="Main navigation"
      >
        {/* Unauthenticated Links*/}
        {!user &&
          navLinks.map((link) => (
            <Link
              key={link.url}
              className="text-sm font-medium hover:underline underline-offset-4"
              href={link.url}
            >
              {link.name}
            </Link>
          ))}
        {user && <DropdownMenu user={user} />}
        {!user && (
          <Link
            href="/auth"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Log In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
