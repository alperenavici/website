'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { BlogPost } from '@/types/blog';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Sosyal medya paylaşım fonksiyonları
  const shareOnTwitter = (title: string, url: string) => {
    const text = encodeURIComponent(`${title} - Detaylar için: ${url}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = (url: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = (title: string, url: string) => {
    const text = encodeURIComponent(`${title}\n\nDetaylar için: ${url}`);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  // Kopyala fonksiyonu
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // Başarı mesajı göstermek için kısa bir uyarı
      alert('Link kopyalandı!');
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      // Fallback: Manuel seçim
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link kopyalandı!');
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const slug = params.slug as string;
        const [postData, allPosts] = await Promise.all([
          getBlogPostBySlug(slug),
          getBlogPosts()
        ]);

        setPost(postData);

        // İlgili yazıları bul (aynı kategorideki diğer yazılar)
        if (postData) {
          const related = allPosts
            .filter(p =>
              p.id !== postData.id &&
              p.categories.some(cat => postData.categories.includes(cat))
            )
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

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

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.87 0-5.431.726-7.547 1.963C2.732 17.576 2 18.596 2 19.77V21a1 1 0 001 1h18a1 1 0 001-1v-1.23c0-1.174-.732-2.194-2.453-2.807z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog yazısı bulunamadı</h2>
          <p className="text-gray-600 mb-6">Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-[#8B7D6B] text-white font-semibold rounded-lg hover:bg-[#6B5F4F] transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Bloga Dön
          </Link>
        </div>
      </div>
    );
  }

  // Mevcut sayfa URL'si
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-[#8B7D6B] hover:text-[#6B5F4F] transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Geri</span>
            </button>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-[#8B7D6B] transition-colors duration-200"
            >
              Tüm Yazılar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-6 sm:pb-8 md:pb-12">
            <div className="max-w-4xl">
              {/* Categories */}
              <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                {post.categories.map((categorySlug) => (
                  <span
                    key={categorySlug}
                    className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold rounded-full px-3 py-1"
                  >
                    {categorySlug}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                {post.title}
              </h1>
              <div className="flex items-center text-white/90 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">
                  {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article content */}
            <div className="bg-white">
              {/* Excerpt */}
              {post.excerpt && (
                <div className="mb-8 sm:mb-12">
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium border-l-4 border-[#8B7D6B] pl-6 italic">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Main content */}
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose prose-sm sm:prose-base md:prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
                  prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-6
                  prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-[#8B7D6B] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1
                  prose-blockquote:border-l-4 prose-blockquote:border-[#8B7D6B] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4"
              />
            </div>

            {/* Share section */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bu yazıyı paylaş</h3>
                  <p className="text-gray-600 text-sm">Faydalı bulduğunuz bu içeriği sosyal medyada paylaşabilirsiniz.</p>
                </div>
                <div className="flex gap-3">
                  {/* Twitter Paylaş */}
                  <button
                    onClick={() => shareOnTwitter(post.title, currentUrl)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 hover:scale-110"
                    title="Twitter'da paylaş"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>

                  {/* Facebook Paylaş */}
                  <button
                    onClick={() => shareOnFacebook(currentUrl)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors duration-200 hover:scale-110"
                    title="Facebook'ta paylaş"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>

                  {/* WhatsApp Paylaş */}
                  <button
                    onClick={() => shareOnWhatsApp(post.title, currentUrl)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 hover:scale-110"
                    title="WhatsApp'ta paylaş"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.996-4.779-2.811-6.598-1.815-1.819-4.145-2.817-6.605-2.818-5.451 0-9.887 4.432-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.277-.857zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </button>

                  {/* Link Kopyala */}
                  <button
                    onClick={() => copyToClipboard(currentUrl)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 hover:scale-110"
                    title="Linki kopyala"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 sm:mt-20">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">İlgili Yazılar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8B7D6B] transition-colors duration-200">
                          <Link href={`/blog/${relatedPost.slug}`}>
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="text-xs text-gray-500 font-medium">
                          {format(new Date(relatedPost.date), 'd MMMM yyyy', { locale: tr })}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Back to blog */}
            <div className="mt-12 sm:mt-16 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-[#8B7D6B] text-white font-semibold rounded-lg hover:bg-[#6B5F4F] transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Tüm Blog Yazılarına Dön
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 