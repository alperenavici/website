import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Boşanma Sürecinde Hakların Korunması',
    slug: 'bosanma-surecinde-haklarin-korunmasi',
    excerpt: 'Boşanma sürecinde bilmeniz gereken haklar ve dikkat edilmesi gereken hususlar hakkında bilgiler...',
    content: `
      # Boşanma Sürecinde Hakların Korunması

      Boşanma süreci, çiftler için duygusal olarak zorlu bir dönem olabilir. Bu süreçte yasal haklarınızın farkında olmak ve onları korumak büyük önem taşır. Bu yazıda, boşanma sürecinde dikkat edilmesi gereken önemli hukuki konuları ele alacağız.

      ## Mal Paylaşımı

      Türk Medeni Kanunu'na göre, evlilik süresince edinilen mallar eşler arasında eşit olarak paylaşılır. Ancak, evlilik öncesi edinilen mallar veya miras yoluyla kazanılan varlıklar bu paylaşımın dışında tutulur. Mal paylaşımı konusunda anlaşmazlık yaşamamak için evlilik sürecinde edinilen malların kaydını tutmak önemlidir.

      ## Nafaka Hakkı

      Boşanma sonrasında ekonomik olarak zor durumda kalacak olan eş, diğer eşten nafaka talep edebilir. Yoksulluk nafakası olarak adlandırılan bu hak, maddi durumu iyi olan eşin, diğer eşin geçimini sağlaması için ödediği bir bedeldir. Nafaka miktarı, tarafların ekonomik durumları göz önünde bulundurularak mahkeme tarafından belirlenir.

      ## Velayet Hakkı

      Çocuklu çiftlerin boşanması durumunda, çocuğun velayeti genellikle eşlerden birine verilir. Velayet hakkı olmayan eşin ise çocukla düzenli olarak görüşme hakkı vardır. Mahkeme, velayet kararını verirken çocuğun üstün yararını gözetir.

      ## Uzlaşma Yolları

      Boşanma sürecinde çiftlerin uzlaşmaya varması, sürecin daha hızlı ve az sancılı geçmesini sağlar. Arabuluculuk veya avukatlar aracılığıyla yürütülen müzakereler, anlaşmalı boşanma sürecine katkıda bulunabilir.

      ## Sonuç

      Boşanma, hukuki olduğu kadar duygusal bir süreçtir. Bu süreçte haklarınızın farkında olmak ve doğru adımları atmak, geleceğinizi şekillendirmenize yardımcı olacaktır. Uzman bir avukatın rehberliğinde ilerlemek, haklarınızın korunmasını ve adil bir boşanma sürecini garanti altına alacaktır.
    `,
    date: '2023-06-15',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/blog1.jpg',
    categories: ['aile-hukuku', 'bosanma']
  },
  {
    id: '2',
    title: 'İşe İade Davalarında Dikkat Edilmesi Gerekenler',
    slug: 'ise-iade-davalarinda-dikkat-edilmesi-gerekenler',
    excerpt: 'İşten çıkarıldıysanız ve işe iade davası açmayı düşünüyorsanız bilmeniz gereken hukuki adımlar...',
    content: `
      # İşe İade Davalarında Dikkat Edilmesi Gerekenler

      İş Kanunu, işçileri haksız işten çıkarmalara karşı korumak amacıyla işe iade davası açma hakkı tanımıştır. Ancak bu hakkın kullanılabilmesi için belirli koşulların sağlanması ve sürelere dikkat edilmesi gerekmektedir.

      ## İşe İade Davası Açabilmek İçin Gerekli Koşullar

      İşe iade davası açabilmek için:
      
      1. İş sözleşmesinin işveren tarafından feshedilmiş olması,
      2. İşçinin en az 6 aylık kıdeminin olması,
      3. İşyerinde en az 30 işçinin çalışıyor olması,
      4. İşçinin belirsiz süreli iş sözleşmesi ile çalışıyor olması gerekmektedir.

      ## Dava Açma Süresi

      İşe iade davası, iş sözleşmesinin feshedildiği tarihten itibaren 1 ay içinde açılmalıdır. Bu süre hak düşürücü bir süre olup, sürenin geçirilmesi halinde dava açma hakkı ortadan kalkar.

      ## Geçerli Fesih Nedenleri

      İşveren, işçinin iş sözleşmesini geçerli bir nedene dayanarak feshedebilir. Geçerli fesih nedenleri arasında işçinin yeterliliği ve davranışları ile işletmesel kararlar yer alır. Ancak fesih nedeninin geçerli olup olmadığını değerlendirme yetkisi mahkemeye aittir.

      ## İşe İade Davasının Sonuçları

      İşe iade davasının kazanılması durumunda:
      
      1. İşveren, işçiyi işe başlatmak zorunda değildir; ancak işe başlatmadığı takdirde tazminat ödemekle yükümlüdür.
      2. İşçi, 4 ila 8 aylık ücreti tutarında iş güvencesi tazminatına hak kazanır.
      3. İşçi, işe iade kararının kesinleşmesine kadar geçen süre için en çok 4 aya kadar boşta geçen süre ücretine hak kazanır.

      ## Sonuç

      İşe iade davası, işçilere önemli haklar tanıyan bir hukuki yoldur. Ancak bu davayı açabilmek için gerekli koşulların sağlanması ve sürelere dikkat edilmesi büyük önem taşır. İşten çıkarılmanın haksız olduğunu düşünüyorsanız, vakit kaybetmeden bir iş hukuku avukatına danışmanız ve haklarınızı öğrenmeniz önerilir.
    `,
    date: '2023-05-03',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/blog2.jpg',
    categories: ['is-hukuku', 'is-davasi']
  },
  {
    id: '3',
    title: 'Şirket Kuruluşunda Yeni Yasal Düzenlemeler',
    slug: 'sirket-kurulusunda-yeni-yasal-duzenlemeler',
    excerpt: '2023 yılında şirket kuruluşu ile ilgili yeni düzenlemeler ve dikkate alınması gereken değişiklikler...',
    content: `
      # Şirket Kuruluşunda Yeni Yasal Düzenlemeler

      Türkiye'de şirket kuruluşu süreçleri, ekonomik gelişmeler ve dijital dönüşüm doğrultusunda sürekli güncellenmektedir. 2023 yılında da şirket kuruluşlarını kolaylaştırmak ve hızlandırmak amacıyla önemli yasal düzenlemeler yapıldı. Bu yazıda, yeni düzenlemeleri ve şirket kurarken dikkat edilmesi gereken önemli noktaları ele alacağız.

      ## Dijital Kuruluş İmkanı

      2023 itibariyle, limited şirketlerin ve anonim şirketlerin kuruluşunda tamamen dijital süreçler uygulanmaya başlandı. Artık şirket kuruluşu için gereken belgeler elektronik ortamda hazırlanabiliyor ve Ticaret Sicil Müdürlüğü'ne elektronik olarak başvuru yapılabiliyor. Bu sayede, şirket kuruluş süresi ortalama 3 güne kadar düşürüldü.

      ## Sermaye Şartları

      Yeni düzenlemelerle birlikte, limited şirketler için asgari sermaye tutarı 50.000 TL'ye, anonim şirketler için ise 100.000 TL'ye yükseltildi. Ancak bu sermayenin tamamının kuruluş aşamasında ödenmesi zorunlu değil. Limited şirketlerde sermayenin en az %25'inin, anonim şirketlerde ise en az %25'inin tescilden önce ödenmesi yeterli.

      ## Tek Kişilik Şirket Kuruluşu

      Artık hem limited hem de anonim şirketler tek kişi ile kurulabiliyor. Bu durum, özellikle bireysel girişimciler için büyük kolaylık sağlıyor. Tek kişilik şirket kuruluşunda, şirket türüne göre belirlenen asgari sermaye şartlarının sağlanması yeterli.

      ## Şirket Kuruluşunda Masraflar

      Şirket kuruluşundaki masraflar da yeni düzenlemelerle revize edildi. Dijital başvuru süreçleri sayesinde noter masrafları önemli ölçüde azaltıldı. Ayrıca, belirli şartları sağlayan yeni kurulan şirketler için vergi avantajları da sağlanıyor.

      ## Sonuç

      2023 yılında yapılan yasal düzenlemeler, Türkiye'de şirket kuruluş süreçlerini daha hızlı ve kolay hale getirdi. Dijitalleşme adımları, bürokrasinin azaltılması ve sermaye şartlarındaki yenilikler, girişimcilerin iş kurmalarını teşvik edici nitelikte. Ancak, şirket kuruluşu karmaşık bir süreç olduğundan, bu süreçte bir ticaret hukuku uzmanından destek almak, olası hataların önüne geçecektir.
    `,
    date: '2023-04-21',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/blog3.jpg',
    categories: ['ticaret-hukuku', 'sirket-kurulumu']
  },
  {
    id: '4',
    title: 'Trafik Kazalarında Hukuki Sorumluluk',
    slug: 'trafik-kazalarinda-hukuki-sorumluluk',
    excerpt: 'Trafik kazalarından sonra bilmeniz gereken haklar ve alınması gereken hukuki önlemler...',
    content: `
      # Trafik Kazalarında Hukuki Sorumluluk

      Trafik kazaları, her yıl binlerce kişinin yaralanmasına ve maddi hasara uğramasına neden olmaktadır. Bu tür kazalarda hukuki sorumluluğun kime ait olduğu ve mağdurların haklarını nasıl arayacağı önemli konulardır. Bu yazıda, trafik kazalarında hukuki sorumluluk ve tazminat haklarına ilişkin bilgiler sunacağız.

      ## Kusur Oranı ve Sorumluluğun Belirlenmesi

      Trafik kazalarında sorumluluğun belirlenmesinde, kusur oranı büyük önem taşır. Kusur oranı, trafik polisi veya jandarma tarafından düzenlenen kaza tespit tutanağında belirtilir. Ancak bu oran, mahkeme sürecinde bilirkişi raporlarıyla değişebilir. Kusur oranı, tazminat miktarının belirlenmesinde de etkilidir.

      ## Maddi ve Manevi Tazminat Hakları

      Trafik kazası mağdurları, uğradıkları zararın tazmini için maddi ve manevi tazminat talep edebilirler:

      - **Maddi Tazminat**: Tedavi giderleri, iş göremezlik tazminatı, araç hasar bedeli gibi somut zararları kapsar.
      - **Manevi Tazminat**: Kaza sonucu oluşan psikolojik travma, acı ve üzüntü için talep edilir.

      ## Sigorta Şirketlerinin Sorumluluğu

      Trafik kazalarında, kazaya karışan araçların zorunlu trafik sigortaları devreye girer. Sigorta şirketleri, poliçe limitleri dahilinde, sigortalının hukuki sorumluluğunu üstlenir. Ancak bazı durumlarda, sigorta şirketleri tazminat ödemekten kaçınabilir veya düşük tazminat teklifleri sunabilir.

      ## Dava Açma Süresi

      Trafik kazalarından kaynaklanan tazminat davalarında, genel zamanaşımı süresi 2 yıldır. Ancak bu süre, kazanın oluşumu ve zararın ortaya çıkış tarihine göre değişiklik gösterebilir. Bu nedenle, kaza sonrası vakit kaybetmeden hukuki yollara başvurmak önemlidir.

      ## Kaza Sonrası Atılması Gereken Adımlar

      1. Kaza yerinde polis veya jandarma çağırarak kaza tespit tutanağı düzenlettirin.
      2. Yaralanma durumunda hemen sağlık raporu alın.
      3. Kaza yerinin fotoğraflarını çekin ve tanık bilgilerini alın.
      4. Karşı tarafın sigorta bilgilerini ve iletişim bilgilerini temin edin.
      5. Bir avukata danışarak hukuki süreç hakkında bilgi alın.

      ## Sonuç

      Trafik kazası sonrasında haklarınızı bilmek ve doğru adımları atmak, adil bir tazminat alabilmeniz için büyük önem taşır. Kaza sonrası delillerin toplanması ve zamanaşımı sürelerinin takip edilmesi kritiktir. Bu süreçte, trafik kazaları konusunda deneyimli bir avukattan destek almanız, haklarınızın korunmasını sağlayacaktır.
    `,
    date: '2023-03-10',
    author: 'Av. Mehmet Yılmaz',
    coverImage: '/blog4.jpg',
    categories: ['tazminat-hukuku', 'trafik-kazasi']
  }
];

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

export function getRecentBlogPosts(count: number = 3) {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}