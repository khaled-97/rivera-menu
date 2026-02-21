import type { Category } from "@/data/menuData";
import styles from "./CategoryList.module.css";

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className={styles.empty}>
        <p>لا توجد فئات. أضف أول فئة!</p>
      </div>
    );
  }

  return (
    <div className={styles.list} dir="rtl">
      {categories.map((category) => (
        <div key={category.id} className={styles.category}>
          <div className={styles.categoryHeader}>
            <div>
              <h3 className={styles.categoryName}>{category.nameAr}</h3>
              {category.nameHe && (
                <p className={styles.categoryNameIt}>{category.nameHe}</p>
              )}
            </div>
            <div className={styles.itemCount}>
              {category.items.length} {category.items.length === 1 ? "طبق" : "أطباق"}
            </div>
          </div>

          <div className={styles.categoryId}>
            <span className={styles.label}>المعرف:</span>
            <code>{category.id}</code>
          </div>

          {category.descriptionAr && (
            <p className={styles.categoryDescription}>{category.descriptionAr}</p>
          )}

          {category.items.length > 0 && (
            <div className={styles.items}>
              <p className={styles.itemsLabel}>الأطباق في هذه الفئة:</p>
              <ul className={styles.itemsList}>
                {category.items.map((item) => (
                  <li key={item.id}>
                    {item.nameAr} <span className={styles.itemPrice}>₪{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.categoryActions}>
            <button
              onClick={() => onEdit(category)}
              className={styles.btnEdit}
            >
              تعديل
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className={styles.btnDelete}
              disabled={category.items.length > 0}
              title={
                category.items.length > 0
                  ? "احذف جميع الأطباق من هذه الفئة أولاً"
                  : "حذف هذه الفئة"
              }
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
