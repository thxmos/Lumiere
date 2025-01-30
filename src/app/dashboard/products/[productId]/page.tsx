import ProductEditSection from "./product-edit.section";
import { getProduct } from "@/actions/entities/product/product2";
import { UserDto } from "@/actions/entities/user/user";
import { validateAuthPage } from "@/utils/security/auth";

interface Props {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const user = await validateAuthPage();
  const { productId } = params;
  const product = await getProduct(productId);
  if (!product) return null;

  return <ProductEditSection product={product} user={user as UserDto} />;
}
