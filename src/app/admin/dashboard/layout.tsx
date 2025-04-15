"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/types/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#8B7D6B] min-h-screen text-white p-4 flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
          
          <nav className="space-y-2 flex-grow">
            <Link 
              href="/admin/dashboard" 
              className="block px-4 py-2 rounded hover:bg-[#7C6F60] transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/dashboard/posts" 
              className="block px-4 py-2 rounded hover:bg-[#7C6F60] transition-colors"
            >
              Yazılar
            </Link>
            <Link 
              href="/admin/dashboard/categories" 
              className="block px-4 py-2 rounded hover:bg-[#7C6F60] transition-colors"
            >
              Kategoriler
            </Link>
            <Link 
              href="/admin/dashboard/comments" 
              className="block px-4 py-2 rounded hover:bg-[#7C6F60] transition-colors"
            >
              Yorumlar
            </Link>
          </nav>

          <div className="mt-8 pt-4 border-t border-[#7C6F60]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#7C6F60] rounded">
              <div>
                <div className="font-medium">{user.username}</div>
                <div className="text-sm opacity-70">{user.email}</div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm py-1 px-2 bg-[#6B5D4B] rounded hover:bg-[#5A4C3A] transition-colors"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 