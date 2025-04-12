import { BlogCategory } from '@/types/blog';

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Aile Hukuku',
    slug: 'aile-hukuku'
  },
  {
    id: '2',
    name: 'İş Hukuku',
    slug: 'is-hukuku'
  },
  {
    id: '3',
    name: 'Ticaret Hukuku',
    slug: 'ticaret-hukuku'
  },
  {
    id: '4',
    name: 'Ceza Hukuku',
    slug: 'ceza-hukuku'
  },
  {
    id: '5',
    name: 'Miras Hukuku',
    slug: 'miras-hukuku'
  },
  {
    id: '6',
    name: 'Tazminat Hukuku',
    slug: 'tazminat-hukuku'
  },
  {
    id: '7',
    name: 'Boşanma',
    slug: 'bosanma'
  },
  {
    id: '8',
    name: 'İş Davası',
    slug: 'is-davasi'
  },
  {
    id: '9',
    name: 'Şirket Kurulumu',
    slug: 'sirket-kurulumu'
  },
  {
    id: '10',
    name: 'Trafik Kazası',
    slug: 'trafik-kazasi'
  }
];

export function getBlogCategories() {
  return blogCategories;
}

export function getBlogCategoryBySlug(slug: string) {
  return blogCategories.find(category => category.slug === slug);
}
