import { APP_NAME } from "@/constants/app";

const Footer = () => {
  return (
    <footer
      className="bg-black/[0.96] p-4 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 justify-center h-24"
      role="contentinfo"
      aria-label="Site footer"
    >
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME} LLC. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
