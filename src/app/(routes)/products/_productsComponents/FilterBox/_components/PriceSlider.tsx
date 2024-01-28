"use client";

import { Slider } from "@/components/ui/slider";
import { handleSliderAction } from "@/lib/actions/action";
import React, { useState } from "react";
import { SearchParamsProps } from "../../../page";

const PriceSlider = ({ searchParams }: { searchParams: SearchParamsProps }) => {
  const [val, setValue] = useState([0, 10000]);

  const handleSlider = (val: number[]) => {
    setValue(val);

    const formData = new FormData();
    formData.append("gte", val[0].toString());
    formData.append("lte", val[1].toString());

    handleSliderAction(formData, searchParams);
  };

  return (
    <>
      <h5>By price</h5>

      <Slider
        defaultValue={val}
        max={10000}
        step={2}
        className="w-full"
        onValueChange={(val) => setValue(val)}
        onValueCommit={handleSlider}
      />
      <div className="flex justify-between">
        <div className="text-sm flex flex-col border px-2.5 py-1 rounded-sm bg-gray-200">
          <span>{val[0]}</span>
        </div>
        <div className="text-sm flex flex-col border px-2.5 py-1 rounded-sm bg-gray-200">
          <span>{val[1]}</span>
        </div>
      </div>
    </>
  );
};

export default PriceSlider;
