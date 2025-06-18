export interface User {
  id: string;
  email: string;
  username: string;
  password?: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  featured: boolean;
  cover_image: string;
  author_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  author?: User;
  category?: Category;
  comments?: Comment[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  author_name: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  post_id: string;
  created_at: string;
  updated_at: string;
}

export interface PostWithRelations extends Post {
  author: User;
  category: Category;
  comments: Comment[];
} 