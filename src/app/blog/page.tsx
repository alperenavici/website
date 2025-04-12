import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/data/blogPosts';
import { getBlogCategories } from '@/data/blogCategories';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const metadata = {
  title: 'Blog | Av. Mehmet Yılmaz Hukuk Bürosu',
  description: 'Hukuki konularda bilgilendirici yazılar ve güncel hukuki gelişmeler.',
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();
  
  return (
    <>
      {/* Hero section */}
      <section className="relative h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/blog2.jpg"
            alt="Blog Sayfası Arka Plan"
            fill
            sizes="100vw"
            quality={100}
            className="object-cover opacity-100"
            priority
          />
        </div>
        <div className="container mx-auto px-2 z-10 pt-0 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 text-[#00000]">Blog</h1>
            <p className="text-xl text-[#fffff]">
              Hukuki makaleler ve güncel hukuk haberleri
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-[#E8E2D9]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main content */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 gap-10">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="mb-2">
                        {post.categories.slice(0, 2).map((categorySlug) => {
                          const category = categories.find(c => c.slug === categorySlug);
                          return category ? (
                            <Link 
                              key={category.id} 
                              href={`/blog/kategori/${category.slug}`}
                              className="inline-block bg-[#E8E2D9] text-[#8B7D6B] text-xs font-medium rounded-full px-3 py-1 mr-2"
                            >
                              {category.name}
                            </Link>
                          ) : null;
                        })}
                      </div>
                      <h2 className="text-2xl font-bold mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-[#8B7D6B] transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-slate-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                          {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                        </div>
                        <Link href={`/blog/${post.slug}`} className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium inline-flex items-center">
                          Devamını Oku
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/3">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Kategoriler</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        href={`/blog/kategori/${category.slug}`}
                        className="text-[#8B7D6B] hover:text-[#6B5F4F] transition-colors flex items-center justify-between"
                      >
                        <span>{category.name}</span>
                        <span className="bg-[#E8E2D9] text-[#8B7D6B] text-xs rounded-full px-2 py-1">
                          {posts.filter(post => post.categories.includes(category.slug)).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recent posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Son Yazılar</h3>
                <ul className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <li key={post.id} className="flex items-start space-x-3">
                      <div className="relative w-16 h-16 shrink-0 mt-1">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          <Link href={`/blog/${post.slug}`} className="hover:text-[#8B7D6B] transition-colors">
                            {post.title}
                          </Link>
                        </h4>
                        <div className="text-xs text-slate-500 mt-1">
                          {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
                        </div>
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