import { ProductType } from "@/lib/types/ProductType";
import { formatMoney } from "@/lib/utils";
import React from "react";
import AddToCart from "./AddToCart";
import ProductRatingViewer from "./ProductRatingViewer";

const ProductInformation = ({ product }: { product: ProductType }) => {
  const { name, price, brand, stock, avgRating } = product;
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{name}</h1>

        <div>
          <ProductRatingViewer rating={avgRating} />
        </div>
        <div className="text-sm text-gray-500">
          <span>Brand :</span>
          <span>{brand}</span>
        </div>
      </div>

      <div>
        <span className="font-bold text-2xl">{formatMoney(price)}</span>
      </div>
      <div>
        <span className="text-sm">Stock :</span> <span>{stock}</span>
      </div>
      <div>
        <AddToCart stock={stock} product={product} />
      </div>
    </div>
  );
};

export default ProductInformation;
