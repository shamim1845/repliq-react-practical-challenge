import React from "react";
import products from "@/assets/data/Digimart.products.json";
import Product from "./Product";

const ProductList = () => {
  return (
    <div>
      {products.map((product) => (
        <Product key={product._id.$oid} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
