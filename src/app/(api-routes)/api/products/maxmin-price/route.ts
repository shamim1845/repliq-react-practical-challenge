import { connectDb } from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/db/models/productModel";

export async function GET(req: NextRequest, res: NextResponse) {
  connectDb();

  let price = null;

  try {
    const sortedProducts = await Product.find().sort("price");

    price = {
      min: sortedProducts[0].price,
      max: sortedProducts[sortedProducts.length - 1].price,
    };
  } catch (error) {
    console.log(error);
  }

  return Response.json({
    message: "Price found successfully.",
    price,
  });
}
