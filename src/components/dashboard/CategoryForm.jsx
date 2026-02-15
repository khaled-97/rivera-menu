import { useState, useEffect } from 'react';
import styles from './CategoryForm.module.css';

function CategoryForm({ onSubmit, editingCategory, onCancel, existingCategories }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    nameAr: '',
    nameHe: '',
    description: '',
    descriptionAr: '',
    descriptionHe: '',
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        id: editingCategory.id,
        name: editingCategory.name,
        nameAr: editingCategory.nameAr || editingCategory.nameIt || '',
        nameHe: editingCategory.nameHe || '',
        description: editingCategory.description || '',
        descriptionAr: editingCategory.descriptionAr || '',
        descriptionHe: editingCategory.descriptionHe || '',
      });
    } else {
      setFormData({
        id: '',
        name: '',
        nameAr: '',
        nameHe: '',
        description: '',
        descriptionAr: '',
        descriptionHe: '',
      });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateId = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nameAr) {
      alert('الرجاء إدخال اسم الفئة بالعربية');
      return;
    }

    const categoryId = editingCategory ? formData.id : (formData.id || generateId(formData.nameAr));

    // Check for duplicate ID
    if (!editingCategory && existingCategories.some((cat) => cat.id === categoryId)) {
      alert('فئة بهذا المعرف موجودة بالفعل. الرجاء استخدام اسم أو معرف مختلف.');
      return;
    }

    onSubmit({
      id: categoryId,
      name: formData.name || formData.nameAr,
      nameAr: formData.nameAr,
      nameHe: formData.nameHe,
      nameIt: formData.nameAr, // Keep backward compatibility
      description: formData.description,
      descriptionAr: formData.descriptionAr,
      descriptionHe: formData.descriptionHe,
    });

    // Reset form if not editing
    if (!editingCategory) {
      setFormData({
        id: '',
        name: '',
        nameAr: '',
        nameHe: '',
        description: '',
        descriptionAr: '',
        descriptionHe: '',
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

      <div className={styles.formGroup}>
        <label htmlFor="name">Category Name (English - ID)</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Appetizers"
          dir="ltr"
        />
        <small className={styles.hint}>
          للاستخدام الداخلي والمعرف
        </small>
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
            ? 'لا يمكن تغيير المعرف بعد الإنشاء'
            : 'اتركه فارغاً للإنشاء التلقائي'}
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
          rows="3"
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
          rows="3"
          placeholder="תיאור הקטגוריה..."
          dir="rtl"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description (English - ID)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Describe this category..."
          dir="ltr"
        />
        <small className={styles.hint}>
          للاستخدام الداخلي
        </small>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.btnSubmit}>
          {editingCategory ? 'تحديث الفئة' : 'إضافة فئة'}
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

export default CategoryForm;
