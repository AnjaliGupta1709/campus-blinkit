"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";

// 🔥 Coupons
const COUPONS: { [key: string]: number } = {
  FLAT50: 50,
  SAVE20: 20,
};

export default function CartPage() {
  const { items = [], removeItem, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    const code = coupon.toUpperCase();
    if (COUPONS[code]) {
      setDiscount(COUPONS[code]);
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };

  const subtotal = getTotalPrice();
  const handling = 2;
  const total = Math.max(subtotal - discount + handling, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty 😢</h2>
          <Button onClick={() => router.push("/home")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Header />

      <main className="max-w-2xl mx-auto p-4 space-y-4">

        {/* 🔥 SAVINGS */}
        {discount > 0 && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-sm font-medium">
            Your total savings ₹{discount}
          </div>
        )}

        {/* 🔥 DELIVERY BOX */}
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="font-semibold">Delivery in 10 minutes 🚀</p>
          <p className="text-sm text-gray-500">Shipment of {items.length} item</p>

          {items.map((item: any) => (
            <div key={item.id} className="flex justify-between mt-4 items-center">

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                  }
                >
                  <Minus size={14} />
                </button>

                {item.quantity}

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 COUPON */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Apply Coupon 💸</h3>

          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon"
              className="flex-1 border p-2 rounded"
            />
            <Button onClick={applyCoupon}>Apply</Button>
          </div>
        </div>

        {/* 🔥 BILL DETAILS */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Bill details</h3>

          <div className="flex justify-between text-sm">
            <span>Items total</span>
            <span>₹{subtotal}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600 text-sm">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Delivery charge</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Handling charge</span>
            <span>₹{handling}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold">
            <span>Grand total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* 🔥 POLICY */}
        <div className="bg-white p-4 rounded-xl text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Cancellation Policy</h3>
          Orders cannot be cancelled once packed for delivery.
        </div>

      </main>

      {/* 🔥 STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-bold text-lg">₹{total}</p>
        </div>

        <Button
          onClick={() => router.push("/address")}
          className="bg-green-700 text-white px-6"
        >
          Proceed →
        </Button>
      </div>
    </div>
  );
}