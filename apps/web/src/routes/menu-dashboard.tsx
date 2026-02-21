import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import type { Category, MenuItem, MenuData } from "@/data/menuData";
import MenuItemForm from "@/components/menu/dashboard/MenuItemForm";
import CategoryForm from "@/components/menu/dashboard/CategoryForm";
import MenuItemList from "@/components/menu/dashboard/MenuItemList";
import CategoryList from "@/components/menu/dashboard/CategoryList";
import Login from "@/components/menu/dashboard/Login";
import styles from "@/components/menu/dashboard/Dashboard.module.css";

function normalizeMenuData(data: {
  restaurant: { name: string; nameAr: string; nameHe: string; tagline: string; taglineAr: string; taglineHe: string };
  categories: Array<{
    id: string;
    nameAr: string;
    nameHe: string;
    descriptionAr?: string | null;
    descriptionHe?: string | null;
    items: Array<{
      id: number;
      nameAr: string;
      nameHe: string;
      descriptionAr?: string | null;
      descriptionHe?: string | null;
      price: number;
      image?: string | null;
      tags?: string[] | null;
    }>;
  }>;
}): MenuData {
  return {
    restaurant: data.restaurant,
    categories: data.categories.map((cat) => ({
      id: cat.id,
      nameAr: cat.nameAr,
      nameHe: cat.nameHe,
      descriptionAr: cat.descriptionAr ?? undefined,
      descriptionHe: cat.descriptionHe ?? undefined,
      items: cat.items.map((item) => ({
        id: item.id,
        nameAr: item.nameAr,
        nameHe: item.nameHe,
        descriptionAr: item.descriptionAr ?? undefined,
        descriptionHe: item.descriptionHe ?? undefined,
        price: item.price,
        image: item.image ?? "",
        tags: item.tags ?? undefined,
      })),
    })),
  };
}

export const Route = createFileRoute("/menu-dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("dashboardAuth") === "true";
    }
    return false;
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("dashboardAuth", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("dashboardAuth");
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <DashboardContent onLogout={handleLogout} />;
}

interface DashboardContentProps {
  onLogout: () => void;
}

function DashboardContent({ onLogout }: DashboardContentProps) {
  const queryClient = useQueryClient();
  
  const { data: rawMenuData, isLoading, error } = useQuery(orpc.menu.getAll.queryOptions());
  
  const menuData = useMemo(() => {
    if (!rawMenuData) return null;
    return normalizeMenuData(rawMenuData);
  }, [rawMenuData]);

  const [activeTab, setActiveTab] = useState<"items" | "categories">("items");
  const [editingItem, setEditingItem] = useState<(MenuItem & { categoryId: string }) | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const createItemMutation = useMutation(
    orpc.menu.createItem.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
      },
    })
  );

  const updateItemMutation = useMutation(
    orpc.menu.updateItem.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
        setEditingItem(null);
      },
    })
  );

  const deleteItemMutation = useMutation(
    orpc.menu.deleteItem.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
      },
    })
  );

  const createCategoryMutation = useMutation(
    orpc.menu.createCategory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
      },
    })
  );

  const updateCategoryMutation = useMutation(
    orpc.menu.updateCategory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
        setEditingCategory(null);
      },
    })
  );

  const deleteCategoryMutation = useMutation(
    orpc.menu.deleteCategory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
      },
    })
  );

  const importDataMutation = useMutation(
    orpc.menu.importData.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
      },
    })
  );

  const handleAddItem = (newItem: Partial<MenuItem> & { categoryId: string }) => {
    createItemMutation.mutate({
      categoryId: newItem.categoryId,
      nameAr: newItem.nameAr || "",
      nameHe: newItem.nameHe || "",
      descriptionAr: newItem.descriptionAr,
      descriptionHe: newItem.descriptionHe,
      price: newItem.price || 0,
      image: newItem.image,
      tags: newItem.tags,
    });
  };

  const handleUpdateItem = (updatedItem: Partial<MenuItem> & { categoryId: string }) => {
    if (!updatedItem.id) return;
    updateItemMutation.mutate({
      id: updatedItem.id,
      categoryId: updatedItem.categoryId,
      nameAr: updatedItem.nameAr || "",
      nameHe: updatedItem.nameHe || "",
      descriptionAr: updatedItem.descriptionAr,
      descriptionHe: updatedItem.descriptionHe,
      price: updatedItem.price || 0,
      image: updatedItem.image,
      tags: updatedItem.tags,
    });
  };

  const handleDeleteItem = (itemId: number, _categoryId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطبق؟")) return;
    deleteItemMutation.mutate({ id: itemId });
  };

  const handleAddCategory = (newCategory: Partial<Category>) => {
    createCategoryMutation.mutate({
      id: newCategory.id || "",
      nameAr: newCategory.nameAr || "",
      nameHe: newCategory.nameHe || "",
      descriptionAr: newCategory.descriptionAr,
      descriptionHe: newCategory.descriptionHe,
    });
  };

  const handleUpdateCategory = (updatedCategory: Partial<Category>) => {
    if (!updatedCategory.id) return;
    updateCategoryMutation.mutate({
      id: updatedCategory.id,
      nameAr: updatedCategory.nameAr || "",
      nameHe: updatedCategory.nameHe || "",
      descriptionAr: updatedCategory.descriptionAr,
      descriptionHe: updatedCategory.descriptionHe,
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = menuData?.categories.find((cat) => cat.id === categoryId);
    
    if (category && category.items.length > 0) {
      if (!confirm("هذه الفئة تحتوي على أطباق. هل أنت متأكد من حذفها؟")) return;
    }

    deleteCategoryMutation.mutate({ id: categoryId });
  };

  const handleExportData = () => {
    if (!menuData) return;
    const dataStr = JSON.stringify(menuData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `menu-data-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (confirm("سيؤدي هذا إلى استبدال جميع بيانات القائمة الحالية. هل تريد المتابعة؟")) {
          importDataMutation.mutate({ categories: imported.categories });
        }
      } catch (error) {
        alert("ملف JSON غير صالح");
      }
    };
    reader.readAsText(file);
  };

  if (isLoading) {
    return (
      <div className={styles.dashboard} dir="rtl">
        <div className={styles.loading}>جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard} dir="rtl">
        <div className={styles.error}>حدث خطأ في تحميل البيانات: {error.message}</div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className={styles.dashboard} dir="rtl">
        <div className={styles.error}>لا توجد بيانات</div>
      </div>
    );
  }

  const isMutating = createItemMutation.isPending || updateItemMutation.isPending || 
    deleteItemMutation.isPending || createCategoryMutation.isPending || 
    updateCategoryMutation.isPending || deleteCategoryMutation.isPending ||
    importDataMutation.isPending;

  return (
    <div className={styles.dashboard} dir="rtl">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>لوحة تحكم قائمة ريفيرا</h1>
          <div className={styles.headerActions}>
            {isMutating && <span className={styles.saving}>جاري الحفظ...</span>}
            <div className={styles.actionGroup}>
              <button onClick={handleExportData} className={styles.btnSecondary}>
                تصدير البيانات
              </button>
              <label className={styles.btnSecondary}>
                استيراد البيانات
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className={styles.actionGroup}>
              <Link to="/" className={styles.btnPrimary}>
                عرض القائمة
              </Link>
            </div>
            <div className={styles.actionGroup}>
              <button onClick={onLogout} className={styles.btnSecondary}>
                تسجيل خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <nav className={styles.tabsWrap} aria-label="أقسام لوحة التحكم">
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "items" ? styles.active : ""}`}
              onClick={() => setActiveTab("items")}
              aria-pressed={activeTab === "items"}
            >
              أطباق القائمة
            </button>
            <button
              className={`${styles.tab} ${activeTab === "categories" ? styles.active : ""}`}
              onClick={() => setActiveTab("categories")}
              aria-pressed={activeTab === "categories"}
            >
              الفئات
            </button>
          </div>
        </nav>

        {activeTab === "items" && (
          <section className={styles.content} aria-label="إدارة أطباق القائمة">
            <aside className={styles.sidebar}>
              <h2 className={styles.sidebarTitle}>
                {editingItem ? "تعديل الطبق" : "إضافة طبق جديد"}
              </h2>
              <MenuItemForm
                categories={menuData.categories}
                onSubmit={editingItem ? handleUpdateItem : handleAddItem}
                editingItem={editingItem}
                onCancel={() => setEditingItem(null)}
              />
            </aside>
            <div className={styles.main}>
              <div className={styles.filterBar}>
                <h2 className={styles.mainTitle}>أطباق القائمة</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.categoryFilter}
                  aria-label="تصفية حسب الفئة"
                >
                  <option value="all">جميع الفئات</option>
                  {menuData.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nameAr} ({cat.items.length})
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
          </section>
        )}

        {activeTab === "categories" && (
          <section className={styles.content} aria-label="إدارة الفئات">
            <aside className={styles.sidebar}>
              <h2 className={styles.sidebarTitle}>
                {editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
              </h2>
              <CategoryForm
                onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
                editingCategory={editingCategory}
                onCancel={() => setEditingCategory(null)}
                existingCategories={menuData.categories}
              />
            </aside>
            <div className={styles.main}>
              <h2 className={styles.mainTitle}>الفئات</h2>
              <CategoryList
                categories={menuData.categories}
                onEdit={setEditingCategory}
                onDelete={handleDeleteCategory}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
