import { useState, useEffect } from "react";
import type { Category, MenuItem } from "@/data/menuData";
import styles from "./MenuItemForm.module.css";

interface MenuItemFormProps {
  categories: Category[];
  onSubmit: (item: Partial<MenuItem> & { categoryId: string }) => void;
  editingItem: (MenuItem & { categoryId: string }) | null;
  onCancel: () => void;
}

interface FormData {
  name: string;
  nameAr: string;
  nameHe: string;
  description: string;
  descriptionAr: string;
  descriptionHe: string;
  price: string;
  categoryId: string;
  image: string;
  tags: string[];
}

export default function MenuItemForm({ categories, onSubmit, editingItem, onCancel }: MenuItemFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    nameAr: "",
    nameHe: "",
    description: "",
    descriptionAr: "",
    descriptionHe: "",
    price: "",
    categoryId: categories[0]?.id || "",
    image: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: "",
        nameAr: editingItem.nameAr || "",
        nameHe: editingItem.nameHe || "",
        description: "",
        descriptionAr: editingItem.descriptionAr || "",
        descriptionHe: editingItem.descriptionHe || "",
        price: String(editingItem.price),
        categoryId: editingItem.categoryId,
        image: editingItem.image || "",
        tags: editingItem.tags || [],
      });
    } else {
      setFormData({
        name: "",
        nameAr: "",
        nameHe: "",
        description: "",
        descriptionAr: "",
        descriptionHe: "",
        price: "",
        categoryId: categories[0]?.id || "",
        image: "",
        tags: [],
      });
    }
  }, [editingItem, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nameAr || !formData.categoryId || !formData.price) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    onSubmit({
      ...(editingItem ? { id: editingItem.id } : {}),
      nameAr: formData.nameAr,
      nameHe: formData.nameHe,
      descriptionAr: formData.descriptionAr,
      descriptionHe: formData.descriptionHe,
      price: parseFloat(formData.price),
      categoryId: formData.categoryId,
      image: formData.image,
      tags: formData.tags,
    });

    if (!editingItem) {
      setFormData({
        name: "",
        nameAr: "",
        nameHe: "",
        description: "",
        descriptionAr: "",
        descriptionHe: "",
        price: "",
        categoryId: categories[0]?.id || "",
        image: "",
        tags: [],
      });
    }
  };

  const commonTags = [
    "vegetarian",
    "popular",
    "chef's choice",
    "signature",
    "premium",
    "shareable",
    "dessert",
    "sweet",
    "refreshing",
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form} dir="rtl">
      <div className={styles.formGroup}>
        <label htmlFor="nameAr">
          اسم الصنف (عربي) <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="nameAr"
          name="nameAr"
          value={formData.nameAr}
          onChange={handleChange}
          required
          placeholder="مثال: بيتزا مارغريتا"
          dir="rtl"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="nameHe">
          שם המנה (עברית)
        </label>
        <input
          type="text"
          id="nameHe"
          name="nameHe"
          value={formData.nameHe}
          onChange={handleChange}
          placeholder="לדוגמה: פיצה מרגריטה"
          dir="rtl"
        />
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
          placeholder="وصف الطبق..."
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
          placeholder="תיאור המנה..."
          dir="rtl"
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.formGroup}>
        <label htmlFor="price">
          السعر <span className={styles.required}>*</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          placeholder="0.00"
          dir="ltr"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="categoryId">
          الفئة <span className={styles.required}>*</span>
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nameAr} ({cat.items.length})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">اسم ملف الصورة</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="مثال: pizza-margherita.jpg"
          dir="ltr"
        />
        <small className={styles.hint}>
          ارفع الصور إلى المجلد العام وأدخل اسم الملف هنا
        </small>
      </div>

      <div className={styles.formGroup}>
        <label>الوسوم</label>
        <div className={styles.tagInput}>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="أضف وسم..."
            dir="rtl"
          />
          <button type="button" onClick={handleAddTag} className={styles.btnAddTag}>
            إضافة
          </button>
        </div>
        
        <div className={styles.commonTags}>
          {commonTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                if (!formData.tags.includes(tag)) {
                  setFormData((prev) => ({
                    ...prev,
                    tags: [...prev.tags, tag],
                  }));
                }
              }}
              className={styles.commonTag}
              disabled={formData.tags.includes(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {formData.tags.length > 0 && (
          <div className={styles.tags}>
            {formData.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className={styles.removeTag}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.btnSubmit}>
          {editingItem ? "تحديث الصنف" : "إضافة صنف"}
        </button>
        {editingItem && (
          <button type="button" onClick={onCancel} className={styles.btnCancel}>
            إلغاء
          </button>
        )}
      </div>
    </form>
  );
}
