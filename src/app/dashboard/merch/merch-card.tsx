import Image from "next/image";
import placeholder from "@/assets/product-default.svg";
import Link from "next/link";

export function MerchCard({ title, price, imageUrl }: any) {
  return (
    <Link href={`/dashboard/merch/${title}`}>
      <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 transition-all hover:border-gray-300 cursor-pointer">
        <Image
          src={imageUrl || placeholder}
          alt={title}
          width={50}
          height={50}
          className="rounded-md"
        />
        <span className="ml-4 text-lg font-medium text-gray-800">{title}</span>
        <span className="ml-4 text-lg font-medium text-gray-500">${price}</span>
      </div>
    </Link>
  );
}
