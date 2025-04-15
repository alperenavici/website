'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  // Aktif sayfa kontrolü
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

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
          <div className="flex items-center space-x-4">
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
            <Link href="/" className={`relative hover:text-gray-400 transition-colors py-2 ${isActive('/') ? 'active-link' : ''}`}>
              Ana Sayfa
              {isActive('/') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
            </Link>
            <Link href="/about" className={`relative hover:text-gray-400 transition-colors py-2 ${isActive('/about') ? 'active-link' : ''}`}>
              Hakkımızda
              {isActive('/about') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
            </Link>
            <Link href="/services" className={`relative hover:text-gray-400 transition-colors py-2 ${isActive('/services') ? 'active-link' : ''}`}>
              Hizmetlerimiz
              {isActive('/services') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
            </Link>
            <Link href="/blog" className={`relative hover:text-gray-400 transition-colors py-2 ${isActive('/blog') ? 'active-link' : ''}`}>
              Blog
              {isActive('/blog') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
            </Link>
            <Link href="/contact" className={`relative hover:text-gray-400 transition-colors py-2 ${isActive('/contact') ? 'active-link' : ''}`}>
              İletişim
              {isActive('/contact') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
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