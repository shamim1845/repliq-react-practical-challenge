"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AddToCartHandler } from "../../product-utils";
import { ProductType } from "@/lib/types/ProductType";

const AddToCart = ({
  stock,
  product,
}: {
  stock: number;
  product: ProductType;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    AddToCartHandler({ product, quantity });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="productId" type="text" defaultValue={product._id} hidden />
      <div className="flex gap-5">
        <Input
          name="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          className="w-[100px]"
          max={stock}
          min={1}
          required
        />
        <Button className="bg-brandPrimary" size={"default"}>
          Add To Cart
        </Button>
      </div>
    </form>
  );
};

export default AddToCart;
