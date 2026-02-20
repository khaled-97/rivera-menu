import { useState, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { LanguageProvider } from "@/context/LanguageContext";
import MenuHeader from "@/components/menu/MenuHeader";
import CategoryNav from "@/components/menu/CategoryNav";
import CategorySection from "@/components/menu/CategorySection";
import Footer from "@/components/menu/Footer";
import type { MenuData } from "@/data/menuData";
import styles from "@/components/menu/MenuPage.module.css";

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

export const Route = createFileRoute("/")({
  component: MenuPage,
});

function MenuPage() {
  const { data: rawMenuData, isLoading, error } = useQuery(orpc.menu.getAll.queryOptions());
  
  const menuData = useMemo(() => {
    if (!rawMenuData) return null;
    return normalizeMenuData(rawMenuData);
  }, [rawMenuData]);

  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (menuData?.categories?.[0]?.id && !activeCategory) {
      setActiveCategory(menuData.categories[0].id);
    }
  }, [menuData, activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  if (isLoading) {
    return (
      <LanguageProvider>
        <div className={styles.app}>
          <MenuHeader />
          <div className={styles.loading}>جاري التحميل...</div>
        </div>
      </LanguageProvider>
    );
  }

  if (error) {
    return (
      <LanguageProvider>
        <div className={styles.app}>
          <MenuHeader />
          <div className={styles.error}>حدث خطأ في تحميل القائمة</div>
        </div>
      </LanguageProvider>
    );
  }

  if (!menuData || menuData.categories.length === 0) {
    return (
      <LanguageProvider>
        <div className={styles.app}>
          <MenuHeader />
          <div className={styles.empty}>لا توجد أصناف في القائمة</div>
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className={styles.app}>
        <MenuHeader />
        <CategoryNav
          categories={menuData.categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <main className={styles.main}>
          {menuData.categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
            />
          ))}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
