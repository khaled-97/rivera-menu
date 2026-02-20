import { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Category } from "@/data/menuData";
import styles from "./CategoryNav.module.css";

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current;
      const active = activeRef.current;
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      
      const scrollLeft = active.offsetLeft - (navRect.width / 2) + (activeRect.width / 2);
      nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  const getCategoryName = (category: Category): string => {
    if (language === "ar") {
      return category.nameAr || "";
    } else if (language === "he") {
      return category.nameHe || "";
    }
    return category.nameAr || "";
  };

  return (
    <nav className={styles.nav} ref={navRef}>
      <div className={styles.navInner}>
        {categories.map((category) => (
          <button
            key={category.id}
            ref={activeCategory === category.id ? activeRef : null}
            className={`${styles.navItem} ${activeCategory === category.id ? styles.active : ""}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className={styles.name}>
              {getCategoryName(category)}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
