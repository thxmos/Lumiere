import { DashboardCard } from "@/components/dashboard-card";
import { getProductById } from "@/data-access/product2";
import Link from "next/link";

export default async function ArtistProductPage({
  params,
}: {
  params: { username: string; productId: string };
}) {
  const product = await getProductById(params.productId);
  return (
    <DashboardCard
      title={product.name}
      description={product.description || undefined}
    >
      <div>{product.price}</div>
    </DashboardCard>
  );
}
