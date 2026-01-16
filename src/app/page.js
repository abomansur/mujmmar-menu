'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaInstagram, FaTiktok, FaTimes } from 'react-icons/fa';
import { menuItems, categories, socialLinks } from '../data/menu';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <main dir="rtl" className="min-h-screen font-sans relative pb-32">      
      
      {/* الهيدر الاحترافي مع الإضاءة والحركة الهادئة */}
      <header className="relative pt-12 pb-8 flex flex-col items-center justify-center text-center px-4 z-10">
        
        {/* تأثير الإضاءة الخلفية */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.6 }}
           transition={{ duration: 1.5 }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#b21817] to-[#d88808] opacity-20 blur-[90px] rounded-full pointer-events-none z-0"
        />

        {/* حاوية اللوجو (حركة هادئة جداً) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -4, 0] // تم تقليل الحركة من -8 إلى -4 لتكون ناعمة جداً
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" } // تم إبطاء الحركة لـ 5 ثواني لمزيد من الهدوء
          }}
          className="relative w-64 h-48 mb-2 z-10"
        >
             <Image 
               src="/images/logo-new.png" 
               alt="Mujmmar" 
               fill 
               className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
               priority
             />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
<p className="text-[#d88808] text-lg font-bold tracking-normal opacity-90 border-b border-[#d88808]/20 pb-3 relative z-10">
            أصل الشوي على الفحم
          </p>
        </motion.div>
      </header>

      {/* شريط التصنيفات */}
      <div className="sticky top-0 z-30 bg-black/30 backdrop-blur-xl py-4 border-b border-[#ffffff]/5 shadow-sm mb-6">
        <div className="flex overflow-x-auto gap-3 px-4 no-scrollbar items-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-500
                ${selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-[#d88808] to-[#b21817] text-white shadow-[0_5px_15px_rgba(178,24,23,0.3)] scale-105' 
                  : 'bg-black/40 text-gray-400 border border-[#ffffff]/10 hover:border-[#d88808]/50 hover:text-white'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* شبكة المنتجات */}
      <div className="px-4 relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-2 gap-4"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a0505] to-black border border-[#d88808]/20 shadow-xl cursor-pointer active:scale-95 transition-all duration-300 hover:border-[#d88808]/50"
              >
                
                {/* الصورة */}
                <div className="relative h-36 w-full bg-black/50">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0a0202] to-transparent opacity-80" />
                </div>

                {/* معلومات المنتج */}
                <div className="p-3 relative z-10 bg-[#0a0202]">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-[11px] font-bold text-white line-clamp-2 leading-tight group-hover:text-[#d88808] transition-colors flex-1 text-right">
                      {item.name}
                    </h3>
                    
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-[#d88808] font-extrabold text-sm leading-none">
                        {item.price.replace('SAR', '')}
                        <span className="text-[9px] font-medium mr-1 opacity-80">SAR</span>
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* النافذة المنبثقة (Popup) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-b from-[#2a0505] to-[#0a0202] w-full max-w-sm rounded-3xl overflow-hidden border border-[#d88808]/30 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur p-2 rounded-full text-white/70 hover:text-white hover:bg-[#b21817] transition-all"
              >
                <FaTimes size={14} />
              </button>

              <div className="relative h-72 w-full bg-black">
                <Image 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0202] via-[#0a0202]/60 to-transparent" />
              </div>

              <div className="px-6 pb-8 -mt-4 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-white">{selectedItem.name}</h2>
                  <div className="text-[#d88808] font-extrabold text-xl bg-black/30 px-3 py-1 rounded-lg border border-[#d88808]/20">
                    {selectedItem.price}
                  </div>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-[#d88808]/50 via-transparent to-transparent mb-4 opacity-30" />
                
                <p className="text-gray-300 text-sm leading-relaxed opacity-90">
                  {selectedItem.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الفوتر العائم */}
      {!selectedItem && (
        <div className="fixed bottom-6 w-full px-6 z-40 pointer-events-none flex justify-center">
          <div className="bg-black/80 backdrop-blur-xl border border-[#d88808]/20 rounded-full p-2 pr-6 pl-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-6 pointer-events-auto max-w-sm w-full justify-between">
                
                {/* الألوان الطبيعية للأيقونات */}
                <div className="flex gap-5 items-center">
                  <a href={socialLinks.instagram} className="text-[#E1306C] hover:scale-110 transition-transform"><FaInstagram size={22} /></a>
                  <a href={socialLinks.tiktok} className="text-white hover:scale-110 transition-transform"><FaTiktok size={20} /></a>
                  <a href={socialLinks.location} className="text-[#EA4335] hover:scale-110 transition-transform"><FaMapMarkerAlt size={22} /></a>
                </div>

                <a 
                  href={socialLinks.whatsapp}
                  className="bg-gradient-to-r from-[#d88808] to-[#b21817] text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-[#d88808]/40 transition-all active:scale-95"
                >
                  <span> اضغط للطلب</span>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 222.4-99.6 222.4-222 0-59.3-23.1-115.1-65.4-157zM223.9 447c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 368.6l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.3 82.8-183.7 184.6-183.7 49.3 0 95.6 19.1 130.4 53.9 34.7 34.9 53.9 81.3 53.9 130.4 0 101.3-82.8 183.7-184.6 183.7zm101.3-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                </a>
          </div>
        </div>
      )}
    </main>
  );
}