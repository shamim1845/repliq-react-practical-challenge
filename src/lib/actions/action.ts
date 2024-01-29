"use server";

import { SearchParamsProps } from "@/app/(routes)/products/page";
import { redirect } from "next/navigation";
import { generateSearchParams } from "../utils";

export const handleSearchAction = (formData: FormData) => {
  const keyword = formData.get("search") as string;

  const searchString = generateSearchParams({
    keyword,
  });

  redirect(`/products?${searchString}`);
};

export const handleSliderAction = (
  formData: FormData,
  searchParams: SearchParamsProps
) => {
  const price_gte = formData.get("gte");
  const price_lte = formData.get("lte");

  const searchString = generateSearchParams({
    ...searchParams,
    ...(price_gte && { "price[gte]": price_gte?.toString() }),
    ...(price_lte && { "price[lte]": price_lte?.toString() }),
    page: "",
  });

  redirect(`/products?${searchString}`);
};

export const handleCategoryCheckedAction = (
  formData: FormData,
  searchParams: SearchParamsProps
) => {
  const category = formData.get("category") || "";

  const searchString = generateSearchParams({
    ...searchParams,
    ...{ category: category.toString() },
    page: "",
  });

  redirect(`/products?${searchString}`);
};

//
