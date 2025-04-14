import { BlogCategory } from '@/types/blog';

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Ceza Hukuku',
    slug: 'ceza-hukuku'
  },
  {
    id: '2',
    name: 'Aile Hukuku',
    slug: 'aile-hukuku'
  },
  {
    id: '3',
    name: 'İş Hukuku',
    slug: 'is-hukuku'
  },
  {
    id: '4',
    name: 'Ticaret Hukuku',
    slug: 'ticaret-hukuku'
  },
  {
    id: '5',
    name: 'Gayrimenkul Hukuku',
    slug: 'gayrimenkul-hukuku'
  },
  {
    id: '6',
    name: 'Miras Hukuku',
    slug: 'miras-hukuku'
  }
];

export function getBlogCategories() {
  return blogCategories;
}

export function getBlogCategoryBySlug(slug: string) {
  return blogCategories.find(category => category.slug === slug);
}
