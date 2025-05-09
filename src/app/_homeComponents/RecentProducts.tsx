"use client";

import { useEffect, useState } from "react";
import SingleProduct from "../(routes)/products/_productsComponents/SingleProduct";
import { ProductType } from "@/lib/types/ProductType";

const RecentProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=4&sort=-createdAt");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching recent products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
