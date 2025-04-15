import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // İlk olarak blog_posts tablosundan verileri çek
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
      return [];
    }

    // Sonra admin panelinden eklenen postları çek
    const { data: adminPosts, error: adminError } = await supabase
      .from('posts')
      .select(`
        *,
        category:category_id(id, name, slug)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (adminError) {
      console.error('Error fetching admin posts:', adminError);
      return [];
    }

    // Blog posts verisini düzenle
    const formattedBlogPosts = (blogPosts || []).map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || post.content.substring(0, 200) + '...',
      content: post.content,
      date: post.created_at,
      author: post.author || 'Av. Mehmet Yılmaz',
      coverImage: post.image_url || '/images/blog1.jpg',
      categories: post.categories ? JSON.parse(post.categories) : []
    }));

    // Admin posts verisini düzenle
    const formattedAdminPosts = (adminPosts || []).map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.content.substring(0, 200) + '...',
      content: post.content,
      date: post.created_at,
      author: 'Av. Mehmet Yılmaz', // Varsayılan yazar
      coverImage: post.cover_image || '/images/blog1.jpg',
      categories: post.category ? [post.category.slug] : []
    }));

    // İki kaynaktan gelen verileri birleştir
    return [...formattedBlogPosts, ...formattedAdminPosts];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // İlk olarak blog_posts tablosunda ara
    const { data: blogPost } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (blogPost) {
      return {
        id: blogPost.id,
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt || blogPost.content.substring(0, 200) + '...',
        content: blogPost.content,
        date: blogPost.created_at,
        author: blogPost.author || 'Av. Mehmet Yılmaz',
        coverImage: blogPost.image_url || '/images/blog1.jpg',
        categories: blogPost.categories ? JSON.parse(blogPost.categories) : []
      };
    }

    // Bulunamadıysa posts tablosunda ara
    const { data: adminPost } = await supabase
      .from('posts')
      .select(`
        *,
        category:category_id(id, name, slug)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (adminPost) {
      return {
        id: adminPost.id,
        title: adminPost.title,
        slug: adminPost.slug,
        excerpt: adminPost.content.substring(0, 200) + '...',
        content: adminPost.content,
        date: adminPost.created_at,
        author: 'Av. Mehmet Yılmaz', // Varsayılan yazar
        coverImage: adminPost.cover_image || '/images/blog1.jpg',
        categories: adminPost.category ? [adminPost.category.slug] : []
      };
    }

    // Her iki tabloda da bulunamadıysa null döndür
    return null;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    return null;
  }
}

export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    // Tüm blog yazılarını getir
    const allPosts = await getBlogPosts();

    // Tarihe göre sırala ve istenen sayıda döndür
    return allPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  } catch (error) {
    console.error('Error in getRecentBlogPosts:', error);
    return [];
  }
}