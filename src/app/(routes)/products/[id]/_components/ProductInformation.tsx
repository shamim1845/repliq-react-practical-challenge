import { ProductType } from "@/lib/types/ProductType";
import React from "react";

const ProductInformation = ({
  product: { images, name },
}: {
  product: ProductType;
}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default ProductInformation;
