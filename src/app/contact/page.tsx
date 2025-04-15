import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Image from 'next/image';

export const metadata = {
  title: 'İletişim | Av. Mehmet Yılmaz Hukuk Bürosu',
  description: 'Hukuk büromuzla iletişime geçin. Randevu alın, sorularınızı sorun.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-5">
          <Image
            src="/images/contact2.jpg"
            alt="İletişim Sayfası Arka Plan"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container mx-auto px-2 z-10 pt-50">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-4 text-white">İletişim</h1>
            <p className="text-xl text-white">
              Hukuki danışmanlık için bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#8B7D6B]">Bize Ulaşın</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#8B7D6B] mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-[#8B7D6B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B] bg-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#8B7D6B] mb-1">
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-[#8B7D6B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B] bg-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#8B7D6B] mb-1">
                    Telefon Numaranız
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-[#8B7D6B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B] bg-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#8B7D6B] mb-1">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-[#8B7D6B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7D6B] bg-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8B7D6B] text-white py-3 px-6 rounded-md hover:bg-[#6B5F4F] transition-colors"
                >
                  Gönder
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <div className="bg-[#E8E2D9] rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#8B7D6B]">İletişim Bilgileri</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <FaPhone className="text-[#8B7D6B]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#8B7D6B]">Telefon</h3>
                      <p className="text-[#4A4A4A]">+90 212 123 45 67</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <FaEnvelope className="text-[#8B7D6B]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#8B7D6B]">E-posta</h3>
                      <p className="text-[#4A4A4A]">info@mehmetyilmaz.av.tr</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-[#8B7D6B]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#8B7D6B]">Adres</h3>
                      <p className="text-[#4A4A4A]">
                        Levent Mahallesi, Büyükdere Caddesi No:123<br />
                        Şişli/İstanbul
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <FaClock className="text-[#8B7D6B]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#8B7D6B]">Çalışma Saatleri</h3>
                      <p className="text-[#4A4A4A]">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi: 10:00 - 14:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-[#E8E2D9] rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#8B7D6B]">Konum</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9633698339308!2d28.877415315414473!3d41.0579799792985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zVGFrc2ltIE1leWRhbsSxLCBHw7xtw7zFn3N1eXUsIDM0NDM1IEJleW_En2x1L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1645521234567!5m2!1str!2str"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 