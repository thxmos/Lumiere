import { redirect } from "next/navigation";
import { DashboardCard } from "@/components/dashboard-card";
import { getProductById } from "@/data-access/product2";
import { getUserByUsername } from "@/actions/user";

export default async function ArtistProductPage({
  params,
}: {
  params: { username: string; productId: string };
}) {
  redirect(`/${params.username}`); // TODO: make this available when products is ready

  const product = await getProductById(params.productId);
  if (!product) {
    const user = await getUserByUsername(params.username);
    if (!user) {
      redirect("/404");
    }
    redirect(`/${user?.username}`);
  }
  return (
    <DashboardCard
      title={product.name}
      description={product.description || undefined}
    >
      <div>{product.price}</div>
    </DashboardCard>
  );
}
