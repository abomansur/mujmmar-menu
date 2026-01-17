export const socialLinks = {
  whatsapp: "https://wa.me/966550150533",
  instagram: "https://instagram.com/mujmmar",
  tiktok: "https://tiktok.com/@mujmmar",
  location: "https://maps.app.goo.gl/X2ysTCxugWb1D2w19"
};

export const categories = [
  { id: 'offers', name: 'عروضنا' },
  { id: 'sandwiches', name: 'ساندويتش' },
  { id: 'plates', name: 'صحن' },
  { id: 'appetizers', name: 'مقبلات' },
  { id: 'sides', name: 'جانبية' },
  { id: 'meals', name: 'وجبة' },
  { id: 'sauces', name: 'صوصات' },
  { id: 'drinks', name: 'مشروبات' },
];

export const menuItems = [
  // --- قسم العروض (جديد) ---
  {
    id: 101,
    categoryId: 'offers',
    name: 'البوكس العربي',
    description: 'بوكس العربي المميز',
    price: '50',
    image: '/images/Arabic_Box_Offer.jpg' 
  },
  {
    id: 102,
    categoryId: 'offers',
    name: 'عرض 4 صحون + مقبلات مجاناً',
    description: '4 صحون من اختيارك + صحن مقبلات مشكل مجاناََ',
    price: '99',
    image: '/images/4_Plates_Offer.jpg'
  },

  // --- ساندويتشات شباتا ---
  {
    id: 1,
    categoryId: 'sandwiches',
    name: "ساندويتش شباتا كباب لحم",
    description: "خبز شباتا طازج، محشو بدبل سيخ كباب لحم مشوي على الفحم، يضاف إليه الخس، النعناع، البقدونس، البصل، المخلل، البطاطس المقلية، مع طبقة من الحمص، الثومية، الطحينة وصوص مجمّر الخاص.",
    price: "16",
    image: "/images/Ciabatta_sandwich.jpg"
  },
  {
    id: 2,
    categoryId: 'sandwiches',
    name: "ساندويتش شباتا كباب دجاج",
    description: "خبز شباتا طازج، محشو بدبل سيخ كباب دجاج مشوي على الفحم، يضاف إليه الخس، النعناع، البقدونس، البصل، المخلل، البطاطس المقلية، مع طبقة من الحمص، الثومية، الطحينة وصوص مجمّر الخاص.",
    price: "16",
    image: "/images/Ciabatta_sandwich.jpg"
  },
  {
    id: 3,
    categoryId: 'sandwiches',
    name: "ساندويتش شباتا شيش طاووق",
    description: "خبز شباتا طازج، محشو بدبل سيخ شيش طاووق مشوي على الفحم، يضاف إليه الخس، النعناع، البقدونس، البصل، المخلل، البطاطس المقلية، مع طبقة من الحمص، الثومية، الطحينة وصوص مجمّر الخاص.",
    price: "16",
    image: "/images/Ciabatta_sandwich.jpg"
  },

  // --- ساندويتشات بريوش ---
  {
    id: 4,
    categoryId: 'sandwiches',
    name: "ساندويتش بريوش كباب لحم",
    description: "خبز بريوش طري محشو بكباب لحم مشوي على الفحم مع الخس، النعناع، البقدونس، البصل، المخلل، البطاطس المقلية، وطبقة من الحمص، الثومية، الطحينة وصوص مجمّر الخاص.",
    price: "14",
    image: "/images/Brioche_sandwich.jpg"
  },
  {
    id: 5,
    categoryId: 'sandwiches',
    name: "ساندويتش بريوش كباب دجاج",
    description: "خبز بريوش طري محشو بكباب دجاج مشوي على الفحم مع الخس، النعناع، البقدونس، البصل، المخلل، البطاطس المقلية، وطبقة من الحمص، الثومية، الطحينة وصوص مجمّر الخاص.",
    price: "14",
    image: "/images/Brioche_sandwich.jpg"
  },
  {
    id: 6,
    categoryId: 'sandwiches',
    name: "ساندويتش بريوش شيش طاووق",
    description: "خبز بريوش طري محشو بشيش طاووق مشوي على الفحم مع الخس، النعناع، البقدونس، البصل، المخلل، البطاطس المقلية، وطبقة من الحمص، الثومية، الطحينة وصوص مجمّر الخاص.",
    price: "14",
    image: "/images/Brioche_sandwich.jpg"
  },

  // --- ساندويتشات صاج ---
  {
    id: 7,
    categoryId: 'sandwiches',
    name: "ساندويتش صاج كبير كباب لحم",
    description: "خبز صاج رقيق بحجم كبير، محشو بكباب لحم مشوي على الفحم.",
    price: "14",
    image: "/images/Saj_sandwich.jpg"
  },
  {
    id: 8,
    categoryId: 'sandwiches',
    name: "ساندويتش صاج كبير كباب دجاج",
    description: "خبز صاج رقيق بحجم كبير، محشو بكباب دجاج مشوي على الفحم.",
    price: "14",
    image: "/images/Saj_sandwich.jpg"
  },
  {
    id: 9,
    categoryId: 'sandwiches',
    name: "ساندويتش صاج كبير شيش طاووق",
    description: "خبز صاج رقيق بحجم كبير، محشو بشيش طاووق مشوي على الفحم.",
    price: "14",
    image: "/images/Saj_sandwich.jpg"
  },
  {
    id: 10,
    categoryId: 'sandwiches',
    name: "ساندويتش صاج صغير كباب لحم",
    description: "خبز صاج رقيق صغير محشو بكباب لحم مشوي على الفحم.",
    price: "10",
    image: "/images/Saj_sandwich.jpg"
  },
  {
    id: 11,
    categoryId: 'sandwiches',
    name: "ساندويتش صاج صغير كباب دجاج",
    description: "خبز صاج رقيق صغير محشو بكباب دجاج مشوي على الفحم.",
    price: "10",
    image: "/images/Saj_sandwich.jpg"
  },
  {
    id: 12,
    categoryId: 'sandwiches',
    name: "ساندويتش صاج صغير شيش طاووق",
    description: "خبز صاج رقيق صغير محشو بشيش طاووق مشوي على الفحم.",
    price: "10",
    image: "/images/Saj_sandwich.jpg"
  },

  // --- ساندويتشات بروتين ---
  {
    id: 13,
    categoryId: 'sandwiches',
    name: "ساندويتش بروتين كباب لحم",
    description: "خبز بروتين صحي محشو بكباب لحم مشوي على الفحم.",
    price: "11",
    image: "/images/Protein_sandwich.jpg"
  },
  {
    id: 14,
    categoryId: 'sandwiches',
    name: "ساندويتش بروتين كباب دجاج",
    description: "خبز بروتين صحي محشو بكباب دجاج مشوي على الفحم.",
    price: "11",
    image: "/images/Protein_sandwich.jpg"
  },
  {
    id: 15,
    categoryId: 'sandwiches',
    name: "ساندويتش بروتين شيش طاووق",
    description: "خبز بروتين صحي محشو بشيش طاووق مشوي على الفحم.",
    price: "11",
    image: "/images/Protein_sandwich.jpg"
  },

  // --- ساندويتشات كلاسيك ---
  {
    id: 16,
    categoryId: 'sandwiches',
    name: "ساندويتش كلاسيك كباب لحم",
    description: "خبز كلاسيكي محشو بكباب لحم مشوي على الفحم.",
    price: "10",
    image: "/images/Classic_sandwich.jpg"
  },
  {
    id: 17,
    categoryId: 'sandwiches',
    name: "ساندويتش كلاسيك كباب دجاج",
    description: "خبز كلاسيكي محشو بكباب دجاج مشوي على الفحم.",
    price: "10",
    image: "/images/Classic_sandwich.jpg"
  },
  {
    id: 18,
    categoryId: 'sandwiches',
    name: "ساندويتش كلاسيك شيش طاووق",
    description: "خبز كلاسيكي محشو بشيش طاووق مشوي على الفحم.",
    price: "10",
    image: "/images/Classic_sandwich.jpg"
  },

  // --- الصحون ---
  {
    id: 20,
    categoryId: 'plates',
    name: "صحن كباب لحم كلاسيك",
    description: "كباب لحم مشوي بالطريقة الكلاسيكية، يُقدَّم مع بطاطس مقلية مقرمشة.",
    price: "30",
    image: "/images/Classic_beej_kebab_plate.jpg"
  },
  {
    id: 21,
    categoryId: 'plates',
    name: "صحن كباب لحم عنتاب",
    description: "كباب لحم على الطريقة العنتابية الحارة.",
    price: "30",
    image: "/images/Antep_Beef_Kebab_Plate.jpg"
  },
  {
    id: 22,
    categoryId: 'plates',
    name: "صحن كباب لحم حلبي",
    description: "كباب لحم على الطريقة الحلبية بنكهة شامية مميزة.",
    price: "30",
    image: "/images/Aleppo_Beef_Kebab_Plate.jpg"
  },
  {
    id: 23,
    categoryId: 'plates',
    name: "صحن كباب دجاج",
    description: "كباب دجاج طازج مشوي على الفحم.",
    price: "28",
    image: "/images/Chicken_Kebab_Plate.jpg"
  },
  {
    id: 24,
    categoryId: 'plates',
    name: "صحن شيش طاووق",
    description: "شيش طاووق طازج متبّل ومشوي على الفحم.",
    price: "28",
    image: "/images/Shish_Tawook_Plate.jpg"
  },
  {
    id: 25,
    categoryId: 'plates',
    name: "صحن أوصال لحم",
    description: "أوصال لحم طازجة مشوية على الفحم.",
    price: "35",
    image: "/images/Beef_Cubes_Plate.jpg"
  },
  {
    id: 26,
    categoryId: 'plates',
    name: "صحن عربي كباب لحم",
    description: "لفائف خبز الصاج محشوة بكباب اللحم المشوي على الفحم.",
    price: "20",
    image: "/images/Arabic_Plate_Beef_Kebab.jpg"
  },
  {
    id: 27,
    categoryId: 'plates',
    name: "صحن عربي كباب دجاج",
    description: "لفائف خبز الصاج محشوة بكباب الدجاج المشوي على الفحم.",
    price: "20",
    image: "/images/Arabic_Plate_Chicken_Kebab.jpg"
  },
  {
    id: 28,
    categoryId: 'plates',
    name: "صحن عربي شيش طاووق",
    description: "لفائف خبز الصاج محشوة بقطع شيش طاووق مشوية على الفحم.",
    price: "20",
    image: "/images/Arabic_Plate_Shish_Tawook.jpg"
  },

  // --- المقبلات ---
  {
    id: 30,
    categoryId: 'appetizers',
    name: "حمص",
    description: "حمص مسلوق مطحون ممزوج بالطحينة.",
    price: "8",
    image: "/images/Hummus.jpg"
  },
  {
    id: 31,
    categoryId: 'appetizers',
    name: "متبل",
    description: "باذنجان مشوي مهروس ممزوج بالطحينة.",
    price: "8",
    image: "/images/Moutabal.jpg"
  },
  {
    id: 32,
    categoryId: 'appetizers',
    name: "بابا غنوج",
    description: "باذنجان مشوي مهروس ممزوج بالفلفل الحلو.",
    price: "8",
    image: "/images/Baba_Ghanouj.jpg"
  },
  // 👇 الصنف الجديد المطلوب
  {
    id: 33,
    categoryId: 'appetizers',
    name: "مقبلات مشكل",
    description: "تشكيلة مميزة من المقبلات الباردة.",
    price: "16",
    image: "/images/Mixed_Appetizers.jpg"
  },

  // --- الجانبية ---
  {
    id: 34,
    categoryId: 'sides',
    name: "بطاطس مقلي",
    description: "بطاطس مقلية مقرمشة.",
    price: "7",
    image: "/images/French_Fries.jpg"
  },
  {
    id: 35,
    categoryId: 'sides',
    name: "شوربة عدس",
    description: "شوربة عدس لذيذة.",
    price: "5",
    image: "/images/Lentil_Soup.jpg"
  },
  {
    id: 36,
    categoryId: 'sides',
    name: "ميني عرائسي",
    description: "ميني عرائسي من الخبز الدائري الصغير محشو بلحم مفروم.",
    price: "20",
    image: "/images/Mini_Araeesi.jpg"
  },
  {
    id: 37,
    categoryId: 'sides',
    name: "رز أبيض بالزعفران",
    description: "أرز أبيض مطبوخ بالزعفران.",
    price: "7",
    image: "/images/Saffron_White_Rice.jpg"
  },

  // --- وجبات ---
  {
    id: 39,
    categoryId: 'meals',
    name: "بوكس عائلي",
    description: "تشكيلة مشاوي متنوعة تكفي العائلة.",
    price: "140",
    image: "/images/Family_Box.jpg"
  },

  // --- صوصات ---
  {
    id: 41,
    categoryId: 'sauces',
    name: "صوص مجمر",
    description: "صوص خاص مطعم مجمّر.",
    price: "3",
    image: "/images/Mujammar_Sauce.jpg"
  },
  {
    id: 42,
    categoryId: 'sauces',
    name: "صوص عسل",
    description: "صوص عسل طبيعي حلو.",
    price: "3",
    image: "/images/Garlic_Sauce.jpg"
  },
  {
    id: 43,
    categoryId: 'sauces',
    name: "صوص حار",
    description: "صوص حار لمحبي النكهات القوية.",
    price: "3",
    image: "/images/Mujammar_Sauce.jpg"
  },
  {
    id: 44,
    categoryId: 'sauces',
    name: "ثومية",
    description: "صلصة ثوم بيضاء ناعمة.",
    price: "2",
    image: "/images/Garlic_Sauce.jpg"
  },
  {
    id: 45,
    categoryId: 'sauces',
    name: "طحينة",
    description: "صلصة طحينة كريمية.",
    price: "2",
    image: "/images/Garlic_Sauce.jpg"
  },

  // --- مشروبات ---
  {
    id: 47,
    categoryId: 'drinks',
    name: "ببسي",
    description: "مشروب غازي منعش.",
    price: "3",
    image: "/images/pepsi.jpg"
  },
  {
    id: 48,
    categoryId: 'drinks',
    name: "ببسي دايت",
    description: "مشروب غازي خفيف خالي من السكر.",
    price: "3",
    image: "/images/pepsi-diet.jpg"
  },
  {
    id: 49,
    categoryId: 'drinks',
    name: "سفن",
    description: "مشروب غازي بنكهة الليمون.",
    price: "3",
    image: "/images/7up.jpg"
  },
  {
    id: 50,
    categoryId: 'drinks',
    name: "سفن دايت",
    description: "مشروب غازي خفيف بنكهة الليمون.",
    price: "3",
    image: "/images/7up-diet.jpg"
  },
  {
    id: 51,
    categoryId: 'drinks',
    name: "ماء ",
    description: "ماء نقي ومنعش.",
    price: "2",
    image: "/images/water.jpg"
  }
];