import { redirect } from "next/navigation";
import { DashboardCard } from "@/modules/shared/components/layouts/dashboard-card";
import { getProductById } from "@/actions/entities/product/product2";
import { getUserByUsername } from "@/actions/entities/user/getUserByUsername";

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
