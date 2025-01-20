import ProductEditTab from "./product-edit-tab";
import { getProduct } from "./product.actions";

interface Props {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { productId } = params;
  const product = await getProduct(productId);
  if (!product) return null;

  return <ProductEditTab product={product} />;
}
