import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Image from 'next/image';

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="bg-[#E8E2D9] rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#8B7D6B]">İletişim Bilgileri</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <FaPhone className="text-[#8B7D6B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#8B7D6B]">Telefon</h3>
                    <p className="text-[#4A4A4A]">+90 553 491 99 03</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <FaEnvelope className="text-[#8B7D6B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#8B7D6B]">E-posta</h3>
                    <p className="text-[#4A4A4A]">av.cancelimli@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-[#8B7D6B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#8B7D6B]">Adres</h3>
                    <p className="text-[#4A4A4A]">
                      Mimar Sinan Mahallesi, 2423 Sokak A1/17 Efeler / Aydın
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.642745409285!2d27.848429211886486!3d37.666978021342465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b92b75cbb255c9%3A0xf9e6c934dc527c85!2sMimar%20Sinan%2C%202423.%20Sk.%2C%2009100%20Efeler%2FAyd%C4%B1n!5e0!3m2!1str!2str!4v1652889012345!5m2!1str!2str"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 