"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";

const CLOUDINARY_UPLOAD_PRESET = "ut1jioxb";
const CLOUDINARY_CLOUD_NAME = "dewq5eyuf";

async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data.secure_url;
}

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    images: [] as { url: string }[],
    categories: [] as string[],
  });

  useEffect(() => {
    if (!id) return;
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch product");
      setForm({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price?.toString() || "",
        stock: data.product.stock?.toString() || "",
        brand: data.product.brand || "",
        images: data.product.images || [],
        categories: data.product.categories || [],
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        setForm((prev) => ({ ...prev, images: [...prev.images, { url }] }));
      } catch (err) {
        toast.error("Failed to upload image to Cloudinary");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleImageDelete = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");
      toast.success("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Product Images</Label>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 8,
            }}
          >
            {form.images.map((img, idx) => (
              <div
                key={idx}
                style={{ position: "relative", display: "inline-block" }}
              >
                <Image
                  src={img.url}
                  alt={`Product ${idx}`}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => handleImageDelete(idx)}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
          />
          {uploading && <div>Uploading image...</div>}
        </div>
        {/* You can add image and category editing here as needed */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || uploading}
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
