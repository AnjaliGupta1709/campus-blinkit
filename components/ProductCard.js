'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ProductCard({ product }) {
  const { addItem, updateQuantity, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product);
      toast.success(`${product.name} added to cart!`);
      setIsAdding(false);
    }, 200);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:scale-[1.02] group">
      
      {/* Product Image */}
      <div className="bg-gradient-to-br from-green-50 to-gray-50 p-6 text-4xl flex items-center justify-center h-40 transition-all duration-500 group-hover:scale-110">
        {product.image}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-xs mb-3">
          {product.description}
        </p>

        <div className="mt-auto">
          
          {/* Price */}
          <p className="text-lg font-bold text-green-700 mb-3">
            ₹{product.price}
          </p>

          {quantity === 0 ? (
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-green-700 hover:bg-green-800 text-white shadow-lg hover:shadow-green-300/50 transition-all duration-300 hover:scale-105"
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
          ) : (
            <div className="flex gap-2 items-center justify-between bg-green-50 rounded-lg p-2">
              
              <button
                onClick={handleDecreaseQuantity}
                className="p-1 hover:bg-green-200 rounded transition"
              >
                <Minus size={18} className="text-green-700" />
              </button>

              <span className="font-semibold text-green-700 min-w-8 text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncreaseQuantity}
                className="p-1 hover:bg-green-200 rounded transition"
              >
                <Plus size={18} className="text-green-700" />
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}