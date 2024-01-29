import { Minus, Plus } from "lucide-react";
import React from "react";
import { AddToCartHandler } from "../../product-utils";
import { ProductType } from "@/lib/types/ProductType";

const IncreaseOrDecreaseCartItem = ({
  product,
  quantity,
}: {
  product: ProductType;
  quantity: number;
}) => {
  return (
    <div className="flex justify-between items-center gap-3 bg-gray-200 h-fit p-2 rounded-sm w-[80px] select-none">
      <Minus
        size={15}
        className="cursor-pointer"
        onClick={() => {
          if (quantity > 1) {
            AddToCartHandler({ product, quantity: quantity - 1 });
          }
        }}
      />
      <span className="text-sm">{quantity}</span>
      <Plus
        size={15}
        className="cursor-pointer"
        onClick={() => {
          if (quantity < product.stock) {
            AddToCartHandler({ product, quantity: quantity + 1 });
          }
        }}
      />
    </div>
  );
};

export default IncreaseOrDecreaseCartItem;
