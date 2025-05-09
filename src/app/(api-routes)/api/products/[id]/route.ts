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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await connectDb();

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ message: "Product not found." }, { status: 404 });
    }
    return Response.json({ message: "Product deleted successfully." });
  } catch (error: any) {
    return Response.json({ message: error.message || "Failed to delete product." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  await connectDb();

  try {
    const body = await request.json();
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return Response.json({ message: "Product not found." }, { status: 404 });
    }
    return Response.json({ message: "Product updated successfully.", product: updated });
  } catch (error: any) {
    return Response.json({ message: error.message || "Failed to update product." }, { status: 500 });
  }
}
