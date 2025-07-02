'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getRecentBlogPosts } from '@/data/blogPosts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { BlogPost } from '@/types/blog';
import { useSiteImages } from '@/lib/siteSettings';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Site resimlerini al
  const siteImages = useSiteImages();

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
      {/* Hero Section */}
      <section className="relative h-screen bg-gray-900 text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteImages.images.home_hero}
            alt="Ana Sayfa Hero"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover opacity-70"
            priority
            loading="eager"
          />
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              Hukuki Danışmanlık ve <span className="text-[#D4C9B8]">Avukatlık Hizmetleri</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-200">
              Deneyimli hukuk ekibimizle yanınızdayız. Her türlü hukuki sorununuzda profesyonel çözüm önerileri sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-[#8B7D6B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#6B5F4F] transition-colors text-center font-semibold"
              >
                Ücretsiz Danışmanlık
              </Link>
              <Link
                href="/services"
                className="border border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors text-center font-semibold"
              >
                Hizmetlerimiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-20 bg-[#E8E2D9]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                Deneyimli ve Güvenilir Hukuk Hizmeti
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Yıllardır sürdürdüğümüz avukatlık kariyerimizde, müvekkillerimizin haklarını en iyi şekilde savunmak için çalışıyoruz.
                Ceza hukuku, aile hukuku, iş hukuku ve ticaret hukuku alanlarında uzmanlaşmış ekibimizle hizmet veriyoruz.
              </p>
              <ul className="text-gray-700 mb-6 sm:mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#8B7D6B] mr-2 mt-1">✓</span>
                  <span>15+ yıl hukuk deneyimi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8B7D6B] mr-2 mt-1">✓</span>
                  <span>500+ başarılı dava</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8B7D6B] mr-2 mt-1">✓</span>
                  <span>7/24 hukuki destek</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8B7D6B] mr-2 mt-1">✓</span>
                  <span>Ücretsiz ilk görüşme</span>
                </li>
              </ul>
              <Link
                href="/about"
                className="bg-[#8B7D6B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#6B5F4F] transition-colors inline-block font-semibold"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={siteImages.images.home_person}
                  alt="Avukat"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  quality={75}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Hizmet Alanlarımız</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Geniş yelpazede hukuki hizmetler sunarak, her türlü hukuki ihtiyacınızı karşılamaya hazırız.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Ceza Hukuku',
                description: 'Ceza davalarında güçlü savunma',
                icon: '⚖️',
                link: '/services'
              },
              {
                title: 'Aile Hukuku',
                description: 'Boşanma ve velayet davalarında çözüm',
                icon: '👨‍👩‍👧‍👦',
                link: '/services'
              },
              {
                title: 'İş Hukuku',
                description: 'Çalışan hakları ve iş davalarında destek',
                icon: '💼',
                link: '/services'
              },
              {
                title: 'Ticaret Hukuku',
                description: 'Şirket hukuku ve ticari anlaşmazlıklar',
                icon: '🏢',
                link: '/services'
              }
            ].map((service, index) => (
              <Link key={index} href={service.link} className="group">
                <div className="bg-[#E8E2D9] p-6 sm:p-8 rounded-lg text-center hover:bg-[#D4C9B8] transition-colors">
                  <div className="text-3xl sm:text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#8B7D6B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#8B7D6B] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Hukuki Sorununuz mu Var?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Deneyimli avukatlık ekibimizle hemen iletişime geçin. İlk danışmanlık ücretsizdir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#8B7D6B] px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Hemen İletişime Geç
            </Link>
            <Link
              href="tel:+905534919903"
              className="border border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-[#8B7D6B] transition-colors font-semibold"
            >
              Ara: 0553 491 99 03
            </Link>
          </div>
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
