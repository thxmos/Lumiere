"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductCard } from "./product-card";
import { CreateProductModal } from "./create-product-modal";
import { Product2Dto } from "@/data-access/product2";

const ProductsList = ({
  products,
  createProduct,
}: {
  products: Product2Dto[];
  createProduct: (productData: any) => Promise<void>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createProduct}
      /> */}
    </DashboardCard>
  );
};

export default ProductsList;
