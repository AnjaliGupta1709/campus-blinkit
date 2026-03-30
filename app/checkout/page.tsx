"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// ✅ ADD THIS TYPE
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Button
            onClick={() => router.push("/home")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Back to Shopping
          </Button>
        </main>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const orderId = Math.random().toString(36).substring(7).toUpperCase();

      clearCart();

      router.push(`/order-success?orderId=${encodeURIComponent(orderId)}`);

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            {/* Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

              <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
              <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <Input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
              <Input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
              <Input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ZIP Code" />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </form>

          {/* ✅ FIXED HERE */}
          <div>
            {items.map((item: CartItem) => (
              <div key={item.id}>
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </div>
            ))}

            <h3>Total: ₹{getTotalPrice()}</h3>
          </div>
        </div>
      </main>
    </div>
  );
}