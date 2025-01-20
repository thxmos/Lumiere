import { getUser } from "@/actions/session.actions";
import { createNewProduct, getProducts } from "./merch.actions";
import { getUserById } from "@/data-access/user";
import ProductsList from "./products-list";
import { CreateProduct2Dto } from "@/data-access/product2";
import { toast } from "sonner";

const ProductsPage = async () => {
  //TODO: make this ugly pattern cleaner
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);

  const products = await getProducts(user.id);

  const createProduct = async (productData: Partial<CreateProduct2Dto>) => {
    // console.log("productData", productData);
    // try {
    //   await createNewProduct(userId, productData);
    //   const updatedProducts = await getProducts(userId);
    //   console.log("updatedProducts", updatedProducts);
    //   toast.success("Product created successfully");
    // } catch (error) {
    //   console.error("Error creating product:", error);
    //   toast.error("Failed to create product. Please try again.");
    // }
    console.log("productData", productData);
  };

  return <ProductsList products={products} createProduct={createProduct} />;
};

export default ProductsPage;
