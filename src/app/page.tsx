'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBalanceScale, FaGavel, FaHandshake, FaRegFileAlt, FaBriefcase, FaBuilding, FaMap, FaUserFriends } from 'react-icons/fa';
import { getRecentBlogPosts } from '@/data/blogPosts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { BlogPost } from '@/types/blog';
import { blogCategories } from '@/data/blogCategories';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const posts = await getRecentBlogPosts(3);
        setRecentPosts(posts);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <>
      {/* Hero section */}
      <section className="relative h-[600px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/home1.jpg"
            alt="Avukat Mehmet Can Çelimli" 
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            className="opacity-60"
          />
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Hukuki Sorunlarınıza <span className="text-[#ffffff]">Profesyonel</span> Çözümler
            </h1>
            <p className="text-xl mb-8 text-[#ffffff]">
              20 yılı aşkın deneyimimiz ile hukukun farklı alanlarında uzman ekibimizle yanınızdayız.
            </p>
            <div className="flex space-x-4">
              <Link href="/contact" className="bg-gray-800 hover:bg-[#6B5F4F] text-white px-6 py-3 rounded-md font-medium transition-colors">
                Hemen Randevu Alın
              </Link>
              <Link href="/services" className="bg-gray-800 hover:bg-[#E8E2D9] text-white px-6 py-3 rounded-md font-medium transition-colors">
                Hizmetlerimiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#8B7D6B]">Hizmet Alanlarımız</h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              Uzman ekibimiz ile hukukun pek çok alanında kaliteli ve güvenilir hizmet vermekteyiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#E8E2D9] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#8B7D6B] text-white p-3 rounded-full inline-block mb-4">
                <FaBalanceScale size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">Ceza Hukuku</h3>
              <p className="text-[#4A4A4A] mb-4">
                Ceza davalarında müvekkillerimizin haklarını korumak için titizlikle çalışıyoruz.
              </p>
              <Link href="/services/ceza-hukuku" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium inline-flex items-center">
                Detaylı Bilgi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            <div className="bg-[#E8E2D9] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#8B7D6B] text-white p-3 rounded-full inline-block mb-4">
                <FaHandshake size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">Aile Hukuku</h3>
              <p className="text-[#4A4A4A] mb-4">
                Boşanma, velayet, nafaka ve miras gibi aile hukuku konularında danışmanlık sağlıyoruz.
              </p>
              <Link href="/services/aile-hukuku" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium inline-flex items-center">
                Detaylı Bilgi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            <div className="bg-[#E8E2D9] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#8B7D6B] text-white p-3 rounded-full inline-block mb-4">
                <FaBriefcase size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">İş Hukuku</h3>
              <p className="text-[#4A4A4A] mb-4">
                İşçi ve işveren uyuşmazlıklarında her iki tarafın da haklarını gözeterek çözümler sunuyoruz.
              </p>
              <Link href="/services/is-hukuku" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium inline-flex items-center">
                Detaylı Bilgi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            <div className="bg-[#E8E2D9] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#8B7D6B] text-white p-3 rounded-full inline-block mb-4">
                <FaRegFileAlt size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">Ticaret Hukuku</h3>
              <p className="text-[#4A4A4A] mb-4">
                Şirket kurulumları, anlaşmazlıklar ve ticari davalar konusunda uzman hizmet veriyoruz.
              </p>
              <Link href="/services/ticaret-hukuku" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium inline-flex items-center">
                Detaylı Bilgi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="bg-[#8B7D6B] hover:bg-[#6B5F4F] text-white px-6 py-3 rounded-md font-medium transition-colors inline-block">
              Tüm Hizmetlerimiz
            </Link>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-20 bg-[#E8E2D9]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Image container - full width on mobile, half width on desktop */}
                <div className="relative w-full md:w-1/2 h-[400px]">
                  <Image 
                    src="/images/person.jpg"
                    alt="Avukat Mehmet Can Çelimli" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>

                {/* Content container */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-2 text-[#8B7D6B]">Av. Mehmet Can Çelimli</h2>
                  <div className="text-[#8B7D6B] mb-3">Kurucu</div>
                  <p className="text-[#4A4A4A] mb-4">
                    Selçuk Üniversitesi Hukuk Fakültesi'nden mezun olduktan sonra, prestijli bir hukuk bürosunda 5 yıl deneyim kazandım. 2003 yılında kendi hukuk büromu kurdum ve o zamandan beri başarılı bir şekilde müvekkillerime hizmet vermekteyim.
                  </p>
                  <p className="text-[#4A4A4A] mb-6">
                    Ceza Hukuku, Aile Hukuku, İş Hukuku ve Ticaret Hukuku alanlarında uzmanlaşmış ekibimle beraber, müvekkillerimizin haklarını korumak için titizlikle çalışıyoruz. Her davaya özel yaklaşımımız ve detaycı çalışma prensibimiz ile fark yaratıyoruz.
                  </p>
                  <div className="flex justify-start space-x-4 mb-4">
                    <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <Link href="/about" className="bg-[#8B7D6B] hover:bg-[#6B5F4F] text-white px-6 py-3 rounded-md font-medium transition-colors inline-block text-center md:text-left w-full md:w-auto">
                    Daha Fazla Bilgi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#8B7D6B] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hukuki Danışmanlık İçin Hemen İletişime Geçin</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Profesyonel ekibimiz, hukuki sorunlarınıza çözüm bulmak için hazır. İlk görüşme ücretsizdir.
          </p>
          <Link href="/contact" className="bg-white text-[#8B7D6B] hover:bg-[#E8E2D9] px-8 py-4 rounded-md font-medium text-lg transition-colors inline-block">
            Randevu Alın
          </Link>
        </div>
      </section>

      {/* Recent blog posts */}
      <section className="py-20 bg-[#E8E2D9]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B7D6B]">Son Blog Yazıları</h2>
            <Link href="/blog" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium inline-flex items-center">
              Tüm Yazılar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <div className="text-2xl font-semibold text-gray-900">Yükleniyor...</div>
              </div>
            ) : recentPosts.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <div className="text-2xl font-semibold text-gray-900">Henüz blog yazısı bulunmuyor</div>
              </div>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-[#8B7D6B] mb-2">
                      {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">{post.title}</h3>
                    <p className="text-[#4A4A4A] mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                      Devamını Oku
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
