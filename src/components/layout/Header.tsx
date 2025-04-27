'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
        <div className="hidden sm:flex justify-between py-2 text-sm border-b border-white-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaPhone className="mr-2 text-white-400" />
              <span>+90 553 491 99 03</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-white-400" />
              <span>av.cancelimli@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Çalışma Saatleri: Pzt-Cuma 09:00 - 18:00</span>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4">
          <div className="text-xl sm:text-2xl font-bold">
            <Link href="/" className="flex items-center">
              <span className="text-white-400">Av.</span>
              <span className="ml-1">Mehmet Can Çelimli</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden z-50 text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 text-md">
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

          <div className="hidden lg:block">
            <Link href="/contact" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors">
              Randevu Al
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#8B7D6B] z-40 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6 text-xl">
              <Link href="/" className={`py-2 ${isActive('/') ? 'font-bold' : ''}`}>
                Ana Sayfa
              </Link>
              <Link href="/about" className={`py-2 ${isActive('/about') ? 'font-bold' : ''}`}>
                Hakkımızda
              </Link>
              <Link href="/services" className={`py-2 ${isActive('/services') ? 'font-bold' : ''}`}>
                Hizmetlerimiz
              </Link>
              <Link href="/blog" className={`py-2 ${isActive('/blog') ? 'font-bold' : ''}`}>
                Blog
              </Link>
              <Link href="/contact" className={`py-2 ${isActive('/contact') ? 'font-bold' : ''}`}>
                İletişim
              </Link>
              <Link href="/contact" className="mt-4 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md transition-colors">
                Randevu Al
              </Link>
            </div>

            <div className="absolute bottom-10 flex flex-col items-center space-y-4 text-sm">
              <div className="flex items-center">
                <FaPhone className="mr-2" />
                <span>+90 212 555 44 33</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>av.cancelimli@gmail.com</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 