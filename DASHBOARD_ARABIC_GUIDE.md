# دليل لوحة التحكم - Rivera Dashboard Guide

## 🎯 نظرة عامة | Overview

لوحة التحكم الآن **بالكامل باللغة العربية** مع دعم كامل لثلاث لغات في القائمة.

The dashboard is now **fully in Arabic** with complete support for three languages in the menu.

---

## 📋 هيكل الحقول | Field Structure

### عند إضافة صنف جديد | When Adding a New Item

#### الحقول المطلوبة | Required Fields:
- **اسم الصنف (عربي)** - Arabic Name ✅ Required
- **السعر** - Price ✅ Required  
- **الفئة** - Category ✅ Required

#### الحقول الاختيارية | Optional Fields:
- **שם המנה (עברית)** - Hebrew Name
- **Item Name (English - ID)** - English name for internal use
- **الوصف (عربي)** - Arabic Description
- **תיאור (עברית)** - Hebrew Description
- **Description (English - ID)** - English description for internal use
- **اسم ملف الصورة** - Image filename
- **الوسوم** - Tags

---

## 🗂️ تنظيم الحقول | Field Organization

### القسم الأول: الأسماء | Section 1: Names
```
┌─────────────────────────────────┐
│ اسم الصنف (عربي) *             │  ← Main (Arabic)
│ بيتزا مارغريتا                 │
├─────────────────────────────────┤
│ שם המנה (עברית)                │  ← Hebrew
│ פיצה מרגריטה                   │
├─────────────────────────────────┤
│ Item Name (English - ID)       │  ← Internal/ID
│ Margherita Pizza               │
└─────────────────────────────────┘
```

### القسم الثاني: الأوصاف | Section 2: Descriptions
```
┌─────────────────────────────────┐
│ الوصف (عربي)                   │  ← Main (Arabic)
│ موزاريلا طازجة، طماطم، ريحان   │
├─────────────────────────────────┤
│ תיאור (עברית)                  │  ← Hebrew
│ מוצרלה טרייה, עגבניות, בזיליקום│
├─────────────────────────────────┤
│ Description (English - ID)     │  ← Internal/ID
│ Fresh mozzarella, tomatoes...  │
└─────────────────────────────────┘
```

### القسم الثالث: التفاصيل | Section 3: Details
```
┌─────────────────────────────────┐
│ السعر *                         │
│ 45                              │
├─────────────────────────────────┤
│ الفئة *                         │
│ بيتزا وكالزوني                 │
├─────────────────────────────────┤
│ اسم ملف الصورة                 │
│ pizza-margherita.jpg            │
├─────────────────────────────────┤
│ الوسوم                          │
│ نباتي، الأكثر طلباً             │
└─────────────────────────────────┘
```

---

## 🌐 كيف تعمل اللغات | How Languages Work

### عرض القائمة للعملاء | Menu Display for Customers

#### الوضع العربي | Arabic Mode:
- يعرض: **اسم الصنف (عربي)**
- يعرض: **الوصف (عربي)**

#### الوضع العبري | Hebrew Mode:
- يعرض: **שם המנה (עברית)**
- يعرض: **תיאור (עברית)**

#### الاحتياطي | Fallback:
إذا كان الحقل فارغاً، يعرض النص العربي أو الإنجليزي

If a field is empty, it shows Arabic or English text

---

## 📝 أمثلة عملية | Practical Examples

### مثال 1: إضافة طبق جديد | Example 1: Adding a New Dish

```
✏️ املأ النموذج | Fill the Form:

اسم الصنف (عربي): سلمون مشوي
שם המנה (עברית): סלמון צלוי
Item Name (English - ID): Grilled Salmon

الوصف (عربي): سلمون طازج مشوي مع الخضار
תיאור (עברית): סלמון טרי צלוי עם ירקות
Description (English - ID): Fresh grilled salmon with vegetables

السعر: 85
الفئة: أسماك
اسم ملف الصورة: grilled-salmon.jpg
الوسوم: الأكثر طلباً
```

### النتيجة | Result:
```
✅ العربية: سلمون مشوي - سلمون طازج مشوي مع الخضار
✅ עברית: סלמון צלוי - סלמון טרי צלוי עם ירקות
✅ English ID: grilled-salmon (internal reference)
```

---

### مثال 2: إضافة فئة جديدة | Example 2: Adding a New Category

```
✏️ املأ النموذج | Fill the Form:

اسم الفئة (عربي): حلويات
שם הקטגוריה (עברית): קינוחים
Category Name (English - ID): Desserts

معرف الفئة (ID): desserts (تلقائي)

الوصف (عربي): حلويات إيطالية تقليدية
תיאור (עברית): קינוחים איטלקיים מסורתיים
Description (English - ID): Traditional Italian desserts
```

### النتيجة | Result:
```
✅ العربية: حلويات - حلويات إيطالية تقليدية
✅ עברית: קינוחים - קינוחים איטלקיים מסורתיים
✅ ID: desserts (for system reference)
```

---

## 🎨 المزايا | Features

### ✅ ما تم تحسينه | What's Improved

1. **لوحة تحكم عربية بالكامل**
   - All dashboard interface in Arabic
   - جميع الأزرار والعناوين بالعربية

2. **ثلاث لغات منفصلة**
   - حقول منفصلة للعربية والعبرية والإنجليزية
   - Separate fields for Arabic, Hebrew, and English

3. **تنظيم واضح**
   - الحقول مقسمة بخطوط فاصلة
   - Fields organized with dividers

4. **معرّف إنجليزي منفصل**
   - حقل English-ID للاستخدام الداخلي
   - English-ID field for internal use

5. **عرض منظم**
   - يعرض جميع اللغات في قائمة الأصناف
   - Shows all languages in item list

---

## 🔄 سير العمل | Workflow

### إضافة صنف جديد | Adding a New Item

1. اذهب إلى: `http://localhost:5174/dashboard`
2. تسجيل الدخول: `rivera2026`
3. انقر على تبويب "أصناف القائمة"
4. املأ النموذج:
   - ✅ **اسم عربي** (مطلوب)
   - ✅ **السعر** (مطلوب)
   - ✅ **الفئة** (مطلوب)
   - ⭕ اسم عبري (اختياري)
   - ⭕ اسم إنجليزي (اختياري - للمعرف)
   - ⭕ أوصاف بالثلاث لغات
5. انقر "إضافة صنف"
6. اذهب إلى "عرض القائمة" للمشاهدة

### تعديل صنف موجود | Editing an Existing Item

1. ابحث عن الصنف في القائمة
2. انقر "تعديل"
3. عدّل الحقول المطلوبة
4. انقر "تحديث الصنف"

---

## 💡 نصائح مهمة | Important Tips

### ✅ افعل | Do:
- املأ الاسم العربي دائماً (مطلوب)
- أضف الاسم العبري للدعم الكامل
- استخدم الاسم الإنجليزي للمعرف الداخلي
- اختبر اللغتين بعد الإضافة

### ❌ لا تفعل | Don't:
- لا تترك الاسم العربي فارغاً
- لا تخلط اللغات في حقل واحد
- لا تنسَ حفظ نسخة احتياطية

---

## 🗂️ هيكل البيانات | Data Structure

```javascript
{
  id: 21,
  name: "Grilled Salmon",           // English (ID)
  nameAr: "سلمون مشوي",              // Arabic (Main)
  nameHe: "סלמון צלוי",              // Hebrew
  description: "Fresh grilled...",   // English (ID)
  descriptionAr: "سلمون طازج...",    // Arabic (Main)
  descriptionHe: "סלמון טרי...",     // Hebrew
  price: 85,
  categoryId: "seafood",
  image: "grilled-salmon.jpg",
  tags: ["popular"]
}
```

---

## 🔧 التوافق | Compatibility

### الحقول القديمة | Legacy Fields:
- `nameIt` → يُحفظ تلقائياً من `nameAr`
- `nameIt` is automatically saved from `nameAr`

### التوافق العكسي | Backward Compatibility:
- الأصناف القديمة تعمل بشكل طبيعي
- Old items work normally
- يتم تحويل `nameIt` إلى `nameAr` تلقائياً
- `nameIt` is automatically converted to `nameAr`

---

## 📞 الدعم | Support

### مشاكل شائعة | Common Issues:

**المشكلة:** الصنف لا يظهر
- **الحل:** تأكد من ملء الاسم العربي والسعر والفئة

**المشكلة:** اللغة العبرية لا تظهر
- **الحل:** املأ حقل "שם המנה (עברית)"

**المشكلة:** المعرف غير صحيح
- **الحل:** استخدم حروف إنجليزية صغيرة بدون مسافات

---

## 🎓 ملخص سريع | Quick Summary

### للاستخدام اليومي | For Daily Use:

1. **الحد الأدنى المطلوب:**
   - اسم عربي ✅
   - سعر ✅
   - فئة ✅

2. **للدعم الكامل:**
   - أضف الاسم العبري
   - أضف الأوصاف بالثلاث لغات

3. **للتنظيم:**
   - استخدم الاسم الإنجليزي كمعرف
   - أضف وسوم مناسبة

---

**الآن لوحة التحكم جاهزة بالكامل! 🎉**

**The dashboard is now fully ready! 🎉**
