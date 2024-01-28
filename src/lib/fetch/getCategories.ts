import { SERVER_URI } from "./fetchUtils";

export const getCategories = () => {
  return fetch(`${SERVER_URI}/api/categories`).then((res) => res.json());
};
