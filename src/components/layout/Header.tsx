import Link from 'next/link';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-[#8B7D6B] text-white">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="flex justify-between py-2 text-sm border-b border-white-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaPhone className="mr-2 text-white-400" />
              <span>+90 212 555 44 33</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-white-400" />
              <span>info@avukatlik.com</span>
            </div>
          </div>
          <div>
            <span>Çalışma Saatleri: Pzt-Cuma 09:00 - 18:00</span>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">
            <Link href="/" className="flex items-center">
              <span className="text-white-400">Av.</span>
              <span className="ml-1">Mehmet Can Çelimli</span>
            </Link>
          </div>
          
          <div className="flex space-x-8 text-md">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/about" className="hover:text-gray-400 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/services" className="hover:text-gray-400 transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="/blog" className="hover:text-gray-400 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">
              İletişim
            </Link>
          </div>
          
          <div>
            <Link href="/contact" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors">
              Randevu Al
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 