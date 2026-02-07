"use client";

import React, { useMemo } from 'react';
import { Star, Phone, MessageCircle, MapPin, AlertCircle } from 'lucide-react';

// Örnek ilan verileri (Geliştirme aşamasında filtrelemeyi test etmek için)
const CEVHERLER = [
  {
    id: 1,
    isim: "Usta Ahmet Tesisat",
    sektor: "Tesisatçı",
    il: "İstanbul",
    ilce: "Beşiktaş",
    puan: 4.8,
    yorumSayisi: 124,
    foto: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    isim: "Zeynep Hoca",
    sektor: "Özel Ders",
    il: "Ankara",
    ilce: "Çankaya",
    puan: 5.0,
    yorumSayisi: 45,
    foto: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    isim: "Altın Makas Berber",
    sektor: "Berber",
    il: "İstanbul",
    ilce: "Kadıköy",
    puan: 4.6,
    yorumSayisi: 89,
    foto: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    isim: "Kedi Dostu Veteriner",
    sektor: "Veteriner",
    il: "İzmir",
    ilce: "Bornova",
    puan: 4.9,
    yorumSayisi: 210,
    foto: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&h=300&fit=crop",
  }
];

export default function CevherListesi({ filtreler }) {
  
  // Filtreleme mantığı: Kullanıcı seçim yaptıkça listeyi süzer
  const filtrelenmisCevherler = useMemo(() => {
    return CEVHERLER.filter(cevher => {
      const ilUyumu = filtreler?.il ? cevher.il === filtreler.il : true;
      const ilceUyumu = filtreler?.ilce ? cevher.ilce === filtreler.ilce : true;
      const sektorUyumu = filtreler?.sektor ? cevher.sektor === filtreler.sektor : true;
      
      return ilUyumu && ilceUyumu && sektorUyumu;
    });
  }, [filtreler]);

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 min-h-[400px]">
      {/* Liste Başlığı */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <span className="w-2 h-10 bg-orange-600 rounded-full"></span>
          {filtreler?.sektor ? `${filtreler.sektor} Cevherleri` : "Öne Çıkan Cevherler"}
        </h2>
        {filtreler?.il && (
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold border border-orange-200">
            📍 {filtreler.il} {filtreler.ilce && `/ ${filtreler.ilce}`}
          </div>
        )}
      </div>

      {/* Sonuç Listesi */}
      {filtrelenmisCevherler.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {filtrelenmisCevherler.map((cevher) => (
            <div key={cevher.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group">
              {/* Kart Görseli */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={cevher.foto} 
                  alt={cevher.isim} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-sm font-black text-orange-600 flex items-center gap-1 shadow-sm">
                  <Star size={16} fill="currentColor" /> {cevher.puan}
                </div>
              </div>

              {/* Kart Bilgileri */}
              <div className="p-8">
                <div className="mb-4">
                  <span className="text-orange-600 text-xs font-black uppercase tracking-widest">{cevher.sektor}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{cevher.isim}</h3>
                </div>
                
                <div className="flex items-center text-slate-500 text-sm mb-8 font-medium">
                  <MapPin size={16} className="mr-2 text-slate-400" />
                  <span>{cevher.ilce}, {cevher.il}</span>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-200 hover:shadow-orange-200">
                    <Phone size={18} /> Ara
                  </button>
                  <button className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center border border-slate-100">
                    <MessageCircle size={22} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Sonuç Bulunamadı Durumu */
        <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Henüz Burada Cevher Yok</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-8">
            {filtreler.ilce || filtreler.il} bölgesinde aradığınız sektörde henüz kayıtlı bir profesyonel bulunmuyor.
          </p>
          <button className="bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100">
            İlk Cevher Sen Ol!
          </button>
        </div>
      )}
    </div>
  );
}