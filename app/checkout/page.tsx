'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Button
              onClick={() => router.push('/home')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Back to Shopping
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = Math.random().toString(36).substring(7).toUpperCase();
      clearCart();
      router.push(`/order-success?orderId=${orderId}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Room 101, Hostel A"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Delhi"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="110016"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                {['card', 'upi', 'wallet'].map((method) => (
                  <label key={method} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="ml-3 font-medium text-gray-700 capitalize">
                      {method === 'upi' ? 'UPI' : method === 'card' ? 'Debit/Credit Card' : 'Digital Wallet'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
  className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-green-300/50 transition-all duration-300 hover:scale-105"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-4 border-b border-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-600 text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-green-600">
                  ₹{getTotalPrice()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
