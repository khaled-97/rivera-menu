import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import MenuItemForm from '../components/dashboard/MenuItemForm';
import CategoryForm from '../components/dashboard/CategoryForm';
import MenuItemList from '../components/dashboard/MenuItemList';
import CategoryList from '../components/dashboard/CategoryList';
import Login from '../components/dashboard/Login';
import { menuData as initialMenuData } from '../data/menuData';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated in this session
    return sessionStorage.getItem('dashboardAuth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('dashboardAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dashboardAuth');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }
  const [menuData, setMenuData] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('menuData');
    return saved ? JSON.parse(saved) : initialMenuData;
  });

  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'categories'
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Save to localStorage whenever menuData changes
  useEffect(() => {
    localStorage.setItem('menuData', JSON.stringify(menuData));
  }, [menuData]);

  // Menu Item Operations
  const handleAddItem = (newItem) => {
    const categoryIndex = menuData.categories.findIndex(
      (cat) => cat.id === newItem.categoryId
    );
    
    if (categoryIndex === -1) return;

    const maxId = Math.max(
      0,
      ...menuData.categories.flatMap((cat) => cat.items.map((item) => item.id))
    );

    const itemToAdd = {
      ...newItem,
      id: maxId + 1,
    };

    const updatedCategories = [...menuData.categories];
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      items: [...updatedCategories[categoryIndex].items, itemToAdd],
    };

    setMenuData({
      ...menuData,
      categories: updatedCategories,
    });
  };

  const handleUpdateItem = (updatedItem) => {
    const updatedCategories = menuData.categories.map((category) => {
      if (category.id === updatedItem.categoryId) {
        return {
          ...category,
          items: category.items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        };
      }
      return category;
    });

    setMenuData({
      ...menuData,
      categories: updatedCategories,
    });
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId, categoryId) => {
    if (!confirm('هل أنت متأكد من حذف هذا الصنف؟')) return;

    const updatedCategories = menuData.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter((item) => item.id !== itemId),
        };
      }
      return category;
    });

    setMenuData({
      ...menuData,
      categories: updatedCategories,
    });
  };

  // Category Operations
  const handleAddCategory = (newCategory) => {
    const categoryToAdd = {
      ...newCategory,
      items: [],
    };

    setMenuData({
      ...menuData,
      categories: [...menuData.categories, categoryToAdd],
    });
  };

  const handleUpdateCategory = (updatedCategory) => {
    const updatedCategories = menuData.categories.map((category) =>
      category.id === updatedCategory.id ? { ...category, ...updatedCategory } : category
    );

    setMenuData({
      ...menuData,
      categories: updatedCategories,
    });
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = menuData.categories.find((cat) => cat.id === categoryId);
    
    if (category.items.length > 0) {
      if (!confirm('هذه الفئة تحتوي على أصناف. هل أنت متأكد من حذفها؟')) return;
    }

    setMenuData({
      ...menuData,
      categories: menuData.categories.filter((cat) => cat.id !== categoryId),
    });
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(menuData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `menu-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (confirm('سيؤدي هذا إلى استبدال جميع بيانات القائمة الحالية. هل تريد المتابعة؟')) {
          setMenuData(imported);
        }
      } catch (error) {
        alert('ملف JSON غير صالح');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (confirm('إعادة تعيين إلى بيانات القائمة الأصلية؟ لا يمكن التراجع عن هذا الإجراء.')) {
      setMenuData(initialMenuData);
      localStorage.removeItem('menuData');
    }
  };

  return (
    <div className={styles.dashboard} dir="rtl">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>لوحة تحكم قائمة ريفيرا</h1>
          <div className={styles.headerActions}>
            <button onClick={handleExportData} className={styles.btnSecondary}>
              تصدير البيانات
            </button>
            <label className={styles.btnSecondary}>
              استيراد البيانات
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                style={{ display: 'none' }}
              />
            </label>
            <button onClick={handleResetData} className={styles.btnDanger}>
              إعادة تعيين إلى الافتراضي
            </button>
            <a href="/" className={styles.btnPrimary}>
              عرض القائمة
            </a>
            <button onClick={handleLogout} className={styles.btnSecondary}>
              تسجيل خروج
            </button>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'items' ? styles.active : ''}`}
            onClick={() => setActiveTab('items')}
          >
            أصناف القائمة
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'categories' ? styles.active : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            الفئات
          </button>
        </div>

        {activeTab === 'items' && (
          <div className={styles.content}>
            <div className={styles.sidebar}>
              <h2>{editingItem ? 'تعديل الصنف' : 'إضافة صنف جديد'}</h2>
              <MenuItemForm
                categories={menuData.categories}
                onSubmit={editingItem ? handleUpdateItem : handleAddItem}
                editingItem={editingItem}
                onCancel={() => setEditingItem(null)}
              />
            </div>
            <div className={styles.main}>
              <div className={styles.filterBar}>
                <h2>أصناف القائمة</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.categoryFilter}
                >
                  <option value="all">جميع الفئات</option>
                  {menuData.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nameAr || cat.nameIt || cat.name} ({cat.items.length})
                    </option>
                  ))}
                </select>
              </div>
              <MenuItemList
                categories={menuData.categories}
                selectedCategory={selectedCategory}
                onEdit={setEditingItem}
                onDelete={handleDeleteItem}
              />
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className={styles.content}>
            <div className={styles.sidebar}>
              <h2>{editingCategory ? 'تعديل الفئة' : 'إضافة فئة جديدة'}</h2>
              <CategoryForm
                onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
                editingCategory={editingCategory}
                onCancel={() => setEditingCategory(null)}
                existingCategories={menuData.categories}
              />
            </div>
            <div className={styles.main}>
              <h2>الفئات</h2>
              <CategoryList
                categories={menuData.categories}
                onEdit={setEditingCategory}
                onDelete={handleDeleteCategory}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
