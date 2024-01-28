import { SERVER_URI } from "./fetchUtils";
import { ProductType } from "../types/ProductType";

export const getProduct = (id: string): Promise<ProductType> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${SERVER_URI}/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data.product);
        });
    } catch (error) {
      console.log(error);

      reject("Failed to fetch product.");
    }
  });
};
