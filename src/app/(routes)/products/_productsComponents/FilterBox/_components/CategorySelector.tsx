"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { handleCategoryCheckedAction } from "@/lib/actions/action";
import React, { useState } from "react";
import { SearchParamsProps } from "../../../page";

const CategorySelector = ({
  categories,
  searchParams,
}: {
  categories: string[];
  searchParams: SearchParamsProps;
}) => {
  const [currentCategory, setCurrentCategory] = useState("");

  const handlecategoryChange = (checked: boolean, category: string) => {
    setCurrentCategory(checked ? category : "");

    const formData = new FormData();
    formData.append("category", checked ? category : "");

    handleCategoryCheckedAction(formData, searchParams);
  };

  return (
    <>
      <h5>Categories</h5>
      <div className="space-y-3">
        {categories?.map((category) => (
          <div key={category} className="flex items-center gap-5">
            <Checkbox
              id={category}
              onCheckedChange={(checked) => {
                handlecategoryChange(!!checked, category);
              }}
              checked={currentCategory === category}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategorySelector;
