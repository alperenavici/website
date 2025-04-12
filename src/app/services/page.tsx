import Link from 'next/link';
import Image from 'next/image';
import { FaBalanceScale, FaGavel, FaHandshake, FaHome, FaBriefcase, FaUserFriends } from 'react-icons/fa';

export const metadata = {
  title: 'Hizmetlerimiz | Av. Mehmet Yılmaz Hukuk Bürosu',
  description: 'Hukuk büromuzun sunduğu hizmetler ve uzmanlık alanları hakkında bilgi edinin.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/services.jpg"
            alt="Hizmetlerimiz Sayfası Arka Plan"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>
        <div className="container mx-auto px-2 z-10 pt-0 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 text-[#e0e0e0]">Hizmetlerimiz</h1>
            <p className="text-xl text-[#e0e0e0]">
              Hukuki sorunlarınıza profesyonel ve etkili çözümler sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Services content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ceza Hukuku */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                  <FaGavel size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Ceza Hukuku</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Ceza davalarında savunma, kovuşturma öncesi danışmanlık, ceza infaz hukuku ve ceza muhakemesi hukuku alanlarında hizmet veriyoruz.
                </p>
                <Link href="/services/criminal-law" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Detaylı Bilgi →
                </Link>
              </div>
            </div>

            {/* Aile Hukuku */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                  <FaUserFriends size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Aile Hukuku</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Boşanma, nafaka, velayet, mal paylaşımı, evlat edinme ve aile içi şiddet konularında hukuki danışmanlık ve dava takibi yapıyoruz.
                </p>
                <Link href="/services/family-law" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Detaylı Bilgi →
                </Link>
              </div>
            </div>

            {/* İş Hukuku */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                  <FaBriefcase size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">İş Hukuku</h3>
                <p className="text-[#4A4A4A] mb-6">
                  İş sözleşmeleri, iş güvenliği, iş kazaları, işçi-işveren uyuşmazlıkları ve toplu iş hukuku konularında hizmet veriyoruz.
                </p>
                <Link href="/services/labor-law" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Detaylı Bilgi →
                </Link>
              </div>
            </div>

            {/* Ticaret Hukuku */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                  <FaHandshake size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Ticaret Hukuku</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Şirketler hukuku, ticari sözleşmeler, rekabet hukuku, ticari uyuşmazlıklar ve iflas hukuku alanlarında danışmanlık hizmeti sunuyoruz.
                </p>
                <Link href="/services/commercial-law" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Detaylı Bilgi →
                </Link>
              </div>
            </div>

            {/* Gayrimenkul Hukuku */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                  <FaHome size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Gayrimenkul Hukuku</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Tapu işlemleri, kira hukuku, kat mülkiyeti, imar hukuku ve kamulaştırma konularında hukuki danışmanlık ve dava takibi yapıyoruz.
                </p>
                <Link href="/services/real-estate-law" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Detaylı Bilgi →
                </Link>
              </div>
            </div>

            {/* Miras Hukuku */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                  <FaBalanceScale size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Miras Hukuku</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Miras paylaşımı, mirasçılık belgesi, miras reddi, vasiyetname ve miras davaları konularında hukuki danışmanlık hizmeti veriyoruz.
                </p>
                <Link href="/services/inheritance-law" className="text-[#8B7D6B] hover:text-[#6B5F4F] font-medium">
                  Detaylı Bilgi →
                </Link>
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
    </>
  );
} 