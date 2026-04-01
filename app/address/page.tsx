"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

export default function AddressPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    hostel: "",
    room: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (!formData.name || !formData.phone || !formData.hostel || !formData.room) {
      alert("Please fill all details");
      return;
    }

    // 🔥 Save address
    localStorage.setItem("address", JSON.stringify(formData));

    // ✅ FIX: checkout hata diya, direct success page
    router.push("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-4">

        {/* 🔥 TITLE */}
        <h1 className="text-2xl font-bold">Add Delivery Address 📍</h1>

        {/* 🔥 ADDRESS CARD */}
        <div className="bg-white p-5 rounded-xl shadow space-y-4">

          <div className="flex items-center gap-2 text-green-700 font-medium">
            <MapPin size={18} />
            Deliver to Campus
          </div>

          <Input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            name="hostel"
            placeholder="Hostel (A / B / C)"
            value={formData.hostel}
            onChange={handleChange}
          />

          <Input
            name="room"
            placeholder="Room Number"
            value={formData.room}
            onChange={handleChange}
          />

        </div>

        {/* 🔥 BUTTON */}
        <Button
          onClick={handleContinue}
          className="w-full bg-green-700 text-white py-3 text-lg"
        >
          Continue to Payment →
        </Button>

      </main>
    </div>
  );
}