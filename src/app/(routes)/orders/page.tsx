"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Order {
  _id: string;
  orderItems: {
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: string;
  shippingAddress: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-semibold">Loading orders...</h2>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Order #{order._id.slice(-6)}
                </h3>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${item.price * item.quantity}</p>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>${order.totalPrice}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Shipping Information</h4>
                <p className="text-sm">{order.shippingAddress}</p>
                <p className="text-sm mt-1">
                  {order.customerInfo.name} - {order.customerInfo.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
