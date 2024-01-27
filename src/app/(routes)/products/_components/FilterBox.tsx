"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FilterBox = () => {
  const [val, setValue] = useState([0, 10000]);

  const router = useRouter();

  const handleSlider = (val: number[]) => {
    setValue(val);
  };
  return (
    <div className="p-5 w-[15rem]">
      <div className="space-y-5">
        <h5>By price</h5>

        <Slider
          defaultValue={val}
          max={100000}
          step={2}
          className="w-full"
          onValueChange={handleSlider}
        />
        <div className="flex justify-between">
          <div className="text-sm flex flex-col border px-5 py-1 rounded-sm bg-gray-200">
            <span>{val[0]}</span>
          </div>
          <div className="text-sm flex flex-col border px-5 py-1 rounded-sm bg-gray-200">
            <span>{val[1]}</span>
          </div>
        </div>
      </div>
      <Separator className="my-8" />

      <div className="space-y-5">
        <h5>Categories</h5>
        <div className="space-y-3">
          <div className="flex items-center gap-5">
            <Checkbox />
            <Label>Fruit</Label>
          </div>
          <div className="flex items-center gap-5">
            <Checkbox />
            <Label>Fruit</Label>
          </div>
          <div className="flex items-center gap-5">
            <Checkbox />
            <Label>Fruit</Label>
          </div>
        </div>
      </div>
      <Separator className="my-8" />

      <div className="space-y-5">
        <h5>Brand</h5>
        <div className="space-y-3">
          <div className="flex items-center gap-5">
            <Checkbox />
            <Label>Fruit</Label>
          </div>
          <div className="flex items-center gap-5">
            <Checkbox />
            <Label>Fruit</Label>
          </div>
          <div className="flex items-center gap-5">
            <Checkbox />
            <Label>Fruit</Label>
          </div>
        </div>
      </div>
      <br />
      <Button
        onClick={() => {
          router.replace("/");
        }}
      >
        Clear Filter
      </Button>
    </div>
  );
};

export default FilterBox;
