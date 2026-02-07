"use client";
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Marka ve Hakkında */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-6">
            Nelervar<span className="text-orange-500">burada</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Semtindeki en yetenekli ustaları, öğretmenleri ve profesyonelleri 
            tek bir platformda buluşturuyoruz. Mahallenin dijital rehberi.
          </p>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h3 className="text-white font-bold mb-6">Hızlı Menü</h3>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-orange-500 cursor-pointer transition-colors">Ana Sayfa</li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">Nasıl Çalışır?</li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">Cevher Ol (Kayıt)</li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">Sıkça Sorulan Sorular</li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h3 className="text-white font-bold mb-6">İletişim</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-orange-500" /> info@nelervarburada.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-orange-500" /> +90 (555) 000 00 00
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-orange-500" /> İstanbul, Türkiye
            </li>
          </ul>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h3 className="text-white font-bold mb-6">Takip Et</h3>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
              <Instagram size={20} />
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
              <Facebook size={20} />
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
              <Twitter size={20} />
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800 mt-16 pt-8 text-center text-xs text-slate-500">
        <p>© 2026 Nelervarburada. Tüm hakları saklıdır. Samimiyetle semtiniz için tasarlandı.</p>
      </div>
    </footer>
  );
}
