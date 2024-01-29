import { ProductType } from "@/lib/types/ProductType";
import React from "react";

const ProductDescription = ({
  product: { description },
}: {
  product: ProductType;
}) => {
  return (
    <div className="py-10 shadow-lg p-5 rounded-md space-y-3">
      <h4 className="text-2xl font-bold ">Product Description</h4>
      <article
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      ></article>
    </div>
  );
};

export default ProductDescription;
