'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/data/blogPosts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { BlogPost, BlogCategory } from '@/types/blog';
import { blogCategories, getBlogCategories } from '@/data/blogCategories';
import { useSiteImages } from '@/lib/siteSettings';

export default function BlogPageClient({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>(blogCategories);
  const [loading, setLoading] = useState(true);
  const siteImages = useSiteImages();

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7D6B] mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-900">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero section */}
      <section className="relative h-[250px] sm:h-[300px] md:h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteImages.images.blog_hero}
            alt="Blog Sayfası Arka Plan"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover opacity-80"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">Blog</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow">
              Hukuki makaleler ve güncel hukuk haberleri
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Mobile Categories - Show on top for mobile */}
          <div className="block md:hidden mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Kategoriler</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog"
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${!selectedCategory
                      ? 'bg-[#8B7D6B] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    }`}
                >
                  Tümü
                  <span className="ml-2 bg-white/20 text-xs rounded-full px-2 py-0.5">
                    {allPosts.length}
                  </span>
                </Link>
                {categories?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog?category=${category.slug}`}
                    className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${selectedCategory === category.slug
                        ? 'bg-[#8B7D6B] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                      }`}
                  >
                    {category.name}
                    <span className="ml-2 bg-white/20 text-xs rounded-full px-2 py-0.5">
                      {allPosts?.filter(post => post.categories?.includes(category.slug)).length || 0}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Main content */}
            <div className="w-full md:w-2/3">
              {posts.length === 0 ? (
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm text-center border border-gray-100">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Henüz yazı bulunmuyor</h3>
                  <p className="text-gray-600">
                    {selectedCategory
                      ? `Seçilen kategoride henüz blog yazısı bulunmamaktadır.`
                      : 'Henüz blog yazısı bulunmamaktadır.'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-6 sm:space-y-8">
                  {posts.map((post, index) => (
                    <article key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-2/5 relative h-48 sm:h-56 lg:h-64">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            quality={75}
                            priority={index < 2}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
                        </div>
                        <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                          <div>
                            <div className="mb-3 flex flex-wrap gap-2">
                              {post.categories.slice(0, 2).map((categorySlug) => {
                                const category = categories.find(c => c.slug === categorySlug);
                                return category ? (
                                  <Link
                                    key={category.id}
                                    href={`/blog?category=${category.slug}`}
                                    className="inline-block bg-[#E8E2D9] text-[#8B7D6B] text-xs font-semibold rounded-full px-3 py-1 hover:bg-[#8B7D6B] hover:text-white transition-colors duration-200"
                                  >
                                    {category.name}
                                  </Link>
                                ) : null;
                              })}
                            </div>
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-gray-900 leading-tight">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-[#8B7D6B] transition-colors duration-200 group-hover:text-[#8B7D6B]"
                              >
                                {post.title}
                              </Link>
                            </h2>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-xs sm:text-sm text-gray-500 font-medium">
                              {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                            </div>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center text-[#8B7D6B] hover:text-[#6B5F4F] font-semibold text-sm sm:text-base transition-all duration-200 hover:translate-x-1 group/link"
                            >
                              Devamını Oku
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-full md:w-1/3">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                <h3 className="text-xl font-bold mb-4 border-b pb-3 text-gray-800">Kategoriler</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/blog"
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 
                        ${!selectedCategory
                          ? 'bg-[#8B7D6B] text-white shadow-md'
                          : 'text-[#8B7D6B] hover:bg-gray-50 hover:text-[#6B5F4F]'
                        }`}
                    >
                      <span className="font-medium">Tümü</span>
                      <span className="bg-white/20 text-xs rounded-full px-2 py-1 font-semibold">
                        {allPosts.length}
                      </span>
                    </Link>
                  </li>
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/blog?category=${category.slug}`}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200
                          ${selectedCategory === category.slug
                            ? 'bg-[#8B7D6B] text-white shadow-md'
                            : 'text-[#8B7D6B] hover:bg-gray-50 hover:text-[#6B5F4F]'
                          }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="bg-white/20 text-xs rounded-full px-2 py-1 font-semibold">
                          {allPosts?.filter(post => post.categories?.includes(category.slug)).length || 0}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent posts */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold mb-4 border-b pb-3 text-gray-800">Son Yazılar</h3>
                <ul className="space-y-4">
                  {allPosts.slice(0, 5).map((post) => (
                    <li key={post.id} className="group">
                      <Link href={`/blog/${post.slug}`} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 group-hover:text-[#8B7D6B] transition-colors duration-200 line-clamp-2 leading-tight">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 font-medium">
                            {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                          </p>
                        </div>
                      </Link>
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