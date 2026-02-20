import type { Category, MenuItem } from "@/data/menuData";
import styles from "./MenuItemList.module.css";

interface MenuItemListProps {
  categories: Category[];
  selectedCategory: string;
  onEdit: (item: MenuItem & { categoryId: string }) => void;
  onDelete: (itemId: number, categoryId: string) => void;
}

export default function MenuItemList({ categories, selectedCategory, onEdit, onDelete }: MenuItemListProps) {
  const getFilteredItems = () => {
    if (selectedCategory === "all") {
      return categories.flatMap((cat) =>
        cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryName: cat.nameAr }))
      );
    }
    
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category
      ? category.items.map((item) => ({ ...item, categoryId: category.id, categoryName: category.nameAr }))
      : [];
  };

  const items = getFilteredItems();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>لا توجد أصناف. أضف أول صنف في القائمة!</p>
      </div>
    );
  }

  return (
    <div className={styles.list} dir="rtl">
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.itemHeader}>
            <div>
              <h3 className={styles.itemName}>{item.nameAr}</h3>
              {item.nameHe && <p className={styles.itemNameIt}>{item.nameHe}</p>}
            </div>
            <div className={styles.itemPrice}>₪{item.price.toFixed(2)}</div>
          </div>

          {item.descriptionAr && (
            <p className={styles.itemDescription}>{item.descriptionAr}</p>
          )}

          <div className={styles.itemMeta}>
            <span className={styles.category}>{item.categoryName}</span>
            {item.tags && item.tags.length > 0 && (
              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {item.image && (
            <div className={styles.itemImage}>
              <span className={styles.imageIcon}>🖼️</span>
              <span className={styles.imageName}>{item.image}</span>
            </div>
          )}

          <div className={styles.itemActions}>
            <button
              onClick={() => onEdit(item)}
              className={styles.btnEdit}
            >
              تعديل
            </button>
            <button
              onClick={() => onDelete(item.id, item.categoryId)}
              className={styles.btnDelete}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
