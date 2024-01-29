"use client";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import { AddToCartHandler, useGetCartItems } from "../../product-utils";
import IncreaseOrDecreaseCartItem from "./IncreaseOrDecreaseCartItem";
import { ProductType } from "@/lib/types/ProductType";

const AddToCartBtn = ({ product }: { product: ProductType }) => {
  const { cartItems } = useGetCartItems();

  const itemsExist = cartItems?.find(
    (item) => item.product._id === product._id
  );

  return (
    <>
      {itemsExist ? (
        <IncreaseOrDecreaseCartItem
          product={product}
          quantity={itemsExist.quantity}
        />
      ) : (
        <ShoppingBasket
          className="text-brandPrimary cursor-pointer"
          onClick={() => {
            AddToCartHandler({ product, quantity: 1 });
          }}
        />
      )}
    </>
  );
};

export default AddToCartBtn;
