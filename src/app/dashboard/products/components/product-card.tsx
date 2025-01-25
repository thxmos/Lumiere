import Image from "next/image";
import placeholder from "@/assets/product-default.svg";
import Link from "next/link";

export function ProductCard(product: any) {
  return (
    <Link href={`/dashboard/products/${product.id}`}>
      <div className="flex items-center p-2 bg-card rounded-lg border border-secondary transition-all hover:border-primary cursor-pointer">
        <Image
          src={product.image || placeholder}
          alt={product.name || ""}
          width={50}
          height={50}
          className="rounded-md"
        />
        <span className="ml-4 text-lg font-medium text-primary">
          {product.name || ""}
        </span>
        <span className="ml-4 text-lg font-medium text-muted-foreground">
          ${product.price || 0}
        </span>
      </div>
    </Link>
  );
}
