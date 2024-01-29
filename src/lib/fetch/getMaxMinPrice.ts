import { SERVER_URI } from "./fetchUtils";

export const getMaxMinPrice = () => {
  return fetch(`${SERVER_URI}/api/products/maxmin-price
  `).then((res) => res.json());
};
