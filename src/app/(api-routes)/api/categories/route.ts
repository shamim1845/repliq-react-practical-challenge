import { connectDb } from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/db/models/productModel";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const products = await Product.find();

    // ✅ Safely access category_slug
    const categorySlugs = products
      .map((product) => product.categories?.[0]?.category_slug)
      .filter((slug): slug is string => typeof slug === "string");

    const uniqueCategories = [...new Set(categorySlugs)];

    return NextResponse.json({
      message: "Categories found successfully.",
      categories: uniqueCategories,
    });
  } catch (error: any) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { message: "Failed to load categories", error: error.message },
      { status: 500 }
    );
  }
}
