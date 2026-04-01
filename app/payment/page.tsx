"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const router = useRouter();

  const address =
    JSON.parse(localStorage.getItem("address") || "{}");

  // 🔥 selected payment
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 🔥 LEFT */}
        <div className="md:col-span-2 bg-white rounded-xl shadow">

          <h2 className="text-xl font-bold p-4">
            Select Payment Method
          </h2>

          {[
            "Wallets",
            "Card",
            "Netbanking",
            "UPI",
            "Cash",
          ].map((method) => (
            <div
              key={method}
              onClick={() => setSelected(method)}
              className={`p-4 flex justify-between items-center cursor-pointer border-t ${
                selected === method
                  ? "bg-green-50 border-green-500"
                  : ""
              }`}
            >
              <span>{method}</span>
              <span>{selected === method ? "✔" : "⌄"}</span>
            </div>
          ))}

          {/* 🔥 DYNAMIC INPUT */}
          <div className="p-4">

            {selected === "UPI" && (
              <input
                placeholder="Enter UPI ID"
                className="w-full border p-2 rounded"
              />
            )}

            {selected === "Card" && (
              <div className="space-y-2">
                <input placeholder="Card Number" className="w-full border p-2 rounded" />
                <input placeholder="Expiry" className="w-full border p-2 rounded" />
              </div>
            )}

            {selected === "Cash" && (
              <p className="text-green-600 font-medium">
                Cash on Delivery selected
              </p>
            )}

          </div>

        </div>

        {/* 🔥 RIGHT */}
        <div className="space-y-4">

          {/* Address */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p className="text-sm text-gray-600">{address.name}</p>
            <p className="text-sm text-gray-600">
              {address.hostel}, Room {address.room}
            </p>
          </div>

          {/* Cart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">My Cart</h3>
            <p className="text-sm">Total ₹100</p>
          </div>

          {/* 🔥 PAY BUTTON */}
          <Button
            disabled={!selected}
            onClick={() => router.push("/order-success")}
            className={`w-full py-3 ${
              selected ? "bg-green-700 text-white" : "bg-gray-300"
            }`}
          >
            Pay Now
          </Button>

        </div>

      </main>
    </div>
  );
}