import React from "react";
import SingleProduct from "./SingleProduct";
import { ProductType } from "@/lib/types/ProductType";

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
      {products?.map((product: ProductType) => (
        <SingleProduct key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
