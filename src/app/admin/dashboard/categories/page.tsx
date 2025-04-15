"use client";

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  posts: Array<{ count: number }>;
  _count: {
    posts: Array<{ count: number }>;
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Kategoriler yüklenirken bir hata oluştu.');
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      setError('Kategori adı boş olamaz.');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCategoryName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kategori oluşturulurken bir hata oluştu.');
      }

      setNewCategoryName('');
      fetchCategories();
    } catch (error: unknown) {
      console.error('Error creating category:', error);
      setError(error instanceof Error ? error.message : 'Kategori oluşturulurken bir hata oluştu.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kategori silinirken bir hata oluştu.');
      }

      fetchCategories();
    } catch (error: unknown) {
      console.error('Error deleting category:', error);
      setError(error instanceof Error ? error.message : 'Kategori silinirken bir hata oluştu.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kategoriler</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Category Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Kategori Ekle</h2>
        <form onSubmit={handleCreateCategory} className="flex gap-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B]"
            placeholder="Kategori adı"
            disabled={isCreating}
          />
          <button
            type="submit"
            disabled={isCreating}
            className="bg-[#8B7D6B] text-white px-4 py-2 rounded-md hover:bg-[#7C6F60] transition-colors disabled:opacity-50"
          >
            {isCreating ? 'Ekleniyor...' : 'Kategori Ekle'}
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori Adı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yazı Sayısı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category._count?.posts[0].count || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={category._count?.posts[0].count > 0}
                          title={category._count?.posts[0].count > 0 ? 'İçinde yazı olan kategori silinemez' : 'Kategoriyi sil'}
                        >
                          {category._count?.posts[0].count > 0 ? '🔒 Silinemez' : 'Sil'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      Henüz kategori bulunmuyor
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 