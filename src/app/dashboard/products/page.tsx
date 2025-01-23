import { getUser } from "@/actions/session.actions";
import { getProducts } from "./actions";
import ProductsList from "./components/products-list";

const ProductsPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user!.id;
  const products = await getProducts(userId);

  return <ProductsList userId={userId} products={products} />;
};

export default ProductsPage;
