import { useState, useEffect } from "react";
import type { Category } from "@/data/menuData";
import styles from "./CategoryForm.module.css";

interface CategoryFormProps {
  onSubmit: (category: Partial<Category>) => void;
  editingCategory: Category | null;
  onCancel: () => void;
  existingCategories: Category[];
}

interface FormData {
  id: string;
  name: string;
  nameAr: string;
  nameHe: string;
  description: string;
  descriptionAr: string;
  descriptionHe: string;
}

export default function CategoryForm({ onSubmit, editingCategory, onCancel, existingCategories }: CategoryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    nameAr: "",
    nameHe: "",
    description: "",
    descriptionAr: "",
    descriptionHe: "",
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        id: editingCategory.id,
        name: "",
        nameAr: editingCategory.nameAr || "",
        nameHe: editingCategory.nameHe || "",
        description: "",
        descriptionAr: editingCategory.descriptionAr || "",
        descriptionHe: editingCategory.descriptionHe || "",
      });
    } else {
      setFormData({
        id: "",
        name: "",
        nameAr: "",
        nameHe: "",
        description: "",
        descriptionAr: "",
        descriptionHe: "",
      });
    }
  }, [editingCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateId = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameAr) {
      alert("الرجاء إدخال اسم الفئة بالعربية");
      return;
    }

    const categoryId = editingCategory ? formData.id : (formData.id || generateId(formData.nameAr));

    if (!editingCategory && existingCategories.some((cat) => cat.id === categoryId)) {
      alert("فئة بهذا المعرف موجودة بالفعل. الرجاء استخدام اسم أو معرف مختلف.");
      return;
    }

    onSubmit({
      id: categoryId,
      nameAr: formData.nameAr,
      nameHe: formData.nameHe,
      descriptionAr: formData.descriptionAr,
      descriptionHe: formData.descriptionHe,
    });

    if (!editingCategory) {
      setFormData({
        id: "",
        name: "",
        nameAr: "",
        nameHe: "",
        description: "",
        descriptionAr: "",
        descriptionHe: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} dir="rtl">
      <div className={styles.formGroup}>
        <label htmlFor="nameAr">
          اسم الفئة (عربي) <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="nameAr"
          name="nameAr"
          value={formData.nameAr}
          onChange={handleChange}
          required
          placeholder="مثال: مقبلات"
          dir="rtl"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="nameHe">שם הקטגוריה (עברית)</label>
        <input
          type="text"
          id="nameHe"
          name="nameHe"
          value={formData.nameHe}
          onChange={handleChange}
          placeholder="לדוגמה: מנות ראשונות"
          dir="rtl"
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.formGroup}>
        <label htmlFor="id">معرف الفئة (ID)</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id || generateId(formData.nameAr || formData.name)}
          onChange={handleChange}
          placeholder="يتم إنشاؤه تلقائياً"
          disabled={!!editingCategory}
          dir="ltr"
        />
        <small className={styles.hint}>
          {editingCategory 
            ? "لا يمكن تغيير المعرف بعد الإنشاء"
            : "اتركه فارغاً للإنشاء التلقائي"}
        </small>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.formGroup}>
        <label htmlFor="descriptionAr">الوصف (عربي)</label>
        <textarea
          id="descriptionAr"
          name="descriptionAr"
          value={formData.descriptionAr}
          onChange={handleChange}
          rows={3}
          placeholder="وصف هذه الفئة..."
          dir="rtl"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="descriptionHe">תיאור (עברית)</label>
        <textarea
          id="descriptionHe"
          name="descriptionHe"
          value={formData.descriptionHe}
          onChange={handleChange}
          rows={3}
          placeholder="תיאור הקטגוריה..."
          dir="rtl"
        />
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.btnSubmit}>
          {editingCategory ? "تحديث الفئة" : "إضافة فئة"}
        </button>
        {editingCategory && (
          <button type="button" onClick={onCancel} className={styles.btnCancel}>
            إلغاء
          </button>
        )}
      </div>
    </form>
  );
}
