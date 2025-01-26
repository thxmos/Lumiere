import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { PLACEHOLDER_IMG } from "@/constants/images";
import { Product2Dto } from "@/data-access/product2";

/*
TODO: Images wont show up here
*/

export function ProductCard({ product }: { product: Product2Dto }) {
  return (
    <div className="flex items-center p-2 gap-2 bg-card rounded-lg border border-secondary transition-all hover:border-primary justify-between">
      <Link href={`/dashboard/products/${product.id}`}>
        <div className="flex items-center justify-center">
          <Image
            src={product.imageId || PLACEHOLDER_IMG}
            alt={product.name || "Untitled"}
            width={100}
            height={100}
            className="rounded-md border border-secondary transition-all hover:border-primary"
          />
          <div className="flex flex-col">
            <span className="ml-4 text-lg font-bold text-primary">
              {product.name || ""}
            </span>
            <span className="ml-4 text-lg font-medium text-muted-foreground">
              ${product.price || 0}
            </span>
            <span className="ml-4 text-sm text-muted-foreground">
              {product.active ? "Active" : "Inactive"}
            </span>
            <span className="ml-4 text-sm text-muted-foreground">
              {product.isPwyc ? "Pay What You Can" : "Fixed Price"}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-end gap-2">
        <Link href={`/dashboard/products/${product.id}`}>
          <Button variant="ghost" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
