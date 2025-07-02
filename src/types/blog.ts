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

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SiteImages {
  home_hero: string;
  home_person: string;
  about_hero: string;
  about_office: string;
  services_hero: string;
  contact_hero: string;
  blog_hero: string;
} 