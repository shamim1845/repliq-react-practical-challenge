import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/lib/types/ProductType";
import { formatMoney } from "@/lib/utils";
import React from "react";

const ProductInformation = ({
  product: { images, name, price, brand },
}: {
  product: ProductType;
}) => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <div>
          <div>rating</div>
          <div className="text-sm text-gray-500">
            <span>Brand :</span>
            <span>{brand}</span>
          </div>
        </div>
      </div>

      <div>
        <span className="font-bold text-2xl">{formatMoney(price)}</span>
      </div>

      <div className="flex">
        <div>
          <Input type="number" />
        </div>
        <div>
          <Button>Add To Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
