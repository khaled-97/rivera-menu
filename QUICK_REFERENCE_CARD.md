# 📋 Quick Reference Card - بطاقة مرجعية سريعة

---

## For Manager | للمدير

### 🔐 Login | تسجيل الدخول
```
URL: http://localhost:5174/dashboard
Password: rivera2026
```

---

### ➕ Add New Item | إضافة صنف جديد

**Required Fields | الحقول المطلوبة:**
```
✅ اسم الصنف (عربي)
✅ السعر
✅ الفئة
```

**Optional | اختياري:**
```
⭕ שם המנה (עברית)
⭕ Item Name (English)
⭕ الوصف
⭕ اسم ملف الصورة
⭕ الوسوم
```

---

### 🖼️ Picture Names | أسماء الصور

**✅ Good:**
```
grilled-salmon.jpg
chocolate-cake.jpg
margherita-pizza.jpg
```

**❌ Bad:**
```
IMG_1234.jpg
صورة الطبق.jpg
my photo (2).jpg
```

**Rule:** English lowercase + hyphens + .jpg

---

### 📤 Export & Send | تصدير وإرسال

**Steps:**
1. Click **"تصدير البيانات"**
2. Save JSON file
3. Email to programmer:
   - ✅ JSON file
   - ✅ New pictures

---

## For Programmer | للمبرمج

### 📥 Receive Update

**You'll get:**
```
✅ menu-data-YYYY-MM-DD.json
✅ new-dish-1.jpg
✅ new-dish-2.jpg
```

---

### 🔄 Update Process

**From Phone (GitHub App):**
```
1. Update: menu/src/data/menuData.js
2. Upload: menu/public/images/
3. Commit & Push
4. Done! ✅
```

**From Computer:**
```bash
cd /home/password/rivera/menu
git pull

# Update menuData.js with JSON content
# Copy pictures to public/images/

git add .
git commit -m "Update menu - [date]"
git push
```

---

### 📁 File Locations

```
menu/
├── src/
│   └── data/
│       └── menuData.js          ← Update this
└── public/
    └── images/
        ├── grilled-salmon.jpg   ← Add pictures here
        └── ...
```

---

## ⏱️ Timeline | الجدول الزمني

```
Manager exports → 2 min
        ↓
Email to programmer → instant
        ↓
Programmer updates → 5-10 min
        ↓
Auto-deployment → 1-2 min
        ↓
Live! ✅
```

**Total: ~10-15 minutes**

---

## ✅ Checklists | قوائم التحقق

### Manager Checklist:
```
□ Made all changes
□ Exported JSON
□ Collected pictures
□ Named pictures correctly
□ Sent email with attachments
```

### Programmer Checklist:
```
□ Updated menuData.js
□ Added pictures to public/images/
□ Committed to GitHub
□ Verified deployment
```

---

## 🆘 Quick Fixes | حلول سريعة

### Picture not showing:
```
✓ Check filename matches exactly
✓ Check file in public/images/
✓ Check file format (JPG/PNG)
✓ Clear browser cache
```

### Menu not updating:
```
✓ Check GitHub committed
✓ Check deployment finished
✓ Clear browser cache (Ctrl+F5)
✓ Check correct URL
```

---

## 📞 Contact | التواصل

**Manager → Programmer:**
- Email with JSON + pictures
- WhatsApp for urgent updates
- Include screenshots if problem

---

## 💾 Backup | النسخ الاحتياطي

**Manager:**
- Keep original pictures
- Keep exported JSON files
- Export after each session

**Programmer:**
- Git history (automatic)
- Can rollback anytime

---

## 🎯 Remember | تذكر

### Manager:
- ✅ Test before exporting
- ✅ Use English for picture names
- ✅ Send pictures with JSON
- ✅ Be specific in email

### Programmer:
- ✅ Check picture filenames
- ✅ Test locally if possible
- ✅ Confirm when live
- ✅ Keep manager updated

---

## 📊 Common Tasks | المهام الشائعة

### Add dish with picture:
```
1. Add in dashboard
2. Note picture name: "dish-name.jpg"
3. Export JSON
4. Send JSON + picture
```

### Update price only:
```
1. Edit item
2. Change price
3. Export JSON
4. Send JSON (no pictures needed)
```

### Delete old item:
```
1. Click delete
2. Confirm
3. Export JSON
4. Send JSON
```

### Add new category:
```
1. Go to Categories tab
2. Fill form
3. Export JSON
4. Send JSON
```

---

## 🔢 Data Structure | هيكل البيانات

```javascript
{
  id: 21,
  nameAr: "سلمون مشوي",      // Arabic (Main)
  nameHe: "סלמון צלוי",       // Hebrew
  name: "Grilled Salmon",     // English (ID)
  descriptionAr: "...",
  descriptionHe: "...",
  description: "...",
  price: 85,
  categoryId: "seafood",
  image: "grilled-salmon.jpg",
  tags: ["popular"]
}
```

---

## 🌐 URLs | الروابط

**Dashboard:**
```
Local: http://localhost:5174/dashboard
Live: https://your-site.com/dashboard
```

**Public Menu:**
```
Local: http://localhost:5174/
Live: https://your-site.com/
```

---

## 🎓 Tips | نصائح

1. **Batch updates** - Do multiple changes, then export once
2. **Test first** - View menu before exporting
3. **Clear names** - Use descriptive picture names
4. **Communicate** - Tell what changed
5. **Backup** - Keep copies of everything

---

**Print this card and keep it handy! 📌**
**اطبع هذه البطاقة واحتفظ بها! 📌**
