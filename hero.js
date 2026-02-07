"use client";

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Map, ChevronDown } from 'lucide-react';
import { TURKIYE_DATA } from '../data/turkiye-data'; 

export default function HeroSection({ onAramaYap }) {
  const [seciliIlAdi, setSeciliIlAdi] = useState("");
  const [seciliIlce, setSeciliIlce] = useState("");
  const [seciliSektor, setSeciliSektor] = useState("");

  const SEKTORLER = [
    "Elektrikçi", "Tesisatçı", "Boyacı", "Berber", "Özel Ders", 
    "Ev Temizliği", "Diyetisyen", "Veteriner", "Psikolog", "Grafik Tasarımcı"
  ];

  // Seçilen il ismine göre o ilin objesini bulup ilçelerini çekiyoruz
  const aktifIlObjesi = useMemo(() => {
    return TURKIYE_DATA.find(il => il.name === seciliIlAdi);
  }, [seciliIlAdi]);

  // Arama butonuna basıldığında çalışan fonksiyon
  const aramaTetikle = () => {
    // page.js'den gelen fonksiyonu çağırıyoruz
    if (onAramaYap) {
      onAramaYap({
        il: seciliIlAdi,
        ilce: seciliIlce,
        sektor: seciliSektor
      });
    }
    
    // Kullanıcıyı sonuçlara doğru yumuşakça kaydırıyoruz
    window.scrollTo({ top: 650, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white py-16 md:py-24 px-4 overflow-hidden">
      {/* Arka Plan Dekoratif İkon */}
      <div className="absolute top-0 right-0 -translate-y-24 translate-x-24 opacity-5 pointer-events-none">
        <MapPin size={400} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Nelervar<span className="text-orange-600">burada</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-12 font-medium max-w-2xl mx-auto">
          "Semtindeki her cevher, tek tıkla elinin altında."
        </p>

        {/* Dinamik Filtreleme Paneli */}
        <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row gap-3 border border-slate-100">
          
          {/* İL SEÇİMİ */}
          <div className="flex-1 flex items-center px-5 py-4 bg-slate-50 rounded-[1.8rem] border border-transparent focus-within:border-orange-500 transition-all group relative">
            <Map className="text-orange-600 mr-3 shrink-0" size={22} />
            <select 
              value={seciliIlAdi}
              onChange={(e) => {
                setSeciliIlAdi(e.target.value);
                setSeciliIlce(""); // İl değişince ilçeyi sıfırla
              }}
              className="bg-transparent w-full outline-none text-slate-700 font-bold appearance-none cursor-pointer z-10"
            >
              <option value="">İl Seçin</option>
              {TURKIYE_DATA.map((il) => (
                <option key={il.id} value={il.name}>{il.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 text-slate-400 group-focus-within:text-orange-600" size={18} />
          </div>

          {/* İLÇE SEÇİMİ */}
          <div className={`flex-1 flex items-center px-5 py-4 rounded-[1.8rem] border transition-all relative group ${!seciliIlAdi ? 'bg-slate-100 opacity-60' : 'bg-slate-50 border-transparent focus-within:border-orange-500'}`}>
            <MapPin className="text-orange-600 mr-3 shrink-0" size={22} />
            <select 
              value={seciliIlce}
              onChange={(e) => setSeciliIlce(e.target.value)}
              disabled={!seciliIlAdi}
              className="bg-transparent w-full outline-none text-slate-700 font-bold appearance-none cursor-pointer disabled:cursor-not-allowed z-10"
            >
              <option value="">İlçe Seçin</option>
              {aktifIlObjesi?.districts.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 text-slate-400 group-focus-within:text-orange-600" size={18} />
          </div>

          {/* SEKTÖR SEÇİMİ */}
          <div className="flex-1 flex items-center px-5 py-4 bg-slate-50 rounded-[1.8rem] border border-transparent focus-within:border-orange-500 transition-all relative group">
            <Search className="text-orange-600 mr-3 shrink-0" size={22} />
            <select 
              value={seciliSektor}
              onChange={(e) => setSeciliSektor(e.target.value)}
              className="bg-transparent w-full outline-none text-slate-700 font-bold appearance-none cursor-pointer z-10"
            >
              <option value="">Ne arıyorsunuz?</option>
              {SEKTORLER.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 text-slate-400 group-focus-within:text-orange-600" size={18} />
          </div>

          {/* ARAMA BUTONU */}
          <button 
            onClick={aramaTetikle}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black px-12 py-4 rounded-[1.8rem] transition-all shadow-[0_10px_20px_rgba(234,88,12,0.3)] active:scale-95 text-lg"
          >
            Cevheri Bul
          </button>
        </div>

        {/* Seçim özeti (isteğe bağlı) */}
        {seciliIlAdi && seciliIlce && (
          <p className="mt-8 text-slate-400 text-sm animate-pulse">
            📍 <span className="font-bold text-orange-600">{seciliIlAdi} / {seciliIlce}</span> araması için hazır.
          </p>
        )}
      </div>
    </section>
  );
}