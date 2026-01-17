'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaInstagram, FaTiktok, FaTimes, FaSnapchat, FaWhatsapp } from 'react-icons/fa';
import { menuItems, categories, socialLinks } from '../data/menu';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [selectedItem, setSelectedItem] = useState(null);

  // دالة عرض المحتوى
  const getDisplayedContent = () => {
    if (selectedCategory === 'all') {
      return categories.map((cat) => {
        const items = menuItems.filter(item => item.categoryId === cat.id);
        if (items.length === 0) return null;

        return (
          <div key={cat.id} className="mb-8">
            {/* عنوان القسم */}
            <div className="flex items-center gap-4 mb-4 mt-2">
              <h2 className="text-xl font-bold text-[#d88808] shrink-0">
                {cat.name}
              </h2>
              <div className="h-px bg-gradient-to-l from-[#d88808]/50 to-transparent w-full opacity-50"></div>
            </div>

            {/* الشبكة: العروض عمود واحد، الباقي عمودين */}
            <div className={`grid gap-4 ${cat.id === 'offers' ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {items.map((item) => (
                <ProductCard key={item.id} item={item} isOffer={cat.id === 'offers'} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          </div>
        );
      });
    } else {
      const items = menuItems.filter(item => item.categoryId === selectedCategory);
      return (
        // حركة ظهور خفيفة جداً (Fade In)
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`grid gap-4 ${selectedCategory === 'offers' ? 'grid-cols-1' : 'grid-cols-2'}`}
        >
          {items.map((item) => (
            <ProductCard key={item.id} item={item} isOffer={selectedCategory === 'offers'} onClick={() => setSelectedItem(item)} />
          ))}
        </motion.div>
      );
    }
  };

  return (
    <main dir="rtl" className="min-h-screen font-sans relative pb-32 bg-[#0a0202]">      
      
      {/* --- الهيدر --- */}
      <header className="relative pt-12 pb-8 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#b21817] to-[#d88808] opacity-20 blur-[90px] rounded-full pointer-events-none z-0" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-64 h-48 mb-2 z-10"
        >
             <Image src="/images/logo-new.png" alt="Mujmmar" fill className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" priority />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-[#d88808] text-lg font-bold tracking-normal opacity-90 border-b border-[#d88808]/20 pb-3 relative z-10">
            أصل الشوي على الفحم
          </p>
        </motion.div>
      </header>

      {/* --- شريط التصنيفات --- */}
      <div className="sticky top-0 z-30 bg-[#0a0202]/95 backdrop-blur-xl py-4 border-b border-[#ffffff]/5 shadow-sm mb-6">
        <div className="flex overflow-x-auto gap-3 px-4 no-scrollbar items-center pr-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`
              whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200
              ${selectedCategory === 'all' 
                ? 'bg-gradient-to-r from-[#d88808] to-[#b21817] text-white shadow-lg scale-105' 
                : 'bg-white/5 text-gray-400 border border-[#ffffff]/10 hover:text-white'}
            `}
          >
            الكل
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200
                ${selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-[#d88808] to-[#b21817] text-white shadow-lg scale-105' 
                  : 'bg-white/5 text-gray-400 border border-[#ffffff]/10 hover:text-white'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* --- منطقة عرض المنتجات --- */}
      <div className="px-4 relative z-10 min-h-[50vh]">
        {getDisplayedContent()}
        
        {/* رسالة فارغة */}
        {selectedCategory !== 'all' && menuItems.filter(i => i.categoryId === selectedCategory).length === 0 && (
            <div className="text-center text-gray-500 py-20">
                لا توجد أصناف في هذا القسم حالياً
            </div>
        )}
      </div>

      {/* --- النافذة المنبثقة (Popup) --- */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-[#1a0505] w-full max-w-sm rounded-3xl overflow-hidden border border-[#d88808]/30 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur p-2 rounded-full text-white/70 hover:text-white hover:bg-[#b21817] transition-all">
              <FaTimes size={14} />
            </button>

            <div className="relative h-72 w-full bg-black">
              <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#1a0505] via-[#1a0505]/60 to-transparent" />
            </div>

            <div className="px-6 pb-8 -mt-6 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">{selectedItem.name}</h2>
                <div className="text-[#d88808] font-extrabold text-xl bg-black/30 px-3 py-1 rounded-lg border border-[#d88808]/20">
                  {selectedItem.price} <span className="text-xs">SAR</span>
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-[#d88808]/50 via-transparent to-transparent mb-4 opacity-30" />
              <p className="text-gray-300 text-sm leading-relaxed opacity-90">
                {selectedItem.description || selectedItem.desc}
              </p>
              {selectedItem.calories && <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">🔥 {selectedItem.calories} سعرة حرارية</div>}
            </div>
          </div>
        </div>
      )}

      {/* --- الفوتر العائم --- */}
      {!selectedItem && (
        <div className="fixed bottom-6 w-full px-6 z-40 pointer-events-none flex justify-center">
          <div className="bg-[#1a0505]/95 backdrop-blur-xl border border-[#d88808]/20 rounded-full p-2 pr-6 pl-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 pointer-events-auto max-w-sm w-full">
            
            <div className="flex gap-4 items-center">
        <a href="instagram://user?username=mujmmar_" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:scale-125 transition-transform"><FaInstagram size={20} /></a>
        <a href="https://www.tiktok.com/@mujmmar" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-125 transition-transform"><FaTiktok size={18} /></a>
          <a href="snapchat://add/mujmmar" target="_blank" rel="noopener noreferrer" className="text-[#FFFC00] hover:scale-125 transition-transform"><FaSnapchat size={20} /></a>
        <a href={socialLinks.location} target="_blank" rel="noopener noreferrer" className="text-[#EA4335] hover:scale-125 transition-transform"><FaMapMarkerAlt size={20} /></a>
            </div>

            <a 
              href={socialLinks.whatsapp}
              className="bg-gradient-to-r from-[#d88808] to-[#b21817] text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-[#d88808]/40 transition-all active:scale-95 whitespace-nowrap"
            >
              <span>اطلب الآن</span>
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

// --- مكون بطاقة المنتج (تم تحسينه) ---
function ProductCard({ item, isOffer, onClick }) {
  // تصميم خاص للعروض (شريط سفلي + صورة كاملة)
  if (isOffer) {
    return (
      <div 
        onClick={onClick}
        // aspect-[5/3] يضمن ظهور الصورة كاملة بدون قص (لمقاس 1000x600)
        className="group relative w-full aspect-[5/3] rounded-2xl overflow-hidden cursor-pointer border border-[#d88808]/20 shadow-xl hover:border-[#d88808]/50 transition-all active:scale-95"
      >
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover"
          sizes="100vw"
          priority
        />
        
        {/* شريط المعلومات (شفاف أسفل الصورة) - الاسم يمين والسعر يسار */}
        <div className="absolute bottom-0 w-full bg-black/70 backdrop-blur-sm py-2 px-4 flex justify-between items-center border-t border-white/5">
           <span className="text-white font-bold text-sm truncate ml-2">{item.name}</span>
           <span className="text-[#d88808] font-bold text-sm shrink-0">{item.price} SAR</span>
        </div>
      </div>
    );
  }

  // التصميم العادي لباقي الأصناف
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-[#1a0505] border border-[#d88808]/20 shadow-xl cursor-pointer active:scale-95 transition-all hover:border-[#d88808]/50"
    >
      <div className="relative h-36 w-full bg-black/50 overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0a0202] to-transparent opacity-80" />
      </div>

      <div className="p-3 relative z-10 bg-[#0a0202] h-full flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
              <h3 className="text-[11px] font-bold text-white leading-tight group-hover:text-[#d88808] transition-colors text-right mb-1">
                {item.name}
              </h3>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[#d88808] font-extrabold text-sm leading-none">
              {item.price}
              <span className="text-[9px] font-medium mr-1 opacity-80">SAR</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
