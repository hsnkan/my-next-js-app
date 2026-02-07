"use client";
import React, { useState, useRef } from 'react';
import { Camera, CheckCircle, ArrowRight, User, MapPin, Briefcase, Phone, Star, MessageCircle, Navigation, Upload, X } from 'lucide-react';
import { TURKIYE_DATA } from '../../data/turkiye-data';

export default function KayitSayfasi() {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);
  
  const [form, setForm] = useState({
    isim: "",
    sektor: "",
    il: "",
    ilce: "",
    adres: "",
    telefon: "",
    aciklama: "",
    foto: null, // Resim verisi burada tutulacak
    koordinat: { lat: 41.0082, lng: 28.9784 } // Varsayılan konum
  });

  const SEKTORLER = ["Elektrikçi", "Tesisatçı", "Boyacı", "Berber", "Özel Ders", "Ev Temizliği", "Diyetisyen", "Veteriner", "Psikolog", "Grafik Tasarımcı"];

  // Resim Seçme ve Ön İzleme Fonksiyonu
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* SOL TARAF: KAYIT FORMU */}
        <div className="max-w-2xl w-full">
          <div className="flex justify-between mb-12 relative px-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= num ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'}`}>
                {step > num ? <CheckCircle size={20} /> : num}
              </div>
            ))}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
            
            {/* ADIM 1: TEMEL BİLGİLER VE RESİM */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Vitrini Oluştur! 📸</h2>
                <p className="text-slate-600 mb-8 font-medium">İşletme resmini ve temel bilgilerini ekle.</p>
                
                <div className="mb-8 flex flex-col items-center">
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="group relative w-full h-48 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all overflow-hidden"
                  >
                    {form.foto ? (
                      <>
                        <img src={form.foto} className="w-full h-full object-cover" alt="Ön izleme" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <Camera className="text-white" size={32} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <Upload className="text-orange-600" size={24} />
                        </div>
                        <span className="font-bold text-slate-500">İşletme Fotoğrafı Yükle</span>
                        <span className="text-xs text-slate-400 mt-1">En fazla 2MB, JPG veya PNG</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>

                <div className="space-y-6">
                  <input 
                    type="text" 
                    placeholder="İsim / İşletme Adı"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none font-bold text-slate-900"
                    value={form.isim}
                    onChange={(e) => setForm({...form, isim: e.target.value})}
                  />
                  <select 
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none font-bold text-slate-900 appearance-none"
                    value={form.sektor}
                    onChange={(e) => setForm({...form, sektor: e.target.value})}
                  >
                    <option value="">Sektör Seçin</option>
                    {SEKTORLER.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* ADIM 2: HARİTADA KONUM SEÇİMİ */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Konumu İşaretle 📍</h2>
                <p className="text-slate-600 mb-8 font-medium">Haritadaki iğneyi dükkanının tam üzerine sürükle.</p>
                
                {/* Harita Simülasyon Alanı */}
                <div className="relative w-full h-64 bg-slate-200 rounded-[2rem] overflow-hidden mb-6 border-4 border-white shadow-inner flex items-center justify-center group">
                  <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/28.9784,41.0082,13/600x400?access_token=YOUR_TOKEN')] bg-cover opacity-50"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <MapPin size={48} className="text-orange-600 drop-shadow-lg animate-bounce" />
                    <div className="bg-slate-900 text-white text-[10px] px-3 py-1 rounded-full font-bold">KONUMU BURAYA AYARLA</div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl text-[10px] font-bold text-slate-600">
                    İpucu: Haritayı kaydırarak dükkanının tam yerini bulabilirsin.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <select className="p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none" onChange={(e) => setForm({...form, il: e.target.value})}>
                    <option value="">İl</option>
                    {TURKIYE_DATA.map(il => <option key={il.id} value={il.name}>{il.name}</option>)}
                  </select>
                  <select className="p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none" onChange={(e) => setForm({...form, ilce: e.target.value})}>
                    <option value="">İlçe</option>
                    {TURKIYE_DATA.find(il => il.name === form.il)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <input 
                  type="text" 
                  placeholder="Açık Adres (Cadde, Sokak, No)"
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none mb-4"
                  value={form.adres}
                  onChange={(e) => setForm({...form, adres: e.target.value})}
                />
              </div>
            )}

            {/* ADIM 3: AÇIKLAMA VE İLETİŞİM */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Son Adım 👋</h2>
                <p className="text-slate-600 mb-8 font-medium">İletişim bilgilerini ve açıklamanı ekle.</p>
                <input 
                  type="tel" 
                  placeholder="Telefon Numarası"
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none mb-4"
                  value={form.telefon}
                  onChange={(e) => setForm({...form, telefon: e.target.value})}
                />
                <textarea 
                  placeholder="Hizmetlerin hakkında kısa bilgi..."
                  className="w-full p-6 bg-slate-50 rounded-3xl font-bold text-slate-900 outline-none h-40 resize-none"
                  onChange={(e) => setForm({...form, aciklama: e.target.value})}
                />
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && <button onClick={handlePrev} className="flex-1 font-bold text-slate-400">Geri</button>}
              <button onClick={step === 3 ? () => alert("Yayına Alındı!") : handleNext} className="flex-[2] bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100 uppercase tracking-widest">
                {step === 3 ? "Yayınla" : "Devam Et"}
              </button>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: CANLI KARTVİZİT ÖN İZLEME */}
        <div className="sticky top-32 hidden lg:block">
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 w-[400px] mx-auto">
            <div className="relative h-60 bg-slate-100">
              {form.foto ? (
                <img src={form.foto} className="w-full h-full object-cover" alt="İşletme" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                  <Camera size={48} />
                  <span className="text-[10px] font-bold mt-2 tracking-widest uppercase">Fotoğraf Yüklenmedi</span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-sm font-black text-orange-600 flex items-center gap-1 shadow-sm">
                <Star size={16} fill="currentColor" /> 5.0
              </div>
            </div>

            <div className="p-8">
              <span className="text-orange-600 text-[10px] font-black uppercase tracking-widest">{form.sektor || "SEKTÖR"}</span>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{form.isim || "İşletme Adı"}</h3>
              
              <div className="flex items-center text-slate-600 text-sm mb-6 font-bold">
                <MapPin size={16} className="mr-2 text-orange-600" />
                <span>{form.ilce || "İlçe"}, {form.il || "İl"}</span>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 opacity-30 cursor-not-allowed">
                    <Phone size={18} /> Ara
                  </div>
                </div>
                <button className={`w-full font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${form.adres ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}>
                  <Navigation size={18} /> Yol Tarifi Al
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}