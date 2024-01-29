"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  RemoveFromCartHandler,
  useGetCartItems,
} from "@/app/(routes)/products/product-utils";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import IncreaseOrDecreaseCartItem from "@/app/(routes)/products/[id]/_components/IncreaseOrDecreaseCartItem";
import { Button } from "./ui/button";

const Cart = () => {
  const { cartItems, totalCartItems, totalPrice } = useGetCartItems();

  return (
    <Sheet>
      <SheetTrigger className="relative" title="Your Cart">
        <ShoppingCart className="cursor-pointer" />
        <Badge
          variant="default"
          className="absolute -top-5  px-1.5 py-0.5 bg-green-600"
        >
          {totalCartItems}
        </Badge>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your shopping cart</SheetTitle>
          <SheetDescription>
            <div className="space-y-2">
              {cartItems?.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="flex justify-between border-b"
                >
                  <div className="flex gap-2 items-center">
                    <X
                      size={15}
                      className="cursor-pointer hover:text-red-600 transition-all"
                      onClick={() => {
                        RemoveFromCartHandler(product._id);
                      }}
                    />
                    <div>
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="line-clamp-1">
                        {product.name.slice(0, 20)}
                      </span>
                      <strong>{formatMoney(product.price)}</strong>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IncreaseOrDecreaseCartItem
                      product={product}
                      quantity={quantity}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <div className="w-full py-5 space-y-5">
            <div className="flex justify-between">
              <div className="font-semibold">SubTotal</div>
              <div className="flex gap-1 font-semibold">
                <span>{formatMoney(totalPrice)}</span>
                <span>USD</span>
              </div>
            </div>
            <div className="w-full">
              <Button
                disabled={totalPrice === 0}
                className="w-full bg-brandPrimary"
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
