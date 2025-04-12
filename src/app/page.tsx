import Link from 'next/link';
import Image from 'next/image';
import { FaBalanceScale, FaGavel, FaHandshake, FaRegFileAlt, FaBriefcase } from 'react-icons/fa';

export default function Home() {
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
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/person.jpg"
                  alt="Avukat Mehmet Yılmaz" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-[#8B7D6B]">Av. Mehmet Can Çelimli Hakkında</h2>
              <p className="text-[#4A4A4A] mb-4">
                Selçuk Üniversitesi Hukuk Fakültesi'nden mezun olduktan sonra, prestijli bir hukuk bürosunda 5 yıl deneyim kazandım. 2003 yılında kendi hukuk büromu kurdum ve o zamandan beri başarılı bir şekilde müvekkillerime hizmet vermekteyim.
              </p>
              <p className="text-[#4A4A4A] mb-6">
                Ceza Hukuku, Aile Hukuku, İş Hukuku ve Ticaret Hukuku alanlarında uzmanlaşmış ekibimle beraber, müvekkillerimizin haklarını korumak için titizlikle çalışıyoruz. Her davaya özel yaklaşımımız ve detaycı çalışma prensibimiz ile fark yaratıyoruz.
              </p>
              <Link href="/about" className="bg-[#8B7D6B] hover:bg-[#6B5F4F] text-white px-6 py-3 rounded-md font-medium transition-colors inline-block">
                Daha Fazla Bilgi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#8B7D6B]">Müvekkil Yorumları</h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              Müvekkillerimizin memnuniyeti bizim için en büyük başarıdır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#E8E2D9] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-[#8B7D6B]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[#4A4A4A] mb-4 italic">
                "Boşanma sürecimde Av. Mehmet Can Çelimli'ın desteği ve profesyonel yaklaşımı sayesinde haklarımın korunduğunu hissettim. Kendisi zor bir dönemde büyük bir destek oldu."
              </p>
              <div className="font-semibold text-[#8B7D6B]">Ayşe K.</div>
            </div>

            <div className="bg-[#E8E2D9] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-[#8B7D6B]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[#4A4A4A] mb-4 italic">
                "İş davamda gösterdiği titizlik ve kararlılık ile hakkımı almama yardımcı oldu. Süreç boyunca her adımda bilgilendirildim ve kendimi güvende hissettim."
              </p>
              <div className="font-semibold text-[#8B7D6B]">Mehmet T.</div>
            </div>

            <div className="bg-[#E8E2D9] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-[#8B7D6B]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[#4A4A4A] mb-4 italic">
                "Şirketimizin ticari anlaşmazlıklarında her zaman yanımızda olan Av. Mehmet Yılmaz, çözüm odaklı yaklaşımı ve alanındaki uzmanlığı ile bizi her zaman doğru yönlendirdi."
              </p>
              <div className="font-semibold text-[#8B7D6B]">Can Ş. - ABC Şirketi CEO'su</div>
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
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src="/blog1.jpg" 
                  alt="Blog yazısı" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-[#8B7D6B] mb-2">15 Haziran 2023</div>
                <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">Boşanma Sürecinde Hakların Korunması</h3>
                <p className="text-[#4A4A4A] mb-4">
                  Boşanma sürecinde bilmeniz gereken haklar ve dikkat edilmesi gereken hususlar hakkında bilgiler...
                </p>
                <Link href="/blog/bosanma-surecinde-haklarin-korunmasi" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Devamını Oku
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src="/blog2.jpg" 
                  alt="Blog yazısı" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-[#8B7D6B] mb-2">3 Mayıs 2023</div>
                <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">İşe İade Davalarında Dikkat Edilmesi Gerekenler</h3>
                <p className="text-[#4A4A4A] mb-4">
                  İşten çıkarıldıysanız ve işe iade davası açmayı düşünüyorsanız bilmeniz gereken hukuki adımlar...
                </p>
                <Link href="/blog/ise-iade-davalarinda-dikkat-edilmesi-gerekenler" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Devamını Oku
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src="/blog3.jpg" 
                  alt="Blog yazısı" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-[#8B7D6B] mb-2">21 Nisan 2023</div>
                <h3 className="text-xl font-semibold mb-3 text-[#8B7D6B]">Şirket Kuruluşunda Yeni Yasal Düzenlemeler</h3>
                <p className="text-[#4A4A4A] mb-4">
                  2023 yılında şirket kuruluşu ile ilgili yeni düzenlemeler ve dikkate alınması gereken değişiklikler...
                </p>
                <Link href="/blog/sirket-kurulusunda-yeni-yasal-duzenlemeler" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Devamını Oku
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
