import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '@/types/blog';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return (posts || []).map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || post.content.substring(0, 200) + '...',
      content: post.content,
      date: post.created_at,
      author: post.author || 'Av. Mehmet Yılmaz',
      coverImage: post.image_url || '/blog1.jpg',
      categories: post.categories ? JSON.parse(post.categories) : []
    }));
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !post) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || post.content.substring(0, 200) + '...',
      content: post.content,
      date: post.created_at,
      author: post.author || 'Av. Mehmet Yılmaz',
      coverImage: post.image_url || '/blog1.jpg',
      categories: post.categories ? JSON.parse(post.categories) : []
    };
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    return null;
  }
}

export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(count);

    if (error) {
      console.error('Error fetching recent blog posts:', error);
      return [];
    }

    return (posts || []).map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || post.content.substring(0, 200) + '...',
      content: post.content,
      date: post.created_at,
      author: post.author || 'Av. Mehmet Yılmaz',
      coverImage: post.image_url || '/blog1.jpg',
      categories: post.categories ? JSON.parse(post.categories) : []
    }));
  } catch (error) {
    console.error('Error in getRecentBlogPosts:', error);
    return [];
  }
}