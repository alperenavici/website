import { BlogCategory } from '@/types/blog';
import { supabase } from '@/lib/supabase';

// Fallback örnek kategoriler
const sampleCategories: BlogCategory[] = [
  {
    id: 'sample-cat-1',
    name: 'İş Hukuku',
    slug: 'is-hukuku'
  },
  {
    id: 'sample-cat-2',
    name: 'Aile Hukuku',
    slug: 'aile-hukuku'
  },
  {
    id: 'sample-cat-3',
    name: 'Ceza Hukuku',
    slug: 'ceza-hukuku'
  },
  {
    id: 'sample-cat-4',
    name: 'Ticaret Hukuku',
    slug: 'ticaret-hukuku'
  },
  {
    id: 'sample-cat-5',
    name: 'Çalışan Hakları',
    slug: 'calisan-haklari'
  },
  {
    id: 'sample-cat-6',
    name: 'Boşanma',
    slug: 'bosanma'
  },
  {
    id: 'sample-cat-7',
    name: 'Savunma Hakları',
    slug: 'savunma-haklari'
  },
  {
    id: 'sample-cat-8',
    name: 'Şirket Kuruluş',
    slug: 'sirket-kurulus'
  }
];

// Tüm kategorileri getiren fonksiyon - sadece dinamik kategorileri veritabanından çeker
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    // Sadece admin panelinden kategorileri çek
    const { data: adminCategories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.warn('Error fetching categories from database, using sample data:', error);
      return sampleCategories;
    }

    // Admin kategorilerini blog kategori formatına dönüştür
    const formattedCategories = adminCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    }));

    // Eğer veritabanından kategori gelmiyorsa örnek kategorileri kullan
    if (formattedCategories.length === 0) {
      console.log('No categories found in database, returning sample data');
      return sampleCategories;
    }

    return formattedCategories;
  } catch (error) {
    console.error('Error in getBlogCategories, returning sample data:', error);
    return sampleCategories;
  }
}

// Başlangıç yüklemesi için örnek kategoriler
export const blogCategories: BlogCategory[] = sampleCategories;

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
      console.warn('Error fetching category by slug from database:', error);

      // Örnek kategorilerden ara
      const sampleCategory = sampleCategories.find(cat => cat.slug === slug);
      return sampleCategory || null;
    }

    return {
      id: category.id,
      name: category.name,
      slug: category.slug
    };
  } catch (error) {
    console.error('Error in getBlogCategoryBySlug:', error);

    // Hata durumunda örnek kategorilerden ara
    const sampleCategory = sampleCategories.find(cat => cat.slug === slug);
    return sampleCategory || null;
  }
}
