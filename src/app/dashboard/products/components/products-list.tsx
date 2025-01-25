"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/dashboard-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductCard } from "./product-card";
import { CreateProductModal } from "../create-product-modal";
import { CreateProduct2Dto, Product2Dto } from "@/data-access/product2";
import { toast } from "sonner";
import { createNewProduct } from "../actions";

const ProductsList = ({
  userId,
  products,
}: {
  userId: string;
  products: Product2Dto[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createProduct = async (productData: Partial<CreateProduct2Dto>) => {
    try {
      await createNewProduct(userId, productData);
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <DashboardCard title="Products" description="View your products">
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <Button variant="outline" onClick={() => setIsModalOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Create New
      </Button>
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createProduct}
      />
    </DashboardCard>
  );
};

export default ProductsList;
