"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Category, Post } from '@/types/supabase';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function EditPostPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  // Yazı verilerini ve kategorileri getir
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Yazı ve kategorileri paralel olarak getir
        const [postResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/admin/posts/${postId}`),
          fetch('/api/admin/categories')
        ]);
        
        if (!postResponse.ok) {
          throw new Error('Yazı bulunamadı');
        }
        
        const post = await postResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        // Form alanlarını doldur
        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.category_id);
        setCoverImage(post.cover_image || '');
        setPublished(post.published);
        setFeatured(post.featured);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Yazı yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [postId]);
  
  // Görsel seçme ve önizleme
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      setCoverImageFile(file);
      // Görsel önizlemesini oluştur
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Görseli yükle
  const uploadImage = async () => {
    if (!coverImageFile) return null;
    
    setImageUploading(true);
    setUploadProgress(0);
    
    try {
      // Dosya adını benzersiz kılmak için zaman damgası ekleyin
      const fileExt = coverImageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;
      
      // Supabase'e yükle
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, coverImageFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        throw error;
      }
      
      // İlerleme durumunu manuel olarak güncelle
      setUploadProgress(100);
      
      // Dosya URL'sini al
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Görsel yüklenirken bir hata oluştu');
      return null;
    } finally {
      setImageUploading(false);
    }
  };
  
  // Yazıyı güncelle
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validasyon
    if (!title.trim() || !content.trim() || !categoryId) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Eğer bir görsel seçildiyse yükle
      let imageUrl = coverImage;
      if (coverImageFile) {
        imageUrl = await uploadImage() || '';
        
        if (!imageUrl) {
          throw new Error('Görsel yüklenemedi');
        }
      }
      
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          category_id: categoryId,
          cover_image: imageUrl,
          published,
          featured
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Yazı güncellenirken bir hata oluştu');
      }
      
      setSuccess('Yazı başarıyla güncellendi');
      
      // 2 saniye sonra yazılar sayfasına yönlendir
      setTimeout(() => {
        router.push('/admin/dashboard/posts');
      }, 2000);
    } catch (error: any) {
      console.error('Error updating post:', error);
      setError(error.message || 'Yazı güncellenirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };
  
  // Yazıyı sil
  const handleDelete = async () => {
    // Kullanıcıdan onay al
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Yazı silinirken bir hata oluştu');
      }
      
      // Yazılar sayfasına yönlendir
      router.push('/admin/dashboard/posts');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      setError(error.message || 'Yazı silinirken bir hata oluştu');
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Yazı Düzenle</h1>
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard/posts')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Geri Dön
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Başlık <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B]"
              required
            >
              <option value="">Kategori Seçin</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kapak Görseli
            </label>
            
            <div className="mt-1 flex flex-col space-y-4">
              {/* Mevcut URL ile yükleme */}
              <div className="w-full">
                <label htmlFor="coverImageUrl" className="block text-sm text-gray-500 mb-1">
                  URL ile düzenle:
                </label>
                <input
                  type="text"
                  id="coverImageUrl"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B]"
                  placeholder="https://example.com/image.jpg"
                  disabled={!!imagePreview}
                />
              </div>
              
              {/* Bilgisayardan dosya yükleme */}
              <div className="w-full">
                <label htmlFor="coverImageFile" className="block text-sm text-gray-500 mb-1">
                  veya bilgisayardan yükle:
                </label>
                <input
                  type="file"
                  id="coverImageFile"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#8B7D6B] file:text-white
                    hover:file:bg-[#7C6F60]"
                  disabled={imageUploading}
                />
              </div>
              
              {/* Yükleme ilerleme çubuğu */}
              {imageUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#8B7D6B] h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <p className="text-sm text-gray-500 mt-1">Yükleniyor: %{uploadProgress}</p>
                </div>
              )}
              
              {/* Görsel önizleme */}
              {imagePreview && (
                <div className="relative w-full h-48 mt-2 border rounded-md overflow-hidden">
                  <Image 
                    src={imagePreview} 
                    alt="Kapak görseli önizleme" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="max-w-full"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setCoverImageFile(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Mevcut görsel önizleme */}
              {coverImage && !imagePreview && (
                <div className="relative w-full h-48 mt-2 border rounded-md overflow-hidden">
                  <Image 
                    src={coverImage} 
                    alt="Kapak görseli önizleme" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="max-w-full"
                  />
                  <button 
                    type="button"
                    onClick={() => setCoverImage('')}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              İçerik <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B] min-h-[300px]"
              required
            />
          </div>
          
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-[#8B7D6B] focus:ring-[#8B7D6B] border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Yayınla
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 text-[#8B7D6B] focus:ring-[#8B7D6B] border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Öne Çıkar
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Yazıyı Sil
          </button>
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/posts')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              İptal
            </button>
            
            <button
              type="submit"
              disabled={saving || imageUploading}
              className="bg-[#8B7D6B] text-white px-4 py-2 rounded-md hover:bg-[#7C6F60] transition-colors disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 