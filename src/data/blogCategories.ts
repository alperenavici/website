import { BlogCategory } from '@/types/blog';
import { supabase } from '@/lib/supabase';

// Tüm kategorileri getiren fonksiyon - sadece dinamik kategorileri veritabanından çeker
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    // Sadece admin panelinden kategorileri çek
    const { data: adminCategories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    // Admin kategorilerini blog kategori formatına dönüştür
    const formattedCategories = adminCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    }));

    return formattedCategories;
  } catch (error) {
    console.error('Error in getBlogCategories:', error);
    return [];
  }
}

// Başlangıç yüklemesi için boş dizi, asenkron olarak doldurulacak
export const blogCategories: BlogCategory[] = [];

// Slug'a göre kategori getiren fonksiyon
export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  try {
    // Veritabanından kategoriyi bul
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !category) {
      console.error('Error fetching category by slug:', error);
      return null;
    }

    return {
      id: category.id,
      name: category.name,
      slug: category.slug
    };
  } catch (error) {
    console.error('Error in getBlogCategoryBySlug:', error);
    return null;
  }
}
