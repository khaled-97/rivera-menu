# Rivera Menu Dashboard

A comprehensive dashboard for managing the Rivera restaurant menu.

## Features

### Menu Item Management
- ✅ Add new menu items with full details
- ✅ Edit existing menu items
- ✅ Delete menu items
- ✅ Add tags (vegetarian, popular, chef's choice, etc.)
- ✅ Set prices and descriptions
- ✅ Bilingual support (English/Italian)
- ✅ Image filename management

### Category Management
- ✅ Create new categories
- ✅ Edit category details
- ✅ Delete categories (with safety checks)
- ✅ Auto-generate category IDs
- ✅ Track item counts per category

### Data Management
- ✅ Export menu data to JSON
- ✅ Import menu data from JSON
- ✅ Reset to default menu
- ✅ Automatic localStorage persistence
- ✅ Real-time updates to menu display

### Security
- ✅ Password-protected access
- ✅ Session-based authentication
- ✅ Logout functionality

## Access

### Dashboard URL
Navigate to: `http://localhost:5173/dashboard`

### Default Password
**Password:** `rivera2026`

**Important:** Change the password in `/src/components/dashboard/Login.jsx` for production use.

```javascript
// In Login.jsx, line 9:
const correctPassword = 'rivera2026'; // Change this!
```

## Usage

### Adding a Menu Item
1. Go to the "Menu Items" tab
2. Fill in the form on the left:
   - Item name (English) - Required
   - Item name (Italian) - Optional
   - Description
   - Price - Required
   - Category - Required
   - Image filename
   - Tags (use quick tags or add custom)
3. Click "Add Item"

### Editing a Menu Item
1. Find the item in the list
2. Click "Edit"
3. Modify the fields
4. Click "Update Item"

### Deleting a Menu Item
1. Find the item in the list
2. Click "Delete"
3. Confirm the deletion

### Managing Categories
1. Switch to the "Categories" tab
2. Add new categories with:
   - Category name (English) - Required
   - Category ID (auto-generated or custom)
   - Category name (Italian)
   - Description
3. Edit or delete existing categories
   - Note: Categories with items cannot be deleted until items are removed

### Exporting Data
1. Click "Export Data" in the header
2. A JSON file will be downloaded with timestamp
3. Use this for backups or sharing

### Importing Data
1. Click "Import Data" in the header
2. Select a JSON file
3. Confirm the import (this replaces all current data)

### Resetting Data
1. Click "Reset to Default" in the header
2. Confirm the reset
3. This restores the original menu from `menuData.js`

## Data Storage

The dashboard uses **localStorage** to persist menu changes:
- Changes are saved automatically
- Data persists across browser sessions
- Data is specific to each browser/device
- Clearing browser data will reset the menu

### Storage Key
`menuData` - Contains the complete menu structure

## File Structure

```
src/
├── pages/
│   ├── Dashboard.jsx           # Main dashboard component
│   ├── Dashboard.module.css
│   ├── MenuPage.jsx            # Public menu display
│   └── MenuPage.module.css
├── components/
│   └── dashboard/
│       ├── Login.jsx           # Authentication
│       ├── Login.module.css
│       ├── MenuItemForm.jsx    # Add/edit items
│       ├── MenuItemForm.module.css
│       ├── MenuItemList.jsx    # Display items
│       ├── MenuItemList.module.css
│       ├── CategoryForm.jsx    # Add/edit categories
│       ├── CategoryForm.module.css
│       ├── CategoryList.jsx    # Display categories
│       └── CategoryList.module.css
└── data/
    └── menuData.js             # Original menu data
```

## Production Deployment

### Security Recommendations
1. **Change the default password** in `Login.jsx`
2. Implement proper backend authentication
3. Use environment variables for sensitive data
4. Add role-based access control
5. Implement API endpoints for data persistence

### Backend Integration
To connect to a backend API:

1. Replace localStorage calls in `Dashboard.jsx` with API calls:
```javascript
// Instead of:
localStorage.setItem('menuData', JSON.stringify(menuData));

// Use:
await fetch('/api/menu', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(menuData)
});
```

2. Load data from API on mount:
```javascript
useEffect(() => {
  fetch('/api/menu')
    .then(res => res.json())
    .then(data => setMenuData(data));
}, []);
```

## Troubleshooting

### Dashboard not loading
- Check that you're on the correct URL: `/dashboard`
- Ensure React Router is working
- Check browser console for errors

### Changes not persisting
- Check localStorage is enabled in browser
- Verify no browser extensions are blocking storage
- Check browser console for errors

### Login not working
- Verify password is correct (default: `rivera2026`)
- Check browser console for errors
- Clear sessionStorage and try again

### Menu not updating on main page
- Refresh the page to load latest data
- Check localStorage contains `menuData` key
- Verify JSON structure is valid

## Support

For issues or questions, check:
1. Browser console for error messages
2. Network tab for failed requests
3. localStorage contents in DevTools

## Future Enhancements

Potential features to add:
- [ ] Image upload functionality
- [ ] Drag-and-drop reordering
- [ ] Bulk operations
- [ ] Search and filtering
- [ ] Analytics dashboard
- [ ] Multi-user support
- [ ] Activity logs
- [ ] Menu versioning
- [ ] QR code generation
- [ ] Print-friendly menu export
