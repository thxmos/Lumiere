import { getUser } from "@/actions/entities/session";
import { getProducts } from "./actions";
import ProductsSection from "./products.section";

const ProductsPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user!.id;
  const products = await getProducts(userId);

  return <ProductsSection userId={userId} products={products} />;
};

export default ProductsPage;
