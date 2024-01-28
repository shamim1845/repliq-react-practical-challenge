import { connectDb } from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/db/models/productModel";

export async function GET(req: NextRequest, res: NextResponse) {
  connectDb();

  const products = await Product.find();

  const uniqueCategories = products
    .map((product) => product.categories[0].category_slug)
    .filter((cat, index, self) => self.indexOf(cat) === index);

  return Response.json({
    message: "Categories found successfully.",
    categories: uniqueCategories,
  });
}
