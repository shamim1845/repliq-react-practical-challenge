import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { SearchParamsProps } from "@/app/(routes)/products/page";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

// export function isAdmin(user: UserResource | User) {
//   return user.publicMetadata?.role === "admin";
// }

export const generateSearchParams = (searchParams: SearchParamsProps) => {
  return new URLSearchParams({
    ...(searchParams.keyword && { keyword: searchParams.keyword }),
    ...(searchParams.category && { category: searchParams.category }),
    ...(searchParams["price[gte]"] && {
      "price[gte]": searchParams["price[gte]"],
    }),
    ...(searchParams["price[lte]"] && {
      "price[lte]": searchParams["price[lte]"],
    }),
    ...(searchParams.page && { page: searchParams.page }),
  }).toString();
};
