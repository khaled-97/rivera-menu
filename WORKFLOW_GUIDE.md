# Rivera Menu Update Workflow

## 📱 Simple Update Process

### For Manager (المدير)

#### عندما تريد تحديث القائمة | When You Want to Update the Menu:

1. **افتح لوحة التحكم | Open Dashboard**
   ```
   http://localhost:5174/dashboard
   أو
   https://your-deployed-url.com/dashboard
   ```

2. **سجل الدخول | Login**
   - كلمة المرور: `rivera2026`

3. **قم بالتعديلات | Make Your Changes**
   - أضف أصناف جديدة
   - عدّل الأسعار
   - احذف أصناف قديمة
   - أضف فئات جديدة

4. **عند إضافة صنف جديد بصورة | When Adding Item with Picture:**
   - اكتب اسم الصورة في حقل "اسم ملف الصورة"
   - مثال: `grilled-salmon.jpg`
   - **مهم:** تذكر اسم الملف بالضبط!

5. **عند الانتهاء | When Done:**
   - انقر على زر **"تصدير البيانات"** في الأعلى
   - سيتم تنزيل ملف مثل: `menu-data-2026-02-14.json`

6. **أرسل للمبرمج | Send to Programmer:**
   
   **📧 Email:**
   ```
   To: [programmer email]
   Subject: تحديث القائمة - Menu Update
   
   Attachments:
   ✅ menu-data-2026-02-14.json
   ✅ grilled-salmon.jpg (if new)
   ✅ new-pizza.jpg (if new)
   ✅ ... (any other new pictures)
   ```

   **Or WhatsApp/Telegram:**
   - Send the JSON file
   - Send all new pictures
   - Mention which pictures go with which items

---

### For Programmer (المبرمج)

#### When You Receive Update Email:

**📥 What You'll Receive:**
- ✅ JSON file: `menu-data-2026-02-14.json`
- ✅ New pictures (if any): `dish-name.jpg`

#### Update Process (Can Do From Phone!):

##### **Option A: From Phone (GitHub Mobile App)**

1. **Download Files from Email**
   - Save JSON file
   - Save all pictures

2. **Open GitHub App**
   - Go to `rivera` repository
   - Navigate to `menu/src/data/`

3. **Update menuData.js:**
   - Open `menuData.js`
   - Click edit (pencil icon)
   - Open the JSON file manager sent
   - Copy the `categories` array content
   - Replace the old `categories` array
   - Commit: "Update menu - [date]"

4. **Upload Pictures:**
   - Navigate to `menu/public/images/`
   - Click "Add file" → "Upload files"
   - Upload all new pictures
   - Commit: "Add menu images - [date]"

5. **Done!** ✅
   - Auto-deployment will handle the rest
   - Menu goes live in 1-2 minutes

---

##### **Option B: From Computer**

```bash
# 1. Pull latest changes
cd /home/password/rivera/menu
git pull

# 2. Update menuData.js
# Open the JSON file manager sent
# Copy content and update src/data/menuData.js

# 3. Add new pictures
# Copy new pictures to: public/images/

# 4. Test locally (optional)
npm run dev
# Check: http://localhost:5174

# 5. Commit and push
git add .
git commit -m "Update menu - [date]"
git push

# Done! ✅
```

---

## 📋 Quick Checklist

### Manager Checklist:
```
□ Made all changes in dashboard
□ Tested by viewing menu (click "عرض القائمة")
□ Exported JSON file
□ Collected all new pictures
□ Named pictures correctly (match dashboard filenames)
□ Sent email with JSON + pictures
```

### Programmer Checklist:
```
□ Received JSON + pictures
□ Updated menuData.js with new JSON content
□ Added new pictures to public/images/
□ Committed changes to GitHub
□ Verified deployment successful
□ Checked live menu
```

---

## 🖼️ Picture Guidelines

### For Manager:

**Good Picture Names:**
```
✅ grilled-salmon.jpg
✅ margherita-pizza.jpg
✅ chocolate-cake.jpg
```

**Bad Picture Names:**
```
❌ IMG_1234.jpg
❌ صورة جديدة.jpg (Arabic characters)
❌ my photo (2).jpg (spaces and special chars)
```

**Picture Requirements:**
- Format: JPG or PNG
- Size: Not too large (under 5MB)
- Clear, well-lit photo
- Shows the dish nicely

---

## ⏱️ Timeline

```
Manager sends update
        ↓
5-10 minutes: You update GitHub
        ↓
1-2 minutes: Auto-deployment
        ↓
Live! Everyone sees new menu ✅
```

**Total time: ~10-15 minutes**

---

## 🔧 Troubleshooting

### Problem: Picture not showing on menu

**Check:**
1. Picture is in `public/images/` folder
2. Filename in JSON matches exactly (case-sensitive!)
3. Picture format is JPG or PNG
4. Deployment completed successfully

**Fix:**
```javascript
// In menuData.js, check:
image: "grilled-salmon.jpg"  // Must match file in public/images/
```

---

### Problem: Menu not updating

**Check:**
1. Changes committed to GitHub
2. Deployment finished (check Vercel/Netlify dashboard)
3. Clear browser cache (Ctrl+F5)
4. Check correct URL

---

### Problem: JSON file won't import

**Check:**
1. Valid JSON format
2. All brackets closed properly
3. No trailing commas
4. Proper structure maintained

**Quick Fix:**
- Use the exported JSON as-is
- Don't manually edit unless necessary

---

## 📞 Contact

**If something goes wrong:**
- Manager → Contact Programmer
- Include: Screenshot + Description
- Send: Original JSON file

---

## 💡 Tips

### For Manager:
- ✅ Export JSON after every session
- ✅ Keep backup of pictures
- ✅ Test changes before exporting
- ✅ Use descriptive picture names

### For Programmer:
- ✅ Keep GitHub app on phone
- ✅ Enable notifications for deployments
- ✅ Backup old menuData.js before replacing
- ✅ Optimize pictures before uploading (optional)

---

## 🎯 Best Practices

1. **Regular Updates:**
   - Manager can make changes anytime
   - Send updates once per day (or as needed)
   - Batch multiple changes together

2. **Picture Management:**
   - Manager keeps original high-quality pictures
   - You can optimize/resize if needed
   - Name pictures before taking them

3. **Communication:**
   - Clear subject lines in emails
   - List what changed in the email
   - Confirm when live

---

## 📊 Example Email Template

```
Subject: تحديث القائمة - Menu Update - Feb 14

Hi,

I've updated the menu with the following changes:

Added Items:
- Grilled Salmon (سلمون مشوي)
- Chocolate Lava Cake (كيك الشوكولاتة)

Updated Prices:
- Margherita Pizza: 45 → 48

Removed Items:
- Old Pasta Dish

Attached:
- menu-data-2026-02-14.json
- grilled-salmon.jpg
- chocolate-cake.jpg

Please update when you can.

Thanks!
```

---

## 🚀 Future Improvements

When ready, we can add:
- [ ] Direct picture upload in dashboard
- [ ] Automatic GitHub updates (no manual work)
- [ ] Real-time updates (no deployment wait)
- [ ] Image optimization automation
- [ ] Preview before publishing

For now, this manual process keeps it simple and reliable! ✅

---

**This workflow is designed to be:**
- ✅ Simple
- ✅ Fast
- ✅ Mobile-friendly
- ✅ Reliable
- ✅ No monthly costs

Happy menu updating! 🍝
