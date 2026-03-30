'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Header() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/home">
          <span className="text-2xl font-bold text-green-700">Blinkit</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/home" className="text-gray-700 hover:text-green-700">
            Shop
          </Link>

          <Link href="/cart" className="relative text-gray-700 hover:text-green-700">
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {getTotalItems()}
              </span>
            )}
          </Link>

          <span className="text-gray-700 text-sm">{user?.name}</span>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-green-700 border-green-700 hover:bg-green-100"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}