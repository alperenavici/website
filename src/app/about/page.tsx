'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaBalanceScale, FaClock, FaHandshake, FaGraduationCap } from 'react-icons/fa';
import { useSiteImages } from '@/lib/siteSettings';

export default function AboutPage() {
  const siteImages = useSiteImages();
  return (
    <>
      {/* Hero section */}
      <section className="relative h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteImages.images.about_hero}
            alt="Hakkımızda Sayfası Arka Plan"
            fill
            className="object-cover opacity-110"
            priority
            loading="eager"
            quality={85}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-2 z-10 pt-0 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 text-[#e0e0e0]">Hakkımızda</h1>
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#8B7D6B]">Hukuk Büromuz</h2>
              <p className="text-lg text-[#4A4A4A] mb-6">
                2019 yılından bu yana, serbest avukatlık faaliyetlerimiz kapsamında müvekkillerimizin hukuki ihtiyaçlarına etkili ve kalıcı çözümler sunuyoruz. Çalışmalarımızın merkezine, her müvekkilimizin yaşadığı hukuki süreci en doğru şekilde anlamayı ve ona özel stratejiler geliştirmeyi koyuyoruz.
              </p>
              <p className="text-lg text-[#4A4A4A] mb-6">
                Hukuki destek sürecini yalnızca dava ve danışmanlık hizmeti sunmakla sınırlı görmüyor; her aşamada şeffaf iletişim kurarak müvekkillerimizle güçlü, güvene dayalı ilişkiler kurmayı temel ilkemiz olarak benimsiyoruz. İnanıyoruz ki, sağlıklı bir iletişim ve karşılıklı güven ortamı, hukuki süreçlerin başarısında en az bilgi ve deneyim kadar önemli bir rol oynamaktadır.
              </p>
              <p className="text-lg text-[#4A4A4A]">
                Hukuku yalnızca bir kural ve normlar bütünü olarak değerlendirmiyor; onu bireylerin, ailelerin ve kurumların yaşamlarına yön veren, onların geleceğini şekillendiren dinamik bir destek unsuru olarak görüyoruz. Her davada ve her danışmanlık sürecinde, mesleki bilgi birikimimizi, etik değerlerimizi ve insan odaklı yaklaşımımızı bir araya getirerek hizmet veriyoruz.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={siteImages.images.about_office}
                  alt="Hukuk Bürosu Ofis Görseli"
                  fill
                  className="object-cover"
                  priority
                  loading="eager"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 bg-[#8B7D6B]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#8B7D6B]">Değerlerimiz</h2>
            <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
              Müvekkillerimize sunduğumuz hizmetin kalitesini belirleyen temel değerlerimiz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaBalanceScale size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Adalet</h3>
              <p className="text-[#4A4A4A]">
                Her müvekkilimize adil ve eşit davranır, hak ettikleri hukuki temsili sağlarız.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaHandshake size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Güven</h3>
              <p className="text-[#4A4A4A]">
                Müvekkillerimizle güvene dayalı ilişkiler kurar, her zaman şeffaf iletişim sağlarız.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaGraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Uzmanlık</h3>
              <p className="text-[#4A4A4A]">
                Sürekli kendimizi geliştirerek hukukun her alanında uzmanlığımızı pekiştiririz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaClock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Dakiklik</h3>
              <p className="text-[#4A4A4A]">
                Hukuki süreçleri zamanında takip eder, müvekkillerimizi sürekli bilgilendiririz.
              </p>
            </div>
          </div>
        </div>
      </section>




      {/* CTA section */}
      <section className="bg-[#8B7D6B] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hukuki Danışmanlık İçin Hemen İletişime Geçin</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[#E8E2D9]">
            Profesyonel ekibimiz, hukuki sorunlarınıza çözüm bulmak için hazır.
          </p>
          <Link href="/contact" className="bg-white text-[#8B7D6B] hover:bg-[#E8E2D9] px-8 py-4 rounded-md font-medium text-lg transition-colors inline-block">
            İletişime Geç
          </Link>
        </div>
      </section>
    </>
  );
} 