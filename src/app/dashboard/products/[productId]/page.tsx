import ProductEditTab from "./product-edit-tab";
import { getProduct } from "./actions";
import { getUser } from "@/actions/session.actions";
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

  return <ProductEditTab product={product} user={user as UserDto} />;
}
