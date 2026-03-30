'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster position="bottom-right" />
      </CartProvider>
    </AuthProvider>
  );
}
