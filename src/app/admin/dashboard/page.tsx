"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    postsCount: 0,
    commentsCount: 0,
    categoriesCount: 0,
    pendingCommentsCount: 0,
  });
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch('/api/admin/stats');
        const statsData = await statsResponse.json();

        // Fetch recent posts
        const postsResponse = await fetch('/api/admin/posts?limit=5&sortBy=created_at&sortDesc=true');
        const postsData = await postsResponse.json();

        setStats(statsData);
        setRecentPosts(postsData.items);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold">{stats.postsCount}</div>
          <div className="text-gray-600">Toplam Yazı</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold">{stats.categoriesCount}</div>
          <div className="text-gray-600">Kategori</div>
        </div>


      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Son Yazılar</h2>
          <Link href="/admin/dashboard/posts" className="text-sm text-[#8B7D6B]">
            Tümünü Gör
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {post.published ? 'Yayında' : 'Taslak'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/dashboard/posts/${post.id}`} className="text-[#8B7D6B] hover:text-[#6B5D4B]">
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    Henüz yazı bulunmuyor
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/dashboard/posts/create"
            className="flex items-center justify-center bg-[#8B7D6B] text-white px-6 py-3 rounded-lg text-center hover:bg-[#7C6F60] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="text-lg font-medium">Yeni Yazı Ekle</span>
          </Link>
          <Link
            href="/admin/dashboard/categories"
            className="flex items-center justify-center bg-[#8B7D6B] text-white px-6 py-3 rounded-lg text-center hover:bg-[#7C6F60] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="text-lg font-medium">Kategori Yönetimi</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 