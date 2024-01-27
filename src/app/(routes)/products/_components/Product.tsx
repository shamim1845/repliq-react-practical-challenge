import Image from "next/image";
import React from "react";

const Product = ({ product }: { product: any }) => {
  return (
    <div>
      <Image src={product.images[0].url} alt="" width={200} height={200} />
    </div>
  );
};

export default Product;
