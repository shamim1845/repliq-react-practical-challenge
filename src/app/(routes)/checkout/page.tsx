"use client";

import { useGetCartItems, clearCart } from "../products/product-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, totalPrice } = useGetCartItems();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        if (response.ok) {
          setIsAuthenticated(true);
          setUserId(data.user._id);
          // Pre-fill form with user data
          setFormData((prev) => ({
            ...prev,
            name: data.user.name,
            phone: data.user.phone,
          }));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      router.push("/auth?tab=login");
      return;
    }

    if (!cartItems?.length) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const orderData = {
        ...formData,
        userId,
        orderItems: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: totalPrice,
        paymentMethod: "COD",
        orderStatus: "Processing",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Clear cart after successful order
      clearCart();

      toast.success("Order placed successfully!");
      // Redirect to order confirmation page
      router.push("/orders");
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cartItems?.length) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Please login to checkout
        </h2>
        <Button asChild>
          <Link href="/auth?tab=login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
        </div>

        <div className="order-1 md:order-2">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>${totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
