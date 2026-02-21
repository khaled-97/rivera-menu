import { config } from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../../../apps/web/.env") });

import { drizzle } from "drizzle-orm/node-postgres";
import { menuCategory, menuItem } from "./schema/menu";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

const db = drizzle(DATABASE_URL);

const menuData = {
  categories: [
    {
      id: "antipasti",
      nameAr: "المقبلات",
      nameHe: "מנות ראשונות",
      descriptionAr: "ابدأ رحلتك مع مقبلاتنا",
      descriptionHe: "התחילו את המסע עם המנות הראשונות שלנו",
      items: [
        {
          nameAr: "أرانشيني",
          nameHe: "ארנצ'יני",
          descriptionAr: "4 قطع من كرات الأرز الريزوتو، مطبوخة مع كريمة الفطر وهريس الكمأة، والبارميزان والموزاريلا في صلصة كريمة الكمأة",
          descriptionHe: "4 יחידות כדורי אורז ריזוטו, מבושלים עם שמנת פטריות, מחית כמהין, פרמז'ן ומוצרלה ברוטב שמנת כמהין",
          price: 49,
          image: "rivera1165.JPG",
          tags: ["vegetarian"],
        },
        {
          nameAr: "فوكاتشا",
          nameHe: "פוקאצ'ה",
          descriptionAr: "خبز إيطالي مسطح مع الأعشاب وزيت الزيتون",
          descriptionHe: "לחם איטלקי שטוח עם עשבי תיבול ושמן זית",
          price: 19,
          image: "rivera1162.JPG",
          tags: ["vegetarian"],
        },
        {
          nameAr: "فوكاتشا بالجبن",
          nameHe: "פוקאצ'ה עם גבינה",
          descriptionAr: "فوكاتشا مغطاة بالجبن الذائب",
          descriptionHe: "פוקאצ'ה מכוסה בגבינה מותכת",
          price: 28,
          image: "rivera1738.JPG",
          tags: ["vegetarian"],
        },
        {
          nameAr: "بولينتا الفطر",
          nameHe: "פולנטה פטריות",
          descriptionAr: "ذرة طازجة مطحونة مع الكريمة والزبدة والبارميزان، تقدم مع الهليون المقلي والفطر وشرائح البارميزان",
          descriptionHe: "תירס טרי טחון עם שמנת, חמאה ופרמז'ן, מוגש עם אספרגוס מוקפץ, פטריות ופרוסות גבינת פרמז'ן",
          price: 46,
          image: "rivera1172.JPG",
          tags: ["vegetarian"],
        },
        {
          nameAr: "قطع دجاج ناجتس",
          nameHe: "נאגטס עוף",
          descriptionAr: "مكعبات دجاج مقلية بقشرة مقرمشة مع صلصة الفلفل الحلو / ترياكي",
          descriptionHe: "קוביות עוף מטוגנות עם מעטפת קריספית ברוטב צ'ילי מתוק / טריאקי",
          price: 38,
          image: "rivera1173.JPG",
          tags: ["popular"],
        },
        {
          nameAr: "أجنحة الدجاج",
          nameHe: "כנפי עוף",
          descriptionAr: "12 قطعة مقلية مقرمشة مع صلصة الفلفل الحلو / ترياكي",
          descriptionHe: "12 יח' מטוגנות קריספי עם צ'ילי מתוק / טריאקי",
          price: 34,
          image: "rivera 21827.JPG",
          tags: ["popular"],
        },
        {
          nameAr: "فطر محشو",
          nameHe: "פטריות ממולאות",
          descriptionAr: "فطر شامبينيون محشو بمزيج من الموزاريلا والجبن البلغاري والجوز في صلصة كريمة البيستو",
          descriptionHe: "פטריות שמפיניון ממולאות במיקס גבינות מוצרלה, בולגרית, אגוזי מלך ברוטב שמנת פסטו",
          price: 52,
          image: "rivera1174.JPG",
          tags: ["vegetarian"],
        },
        {
          nameAr: "اسكالوبيني الدجاج",
          nameHe: "אסקלופיני עוף",
          descriptionAr: "قطع صدور الدجاج المطبوخة مع الليمون والثوم والزبدة والقبار",
          descriptionHe: "נתחי חזה עוף מבושלים עם לימון, שום, חמאה וצלפים",
          price: 58,
          image: "rivera1187.JPG",
          tags: ["popular"],
        },
        {
          nameAr: "باذنجان ميلانزانا",
          nameHe: "חציל מילנזנה",
          descriptionAr: "باذنجان محروق، كريمة الطماطم، بيستو، فستق وجبن البارميزان",
          descriptionHe: "חציל שרוף, קרם עגבניות, פסטו, פיסטוק וגבינת פרמזן",
          price: 42,
          image: "rivera 21805.JPG",
          tags: ["vegetarian"],
        },
        {
          nameAr: "شرائح دجاج مقرمشة",
          nameHe: "רצועות עוף קריספיות",
          descriptionAr: "شرائح دجاج بقشرة من فتات الخبز والسمسم",
          descriptionHe: "רצועות עוף במעטפת פירורים ושומשום",
          price: 44,
          image: "rivera1730.JPG",
          tags: ["popular"],
        },
        {
          nameAr: "كارباتشيو فيليه",
          nameHe: "קרפצ'יו פילה",
          descriptionAr: "شرائح فيليه رقيقة مزينة بأوراق الجرجير وزيت الزيتون والخل البلسمي والثوم المحمص وجبن البارميزان",
          descriptionHe: "פרוסות פילה דקות בעיטור עלי רוקט, שמן זית, חומץ בלסמי, שום קונפטי וגבינת פרמז'ן",
          price: 64,
          image: "rivera1735.JPG",
          tags: ["premium"],
        },
        {
          nameAr: "اصابع موتساريلا",
          nameHe: "מקלות מוצרלה",
          descriptionAr: "أصابع جبن موزاريلا مقرمشة",
          descriptionHe: "מקלות גבינה מוצרלה קריספיים",
          price: 35,
          image: "halomi_fingers.JPG",
          tags: ["vegetarian"],
        },
        {
          nameAr: "حلومي بايتس",
          nameHe: "ביסים חלומי",
          descriptionAr: "مكعبات جبن حلومي مقلية مقرمشة",
          descriptionHe: "קוביות גבינת חלומי מטוגנת קראנצ'ית",
          price: 39,
          image: "halomi_bites.png",
          tags: ["vegetarian", "popular"],
        },
        {
          nameAr: "رقائق البطاطس",
          nameHe: "צ'יפס",
          descriptionAr: "رقائق بطاطس مقرمشة محضرة منزلياً",
          descriptionHe: "צ'יפס קריספי תוצרת בית",
          price: 15,
          image: "rivera1736.JPG",
          tags: ["vegetarian"],
        },
      ],
    },
    {
      id: "sandwiches",
      nameAr: "شطائر",
      nameHe: "כריכים",
      descriptionAr: "شطائر لذيذة ومتنوعة",
      descriptionHe: "כריכים טעימים ומגוונים",
      items: [
        {
          nameAr: "جبيتا شنيتسل",
          nameHe: "ג'בטה שניצל",
          descriptionAr: "جبيتا طازجة ومقرمشة محشوة بشرائح شنيتسل مقرمشة، خضروات طازجة، خيار مخلل وصلصة المنزل مع البطاطس المقلية",
          descriptionHe: "ג'בטה טרייה וקריספית במילוי רצועות שניצל קראנצ'יות, ירקות טריים, מלפפון כבוש ורוטב הבית עם צ'יפס בצד",
          price: 40,
          image: "gebetta.jpg",
          tags: ["popular"],
        },
        {
          nameAr: "جبيتا مع صدر دجاج",
          nameHe: "ג'בטה חזה עוף",
          descriptionAr: "جبيتا طازجة ومقرمشة مع قطع صدر دجاج طرية، خضروات طازجة، خيار مخلل وصلصة المنزل مع البطاطس المقلية",
          descriptionHe: "ג'בטה טרייה וקריספית עם נתחי חזה עוף עסיסיות, ירקות טריים, מלפפון כבוש ורוטב הבית עם צ'יפס בצד",
          price: 40,
          image: "burger_rivera_cheese.JPG",
          tags: ["popular"],
        },
        {
          nameAr: "جبيتا أنتريكوت",
          nameHe: "ג'בטה אנטריקוט",
          descriptionAr: "جبيتا طازجة ومقرمشة محشوة بشرائح أنتريكوت طرية، خضروات طازجة وصلصة المنزل مع البطاطس المقلية",
          descriptionHe: "ג'בטה טרייה וקריספית במילוי פרוסות אנטריקוט עסיסיות, ירקות טריים ורוטב הבית עם צ'יפס בצד",
          price: 55,
          image: "rivera 21369.JPG",
          tags: ["premium"],
        },
        {
          nameAr: "برغر ريفيرا",
          nameHe: "המבורגר ריברה",
          descriptionAr: "لحم مفروم طازج مع صلصة خاصة، خس، طماطم، بصل أحمر، وخيار مخلل",
          descriptionHe: "בשר טחון טרי עם רוטב מיוחד, חסה, עגבנייה, בצל סגול ומלפפון חמוץ",
          price: 50,
          image: "burger_rivera.JPG",
          tags: ["popular"],
        },
      ],
    },
    {
      id: "drinks",
      nameAr: "الشرب",
      nameHe: "משקאות",
      descriptionAr: "",
      descriptionHe: "",
      items: [
        { nameAr: "موهيتو البطيخ", nameHe: "מוחיטו אבטיח", price: 22, image: "rivera 21932.JPG", tags: ["refreshing"] },
        { nameAr: "موهيتو الكيوي والنعناع", nameHe: "מוחיטו קיווי נענע", price: 22, image: "rivera 21933.JPG", tags: ["refreshing"] },
        { nameAr: "موخيتو التوت الأزرق", nameHe: "מוחיטו אוכמניות", price: 22, image: "rivera 21935.JPG", tags: ["refreshing"] },
        { nameAr: "موهيتو فواكه مشكلة", nameHe: "מוחיטו פירות מעורבים", price: 22, image: "rivera 21930.JPG", tags: ["refreshing"] },
        { nameAr: "موهيتو الفراولة", nameHe: "מוחיטו תות", price: 22, image: "rivera 21932.JPG", tags: ["refreshing"] },
        { nameAr: "شاي الموهيتو المثلج", nameHe: "מוחיטו תה קר", price: 22, image: "rivera 21926.JPG", tags: ["refreshing"] },
        { nameAr: "موخيتو ياباني", nameHe: "מוחיטו יפני", price: 22, image: "rivera 21935.JPG", tags: ["special"] },
        { nameAr: "موخيتو هاواي", nameHe: "מוחיטו הוואי", price: 22, image: "rivera 21930.JPG", tags: ["tropical"] },
        { nameAr: "القهوة المثلجة", nameHe: "קפה קר", price: 22, image: "rivera 21926.JPG", tags: ["coffee"] },
        { nameAr: "عصير البرتقال", nameHe: "מיץ תפוזים", price: 18, image: "rivera 21917.JPG", tags: ["fresh"] },
        { nameAr: "عصير الجزر", nameHe: "מיץ גזר", price: 18, image: "rivera 21917.JPG", tags: ["healthy"] },
        { nameAr: "عصير التفاح والزنجبيل", nameHe: "מיץ תפוח וג'ינג'ר", price: 22, image: "rivera 21917.JPG", tags: ["healthy"] },
        { nameAr: "شرائح الليمون والنعناع", nameHe: "פרוסות לימון ונענע", price: 15, image: "rivera 21918.JPG", tags: ["refreshing"] },
        { nameAr: "إسبرسو", nameHe: "אספרסו", price: 9, image: "rivera 21937.JPG", tags: ["coffee"] },
        { nameAr: "إسبريسو مزدوج", nameHe: "אספרסו כפול", price: 12, image: "rivera 21937.JPG", tags: ["coffee"] },
        { nameAr: "كابتشينو", nameHe: "קפוצ'ינו", price: 16, image: "rivera 21936.JPG", tags: ["coffee", "classic"] },
        { nameAr: "أمريكانو", nameHe: "אמריקנו", price: 10, image: "rivera 21936.JPG", tags: ["coffee"] },
        { nameAr: "شاي النعناع", nameHe: "תה נענע", price: 10, image: "rivera 21942.JPG", tags: ["hot"] },
        { nameAr: "شاي البابونج", nameHe: "תה קמומיל", price: 16, image: "rivera 21942.JPG", tags: ["hot"] },
        { nameAr: "عنب الفرقاطة", nameHe: "פרפה ענבים", price: 10, image: "rivera 21935.JPG", tags: ["cold"] },
        { nameAr: "جريب فروت الفرقاطة", nameHe: "פרפה אשכולית", price: 10, image: "rivera 21935.JPG", tags: ["cold"] },
        { nameAr: "فرقاطة الفراولة والموز", nameHe: "פרפה תות בננה", price: 10, image: "rivera 21932.JPG", tags: ["cold"] },
        { nameAr: "علبة كوكاكولا", nameHe: "פחית קוקה קולה", price: 10, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "علبة كوكاكولا زيرو", nameHe: "פחית קוקה קולה זירו", price: 10, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "علبة سبرايت", nameHe: "פחית ספרייט", price: 10, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "علبة سبرايت زيرو", nameHe: "פחית ספרייט זירו", price: 10, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "علبة فانتا برتقال", nameHe: "פחית פנטה תפוז", price: 10, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "زجاجة كوكاكولا", nameHe: "בקבוק קוקה קולה", price: 12, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "زجاجة كوكاكولا زيرو", nameHe: "בקבוק קוקה קולה זירו", price: 12, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "زجاجة سبرايت", nameHe: "בקבוק ספרייט", price: 12, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "زجاجة سبرايت زيرو", nameHe: "בקבוק ספרייט זירו", price: 12, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "زجاجة فانتا", nameHe: "בקבוק פנטה", price: 12, image: "rivera 21917.JPG", tags: ["soft drink"] },
        { nameAr: "مياه معدنية 500 مل", nameHe: "מים מינרליים 500 מ\"ל", price: 10, image: "rivera 21917.JPG", tags: ["water"] },
        { nameAr: "موشيه إنيرجي XL", nameHe: "משקה אנרגיה XL", price: 8, image: "rivera 21917.JPG", tags: ["energy"] },
        { nameAr: "صودا", nameHe: "סודה", price: 8, image: "rivera 21917.JPG", tags: ["water"] },
      ],
    },
    {
      id: "coupons",
      nameAr: "منتجات القسائم",
      nameHe: "מוצרי קופונים",
      descriptionAr: "عروض خاصة بالقسائم",
      descriptionHe: "מבצעים מיוחדים עם קופונים",
      items: [
        { nameAr: "سباغيتي", nameHe: "ספגטי", descriptionAr: "سباغيتي طازجة مطبوخة مع صلصة من اختيارك وجبن البارميزان", descriptionHe: "ספגטי טרי מבושל עם רוטב לבחירה וגבינת פרמז'ן", price: 0, image: "rivera1227.JPG", tags: ["coupon"] },
        { nameAr: "فتوتشيني", nameHe: "פטוצ'יני", descriptionAr: "باستا فتوتشيني مع صلصة لاختيارك وجبنة البارميجان", descriptionHe: "פסטה פטוצ'יני עם רוטב לבחירה וגבינת פרמז'ן", price: 0, image: "rivera1228.JPG", tags: ["coupon"] },
        { nameAr: "باستا بسني", nameHe: "פסטה פנה", descriptionAr: "باستا بيني/سباغيتي/فتوتشيني مطبوخة مع صلصة من اختيارك وجبن البارميزان", descriptionHe: "פסטה פנה/ספגטי/פטוצ'יני טרייה מבושלת עם רוטב לבחירה וגבינת פרמז'ן", price: 0, image: "rivera1229.JPG", tags: ["coupon"] },
        { nameAr: "سلطة سيزر", nameHe: "סלט סיזר", descriptionAr: "قلوب الخس، البصل الأحمر، الطماطم المجففة، مع صلصة الأيولي سيزر", descriptionHe: "לבבות חסה, בצל סגול, עגבניות מיובשות, עם רוטב איולי סיזר", price: 44, image: "rivera1130.JPG", tags: ["coupon"] },
        { nameAr: "كوكاكولا 1.5 لتر", nameHe: "קוקה קולה 1.5 ליטר", descriptionAr: "زجاجة كوكاكولا 1.5 لتر", descriptionHe: "בקבוק קוקה קולה 1.5 ליטר", price: 15, image: "rivera 21917.JPG", tags: ["coupon"] },
        { nameAr: "كوكاكولا زيرو 1.5", nameHe: "קוקה קולה זירו 1.5 ליטר", descriptionAr: "زجاجة كوكاكولا زيرو 1.5 لتر", descriptionHe: "בקבוק קוקה קולה זירו 1.5 ליטר", price: 15, image: "rivera 21917.JPG", tags: ["coupon"] },
        { nameAr: "بيتزا مارغريتا", nameHe: "פיצה מרגריטה", descriptionAr: "بيتزا مارغريتا كلاسيكية", descriptionHe: "פיצה מרגריטה קלאסית", price: 50, image: "rivera1202.JPG", tags: ["coupon"] },
      ],
    },
    {
      id: "special-offers",
      nameAr: "العروض الخاصة",
      nameHe: "מבצעים מיוחדים",
      descriptionAr: "عروض مميزة",
      descriptionHe: "מבצעים מיוחדים",
      items: [
        { nameAr: "عرض باستا + مشروب ب50₪", nameHe: "מבצע פסטה + שתייה ב-50₪", descriptionAr: "أي طبق باستا مع مشروب ب50₪", descriptionHe: "כל מנת פסטה עם שתייה ב-50₪", price: 50, image: "rivera 21845.JPG", tags: ["popular", "deal"] },
      ],
    },
    {
      id: "pasta",
      nameAr: "معكرونة ايطالية",
      nameHe: "פסטה איטלקית",
      descriptionAr: "معكرونة طازجة مصنوعة يدوياً يومياً",
      descriptionHe: "פסטה טרייה בעבודת יד מדי יום",
      items: [
        { nameAr: "رافيولي الجبن", nameHe: "רביולי גבינה", descriptionAr: "باستا محشوة بمزيج من الأجبان، كريمة، فطر، جبن البارميزان، بروكلي والبازلاء", descriptionHe: "פסטה ממולאת במיקס גבינות, שמנת, פטריות, גבינת פרמז'ן, ברוקולי ואפונה", price: 59, image: "rivera1232.JPG", tags: ["vegetarian"] },
        { nameAr: "رافيولي البطاطا الحلوة", nameHe: "רביולי בטטה", descriptionAr: "كريمة، فطر، جبن البارميزان، بروكلي والبازلاء", descriptionHe: "שמנת, פטריות, גבינת פרמז'ן ברוקולי ואפונה", price: 59, image: "rivera1228.JPG", tags: ["vegetarian"] },
        { nameAr: "فيتوتشيني بولو", nameHe: "פטוצ'יני פולו", descriptionAr: "باستا طازجة مطبوخة مع كريمة الفطر، شرائح صدر الدجاج وجبن البارميزان", descriptionHe: "פסטה טרייה מבושלת עם שמנת פטריות, רצועות חזה עוף וגבינת פרמז'ן", price: 64, image: "rivera1229.JPG", tags: ["popular"] },
        { nameAr: "بابارديلا غمبري", nameHe: "פפרדלה שרימפס", descriptionAr: "باستا عريضة، صلصة كريمة، جمبري، بروكلي، قبار، شبت وبارميزان", descriptionHe: "פסטה רחבה, רוטב שמנת, שרימפס, ברוקולי, צלפים, שמיר ופרמז'ן", price: 79, image: "rivera1757.JPG", tags: ["seafood"] },
        { nameAr: "تورتيليني مع شيش كباب", nameHe: "טורטליני עם שיש קבב", descriptionAr: "باستا محشوة بلحم الأسادو على طبقة من زبادي الزبدة الساخن", descriptionHe: "פסטה ממולאת בבשר אסאדו על מצע יוגורט חמאה חם", price: 74, image: "rivera1236.JPG", tags: [] },
        { nameAr: "فيتوتشيني بيستو", nameHe: "פטוצ'יני פסטו", descriptionAr: "باستا طازجة مطبوخة بصلصة كريمة البيستو مع صدر الدجاج", descriptionHe: "פסטה טרייה מבושלת ברוטב שמנת פסטו וחזה עוף", price: 64, image: "rivera1794.JPG", tags: ["vegetarian"] },
        { nameAr: "باستا بيني", nameHe: "פסטה פנה", descriptionAr: "باستا بيني طازجة مطبوخة مع كريمة الفطر، شرائح صدر الدجاج وجبن البارميزان", descriptionHe: "פסטה פנה טרייה מבושלת עם שמנת פטריות, רצועות חזה עוף וגבינת פרמז'ן", price: 64, image: "rivera1229.JPG", tags: ["popular"] },
      ],
    },
    {
      id: "desserts",
      nameAr: "الحلويات",
      nameHe: "קינוחים",
      descriptionAr: "حلويات مثل الكيك والشوكولاته والفواكه",
      descriptionHe: "קינוחים כמו עוגות, שוקולד ופירות",
      items: [
        { nameAr: "باناكوتا الفراولة", nameHe: "פנה קוטה תות", descriptionAr: "كريمة الفانيليا المطبوخة، سابليه، تويل توت العليق وتويل السمسم مع صلصة الفراولة", descriptionHe: "שמנת מבושלת וניל, סבלה, טוויל פטל וטוויל שומשום ורוטב תות שדה", price: 30, image: "rivera 21390.JPG", tags: ["creamy"] },
        { nameAr: "كعكة الشوكولاتة الساخنة", nameHe: "עוגת שוקולד חמה", descriptionAr: "كعكة شوكولاتة ساخنة تقدم مع سابليه الشوكولاتة، كرة آيس كريم، تويل الشوكولاتة وصلصة الكراميل المملحة", descriptionHe: "עוגת שוקולד חמה מוגשת לצד סבלה שוקולד, כדור גלידה, טוויל שוקולד ורוטב קרמל מלוח", price: 35, image: "rivera 21876.JPG", tags: ["popular"] },
        { nameAr: "كريم بروليه", nameHe: "קרם ברולה", descriptionAr: "كريم أنجليز غني بالفانيليا مكرمل مع سكر الديميرارا", descriptionHe: "קרם אנגליז עשיר עם וניל מקרמל עם סוכר דמררה", price: 30, image: "rivera 21880.JPG", tags: ["classic"] },
        { nameAr: "تيراميسو", nameHe: "טירמיסו", descriptionAr: "كريم ماسكاربوني غني، فانيليا، بسكويت القهوة الإسبريسو ومسحوق الكاكاو", descriptionHe: "קרם מסקרפונה עשיר, וניל, ביסקוויט קפה אספרסו ואבקת קקאו", price: 35, image: "rivera 21387.JPG", tags: ["classic"] },
        { nameAr: "كعكة الجبن الباسكية", nameHe: "עוגת גבינה באסקית", descriptionAr: "كعكة جبنة كريمية مخبوزة مع كريمة الشوكولاتة", descriptionHe: "עוגת גבינת שמנת אפויה לצד קרם שוקולד", price: 35, image: "rivera 21893.JPG", tags: ["premium"] },
        { nameAr: "كلازوني شوكولاتة", nameHe: "קלצונה שוקולד", descriptionAr: "شوكولاتة ملفوفة بالسكر البودرة", descriptionHe: "שוקולד עטוף בסוכר טחון", price: 35, image: "rivera 21840.JPG", tags: ["sweet"] },
      ],
    },
    {
      id: "kids",
      nameAr: "حصص الاطفال",
      nameHe: "מנות ילדים",
      descriptionAr: "حصص للاطفال من 3 الى 12 سنة",
      descriptionHe: "מנות לילדים מגיל 3 עד 12",
      items: [
        { nameAr: "شنيتسل", nameHe: "שניצל", descriptionAr: "يقدم مع البطاطس المقلية", descriptionHe: "מוגש עם צ'יפס", price: 44, image: "rivera1173.JPG", tags: ["kids"] },
        { nameAr: "بيتزا", nameHe: "פיצה", descriptionAr: "بيتزا مارغريتا صغيرة للأطفال", descriptionHe: "פיצה מרגריטה קטנה לילדים", price: 35, image: "rivera1202.JPG", tags: ["kids"] },
        { nameAr: "معكرونة", nameHe: "פסטה", descriptionAr: "باستا مع صلصة الطماطم", descriptionHe: "פסטה עם רוטב עגבניות", price: 44, image: "rivera1227.JPG", tags: ["kids"] },
      ],
    },
    {
      id: "meat",
      nameAr: "ركن اللحوم",
      nameHe: "פינת הבשר",
      descriptionAr: "قطع لحم فاخرة مشوية بإتقان",
      descriptionHe: "נתחי בשר משובחים צלויים לשלמות",
      items: [
        { nameAr: "انتريكوت", nameHe: "אנטריקוט", descriptionAr: "250 غرام أنتريكوت بلاك أنغوس مع خضروات مشوية، بيوريه، مرق اللحم وكريمة الفطر", descriptionHe: "250 גרם אנטריקוט בלאק אנגוס עם ירקות צלויים, פירה, ציר בקר ושמנת פטריות", price: 136, image: "rivera 21834.JPG", tags: ["signature"] },
        { nameAr: "فيليه نيوكي", nameHe: "פילה ניוקי", descriptionAr: "ستيك فيليه مقطع على طبقة من النيوكي، هليون، بازلاء، سبانخ، ثوم محمص، صلصة كريمة ومرق اللحم", descriptionHe: "סטייק פילה פרוס על מצע ניוקי, אספרגוס, אפונה, תרד, שום קונפי, רוטב שמנת וציר בקר", price: 108, image: "rivera 21836.JPG", tags: ["premium"] },
        { nameAr: "صدر دجاج", nameHe: "חזה עוף", descriptionAr: "صدر دجاج متبل بالأعشاب على الشواية، بيوريه وخضروات مع صلصة كريمة الفطر", descriptionHe: "חזה עוף במרינדת עשבי תיבול על האש, פירה וירקות עם רוטב שמנת פטריות", price: 67, image: "rivera 21822.JPG", tags: ["popular"] },
        { nameAr: "دجاج ستروجانوف", nameHe: "עוף סטרוגנוף", descriptionAr: "شرائح صدر الدجاج مع البصل، الفطر، خردل ديجون، خيار حلو، في صلصة كريمة ومرق اللحم مع الأرز الأبيض", descriptionHe: "רצועות חזה עוף בצל, פטריות, חרדל דיז'ון, מלפפון מתוק, ברוטב שמנת וציר בקר לצד אורז לבן", price: 74, image: "rivera 21838.JPG", tags: [] },
      ],
    },
    {
      id: "fish",
      nameAr: "ركن السمك",
      nameHe: "פינת הדגים",
      descriptionAr: "سمك طازج مشوي بإتقان",
      descriptionHe: "דגים טריים צלויים בשלמות",
      items: [
        { nameAr: "سمك السلمون", nameHe: "סלמון", descriptionAr: "سلمون مخبوز على طبقة من النيوكي المطبوخ مع الكريمة وأوراق السبانخ النيوزيلندي والثوم والطماطم المجففة", descriptionHe: "סלמון אפוי, על מצע ניוקי מבושל עם שמנת עלי תרד ניו-זילנדי, שום ועגבניות שמש", price: 98, image: "rivera 21811.JPG", tags: ["popular"] },
        { nameAr: "روبيان بالليمون", nameHe: "שרימפס לימון", descriptionAr: "11 قطعة جمبري مقلي بالثوم والليمون والزبدة. *يمكن اختيار الجمبري المقلي", descriptionHe: "11 יח' שרימפס מוקפץ בשום לימון וחמאה.\n*ניתן לבחור בשרימפס מטוגן", price: 98, image: "rivera 21850.JPG", tags: ["seafood"] },
        { nameAr: "بيسكو ال فورني", nameHe: "פסקה אל פורנו", descriptionAr: "سمكة لبراك محشوة بالأعشاب والليمون، ملفوفة بورق الخبز ومشوية في الفرن", descriptionHe: "דג לברק ממולא בעשבי תיבול ולימון, עטוף בנייר אפייה ואפוי בתנור", price: 136, image: "rivera 21334.JPG", tags: ["fresh"] },
        { nameAr: "ريزوتو دي بيتشي", nameHe: "ריזוטו די פשי", descriptionAr: "فيليه سمك الدنيس المحمر على البلانشا على طبقة من أرز الريزوتو بالكراث، مزين بالكراث المقلي", descriptionHe: "פילה דניס צרוב על הפלאנצ'ה על מצע אורז ריזוטו כרישה, מקושט בכרישה מטוגנת", price: 116, image: "rivera 21814.JPG", tags: ["chef's choice"] },
      ],
    },
    {
      id: "pizza",
      nameAr: "بيتزا ايطالية",
      nameHe: "פיצה איטלקית",
      descriptionAr: "بيتزا طازجة مصنوعة يدوياً يومياً",
      descriptionHe: "פיצה טרייה בעבודת יד מדי יום",
      items: [
        { nameAr: "بيتزا مارغريتا", nameHe: "פיצה מרגריטה", descriptionAr: "عجينة بيتزا، صلصة طماطم، موزاريلا وأوراق الريحان", descriptionHe: "בצק פיצה רוטב עגבניות מוצרלה ועלי בזיליקום", price: 48, image: "rivera1202.JPG", tags: ["classic", "vegetarian"] },
        { nameAr: "بيتزا فونغي", nameHe: "פיצה פונגי", descriptionAr: "عجينة البيتزا، صلصة بيانكا، موزاريلا، جبن الماعز والفطر الطازج", descriptionHe: "בצק פיצה, רוטב ביאנקה, מוצרלה, גבינת עזים ופטריות טריות", price: 52, image: "rivera1206.JPG", tags: ["vegetarian"] },
        { nameAr: "بيتزا بيبروني", nameHe: "פיצה פפרוני", descriptionAr: "عجينة بيتزا، صلصة طماطم، موزاريلا، شرائح بيبروني، بصل أحمر وزيتون كالاماتا", descriptionHe: "בצק פיצה רוטב עגבניות מוצרלה פרוסות פפרוני בצל סגול וזיתי קלמטה", price: 64, image: "rivera1207.JPG", tags: ["popular"] },
        { nameAr: "بيتزا بوراتا", nameHe: "פיצה בוראטה", descriptionAr: "عجينة البيتزا، صلصة الطماطم، بلسمي مغطاة بأوراق الريحان والثوم", descriptionHe: "בצק פיצה, רוטב עגבניות, בלסמי מכוסה בעלי בזיליקום ושום", price: 64, image: "rivera1208.JPG", tags: ["vegetarian", "premium"] },
        { nameAr: "بيتزا الشاورما", nameHe: "פיצה שווארמה", descriptionAr: "عجينة بيتزا، صلصة طحينة، عمبا، قطع فيليه، أوراق خضراء، بصل أحمر وسماق", descriptionHe: "בצק פיצה רוטב טחינה עמבה נתחי פילה עלים ירוקים בצל סגול וסומאק", price: 69, image: "rivera1211.JPG", tags: ["popular"] },
        { nameAr: "كلزوني الدجاج", nameHe: "קלצונה עוף", descriptionAr: "عجينة البيتزا، صلصة الطماطم، الدجاج، الجامبا، البصل الأحمر، زيتون كالاماتا وجبنة الموزاريلا", descriptionHe: "בצק פיצה, רוטב עגבניות, עוף, שרימפס, בצל סגול, זיתי קלמטה וגבינת מוצרלה", price: 54, image: "rivera 21845.JPG", tags: ["popular"] },
        { nameAr: "كالزون مدخن", nameHe: "קלצונה מעושנת", descriptionAr: "عجينة بيتزا محشوة بصلصة الطماطم وجبن الموزاريلا والإوز والبسطرمة المدخنة", descriptionHe: "בצק פיצה ממולא עם רוטב עגבניות גבינת מוצרלה אווז ופסטרמה מעושנים", price: 58, image: "rivera1778.JPG", tags: [] },
      ],
    },
    {
      id: "salads",
      nameAr: "الحديقة الخضراء",
      nameHe: "הגן הירוק",
      descriptionAr: "سلطات طازجة",
      descriptionHe: "סלטים טריים",
      items: [
        { nameAr: "تبولة نابولي", nameHe: "טאבולה נאפולי", descriptionAr: "بقدونس مفروم، بصل أحمر وأخضر، نعناع، برغل سميك، مكسرات محمصة، طماطم على طبقة من اللبنة", descriptionHe: "פטרוזיליה קצוצה, בצל אדום וירוק, נענא, בורגול עבה, אגוזים קלויים, עגבניות על מצע לבנה", price: 48, image: "rivera1118.JPG", tags: ["vegetarian", "fresh"] },
        { nameAr: "سلطة سيزر", nameHe: "סלט סיזר", descriptionAr: "قلوب خس، بصل احمر، بندورة مجففة، ارضي شوك مقلي، تقدم مع صلصة ايولي السيزر", descriptionHe: "לבבות חסה, בצל סגול, עגבניות מיובשות, ארטישוק מטוגן, מוגש עם רוטב איולי סיזר", price: 44, image: "rivera1130.JPG", tags: ["classic"] },
        { nameAr: "سلطة حلومي", nameHe: "סלט חלומי", descriptionAr: "أوراق مشكلة، تفاح، جزر، خيار، بصل أحمر، جوز، جبن حلومي مقلي في صلصة الخل الحمضي", descriptionHe: "עלים מעורבים, תפוח, גזר, מלפפון, בצל סגול, אגוזים, גבינת חלומי מטוגנת ברוטב ויניגרט הדרים", price: 54, image: "rivera1142.JPG", tags: ["vegetarian", "healthy"] },
        { nameAr: "سلطة بوراتا", nameHe: "סלט בוראטה", descriptionAr: "جبن موزاريلا محشو بجبن الكريمة، طماطم، بصل أحمر، زيتون كالاماتا، زيت الريحان، بيستو، فستق وخل بلسمي", descriptionHe: "גבינת מוצרלה ממולאת בגבינת שמנת, עגבניות, בצל סגול, זיתי קלמטה, שמן בזילקום, פסטו, פיסטוק וחומץ בלסמי", price: 54, image: "rivera1689.JPG", tags: ["vegetarian", "premium"] },
        { nameAr: "سلطة بانزانيلا", nameHe: "סלט פנזנלה", descriptionAr: "طماطم، خيار، بصل أحمر، زيتون كالاماتا، خبز محمص، أوراق ريحان مقلية، جبن موزاريلا طازج، خل بلسميك وزيت زيتون", descriptionHe: "עגבניות, מלפפון, בצל סגול, זיתי קלמטה, לחם קלוי, עלי בזיליקום מטוגנים, גבינת מוצרלה טרייה, חומץ בלסמי ושמן זית", price: 48, image: "rivera1152.JPG", tags: ["vegetarian", "fresh"] },
      ],
    },
  ],
};

async function seed() {
  console.log("🌱 Seeding menu data...");

  await db.delete(menuItem);
  await db.delete(menuCategory);

  for (const [catIndex, cat] of menuData.categories.entries()) {
    console.log(`  📁 Creating category: ${cat.nameAr}`);
    
    await db.insert(menuCategory).values({
      id: cat.id,
      nameAr: cat.nameAr,
      nameHe: cat.nameHe,
      descriptionAr: cat.descriptionAr,
      descriptionHe: cat.descriptionHe,
      sortOrder: catIndex,
    });

    for (const [itemIndex, item] of cat.items.entries()) {
      const itemData = item as Record<string, unknown>;
      await db.insert(menuItem).values({
        categoryId: cat.id,
        nameAr: item.nameAr,
        nameHe: item.nameHe,
        descriptionAr: (itemData.descriptionAr as string) ?? null,
        descriptionHe: (itemData.descriptionHe as string) ?? null,
        price: item.price,
        image: item.image || null,
        tags: item.tags || [],
        sortOrder: itemIndex,
      });
    }
    
    console.log(`    ✅ Added ${cat.items.length} items`);
  }

  console.log("✨ Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
