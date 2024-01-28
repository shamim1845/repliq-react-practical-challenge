import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/lib/types/ProductType";
import { formatMoney } from "@/lib/utils";
import React from "react";
import AddToCart from "./AddToCart";

const ProductInformation = ({
  product: { images, name, price, brand, stock },
}: {
  product: ProductType;
}) => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <div>
          <div>rating</div>
          <div className="text-sm text-gray-500">
            <span>Brand :</span>
            <span>{brand}</span>
          </div>
        </div>
      </div>

      <div>
        <span className="font-bold text-2xl">{formatMoney(price)}</span>
      </div>
      <div>
        <span className="text-sm">Stock :</span> <span>{stock}</span>
      </div>
      <div>
        <AddToCart />
      </div>
    </div>
  );
};

export default ProductInformation;
