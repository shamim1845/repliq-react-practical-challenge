import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const AddToCart = () => {
  return (
    <div className="flex gap-5">
      <div>
        <Input type="number" defaultValue={1} className="w-[100px]" />
      </div>
      <div>
        <Button className="bg-brandPrimary" size={"default"}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;
