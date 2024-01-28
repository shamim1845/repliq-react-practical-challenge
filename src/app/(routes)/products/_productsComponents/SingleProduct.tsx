import { ProductType } from "@/lib/types/ProductType";
import { formatMoney } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleProduct = ({ product }: { product: ProductType }) => {
  return (
    <div className="shadow-md rounded-md p-6 hover:-translate-y-2 transition-all duration-300">
      <div className=" max-h-[300px] overflow-hidden">
        <Link href={`products/${product._id}`}>
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={200}
            height={200}
            className="hover:scale-105 w-full bg-contain transition-all"
          />
        </Link>
      </div>
      <Link href={`products/${product._id}`} className="hover:underline">
        <h4>{product.name}</h4>
      </Link>

      <div className="flex justify-between">
        <div>{formatMoney(product.price)}</div>
        <ShoppingBasket className="text-brandPrimary cursor-pointer" />
      </div>
    </div>
  );
};

export default SingleProduct;
