"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";

// ✅ ADD THIS TYPE
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
};

export default function CartPage() {
  const { items = [], removeItem, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <Link href="/home">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">

              {/* ✅ FIX HERE */}
              {items.map((item: CartItem) => (
                <div key={item.id} className="p-6 flex gap-4">

                  <div>{item.image}</div>

                  <div className="flex-1">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>₹{item.price}</p>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity > 1 ? item.quantity - 1 : 1
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>

                    {item.quantity}

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>

                    <button onClick={() => removeItem(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div>
            <h2>Total: ₹{getTotalPrice()}</h2>

            <Button onClick={() => router.push("/checkout")}>
              Checkout
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}