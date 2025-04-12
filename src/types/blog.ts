export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  coverImage: string;
  categories: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
} 