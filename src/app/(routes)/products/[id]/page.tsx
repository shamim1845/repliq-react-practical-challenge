import React from "react";
import ProductInformation from "./_components/ProductInformation";
import ProductDescription from "./_components/ProductDescription";
import RelatedProducts from "./_components/RelatedProducts";
import ProductImageCarousel from "./_components/ProductImageCarousel";
import { getProduct } from "@/lib/fetch/getProduct";

const page = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);
  console.log(product);

  return (
    <main>
      <div className="container">
        <div className="flex flex-col gap-10">
          {/* Product Image Carousel */}
          <div className="flex-1">
            <ProductImageCarousel product={product} />
          </div>
          {/* Product Information */}
          <div className="flex-1">
            <ProductInformation product={product} />
          </div>
        </div>
        {/* Product description */}
        <div>
          <ProductDescription product={product} />
        </div>
        {/* Related Products */}
        <div>
          <RelatedProducts />
        </div>
      </div>
    </main>
  );
};

export default page;
