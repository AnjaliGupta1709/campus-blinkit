'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  // ✅ SAFE FIX (items undefined issue solved)
  const { items = [], removeItem, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center animate-slide-up">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Add some products to get started
            </p>
            <Link href="/home">
              <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:shadow-lg">
                Continue Shopping
              </Button>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200 last:border-b-0 p-6 flex gap-4 items-start hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <div className="text-4xl flex-shrink-0">
                    {item.image}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="font-semibold text-green-600">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex flex-col gap-3 items-end">

                    <div className="flex gap-2 items-center bg-green-50 rounded-lg p-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity > 1 ? item.quantity - 1 : 1
                          )
                        }
                        className="p-1 hover:bg-green-200 rounded transition"
                      >
                        <Minus size={16} className="text-green-600" />
                      </button>

                      <span className="font-semibold text-green-600 min-w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-green-200 rounded transition"
                      >
                        <Plus size={16} className="text-green-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition p-2"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </div>
              ))}

            </div>

            <Link href="/home">
              <Button
                variant="outline"
                className="mt-6 text-green-600 border-green-600 hover:bg-green-50"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 animate-slide-up">

              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">
                    Free
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-800">
                  Total
                </span>
                <span className="text-lg font-bold text-green-600">
                  ₹{getTotalPrice()}
                </span>
              </div>

              <Button
                onClick={() => router.push('/checkout')}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-green-300/50 transition-all duration-300 hover:scale-105"
              >
                Proceed to Checkout
              </Button>

              <p className="text-gray-500 text-xs text-center mt-4">
                {items.length} item{items.length !== 1 ? 's' : ''} in cart
              </p>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}