import { connectDb } from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/db/models/productModel";
import { ApiFeatures } from "@/lib/db/_utils/apiFeatures";
import { verifyAuth } from "@/lib/auth";
import { jwtVerify } from "jose";
import mongoose from "mongoose";
import { cookies } from "next/headers";

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

export async function POST(req: Request) {
  try {
    connectDb();

    // Get token from cookies
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token and get user ID
    const secret = new TextEncoder().encode(process.env.JWT_SECREAT);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.jti;

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, description, price, stock, brand, images } = body;

    // Validate required fields
    if (!name || !description || !price || !stock || !images?.length) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      brand,
      images: images.map((url: string) => ({
        public_id: url, // You might want to handle image upload to cloud storage
        url,
      })),
      user: new mongoose.Types.ObjectId(userId), // Convert to ObjectId
    });

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: error.message || "Error creating product" },
      { status: 500 }
    );
  }
}
