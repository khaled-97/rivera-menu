# Multi-Language System Guide

## How It Works

The Rivera menu supports **3 languages**: English, Arabic, and Hebrew (currently Arabic and Hebrew are implemented).

### Current Behavior

The system now has **smart fallback logic**:

1. **First**, it tries to find a translation in the `translations.js` file
2. **If no translation exists**, it uses the data from the menu item/category itself
3. For **new items/categories** added via dashboard, it will automatically display correctly

### Language Display Logic

#### For Categories:
- **Arabic (ar)**: Shows `nameIt` field (Italian/Arabic name) if available, otherwise shows `name`
- **Hebrew (he)**: Shows `name` field (English name)
- **With translation**: Shows the translated version from `translations.js`

#### For Menu Items:
- **Arabic (ar)**: Shows `nameIt` field if available, otherwise shows `name`
- **Hebrew (he)**: Shows `name` field
- **With translation**: Shows the translated version from `translations.js`

#### For Tags:
- Shows translated tag if available in `translations.js`
- If no translation, shows the tag name as-is

## Adding New Items/Categories via Dashboard

### ✅ What Works Automatically

When you add a new item or category through the dashboard:

1. **English name** goes in the `name` field
2. **Italian/Arabic name** goes in the `nameIt` field
3. The menu will automatically display:
   - English when viewing in Hebrew mode
   - Italian/Arabic when viewing in Arabic mode

**Example:**
```javascript
// You add via dashboard:
name: "Grilled Salmon"
nameIt: "سلمون مشوي"

// Result on menu:
// Hebrew mode: "Grilled Salmon"
// Arabic mode: "سلمون مشوي"
```

### 🔧 For Full Translation Support

If you want **proper translations** for all languages (not just fallbacks), you need to add entries to the translations file.

## Adding Translations Manually

### Location
File: `/src/data/translations.js`

### For a New Category

Add to both `ar` and `he` sections:

```javascript
// In translations.ar.categories:
newtesting: {
  name: "الفئة الجديدة",
  description: "وصف الفئة الجديدة",
},

// In translations.he.categories:
newtesting: {
  name: "קטגוריה חדשה",
  description: "תיאור הקטגוריה החדשה",
},
```

### For a New Menu Item

Add to both `ar` and `he` sections using the item's ID:

```javascript
// In translations.ar.items:
21: {  // Use the item ID number
  name: "اسم الطبق بالعربية",
  description: "وصف الطبق بالعربية",
},

// In translations.he.items:
21: {
  name: "שם המנה בעברית",
  description: "תיאור המנה בעברית",
},
```

### For New Tags

```javascript
// In translations.ar.tags:
"new-tag": "علامة جديدة",

// In translations.he.tags:
"new-tag": "תג חדש",
```

## Recommended Workflow

### Option 1: Quick & Simple (Current System)
**Best for**: Quick updates, small menus, bilingual setup

1. Add items via dashboard
2. Fill in both `name` (English) and `nameIt` (Arabic/Italian)
3. Items display correctly in both languages automatically
4. No need to edit translation files

**Pros:**
- ✅ Fast and easy
- ✅ No coding required
- ✅ Works immediately

**Cons:**
- ⚠️ Only supports 2 languages (English + one other)
- ⚠️ Less control over exact translations

### Option 2: Full Translation System
**Best for**: Multiple languages, professional translations, large menus

1. Add items via dashboard (get the item ID)
2. Manually add translations to `translations.js`
3. Supports unlimited languages
4. Full control over all translations

**Pros:**
- ✅ Supports many languages
- ✅ Professional translation control
- ✅ Separate content from data

**Cons:**
- ⚠️ Requires editing code
- ⚠️ More maintenance
- ⚠️ Need to know item IDs

## Best Practices

### 1. Use Consistent Naming
```javascript
// Good
name: "Grilled Salmon"
nameIt: "سلمون مشوي"

// Avoid mixing languages
name: "Salmon مشوي"  // Don't do this
```

### 2. Fill Both Fields
Always fill both `name` and `nameIt` when adding items:
- `name`: English name
- `nameIt`: Arabic/Italian/Hebrew name

### 3. Use Standard Tags
Stick to existing tags when possible:
- vegetarian
- popular
- chef's choice
- signature
- premium
- shareable
- dessert
- sweet
- refreshing

These already have translations!

### 4. Test Both Languages
After adding items:
1. View the menu
2. Switch between languages using the language switcher
3. Verify both languages display correctly

## Troubleshooting

### Problem: Category shows as "categories.xyz.name"

**Cause:** Translation not found AND `nameIt` field is empty

**Solution:**
1. Edit the category in dashboard
2. Fill in the `nameIt` field with the Arabic/Italian name
3. Save

OR add translation to `translations.js`

### Problem: Item name shows in wrong language

**Cause:** `nameIt` field not filled or translation missing

**Solution:**
1. Edit the item in dashboard
2. Fill in both `name` and `nameIt` fields
3. Save

### Problem: Tag shows as "tags.xyz"

**Cause:** Tag doesn't have a translation

**Solution:**
Add the tag translation to `translations.js`:
```javascript
tags: {
  "your-tag": "الترجمة",
}
```

## Future Enhancements

### Potential Improvements:
1. **Dashboard Translation Editor**
   - Add translations directly in dashboard
   - No need to edit code files

2. **Multiple Language Fields**
   - `nameEn`, `nameAr`, `nameHe`, `nameIt`
   - Support unlimited languages

3. **Translation Import/Export**
   - Export translations to spreadsheet
   - Send to translators
   - Import back to system

4. **Auto-Translation**
   - Integration with Google Translate API
   - Automatic translation suggestions
   - Human review and editing

5. **Language-Specific Pricing**
   - Different prices per language/region
   - Currency conversion

## Example: Complete Workflow

### Adding a New Dish

**Step 1: Add via Dashboard**
```
Name: Margherita Pizza
Italian Name: Pizza Margherita
Description: Fresh mozzarella, tomatoes, basil
Price: 45
Category: pizza
Tags: vegetarian, popular
```

**Step 2: Test**
- View menu in Arabic → Shows "Pizza Margherita"
- View menu in Hebrew → Shows "Margherita Pizza"
- ✅ Works automatically!

**Step 3 (Optional): Add Full Translations**

If you want custom Arabic/Hebrew translations:

Edit `translations.js`:
```javascript
// Arabic
items: {
  21: {
    name: "بيتزا مارغريتا",
    description: "موزاريلا طازجة، طماطم، ريحان",
  },
}

// Hebrew
items: {
  21: {
    name: "פיצה מרגריטה",
    description: "מוצרלה טרייה, עגבניות, בזיליקום",
  },
}
```

Now you have 3 languages:
- English: "Margherita Pizza"
- Arabic: "بيتزا مارغريتا"
- Hebrew: "פיצה מרגריטה"

## Summary

✅ **New items work automatically** - Just fill `name` and `nameIt` fields
✅ **No coding required** for basic bilingual support
✅ **Optional translations** for professional multi-language support
✅ **Fallback system** ensures nothing breaks
✅ **Easy to maintain** and update

The system is designed to be flexible - use it simply for quick updates, or add full translations for professional multi-language support!
