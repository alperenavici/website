'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/data/blogPosts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { BlogPost, BlogCategory } from '@/types/blog';
import { blogCategories, getBlogCategories } from '@/data/blogCategories';

export default function BlogPageClient({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>(blogCategories);
  const [loading, setLoading] = useState(true);

  // Blog yazılarını ve kategorileri yükle
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kategorileri ve blog yazılarını paralel olarak çek
        const [categoriesData, fetchedPosts] = await Promise.all([
          getBlogCategories(),
          getBlogPosts()
        ]);

        setCategories(categoriesData);
        setAllPosts(fetchedPosts);

        // Filter posts by category if a category is selected
        if (selectedCategory) {
          const filteredPosts = fetchedPosts.filter(post =>
            post.categories.includes(selectedCategory)
          );
          setPosts(filteredPosts);
        } else {
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero section */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog2.jpg"
            alt="Blog Sayfası Arka Plan"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover opacity-100"
            priority
            loading="eager"
          />
        </div>
        <div className="container mx-auto px-4 z-10 pt-0 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 text-[#00000]">Blog</h1>
            <p className="text-lg sm:text-xl text-[#fffff]">
              Hukuki makaleler ve güncel hukuk haberleri
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-[#E8E2D9]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Main content */}
            <div className="w-full md:w-2/3">
              {posts.length === 0 ? (
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
                  <p className="text-lg text-gray-600">
                    {selectedCategory
                      ? `Seçilen kategoride henüz blog yazısı bulunmamaktadır.`
                      : 'Henüz blog yazısı bulunmamaktadır.'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 relative h-48 sm:h-56 md:h-auto">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          quality={75}
                        />
                      </div>
                      <div className="w-full md:w-2/3 p-4 sm:p-6">
                        <div className="mb-2 flex flex-wrap">
                          {post.categories.slice(0, 2).map((categorySlug) => {
                            const category = categories.find(c => c.slug === categorySlug);
                            return category ? (
                              <Link
                                key={category.id}
                                href={`/blog?category=${category.slug}`}
                                className="inline-block bg-[#E8E2D9] text-[#8B7D6B] text-xs font-medium rounded-full px-3 py-1 mr-2 mb-1"
                              >
                                {category.name}
                              </Link>
                            ) : null;
                          })}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                          <Link href={`/blog/${post.slug}`} className="hover:text-[#8B7D6B] transition-colors">
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs sm:text-sm text-slate-500">
                            {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                          </div>
                          <Link href={`/blog/${post.slug}`} className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium text-sm sm:text-base inline-flex items-center">
                            Devamını Oku
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b pb-2 text-gray-700">Kategoriler</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/blog"
                      className={`text-[#8B7D6B] hover:text-[#6B5F4F] transition-colors flex items-center justify-between
                        ${!selectedCategory ? 'font-bold' : ''}`}
                    >
                      <span>Tümü</span>
                      <span className="bg-[#E8E2D9] text-[#8B7D6B] text-xs rounded-full px-2 py-1">
                        {allPosts.length}
                      </span>
                    </Link>
                  </li>
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/blog?category=${category.slug}`}
                        className={`text-[#8B7D6B] hover:text-[#6B5F4F] transition-colors flex items-center justify-between
                          ${selectedCategory === category.slug ? 'font-bold' : ''}`}
                      >
                        <span>{category.name}</span>
                        <span className="bg-[#E8E2D9] text-[#8B7D6B] text-xs rounded-full px-2 py-1">
                          {allPosts?.filter(post => post.categories?.includes(category.slug)).length || 0}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent posts */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b pb-2 text-gray-700">Son Yazılar</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {allPosts.slice(0, 5).map((post) => (
                    <li key={post.id} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 mt-1">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 48px, 64px"
                          style={{ objectFit: 'cover' }}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">
                          <Link href={`/blog/${post.slug}`} className="hover:text-[#8B7D6B] transition-colors">
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 