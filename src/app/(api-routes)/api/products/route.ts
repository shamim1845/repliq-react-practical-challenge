import { connectDb } from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/db/models/productModel";
import { ApiFeatures } from "@/lib/db/_utils/apiFeatures";

export async function GET(req: NextRequest, res: NextResponse) {
  connectDb();

  const url = new URL(req.url);

  const keyword = url.searchParams.get("keyword") || "";
  const category = url.searchParams.get("category") || "";
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const price_gte = url.searchParams.get("price[gte]");
  const price_lte = url.searchParams.get("price[lte]");

  const resultPerPage = limit ? parseInt(limit) : 10;

  const queryString = {
    ...(keyword && { keyword }),
    ...(category && { category }),
    ...(page && { page }),
    ...(limit && { limit }),
    ...((price_gte || price_lte) && {
      price: {
        ...(price_gte && { gte: price_gte }),
        ...(price_lte && { lte: price_lte }),
      },
    }),
  };

  let apiFeature;
  apiFeature = new ApiFeatures(Product.find(), queryString).search().filter();
  // Count product
  const productCount = await apiFeature.query.countDocuments();

  if (!productCount) {
    return Response.json(
      {
        message: "Product not found.",
        totalProducts: productCount,
        products: null,
      },
      { status: 404 }
    );
  }

  // Find products
  apiFeature = new ApiFeatures(Product.find(), queryString)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await apiFeature.query;

  return Response.json({
    message: "Products found successfully.",
    totalProducts: productCount,
    products,
  });
}
