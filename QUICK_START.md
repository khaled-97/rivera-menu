# Quick Start Guide - Rivera Dashboard

## 🚀 Getting Started

### 1. Start the Development Server
```bash
cd /home/password/rivera/menu
npm run dev
```

### 2. Access the Application

**Public Menu:** http://localhost:5174/
- View the menu as customers see it
- Switch between English and Arabic
- Browse categories and items

**Manager Dashboard:** http://localhost:5174/dashboard
- Password: `rivera2026`
- Add, edit, and delete menu items
- Manage categories
- Export/import data

### 3. Dashboard Features

#### Menu Items Tab
- **Add Items:** Fill the form on the left and click "Add Item"
- **Edit Items:** Click "Edit" on any item, modify, and click "Update Item"
- **Delete Items:** Click "Delete" on any item
- **Filter:** Use the category dropdown to filter items
- **Tags:** Add tags like "vegetarian", "popular", "chef's choice"

#### Categories Tab
- **Add Categories:** Fill the form and click "Add Category"
- **Edit Categories:** Click "Edit" on any category
- **Delete Categories:** Only empty categories can be deleted
- **Auto ID:** Category IDs are auto-generated from names

#### Data Management
- **Export:** Download menu data as JSON backup
- **Import:** Upload a JSON file to restore menu
- **Reset:** Restore original default menu
- **Auto-Save:** All changes save automatically to localStorage

### 4. Making Changes

1. Go to dashboard: http://localhost:5174/dashboard
2. Login with password: `rivera2026`
3. Make your changes (add/edit/delete items or categories)
4. **Important for multi-language**: Fill both name fields:
   - "Name" = English name
   - "Arabic/Italian Name" = Arabic/Italian name
5. Changes are saved automatically
6. Click "View Menu" to see your changes live
7. Switch languages to test both versions
8. Click "Logout" when done

### 5. Quick Tips

✅ **Changes persist** - Data is saved in browser localStorage
✅ **Real-time** - Menu updates immediately after changes
✅ **Bilingual** - Add both English and Italian names
✅ **Safe deletes** - Confirmation required for deletions
✅ **Export backups** - Download JSON before major changes
✅ **Session auth** - Stay logged in during browser session

### 6. Common Tasks

#### Add a New Dish
1. Dashboard → Menu Items tab
2. Fill in required fields:
   - Name (English) - Required
   - Price - Required
   - Category - Required
3. Fill in optional fields:
   - Arabic/Italian Name - **Recommended for multi-language**
   - Description
   - Image filename
   - Tags
4. Click "Add Item"
5. Test both languages using the language switcher

#### Change a Price
1. Dashboard → Menu Items tab
2. Find the item and click "Edit"
3. Update the price
4. Click "Update Item"

#### Add a New Category
1. Dashboard → Categories tab
2. Enter category name
3. Optional: Italian name, description
4. Click "Add Category"

#### Backup Your Menu
1. Dashboard → Click "Export Data"
2. JSON file downloads automatically
3. Save it somewhere safe

#### Restore from Backup
1. Dashboard → Click "Import Data"
2. Select your JSON file
3. Confirm the import

### 7. Security Notes

⚠️ **Change the password** before going live!

Edit `/src/components/dashboard/Login.jsx`:
```javascript
const correctPassword = 'your-secure-password-here';
```

⚠️ **Current limitations:**
- Password stored in code (not secure for production)
- Data stored in browser (not shared across devices)
- No user roles or permissions
- No audit trail

For production, implement proper backend authentication!

### 8. Troubleshooting

**Problem:** Can't access dashboard
- **Solution:** Make sure URL is exactly `/dashboard`

**Problem:** Password not working
- **Solution:** Default is `rivera2026` (case-sensitive)

**Problem:** Changes not saving
- **Solution:** Check localStorage is enabled in browser

**Problem:** Menu looks wrong
- **Solution:** Try "Reset to Default" in dashboard

**Problem:** Category/item shows as "categories.xyz.name"
- **Solution:** Fill in the "Arabic/Italian Name" field when editing

**Problem:** Wrong language displayed
- **Solution:** Make sure both name fields are filled (English and Arabic/Italian)

**Problem:** Server won't start
- **Solution:** Check if port 5173/5174 is available

### 9. Next Steps

For production deployment:
1. Change the default password
2. Set up a backend API
3. Use a database (MongoDB, PostgreSQL, etc.)
4. Implement proper authentication (JWT, OAuth)
5. Add image upload functionality
6. Set up hosting (Vercel, Netlify, etc.)

---

## 📞 Need Help?

Check the full documentation in `DASHBOARD_README.md`

Enjoy managing your Rivera menu! 🍝
