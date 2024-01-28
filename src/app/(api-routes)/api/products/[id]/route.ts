import { connectDb } from "@/lib/db/connectDB";
import { Product } from "@/lib/db/models/productModel";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  connectDb();

  let product;
  try {
    product = await Product.findById(id);
  } catch (error) {
    console.log(error);
  }

  if (!product) {
    return Response.json({
      message: "Product not found.",
      product,
    });
  }

  return Response.json({
    message: "Product found successfully.",
    product,
  });
}
