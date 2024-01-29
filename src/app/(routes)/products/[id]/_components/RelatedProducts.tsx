import { getProducts } from "@/lib/fetch/getProducts";
import { ProductType } from "@/lib/types/ProductType";
import React from "react";
import SingleProduct from "../../_productsComponents/SingleProduct";

const RelatedProducts = async ({ category }: { category: string }) => {
  const { products, totalProducts } = await getProducts({
    category,
  });

  return (
    <div className="py-10 shadow-lg p-5 rounded-md space-y-3">
      <h4 className="text-2xl font-bold ">Related Product</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 py-5">
        {products?.map((product: ProductType) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
