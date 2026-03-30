"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId") || "ORDER123";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse"></div>
            <CheckCircle size={80} className="text-green-600 relative" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. Get ready for the fastest
          delivery!
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm mb-1">Order ID</p>
          <p className="text-2xl font-bold text-green-600 font-mono mb-4">
            {orderId}
          </p>

          <div className="space-y-3 text-left border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Time:</span>
              <span className="font-semibold text-gray-800">
                8-10 minutes
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">
                Preparing
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            What&apos;s Next?
          </h3>

          <div className="space-y-3 text-left">
            <div className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-600 text-white text-sm">
                ✓
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Order Confirmed
                </p>
                <p className="text-sm text-gray-600">
                  Your order is being prepared
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-white text-sm">
                2
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Out for Delivery
                </p>
                <p className="text-sm text-gray-600">
                  Your order is on the way
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-white text-sm">
                3
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Delivered
                </p>
                <p className="text-sm text-gray-600">
                  Order at your door
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Link href="/home" className="block">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Continue Shopping
            </Button>
          </Link>

          <p className="text-gray-500 text-sm">
            Redirecting to home in 10 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}