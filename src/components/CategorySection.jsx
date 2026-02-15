import { useLanguage } from '../context/LanguageContext';
import MenuItem from './MenuItem';
import styles from './CategorySection.module.css';

export default function CategorySection({ category, isActive }) {
  const { t, language } = useLanguage();

  if (!isActive) return null;

  const getCategoryName = () => {
    const translated = t(`categories.${category.id}.name`);
    if (translated === `categories.${category.id}.name`) {
      if (language === 'ar') {
        return category.nameAr || category.nameIt || category.name;
      } else if (language === 'he') {
        return category.nameHe || category.name;
      }
      return category.name;
    }
    return translated;
  };

  const getCategoryDescription = () => {
    const translated = t(`categories.${category.id}.description`);
    if (translated === `categories.${category.id}.description`) {
      if (language === 'ar') {
        return category.descriptionAr || category.description || '';
      } else if (language === 'he') {
        return category.descriptionHe || category.description || '';
      }
      return category.description || '';
    }
    return translated;
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
          <MenuItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
