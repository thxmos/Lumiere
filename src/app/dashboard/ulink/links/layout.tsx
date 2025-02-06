import LinksBreadcrumbs from "./components/links-breadcrumbs";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <LinksBreadcrumbs />
      {children}
    </div>
  );
}
