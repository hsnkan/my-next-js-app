"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, PlusCircle, Search } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sayfa aşağı kaydırıldığında Navbar'ın arka planını değiştir
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Nasıl Çalışır?', path: '#nasil-calisir' },
    { name: 'Hakkımızda', path: '#hakkimizda' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
          Nelervar<span className="text-orange-600">burada</span>
        </Link>

        {/* Masaüstü Menü */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`text-sm font-bold transition-colors ${pathname === link.path ? 'text-orange-600' : 'text-slate-600 hover:text-orange-500'}`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link href="/kayit">
            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
              <PlusCircle size={18} />
              Cevher Ol
            </button>
          </Link>
        </div>

        {/* Mobil Menü Butonu */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobil Menü İçeriği */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-700"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/kayit" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold">
              Cevher Ol
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}