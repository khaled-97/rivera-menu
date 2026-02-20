export interface TagTranslations {
  vegetarian: string;
  shareable: string;
  popular: string;
  "chef's choice": string;
  dessert: string;
  sweet: string;
  signature: string;
  premium: string;
  refreshing: string;
  classic: string;
  fresh: string;
  healthy: string;
  spicy: string;
  creamy: string;
  hearty: string;
  grilled: string;
  seafood: string;
  traditional: string;
  coffee: string;
  cold: string;
  hot: string;
  "soft drink": string;
  water: string;
  energy: string;
  coupon: string;
  deal: string;
  kids: string;
  tropical: string;
  special: string;
  [key: string]: string;
}

export interface LanguageTranslations {
  currency: string;
  currencyName: string;
  priceNote: string;
  allergenNote: string;
  bonAppetit: string;
  switchLang: string;
  restaurantName: string;
  restaurantTagline: string;
  categories: Record<string, string>;
  items: Record<string, string>;
  tags: TagTranslations;
}

export interface Translations {
  ar: LanguageTranslations;
  he: LanguageTranslations;
}

export const translations: Translations = {
  ar: {
    currency: "₪",
    currencyName: "شيكل",
    priceNote: "الأسعار بالشيكل وشاملة جميع الضرائب",
    allergenNote: "يرجى إبلاغ طاقمنا بأي حساسية غذائية",
    bonAppetit: "بالعافية",
    switchLang: "עברית",
    restaurantName: "RIVERA",
    restaurantTagline: "مطبخ إيطالي",
    categories: {},
    items: {},
    tags: {
      vegetarian: "نباتي",
      shareable: "للمشاركة",
      popular: "الأكثر طلباً",
      "chef's choice": "اختيار الشيف",
      dessert: "حلويات",
      sweet: "حلو",
      signature: "توقيع الشيف",
      premium: "فاخر",
      refreshing: "منعش",
      classic: "كلاسيكي",
      fresh: "طازج",
      healthy: "صحي",
      spicy: "حار",
      creamy: "كريمي",
      hearty: "دسم",
      grilled: "مشوي",
      seafood: "مأكولات بحرية",
      traditional: "تقليدي",
      coffee: "قهوة",
      cold: "بارد",
      hot: "ساخن",
      "soft drink": "مشروب غازي",
      water: "ماء",
      energy: "طاقة",
      coupon: "قسيمة",
      deal: "عرض",
      kids: "أطفال",
      tropical: "استوائي",
      special: "مميز",
    },
  },
  
  he: {
    currency: "₪",
    currencyName: "שקל",
    priceNote: "המחירים בשקלים וכוללים מע״מ",
    allergenNote: "נא ליידע את הצוות על אלרגיות למזון",
    bonAppetit: "בתיאבון",
    switchLang: "العربية",
    restaurantName: "RIVERA",
    restaurantTagline: "מטבח איטלקי",
    categories: {},
    items: {},
    tags: {
      vegetarian: "צמחוני",
      shareable: "לשיתוף",
      popular: "פופולרי",
      "chef's choice": "בחירת השף",
      dessert: "קינוחים",
      sweet: "מתוק",
      signature: "מנת חתימה",
      premium: "פרימיום",
      refreshing: "מרענן",
      classic: "קלאסי",
      fresh: "טרי",
      healthy: "בריא",
      spicy: "חריף",
      creamy: "קרמי",
      hearty: "דשן",
      grilled: "צלוי",
      seafood: "פירות ים",
      traditional: "מסורתי",
      coffee: "קפה",
      cold: "קר",
      hot: "חם",
      "soft drink": "משקה קל",
      water: "מים",
      energy: "אנרגיה",
      coupon: "קופון",
      deal: "מבצע",
      kids: "ילדים",
      tropical: "טרופי",
      special: "מיוחד",
    },
  },
};

export type Language = "ar" | "he";
