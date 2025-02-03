import { getProducts } from "@/actions/entities/product/product2";
import ProductsSection from "./products.section";
import { validateAuthPage } from "@/utils/security/auth";

const ProductsPage = async () => {
  await validateAuthPage();
  const products = await getProducts();

  return <ProductsSection products={products} />;
};

export default ProductsPage;
