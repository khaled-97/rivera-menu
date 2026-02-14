import { useLanguage } from '../context/LanguageContext';
import MenuItem from './MenuItem';
import styles from './CategorySection.module.css';

export default function CategorySection({ category, isActive }) {
  const { t } = useLanguage();

  if (!isActive) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{t(`categories.${category.id}.name`)}</h2>
        </div>
        <p className={styles.description}>{t(`categories.${category.id}.description`)}</p>
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
