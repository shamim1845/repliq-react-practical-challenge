import React from "react";
import FilterBox from "./_productsComponents/FilterBox";
import FilterBoxDrawer from "./_productsComponents/FilterBoxDrawer";
import { getProducts } from "@/lib/fetch/getProducts";
import ProductList from "./_productsComponents/ProductList";
import ProductPagination from "./_productsComponents/ProductPagination";

export interface SearchParamsProps {
  page?: string;
  keyword?: string;
  category?: string;
  "price[gte]"?: string;
  "price[lte]"?: string;
}

const page = async ({ searchParams }: { searchParams: SearchParamsProps }) => {
  console.log(searchParams);

  const { products, totalProducts } = await getProducts(searchParams);

  return (
    <main>
      <div className="container flex justify-between md:gap-5 ">
        <div className="sticky top-0 h-fit">
          <div className="hidden md:block">
            <FilterBox searchParams={searchParams} />
          </div>
          <div className="md:hidden">
            <FilterBoxDrawer />
          </div>
        </div>

        <div className="flex-1 py-5">
          <ProductList products={products} />
          <ProductPagination
            totalProducts={totalProducts}
            searchParams={searchParams}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
