'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/lib/mockData';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);

  // 🔥 FINAL FILTER LOGIC
  const filteredProducts = products.filter((p) =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    p.price <= maxPrice
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* 🔥 Hero Banner */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-lg shadow-lg p-8 mb-8 text-white animate-slide-up">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to Campus Blinkit
          </h1>
          <p className="text-green-100">
            Get everything you need delivered to your campus in 10 minutes!
          </p>
        </div>

        {/* 🔍 SEARCH BAR */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
        />

        {/* 💰 PRICE FILTER */}
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
        <div className="mb-8 animate-slide-up">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-700 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 🛍 PRODUCTS */}
        <div className="animate-slide-up">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  className="animate-slide-up"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 fade-in">
              <p className="text-gray-600 text-lg">
                No products found 😢
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}