import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Hakkımızda</h3>
            <p className="text-white-400 text-sm sm:text-base">
              Profesyonel hukuk ekibimizle müvekkillerimize en iyi hizmeti sunmak için çalışıyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-white-400 hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white-400 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white-400 hover:text-white transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white-400 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/services" className="text-white-400 hover:text-white transition-colors">
                  Ceza Hukuku
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white-400 hover:text-white transition-colors">
                  Aile Hukuku
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white-400 hover:text-white transition-colors">
                  İş Hukuku
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white-400 hover:text-white transition-colors">
                  Ticaret Hukuku
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">İletişim</h3>
            <ul className="space-y-2 sm:space-y-4 text-sm sm:text-base">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-white-400 flex-shrink-0" />
                <span className="text-white-400">İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-white-400 flex-shrink-0" />
                <span className="text-white-400">+90 553 491 99 03</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-white-400 flex-shrink-0" />
                <span className="text-white-400">av.cancelimli@gmail.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-white-800 hover:bg-white-700 p-2 rounded-full transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="bg-white-800 hover:bg-white-700 p-2 rounded-full transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="bg-white-800 hover:bg-white-700 p-2 rounded-full transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 