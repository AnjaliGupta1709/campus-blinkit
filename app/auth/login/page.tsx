'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const name = email.split('@')[0];
      login(email, name);
      toast.success('Logged in successfully!');
      router.push('/home');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-600 mb-2 text-center">
              Blinkit
            </h1>
            <p className="text-center text-gray-600 text-sm">
              Instant delivery at your campus
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              New to Campus Blinkit?{' '}
              <Link href="/auth/signup" className="text-green-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">
            Use any email to continue
          </p>
        </div>
      </div>
    </div>
  );
}
