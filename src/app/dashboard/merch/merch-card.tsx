import Image from "next/image";
import placeholder from "@/assets/product-default.svg";
import Link from "next/link";

export function MerchCard({ name, price, imageUrl }: any) {
  return (
    <Link href={`/dashboard/merch/${name}`}>
      <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 transition-all hover:border-gray-300 cursor-pointer">
        <Image
          src={imageUrl || placeholder}
          alt={name}
          width={50}
          height={50}
          className="rounded-md"
        />
        <span className="ml-4 text-lg font-medium text-gray-800">{name}</span>
        <span className="ml-4 text-lg font-medium text-gray-500">${price}</span>
      </div>
    </Link>
  );
}
