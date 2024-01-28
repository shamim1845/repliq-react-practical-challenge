import { SearchParamsProps } from "@/app/(routes)/products/page";
import { generateSearchParams } from "../utils";
import { SERVER_URI } from "./fetchUtils";
import { ProductType } from "../types/ProductType";

export const PRODUCTS_PER_PAGE = 10;

export const getProducts = (
  searchParams: SearchParamsProps
): Promise<{ products: ProductType[]; totalProducts: number }> => {
  const searchString = generateSearchParams(searchParams);

  return new Promise((resolve, reject) => {
    try {
      fetch(`${SERVER_URI}/api/products?${searchString}`)
        .then((res) => res.json())
        .then((data) => {
          resolve({
            products: data.products,
            totalProducts: data.totalProducts,
          });
        });
    } catch (error) {
      console.log(error);

      reject("Failed to fetch products.");
    }
  });
};
