# Multi-Language Quick Reference

## 🎯 The Simple Way (Recommended)

When adding items/categories in the dashboard:

### Fill These Two Fields:

1. **Name (English)** - Required
   - Example: `"Grilled Salmon"`
   - Shows in: Hebrew mode

2. **Name (Arabic/Italian)** - Optional but recommended
   - Example: `"سلمون مشوي"` or `"Salmone alla Griglia"`
   - Shows in: Arabic mode

### That's It! ✅

The menu will automatically:
- Show English name in Hebrew mode
- Show Arabic/Italian name in Arabic mode
- Fall back to English if Arabic/Italian is empty

---

## 📋 Quick Examples

### Example 1: New Pizza
```
✏️ Dashboard Form:
Name: Quattro Formaggi Pizza
Arabic/Italian Name: بيتزا الأجبان الأربعة
Description: Four cheese blend with herbs
Price: 52

✅ Result:
Hebrew mode → "Quattro Formaggi Pizza"
Arabic mode → "بيتزا الأجبان الأربعة"
```

### Example 2: New Category
```
✏️ Dashboard Form:
Name: Desserts
Arabic/Italian Name: حلويات
Description: Sweet endings to your meal

✅ Result:
Hebrew mode → "Desserts"
Arabic mode → "حلويات"
```

---

## 🔄 Language Switcher

Users can switch between languages using the button in the top-right corner:
- Shows "العربية" when in Hebrew mode (click to switch to Arabic)
- Shows "עברית" when in Arabic mode (click to switch to Hebrew)

---

## ⚠️ Common Issues & Fixes

### Issue: Category shows "categories.xyz.name"
**Fix:** Edit the category and fill in the "Arabic/Italian Name" field

### Issue: Item shows in wrong language
**Fix:** Make sure both name fields are filled correctly

### Issue: Tag not translated
**Fix:** Use standard tags (vegetarian, popular, etc.) - they're already translated!

---

## 💡 Pro Tips

1. **Always fill both name fields** for best results
2. **Use existing tags** when possible - they have translations
3. **Test both languages** after adding items
4. **Export backups** before making major changes
5. **Keep names consistent** - don't mix languages in one field

---

## 🚀 Advanced: Full Translation System

Want more control? Edit `/src/data/translations.js`:

```javascript
// Add to translations.ar.items:
21: {
  name: "اسم مخصص بالعربية",
  description: "وصف مخصص بالعربية",
}

// Add to translations.he.items:
21: {
  name: "שם מותאם אישית בעברית",
  description: "תיאור מותאם אישית בעברית",
}
```

This gives you 3 languages: English, Arabic, and Hebrew!

---

## 📞 Need More Help?

See the full guide: `MULTILANGUAGE_GUIDE.md`
