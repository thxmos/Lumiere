import ProductEditSection from "./product-edit.section";
import { getProduct } from "./actions";
import { getUser } from "@/actions/session";
import { UserDto } from "@/data-access/user";

interface Props {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { user } = await getUser();

  const { productId } = params;
  const product = await getProduct(productId);
  if (!product) return null;

  return <ProductEditSection product={product} user={user as UserDto} />;
}
