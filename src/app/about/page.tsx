import Link from 'next/link';
import Image from 'next/image';
import { FaBalanceScale, FaClock, FaHandshake, FaGraduationCap } from 'react-icons/fa';

export const metadata = {
  title: 'Hakkımızda | Av. Mehmet Can Çelimli Hukuk Bürosu',
  description: 'Hukuk büromuz ve avukatlarımız hakkında detaylı bilgi edinin.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about2.jpg"
            alt="Hakkımızda Sayfası Arka Plan"
            fill
            className="object-cover opacity-110"
            priority
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
                2003 yılında Av. Mehmet Can Çelimli tarafından kurulan hukuk büromuz, hukuki sorunlara profesyonel ve etkili çözümler sunmak amacıyla faaliyetlerine başlamıştır. Müvekkillerimizin haklarını korumak ve hukuki süreçleri en etkili şekilde yönetmek temel prensiplerimizdendir.
              </p>
              <p className="text-lg text-[#4A4A4A] mb-6">
                Deneyimli avukat kadromuz ile ceza hukuku, aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku gibi birçok alanda hizmet vermekteyiz. Her davayı titizlikle ele alıyor, müvekkillerimize özel çözümler sunuyoruz.
              </p>
              <p className="text-lg text-[#4A4A4A]">
                Uzun yıllara dayanan deneyimimiz ve alanında uzman avukatlarımızla, müvekkillerimize hukuki süreçlerde rehberlik etmekten ve haklarını korumaktan gurur duyuyoruz.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/ofis.jpg"
                  alt="Hukuk Bürosu Ofis Görseli"
                  fill
                  className="object-cover"
                  priority
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

      {/* Team section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#8B7D6B]">Ekibimiz</h2>
            <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
              Deneyimli ve uzman avukatlardan oluşan ekibimizle tanışın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-80 w-full bg-[#E8E2D9] flex items-center justify-center">
                <p className="text-[#8B7D6B]">Av. Mehmet Can Çelimli</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#8B7D6B]">Av. Mehmet Can Çelimli</h3>
                <div className="text-[#8B7D6B] mb-3">Kurucu Ortak</div>
                <p className="text-[#4A4A4A] mb-4">
                  İstanbul Üniversitesi Hukuk Fakültesi'nden mezun olan Mehmet Can Çelimli, 20 yılı aşkın deneyimiyle ceza hukuku ve aile hukuku alanlarında uzmanlaşmıştır.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-80 w-full bg-[#E8E2D9] flex items-center justify-center">
                <p className="text-[#8B7D6B]">Av. Ayşe Demir</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#8B7D6B]">Av. Ayşe Demir</h3>
                <div className="text-[#8B7D6B] mb-3">Ortak</div>
                <p className="text-[#4A4A4A] mb-4">
                  Ankara Üniversitesi Hukuk Fakültesi mezunu olan Ayşe Demir, iş hukuku ve ticaret hukuku alanlarında 15 yıllık deneyime sahiptir.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#E8E2D9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-80 w-full bg-[#E8E2D9] flex items-center justify-center">
                <p className="text-[#8B7D6B]">Av. Ahmet Kaya</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#8B7D6B]">Av. Ahmet Kaya</h3>
                <div className="text-[#8B7D6B] mb-3">Kıdemli Avukat</div>
                <p className="text-[#4A4A4A] mb-4">
                  Galatasaray Üniversitesi Hukuk Fakültesi mezunu olan Ahmet Kaya, miras hukuku ve gayrimenkul hukuku alanlarında uzmanlaşmıştır.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#8B7D6B] hover:text-[#6B5F4F]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd" />
                    </svg>
                  </a>
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
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[#E8E2D9]">
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