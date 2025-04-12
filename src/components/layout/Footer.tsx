import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#333333] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hakkımızda</h3>
            <p className="text-white-400">
              Profesyonel hukuk ekibimizle müvekkillerimize en iyi hizmeti sunmak için çalışıyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
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
            <h3 className="text-xl font-bold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/criminal" className="text-white-400 hover:text-white transition-colors">
                  Ceza Hukuku
                </Link>
              </li>
              <li>
                <Link href="/services/family" className="text-white-400 hover:text-white transition-colors">
                  Aile Hukuku
                </Link>
              </li>
              <li>
                <Link href="/services/labor" className="text-white-400 hover:text-white transition-colors">
                  İş Hukuku
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="text-white-400 hover:text-white transition-colors">
                  Ticaret Hukuku
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-white-400" />
                <span className="text-white-400">İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-white-400" />
                <span className="text-white-400">+90 212 555 44 33</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-white-400" />
                <span className="text-white-400">info@avukatlik.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-white-800 hover:bg-white-700 p-2 rounded-full transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="bg-white-800 hover:bg-white-700 p-2 rounded-full transition-colors">
                <FaTwitter />
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

        <div className="border-t border-white-800 mt-12 pt-8 text-center text-white-400">
          <p>&copy; {currentYear} Av. Mehmet Can Çelimli. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 