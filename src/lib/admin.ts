import { supabase } from './supabase';
import { Category, Comment, Post, PostWithRelations } from '@/types/supabase';
import slugify from 'slugify';

// Posts
export const getPosts = async ({
  page = 1,
  q,
  category,
  limit = 10,
  sortBy = 'created_at',
  sortDesc = true,
  featured,
}: {
  page?: number;
  q?: string;
  category?: string | null;
  limit?: number;
  sortBy?: string;
  sortDesc?: boolean;
  featured?: boolean;
}) => {
  let query = supabase
    .from('posts')
    .select(`
      *,
      author:author_id(id, username, email),
      category:category_id(id, name, slug),
      comments(*)
    `);

  // Apply filters
  if (q) {
    query = query.ilike('title', `%${q}%`);
  }

  if (category) {
    query = query.eq('category.slug', category);
  }

  if (featured !== undefined) {
    query = query.eq('featured', featured);
  }

  // Apply sorting
  const order = sortDesc ? { ascending: false } : { ascending: true };
  query = query.order(sortBy, order);

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }

  return {
    items: data as PostWithRelations[],
    limit,
    pageCount: Math.ceil((count || 0) / limit)
  };
};

export const getPostById = async (id: string): Promise<PostWithRelations> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id(id, username, email),
      category:category_id(id, name, slug),
      comments(*)
    `)
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }

  return data as PostWithRelations;
};

export const createPost = async ({
  title,
  content,
  categoryId,
  coverImage,
  authorId,
}: {
  title: string;
  content: string;
  categoryId: string;
  coverImage: string;
  authorId: string;
}) => {
  const slug = slugify(title, { lower: true, strict: true });

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      content,
      category_id: categoryId,
      cover_image: coverImage,
      author_id: authorId,
      published: true,
      featured: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }

  return data as Post;
};

export const updatePost = async (id: string, data: Partial<Post>) => {
  // If title is being updated, update slug as well
  if (data.title) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  const { data: updatedPost, error } = await supabase
    .from('posts')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }

  return updatedPost as Post;
};

export const deletePost = async (id: string) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }

  return { success: true };
};

// Categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      posts: posts(count)
    `);

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }

  return data.map(category => ({
    ...category,
    _count: {
      posts: category.posts as unknown as number
    }
  }));
};

export const createCategory = async (data: { name: string }) => {
  const slug = slugify(data.name, { lower: true, strict: true });

  const { data: newCategory, error } = await supabase
    .from('categories')
    .insert({
      name: data.name,
      slug
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }

  return newCategory as Category;
};

export const updateCategory = async (id: string, data: { name: string }) => {
  const slug = slugify(data.name, { lower: true, strict: true });

  const { data: updatedCategory, error } = await supabase
    .from('categories')
    .update({
      name: data.name,
      slug
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category');
  }

  return updatedCategory as Category;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category');
  }

  return { success: true };
};

// Comments
export const getComments = async ({
  page = 1,
  q,
  limit = 10,
  sortBy = 'created_at',
  sortDesc = true,
}: {
  page?: number;
  q?: string;
  limit?: number;
  sortBy?: string;
  sortDesc?: boolean;
}) => {
  let query = supabase
    .from('comments')
    .select(`
      *,
      post:post_id(id, title, slug)
    `);

  // Apply filters
  if (q) {
    query = query.ilike('content', `%${q}%`);
  }

  // Apply sorting
  const order = sortDesc ? { ascending: false } : { ascending: true };
  query = query.order(sortBy, order);

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments');
  }

  return {
    items: data as (Comment & { post: { id: string; title: string; slug: string } })[],
    limit,
    pageCount: Math.ceil((count || 0) / limit)
  };
};

export const updateCommentStatus = async (
  id: string | string[],
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
) => {
  const ids = Array.isArray(id) ? id : [id];
  
  const { data, error } = await supabase
    .from('comments')
    .update({ status })
    .in('id', ids)
    .select();

  if (error) {
    console.error('Error updating comment status:', error);
    throw new Error('Failed to update comment status');
  }

  return data as Comment[];
}; 