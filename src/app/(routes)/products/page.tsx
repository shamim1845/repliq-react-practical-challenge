import React from "react";
import FilterBox from "./_components/FilterBox";
import ProductContainer from "./_components/ProductContainer";

const page = () => {
  return (
    <main>
      <div className="container flex justify-between gap-10">
        <FilterBox />
        <ProductContainer />
      </div>
    </main>
  );
};

export default page;
