'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/lib/mockData';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);

  const filteredProducts = products.filter((p) =>
    
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    p.price <= maxPrice
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* 🔥 HERO */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-2xl shadow-lg p-8 mb-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Everything you need on campus 🚀
            </h1>
            <p className="text-green-100 mb-4">
              Fruits, snacks, stationery & essentials delivered in minutes!
            </p>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
              Order Now
            </button>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            className="w-52 hidden md:block"
          />
        </div>

        {/* 🔥 CLICKABLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          {/* Fruits */}
          <div 
            onClick={() => setSelectedCategory('Fruits')}
            className="bg-green-500 cursor-pointer hover:scale-105 transition-all text-white rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">Fresh Fruits 🍎</h2>
              <p className="text-sm mb-2">Healthy snacks</p>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/415/415733.png" className="w-16" />
          </div>

          {/* Snacks */}
          <div 
            onClick={() => setSelectedCategory('Snacks')}
            className="bg-orange-400 cursor-pointer hover:scale-105 transition-all text-white rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">Late Night Snacks 🍜</h2>
              <p className="text-sm mb-2">Maggi, chips & drinks</p>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" className="w-16" />
          </div>

          {/* Stationery */}
          <div 
            onClick={() => setSelectedCategory('Stationery')}
            className="bg-blue-400 cursor-pointer hover:scale-105 transition-all text-white rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">Stationery 📚</h2>
              <p className="text-sm mb-2">Notes, pens & files</p>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" className="w-16" />
          </div>

          {/* Essentials */}
          <div 
            onClick={() => setSelectedCategory('Essentials')}
            className="bg-purple-400 cursor-pointer hover:scale-105 transition-all text-white rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">Hostel Essentials 🛏️</h2>
              <p className="text-sm mb-2">Daily use items</p>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" className="w-16" />
          </div>

        </div>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
        />

        {/* 💰 PRICE */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Max Price: ₹{maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* 🏷 CATEGORY FILTER */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Shop by Category</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 🛍 PRODUCTS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {selectedCategory}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}