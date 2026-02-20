import { useLanguage } from "@/context/LanguageContext";
import MenuItem from "./MenuItem";
import type { Category } from "@/data/menuData";
import styles from "./CategorySection.module.css";

interface CategorySectionProps {
  category: Category;
  isActive: boolean;
}

export default function CategorySection({ category, isActive }: CategorySectionProps) {
  const { language } = useLanguage();

  if (!isActive) return null;

  const getCategoryName = (): string => {
    if (language === "ar") {
      return category.nameAr || "";
    } else if (language === "he") {
      return category.nameHe || "";
    }
    return category.nameAr || "";
  };

  const getCategoryDescription = (): string => {
    if (language === "ar") {
      return category.descriptionAr || "";
    } else if (language === "he") {
      return category.descriptionHe || "";
    }
    return category.descriptionAr || "";
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{getCategoryName()}</h2>
        </div>
        <p className={styles.description}>{getCategoryDescription()}</p>
        <div className={styles.divider}>
          <span className={styles.dividerOrnament}>✦</span>
        </div>
      </div>
      
      <div className={styles.grid}>
        {category.items.map((item, index) => (
          <MenuItem key={item.id} item={item} index={index} categoryId={category.id} />
        ))}
      </div>
    </section>
  );
}
