'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaInstagram, FaTiktok, FaSnapchat, FaWhatsapp, FaPlus, FaMinus, FaTrash, FaShoppingBasket, FaMotorcycle, FaStore, FaTimes, FaPen, FaCheckCircle, FaLayerGroup, FaUtensils, FaClone } from 'react-icons/fa';
import { menuItems, categories, socialLinks } from '../data/menu';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingCartItem, setEditingCartItem] = useState(null);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState('pickup'); 
  const [showDeliveryNote, setShowDeliveryNote] = useState(false);

  useEffect(() => {
    if (cart.length === 0) setIsCartOpen(false);
  }, [cart]);

  const subTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  }, [cart]);

  const deliveryFee = 7;
  const isFreeDelivery = subTotal >= 30; 
  const finalDeliveryFee = (orderType === 'delivery' && !isFreeDelivery) ? deliveryFee : 0;
  const grandTotal = subTotal + finalDeliveryFee;

  const addToCart = (item, quantity, options, extraData = {}) => {
    const newItem = {
      ...item,
      cartId: Date.now(),
      quantity,
      selectedOptions: options || [],
      ...extraData 
    };
    setCart([...cart, newItem]);
    setSelectedItem(null); 
  };

  const updateCartItem = (cartId, quantity, options, extraData = {}) => {
    setCart(cart.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity, selectedOptions: options, ...extraData } 
        : item
    ));
    setSelectedItem(null);
    setEditingCartItem(null);
  };

  const removeFromCart = (cartId) => setCart(cart.filter(item => item.cartId !== cartId));

  const updateQuantityInCart = (itemId, newQty) => {
    if (newQty < 1) return;
    setCart(cart.map(item => item.cartId === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleEditClick = (cartItem) => {
    const originalItem = menuItems.find(i => i.id === cartItem.id);
    if (originalItem) {
      setEditingCartItem(cartItem); 
      setSelectedItem(originalItem); 
    }
  };

  const handleCheckout = () => {
    const line = "ــــــــــــــــــــــــــــــــــــــــ";
    let message = `*طلب جديد*\n`;
    message += `نوع الطلب: ${orderType === 'delivery' ? 'توصيل 🛵' : 'استلام 🏪'}\n`;
    message += `${line}\n`;
    
    cart.forEach((item) => {
      message += `\u200F*${item.quantity}* x ${item.name}\n`;
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        item.selectedOptions.forEach(opt => {
             message += `\u200F   - ${opt}\n`;
        });
      }
      message += `\n`; 
    });

    message += `${line}\n`;
    message += `المجموع: ${subTotal} ريال\n`;
    
    if (orderType === 'delivery') {
      if (isFreeDelivery) {
        message += `التوصيل: (مجاني) ✅\n*داخل التيسير*\n`;
      } else {
        message += `التوصيل: ${deliveryFee} ريال\n*داخل التيسير*\n`;
      }
    }
    
    message += `*الإجمالي: ${grandTotal} ريال*\n`;
    message += `${line}\n`;
    message += `يرجى تأكيد الطلب.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${socialLinks.whatsapp.replace('https://wa.me/', '')}?text=${encodedMessage}`, '_blank');
  };

  const getDisplayedContent = () => {
    if (selectedCategory === 'all') {
      return categories.map((cat) => {
        const items = menuItems.filter(item => item.categoryId === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id} className="mb-8">
            <div className="flex items-center gap-4 mb-4 mt-2">
              <h2 className="text-xl font-bold text-[#d88808] shrink-0">{cat.name}</h2>
              <div className="h-px bg-gradient-to-l from-[#d88808]/50 to-transparent w-full opacity-50"></div>
            </div>
            <div className={`grid gap-4 ${cat.id === 'offers' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
          className={`grid gap-4 ${selectedCategory === 'offers' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {items.map((item) => (
            <ProductCard key={item.id} item={item} isOffer={selectedCategory === 'offers'} onClick={() => setSelectedItem(item)} />
          ))}
        </motion.div>
      );
    }
  };

  return (
    <main dir="rtl" className="min-h-screen font-sans relative pb-40 bg-[#0a0202]">       
      <div className="max-w-6xl mx-auto bg-[#0a0202] min-h-screen shadow-2xl border-x border-[#ffffff]/5">
        
        <header className="relative pt-12 pb-8 flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#b21817] to-[#d88808] opacity-20 blur-[90px] rounded-full pointer-events-none z-0" />
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative w-64 h-48 mb-2 z-10">
              <Image src="/images/logo-new.png" alt="Mujmmar" fill className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" priority />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-[#d88808] text-lg font-bold tracking-normal opacity-90 border-b border-[#d88808]/20 pb-3 relative z-10">أصل الشوي على الفحم</p>
          </motion.div>
        </header>

        <div className="sticky top-0 z-30 bg-[#0a0202]/95 backdrop-blur-xl py-4 border-b border-[#ffffff]/5 shadow-sm mb-6 transition-all">
          <div className="flex overflow-x-auto gap-3 px-4 no-scrollbar items-center pr-6 md:justify-center">
            <button onClick={() => setSelectedCategory('all')} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${selectedCategory === 'all' ? 'bg-gradient-to-r from-[#d88808] to-[#b21817] text-white shadow-lg scale-105' : 'bg-white/5 text-gray-400 border border-[#ffffff]/10 hover:text-white'}`}>الكل</button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${selectedCategory === cat.id ? 'bg-gradient-to-r from-[#d88808] to-[#b21817] text-white shadow-lg scale-105' : 'bg-white/5 text-gray-400 border border-[#ffffff]/10 hover:text-white'}`}>{cat.name}</button>
            ))}
          </div>
        </div>

        <div className="px-4 relative z-10 min-h-[50vh]">
          {getDisplayedContent()}
          {selectedCategory !== 'all' && menuItems.filter(i => i.categoryId === selectedCategory).length === 0 && (
              <div className="text-center text-gray-500 py-20">لا توجد أصناف في هذا القسم حالياً</div>
          )}
        </div>

        {selectedItem && (
          <ProductModal 
            item={selectedItem}
            cartItem={editingCartItem} 
            onClose={() => {
              setSelectedItem(null);
              setEditingCartItem(null); 
            }} 
            onAdd={addToCart} 
            onUpdate={updateCartItem} 
          />
        )}

        <div className="fixed bottom-6 w-full px-4 z-40 flex justify-center pointer-events-none">
          <div className="bg-[#1a0505]/95 backdrop-blur-xl border border-[#d88808]/20 rounded-full p-2 pr-6 pl-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4 pointer-events-auto max-w-2xl w-full">
            <div className="flex gap-5 items-center shrink-0">
              <a href="instagram://user?username=mujmmar_" target="_blank" className="text-[#E1306C] hover:scale-125 transition-transform"><FaInstagram size={22} /></a>
              <a href="https://www.tiktok.com/@mujmmar" target="_blank" className="text-white hover:scale-125 transition-transform"><FaTiktok size={20} /></a>
              <a href="snapchat://add/mujmmar" target="_blank" className="text-[#FFFC00] hover:scale-125 transition-transform"><FaSnapchat size={22} /></a>
              <a href={socialLinks.whatsapp} target="_blank" className="text-[#25D366] hover:scale-125 transition-transform"><FaWhatsapp size={22} /></a>
              <a href={socialLinks.location} target="_blank" className="text-[#EA4335] hover:scale-125 transition-transform"><FaMapMarkerAlt size={22} /></a>
            </div>
            <button onClick={() => cart.length > 0 && setIsCartOpen(true)} className={`pl-2 pr-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-3 transition-all duration-300 ${cart.length > 0 ? 'bg-gradient-to-r from-[#d88808] to-[#b21817] text-white shadow-lg cursor-pointer active:scale-95' : 'bg-white/10 text-gray-400 cursor-default border border-white/5'}`}>
              <div className="flex flex-col items-end leading-none gap-1">
                <span className="text-[10px] opacity-80 font-normal">السلة</span>
                <span className="font-extrabold">{subTotal} <span className="text-[9px]">SAR</span></span>
              </div>
              <div className={`p-2 rounded-full ${cart.length > 0 ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'}`}><FaShoppingBasket size={16} /></div>
            </button>
          </div>
        </div>

        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setIsCartOpen(false)}>
            <div className="bg-[#1a0505] w-full max-w-md h-[90vh] sm:h-auto sm:rounded-3xl rounded-t-3xl border-t sm:border border-[#d88808]/30 shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#2a0505]">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><FaShoppingBasket className="text-[#d88808]" /> سلة الطلبات</h2>
                <button onClick={() => setIsCartOpen(false)} className="bg-white/10 p-2 rounded-full text-white hover:bg-[#b21817]"><FaTimes /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.map((item) => {
                  return (
                    <div key={item.cartId} className="flex gap-3 bg-[#252525] p-3 rounded-xl border border-white/5 items-center relative group">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10"><Image src={item.image} alt={item.name} fill className="object-cover" /></div>
                      <div className="flex-1 cursor-pointer" onClick={() => handleEditClick(item)}>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-white text-sm">{item.name}</h3>
                          <div className="flex items-center gap-1 opacity-50 text-blue-400">
                             <FaPen size={10} /> <span className="text-[10px]">تعديل</span>
                          </div>
                        </div>
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <div className="text-[10px] text-gray-400 mb-2 leading-tight">
                             {item.selectedOptions.map((opt, idx) => (
                               <span key={idx} className="block">• {opt}</span>
                             ))}
                          </div>
                        )}
                        <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                          <p className="text-[#d88808] font-bold text-sm">{item.price * item.quantity} ريال</p>
                          <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1 border border-white/10">
                              <button onClick={() => updateQuantityInCart(item.cartId, item.quantity - 1)} className="text-white hover:text-[#d88808]"><FaMinus size={10} /></button>
                              <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantityInCart(item.cartId, item.quantity + 1)} className="text-white hover:text-green-500"><FaPlus size={10} /></button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="bg-red-900/20 text-red-400 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors h-fit self-center"><FaTrash size={12} /></button>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-[#150505] border-t border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setOrderType('pickup')} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${orderType === 'pickup' ? 'bg-[#d88808] text-white border-[#d88808] shadow-lg' : 'bg-[#2a2a2a] text-gray-300 border-transparent hover:bg-[#3a3a3a]'}`}> <FaStore /> استلام من الفرع </button>
                  <button onClick={() => { setOrderType('delivery'); setShowDeliveryNote(true); }} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${orderType === 'delivery' ? 'bg-[#d88808] text-white border-[#d88808] shadow-lg' : 'bg-[#2a2a2a] text-gray-300 border-transparent hover:bg-[#3a3a3a]'}`}> <FaMotorcycle /> توصيل </button>
                </div>
                <div className="bg-[#252525] p-3 rounded-xl text-sm space-y-2 border border-white/5">
                  <div className="flex justify-between text-gray-300"> <span>المجموع الفرعي:</span> <span>{subTotal} ريال</span> </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-gray-300 items-start">
                        <span>رسوم التوصيل:</span>
                        <div className="text-left">
                          {isFreeDelivery ? (
                            <> <span className="text-green-400 font-bold block"><span className="line-through text-gray-500 text-xs mr-1">{deliveryFee}</span> مجاناً ✅</span> <span className="text-[10px] text-gray-400 block">*داخل حي التيسير*</span> </>
                          ) : (
                            <> <span className="block">{deliveryFee} ريال</span> <span className="text-[10px] text-gray-400 block">*داخل حي التيسير*</span> </>
                          )}
                        </div>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2 flex justify-between text-white font-bold text-lg"> <span>الإجمالي:</span> <span className="text-[#d88808]">{grandTotal} ريال</span> </div>
                  {orderType === 'delivery' && !isFreeDelivery && ( 
                    <p className="text-xs text-yellow-500 text-center mt-2 pt-2 border-t border-white/10 font-bold animate-pulse">
                      💡 اطلب بـ {30 - subTotal} ريال إضافية واحصل على توصيل مجاني!
                    </p> 
                  )}
                </div>
                <button onClick={handleCheckout} className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all bg-[#25D366] text-white hover:bg-[#128C7E] active:scale-95"> <span>إتمام الطلب عبر الواتس أب</span> <FaWhatsapp size={22} /> </button>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showDeliveryNote && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center px-6 bg-black/90 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-[#1a0505] border border-[#d88808] p-6 rounded-3xl text-center max-w-xs shadow-[0_0_50px_rgba(216,136,8,0.2)]">
                  <div className="w-16 h-16 bg-[#d88808]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#d88808]"> <FaMotorcycle size={30} /> </div>
                  <h3 className="text-xl font-bold text-white mb-2">أهلاً وسهلاً! 👋</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6"> خدمة التوصيل متاحة حالياً فقط لحي <strong>التيسير</strong>.<br/> يرجى تزويدنا بالموقع عبر الواتس أب بعد إرسال الطلب. </p>
                  <button onClick={() => setShowDeliveryNote(false)} className="bg-gradient-to-r from-[#d88808] to-[#b21817] text-white w-full py-3 rounded-xl font-bold hover:shadow-lg active:scale-95 transition-all"> تمام، أكمل الطلب 👍 </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// 🔥🔥 مكون المنتج المطور (Fix: Edit clears old options for offers) 🔥🔥
function ProductModal({ item, cartItem, onClose, onAdd, onUpdate }) {
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
  const [selectedOpts, setSelectedOpts] = useState(cartItem ? cartItem.selectedOptions : []);
  
  // --- 1. منطق العروض الخاصة ---
  const isFourPlatesOffer = item.name.includes('4 صحون') || item.name.includes('عرض 4');
  const isArabicBoxOffer = item.name.includes('البوكس العربي');

  const plateOptions = ['كباب لحم', 'كباب دجاج', 'شيش طاووق'];

  // ✅ استرجاع الحالة السابقة إذا كنا في وضع التعديل
  const [offerState, setOfferState] = useState(cartItem?.offerState || {
      fourPlates: {}, 
      arabicBox: { mode: 'mix', selection: [] }
  });

  const handleFourPlatesChoice = (plateNum, type) => {
      setOfferState(prev => ({
          ...prev,
          fourPlates: { ...prev.fourPlates, [`plate${plateNum}`]: type }
      }));
  };

  const handleArabicBoxMode = (mode) => {
      setOfferState(prev => ({ 
          ...prev, 
          arabicBox: { mode, selection: [] } 
      }));
  };

  const handleArabicBoxSelection = (type) => {
      const { mode, selection } = offerState.arabicBox;
      let newSelection = [...selection];

      if (mode === 'single') {
          newSelection = [type];
      } else if (mode === 'double') {
          if (newSelection.includes(type)) {
              newSelection = newSelection.filter(t => t !== type);
          } else {
              if (newSelection.length < 2) newSelection.push(type);
          }
      }

      setOfferState(prev => ({
          ...prev,
          arabicBox: { ...prev.arabicBox, selection: newSelection }
      }));
  };

  const isOfferValid = () => {
      if (isFourPlatesOffer) {
          const fp = offerState.fourPlates;
          return fp.plate1 && fp.plate2 && fp.plate3 && fp.plate4;
      }
      if (isArabicBoxOffer) {
          const ab = offerState.arabicBox;
          if (ab.mode === 'mix') return true; 
          if (ab.mode === 'single') return ab.selection.length === 1;
          if (ab.mode === 'double') return ab.selection.length === 2;
      }
      return true; 
  };

  // --- 2. منطق الساندويتشات العادي ---
  const isSandwich = item.categoryId === 'sandwiches';
  const isBrioche = item.name.includes('بريوش');

  const defaultIngredients = [
    { id: 'no_garlic', label: 'بدون ثومية' }, { id: 'no_hummus', label: 'بدون حمص' }, { id: 'no_mujmmar', label: 'بدون صوص مجمّر' },
    { id: 'no_tahina', label: 'بدون طحينة' }, { id: 'no_pickles', label: 'بدون مخلل' }, { id: 'no_fries', label: 'بدون بطاطس' },
    { id: 'no_lettuce', label: 'بدون خس' }, { id: 'no_mint', label: 'بدون نعناع' },
  ];
  if (isBrioche) defaultIngredients.push({ id: 'no_honey', label: 'بدون صوص عسل' });

  const extraOptions = [{ id: 'add_ketchup', label: 'مع كاتشب' }, { id: 'add_shatta', label: 'مع شطة' }];
  if (!isBrioche) extraOptions.push({ id: 'add_honey', label: 'مع صوص عسل' });

  const isEverythingSelected = !selectedOpts.some(opt => opt.startsWith('بدون'));
  const toggleOption = (label) => selectedOpts.includes(label) ? setSelectedOpts(selectedOpts.filter(o => o !== label)) : setSelectedOpts([...selectedOpts, label]);
  const handleEverythingClick = () => setSelectedOpts(selectedOpts.filter(opt => !opt.startsWith('بدون')));

  // --- 3. زر الإضافة ---
  const handleSubmit = () => {
    let finalOptions = []; // ✅ نبدأ بمصفوفة فارغة لتجنب التكرار في العروض

    // إذا كان ساندويتش عادي، ننسخ الخيارات القديمة (بدون/مع)
    if (isSandwich) {
        finalOptions = [...selectedOpts];
    }

    // ✅ بناء خيارات العروض من الصفر بناءً على الاختيار الحالي فقط
    if (isFourPlatesOffer) {
        const fp = offerState.fourPlates;
        const counts = {};
        [fp.plate1, fp.plate2, fp.plate3, fp.plate4].forEach(p => {
            counts[p] = (counts[p] || 0) + 1;
        });
        const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        sortedCounts.forEach(([type, count]) => {
            finalOptions.push(`${count}x ${type}`);
        });
    } 
    else if (isArabicBoxOffer) {
        const ab = offerState.arabicBox;
        if (ab.mode === 'mix') {
            finalOptions.push(`مشكل (ميكس)`);
        } else if (ab.mode === 'single') {
            finalOptions.push(`${ab.selection[0]} فقط`); // ✅ إضافة "فقط"
        } else if (ab.mode === 'double') {
            finalOptions.push(`دمج: ${ab.selection[0]} + ${ab.selection[1]}`);
        }
    }

    // ✅ الحفظ والتحديث
    if (cartItem) {
        onUpdate(cartItem.cartId, quantity, finalOptions, { offerState });
    } else {
        onAdd(item, quantity, finalOptions, { offerState });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-[#1a0505] w-full max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden border border-[#d88808]/30 shadow-2xl relative max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="relative h-56 w-full bg-black shrink-0">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur p-2 rounded-full text-white hover:bg-[#b21817]"><FaTimes /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-1">{item.name}</h2>
          <p className="text-gray-400 text-sm mb-6">{item.description}</p>

          {/* 🔥 عرض 4 صحون 🔥 */}
          {isFourPlatesOffer && (
              <div className="mb-6 space-y-4 bg-[#252525] p-4 rounded-xl border border-[#d88808]/20">
                  <h3 className="text-[#d88808] font-bold text-sm flex items-center gap-2">
                      <FaCheckCircle /> اختر أنواع الصحون :
                  </h3>
                  {[1, 2, 3, 4].map(num => (
                      <div key={num} className="space-y-2">
                          <p className="text-white text-xs font-bold">الصحن رقم {num}:</p>
                          <div className="flex flex-wrap gap-2">
                              {plateOptions.map(opt => (
                                  <button 
                                    key={opt}
                                    onClick={() => handleFourPlatesChoice(num, opt)}
                                    className={`text-xs py-2 px-3 rounded-lg border transition-all ${offerState.fourPlates[`plate${num}`] === opt ? 'bg-[#d88808] text-white border-[#d88808] shadow-lg' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                                  >
                                      {opt}
                                  </button>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          )}

          {/* 🔥 البوكس العربي 🔥 */}
          {isArabicBoxOffer && (
              <div className="mb-6 space-y-4 bg-[#252525] p-4 rounded-xl border border-[#d88808]/20">
                  <h3 className="text-[#d88808] font-bold text-sm flex items-center gap-2">
                      <FaLayerGroup /> تكوين البوكس :
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => handleArabicBoxMode('mix')}
                        className={`py-3 px-1 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${offerState.arabicBox.mode === 'mix' ? 'bg-[#d88808] text-white border-[#d88808]' : 'bg-white/5 text-gray-400 border-white/10'}`}
                      >
                          <FaCheckCircle size={14} /> مشكل (ميكس)
                      </button>
                      <button 
                        onClick={() => handleArabicBoxMode('single')}
                        className={`py-3 px-1 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${offerState.arabicBox.mode === 'single' ? 'bg-[#d88808] text-white border-[#d88808]' : 'bg-white/5 text-gray-400 border-white/10'}`}
                      >
                          <FaUtensils size={14} /> نوع واحد
                      </button>
                      <button 
                        onClick={() => handleArabicBoxMode('double')}
                        className={`py-3 px-1 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${offerState.arabicBox.mode === 'double' ? 'bg-[#d88808] text-white border-[#d88808]' : 'bg-white/5 text-gray-400 border-white/10'}`}
                      >
                          <FaClone size={14} /> تشكيلة نوعين
                      </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                      {offerState.arabicBox.mode === 'mix' && (
                          <p className="text-center text-gray-300 text-sm">✨ سيتم تحضير البوكس مشكل من جميع الأنواع (كباب لحم، كباب دجاج، شيش طاووق).</p>
                      )}

                      {offerState.arabicBox.mode === 'single' && (
                          <div className="space-y-2 animate-fadeIn">
                              <p className="text-xs text-center text-[#d88808] mb-2">اختر النوع الذي تريده للبوكس بالكامل:</p>
                              <div className="grid grid-cols-1 gap-2">
                                  {plateOptions.map(opt => (
                                      <button 
                                        key={opt}
                                        onClick={() => handleArabicBoxSelection(opt)}
                                        className={`py-3 px-4 rounded-lg border text-sm transition-all ${offerState.arabicBox.selection.includes(opt) ? 'bg-white text-black border-white font-bold' : 'bg-transparent text-gray-400 border-white/10'}`}
                                      >
                                          {opt}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      )}

                      {offerState.arabicBox.mode === 'double' && (
                          <div className="space-y-2 animate-fadeIn">
                              <p className="text-xs text-center text-[#d88808] mb-2">اختر نوعين للدمج:</p>
                              <div className="grid grid-cols-1 gap-2">
                                  {plateOptions.map(opt => {
                                      const isSelected = offerState.arabicBox.selection.includes(opt);
                                      const isDisabled = !isSelected && offerState.arabicBox.selection.length >= 2;
                                      return (
                                          <button 
                                            key={opt}
                                            disabled={isDisabled}
                                            onClick={() => handleArabicBoxSelection(opt)}
                                            className={`py-3 px-4 rounded-lg border text-sm transition-all flex justify-between items-center ${isSelected ? 'bg-white text-black border-white font-bold' : (isDisabled ? 'opacity-30 cursor-not-allowed border-white/5' : 'bg-transparent text-gray-400 border-white/10')}`}
                                          >
                                              <span>{opt}</span>
                                              {isSelected && <FaCheckCircle className="text-green-600" />}
                                          </button>
                                      );
                                  })}
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          )}

          {isSandwich && (
             <div className="mb-6 space-y-4">
               <div><h3 className="text-[#d88808] font-bold text-sm mb-2">تعديل المكونات:</h3>
                 <div className="grid grid-cols-2 gap-2"><button onClick={handleEverythingClick} className={`text-xs py-3 px-2 rounded-xl font-bold transition-all text-center border col-span-2 ${isEverythingSelected ? 'bg-[#d88808] text-white border-[#d88808] shadow-md' : 'bg-[#2a2a2a] border-transparent text-gray-300 hover:bg-[#3a3a3a]'}`}> كل شيء </button>
                   {defaultIngredients.map((opt) => (<button key={opt.id} onClick={() => toggleOption(opt.label)} className={`text-xs py-3 px-2 rounded-xl font-bold transition-all text-center border ${selectedOpts.includes(opt.label) ? 'bg-red-900 border-red-500 text-white shadow-inner' : 'bg-[#2a2a2a] border-transparent text-gray-300 hover:bg-[#3a3a3a]'}`}> {opt.label} </button>))}
                 </div>
               </div>
               <div><h3 className="text-[#d88808] font-bold text-sm mb-2">الإضافات:</h3>
                 <div className="grid grid-cols-2 gap-2">{extraOptions.map((opt) => (<button key={opt.id} onClick={() => toggleOption(opt.label)} className={`text-xs py-3 px-2 rounded-xl font-bold transition-all text-center border ${selectedOpts.includes(opt.label) ? 'bg-green-900 border-green-500 text-white' : 'bg-[#2a2a2a] border-transparent text-gray-300 hover:bg-[#3a3a3a]'}`}> {opt.label} </button>))}</div>
               </div>
             </div>
          )}
          <div className="flex items-center justify-between bg-[#252525] p-3 rounded-xl mb-6 border border-white/5">
            <span className="text-white font-bold text-sm px-2">الكمية:</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-[#3a3a3a] text-white flex items-center justify-center hover:bg-[#b21817] transition-colors font-bold shadow-md"><FaMinus /></button>
              <span className="text-2xl font-bold text-white w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-[#3a3a3a] text-white flex items-center justify-center hover:bg-green-600 transition-colors font-bold shadow-md"><FaPlus /></button>
            </div>
          </div>
          <button 
            onClick={isOfferValid() ? handleSubmit : null} 
            className={`w-full font-bold py-4 rounded-xl shadow-lg transition-transform flex justify-between px-6 
                ${isOfferValid() 
                    ? 'bg-gradient-to-r from-[#d88808] to-[#b21817] text-white hover:shadow-[#d88808]/40 active:scale-95' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed grayscale'}`}
          >
            <span>{cartItem ? 'حفظ التعديلات' : (isOfferValid() ? 'إضافة للسلة' : 'يرجى إكمال الخيارات')}</span>
            <span>{item.price * quantity} SAR</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ item, isOffer, onClick }) {
  if (isOffer) {
    return (
      <div onClick={onClick} className="group relative w-full aspect-[5/3] rounded-2xl overflow-hidden cursor-pointer border border-[#d88808]/20 shadow-xl hover:border-[#d88808]/50 transition-all active:scale-95">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute bottom-0 w-full bg-black/70 backdrop-blur-sm py-2 px-4 flex justify-between items-center border-t border-white/5"><span className="text-white font-bold text-sm truncate ml-2">{item.name}</span><span className="text-[#d88808] font-bold text-sm shrink-0">{item.price} SAR</span></div>
      </div>
    );
  }
  return (
    <div onClick={onClick} className="group relative overflow-hidden rounded-2xl bg-[#1a0505] border border-[#d88808]/20 shadow-xl cursor-pointer active:scale-95 transition-all hover:border-[#d88808]/50">
      <div className="relative h-36 w-full bg-black/50 overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0a0202] to-transparent opacity-80" />
      </div>
      <div className="p-3 relative z-10 bg-[#0a0202] h-full flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2"><div className="flex-1"><h3 className="text-[11px] font-bold text-white leading-tight group-hover:text-[#d88808] transition-colors text-right mb-1">{item.name}</h3></div><div className="flex flex-col items-end shrink-0"><span className="text-[#d88808] font-extrabold text-sm leading-none">{item.price} <span className="text-[9px] font-medium mr-1 opacity-80">SAR</span></span></div></div>
      </div>
    </div>
  );
}
