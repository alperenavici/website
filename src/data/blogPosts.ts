import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';

// Fallback örnek blog yazıları
const sampleBlogPosts: BlogPost[] = [
  {
    id: 'sample-1',
    title: 'İş Hukuku ve Çalışan Hakları: Güncel Gelişmeler',
    slug: 'is-hukuku-calisan-haklari-guncel-gelismeler',
    excerpt: 'İş hukuku alanındaki son değişiklikler ve çalışan hakları konusunda bilmeniz gereken önemli güncellemeler.',
    content: `<h2>İş Hukuku ve Çalışan Hakları</h2>
    <p>İş hukuku, çalışan ve işveren arasındaki ilişkileri düzenleyen önemli bir hukuk dalıdır. Son dönemde yapılan yasal düzenlemeler ile çalışan hakları daha da güçlendirilmiştir.</p>
    
    <h3>Temel Çalışan Hakları</h3>
    <ul>
      <li>Adil ücret hakkı</li>
      <li>İş güvenliği ve sağlığı hakları</li>
      <li>Örgütlenme özgürlüğü</li>
      <li>Dinlenme ve tatil hakları</li>
    </ul>
    
    <h3>Son Dönem Değişiklikleri</h3>
    <p>2024 yılında yapılan düzenlemeler ile birlikte, çalışanların haklarını koruma altına alan yeni mekanizmalar getirilmiştir. Bu değişiklikler özellikle işten çıkarılma süreçlerinde çalışanları daha fazla koruma altına almaktadır.</p>
    
    <blockquote>
    "İş hukuku, modern toplumun adaletli çalışma yaşamının teminatıdır."
    </blockquote>
    
    <p>Detaylı bilgi almak ve hukuki destek için hukuk büromuzla iletişime geçebilirsiniz.</p>`,
    date: '2024-01-15T10:00:00Z',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/images/services.jpg',
    categories: ['is-hukuku', 'calisan-haklari']
  },
  {
    id: 'sample-2',
    title: 'Aile Hukuku: Boşanma Sürecinde Dikkat Edilmesi Gerekenler',
    slug: 'aile-hukuku-bosanma-sureci-dikkat-edilmesi-gerekenler',
    excerpt: 'Boşanma sürecinde karşılaşabileceğiniz hukuki durumlar ve haklarınızı korumak için bilmeniz gereken önemli noktalar.',
    content: `<h2>Boşanma Süreci ve Hukuki Yaklaşım</h2>
    <p>Boşanma, sadece duygusal değil aynı zamanda hukuki bir süreçtir. Bu süreçte haklarınızı korumak ve en az hasarla süreci tamamlamak için profesyonel hukuki desteğe ihtiyaç duyarsınız.</p>
    
    <h3>Boşanma Türleri</h3>
    <ul>
      <li><strong>Anlaşmalı Boşanma:</strong> Tarafların tüm konularda anlaştığı durumlar</li>
      <li><strong>Çekişmeli Boşanma:</strong> Tarafların anlaşamadığı durumlar</li>
    </ul>
    
    <h3>Mal Paylaşımı</h3>
    <p>Boşanma sürecinde en kritik konulardan biri mal paylaşımıdır. Evlilik birliği süresince edinilen malların adil bir şekilde paylaşılması gerekmektedir.</p>
    
    <h3>Çocuk Hakları</h3>
    <p>Çocuğu olan çiftlerin boşanma sürecinde en önemli konu çocuğun yüksek yararıdır. Velayetten nafakaya kadar tüm kararlar bu ilke doğrultusunda verilir.</p>
    
    <p>Boşanma sürecinizde yanınızda olmak için hukuk büromuz 7/24 hizmetinizdedir.</p>`,
    date: '2024-01-10T14:30:00Z',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/images/about2.jpg',
    categories: ['aile-hukuku', 'bosanma']
  },
  {
    id: 'sample-3',
    title: 'Ceza Hukuku: Suç İsnadı Karşısında Haklarınız',
    slug: 'ceza-hukuku-suc-isnadi-karsinisa-haklariniz',
    excerpt: 'Ceza hukuku sürecinde şüpheli veya sanık olarak haklarınızı bilmek ve doğru savunma stratejisi geliştirmek kritik öneme sahiptir.',
    content: `<h2>Ceza Hukuku ve Savunma Hakları</h2>
    <p>Ceza hukuku sürecinde karşılaştığınız her an, geleceğinizi etkileyebilecek kritik kararlara sahne olabilir. Bu nedenle haklarınızı bilmek ve deneyimli bir avukatla çalışmak şarttır.</p>
    
    <h3>Temel Savunma Hakları</h3>
    <ul>
      <li>Susma hakkı</li>
      <li>Avukat seçme ve müdafi tayini hakkı</li>
      <li>Tercüman hakkı</li>
      <li>Dosyayı inceleme hakkı</li>
      <li>Tanık dinletme hakkı</li>
    </ul>
    
    <h3>Soruşturma Aşaması</h3>
    <p>Soruşturma aşamasında vereceğiniz her beyans kritik önem taşır. Bu aşamada mutlaka avukatınızla birlikte hareket etmelisiniz.</p>
    
    <h3>Kovuşturma Aşaması</h3>
    <p>Mahkeme aşamasında savunma stratejinizi doğru belirlemek ve delillerinizi etkili şekilde sunmak için profesyonel destek almalısınız.</p>
    
    <blockquote>
    "Adalet gecikebilir, ancak asla kaybolmaz. Haklarınızı sonuna kadar savunun."
    </blockquote>
    
    <p>Ceza davalarında uzman ekibimiz, davanızın her aşamasında yanınızda olmaya hazırdır.</p>`,
    date: '2024-01-08T09:15:00Z',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/images/contact2.jpg',
    categories: ['ceza-hukuku', 'savunma-haklari']
  },
  {
    id: 'sample-4',
    title: 'Ticaret Hukuku: Şirket Kuruluş Sürecinde Dikkat Edilecekler',
    slug: 'ticaret-hukuku-sirket-kurulus-sureci-dikkat-edilecekler',
    excerpt: 'Şirket kurarken karşılaşabileceğiniz hukuki sorunları önlemek ve doğru adımlarla ilerlemek için bilmeniz gerekenler.',
    content: `<h2>Şirket Kuruluş Süreci</h2>
    <p>Ticari faaliyetlerinizi yasal çerçevede yürütmek için doğru şirket türünü seçmek ve kuruluş sürecini hukuka uygun şekilde tamamlamak kritik öneme sahiptir.</p>
    
    <h3>Şirket Türleri</h3>
    <ul>
      <li><strong>Limited Şirket:</strong> Küçük ve orta ölçekli işletmeler için ideal</li>
      <li><strong>Anonim Şirket:</strong> Büyük sermayeli ve halka açık şirketler için</li>
      <li><strong>Kolektif Şirket:</strong> Ortakların sınırsız sorumluluğu</li>
      <li><strong>Komandit Şirket:</strong> Karma sorumluluk yapısı</li>
    </ul>
    
    <h3>Kuruluş Aşamaları</h3>
    <ol>
      <li>Şirket unvanının belirlenmesi ve tescili</li>
      <li>Esas sözleşmenin hazırlanması</li>
      <li>Sermayenin yatırılması</li>
      <li>Ticaret sicil işlemleri</li>
      <li>Vergi dairesi işlemleri</li>
    </ol>
    
    <h3>Yasal Yükümlülükler</h3>
    <p>Şirket kurduktan sonra yerine getirmeniz gereken yasal yükümlülükler bulunmaktadır. Bu yükümlülükleri zamanında yerine getirmemek ciddi yaptırımlar doğurabilir.</p>
    
    <p>Şirket kuruluş sürecinizde profesyonel hukuki destek için bizimle iletişime geçin.</p>`,
    date: '2024-01-05T16:45:00Z',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/images/ofis.jpg',
    categories: ['ticaret-hukuku', 'sirket-kurulus']
  }
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // İlk olarak blog_posts tablosundan verileri çek
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (blogError) {
      console.warn('Error fetching blog posts from database, using sample data:', blogError);
    }

    // Sonra admin panelinden eklenen postları çek
    const { data: adminPosts, error: adminError } = await supabase
      .from('posts')
      .select(`
        *,
        category:category_id(id, name, slug)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (adminError) {
      console.warn('Error fetching admin posts from database:', adminError);
    }

    // Blog posts verisini düzenle
    const formattedBlogPosts = (blogPosts || []).map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || post.content.substring(0, 200) + '...',
      content: post.content,
      date: post.created_at,
      author: post.author || 'Av. Mehmet Yılmaz',
      coverImage: post.image_url || '/images/blog1.jpg',
      categories: post.categories ? JSON.parse(post.categories) : []
    }));

    // Admin posts verisini düzenle
    const formattedAdminPosts = (adminPosts || []).map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.content.substring(0, 200) + '...',
      content: post.content,
      date: post.created_at,
      author: 'Av. Mehmet Yılmaz', // Varsayılan yazar
      coverImage: post.cover_image || '/images/blog1.jpg',
      categories: post.category ? [post.category.slug] : []
    }));

    // İki kaynaktan gelen verileri birleştir
    const allPosts = [...formattedBlogPosts, ...formattedAdminPosts];

    // Eğer veritabanından veri gelmiyorsa örnek verileri kullan
    if (allPosts.length === 0) {
      console.log('No posts found in database, returning sample data');
      return sampleBlogPosts;
    }

    return allPosts;
  } catch (error) {
    console.error('Error in getBlogPosts, returning sample data:', error);
    return sampleBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // İlk olarak blog_posts tablosunda ara
    const { data: blogPost } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (blogPost) {
      return {
        id: blogPost.id,
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt || blogPost.content.substring(0, 200) + '...',
        content: blogPost.content,
        date: blogPost.created_at,
        author: blogPost.author || 'Av. Mehmet Yılmaz',
        coverImage: blogPost.image_url || '/images/blog1.jpg',
        categories: blogPost.categories ? JSON.parse(blogPost.categories) : []
      };
    }

    // Bulunamadıysa posts tablosunda ara
    const { data: adminPost } = await supabase
      .from('posts')
      .select(`
        *,
        category:category_id(id, name, slug)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (adminPost) {
      return {
        id: adminPost.id,
        title: adminPost.title,
        slug: adminPost.slug,
        excerpt: adminPost.content.substring(0, 200) + '...',
        content: adminPost.content,
        date: adminPost.created_at,
        author: 'Av. Mehmet Yılmaz', // Varsayılan yazar
        coverImage: adminPost.cover_image || '/images/blog1.jpg',
        categories: adminPost.category ? [adminPost.category.slug] : []
      };
    }

    // Veritabanında bulunamadıysa örnek verilerden ara
    const samplePost = sampleBlogPosts.find(post => post.slug === slug);
    if (samplePost) {
      return samplePost;
    }

    // Her iki tabloda da bulunamadıysa null döndür
    return null;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);

    // Hata durumunda örnek verilerden ara
    const samplePost = sampleBlogPosts.find(post => post.slug === slug);
    return samplePost || null;
  }
}

export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    // Tüm blog yazılarını getir
    const allPosts = await getBlogPosts();

    // Tarihe göre sırala ve istenen sayıda döndür
    return allPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  } catch (error) {
    console.error('Error in getRecentBlogPosts:', error);
    return sampleBlogPosts.slice(0, count);
  }
}