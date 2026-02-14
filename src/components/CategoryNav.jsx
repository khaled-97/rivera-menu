import { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './CategoryNav.module.css';

export default function CategoryNav({ categories, activeCategory, onCategoryChange }) {
  const navRef = useRef(null);
  const activeRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current;
      const active = activeRef.current;
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      
      const scrollLeft = active.offsetLeft - (navRect.width / 2) + (activeRect.width / 2);
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <nav className={styles.nav} ref={navRef}>
      <div className={styles.navInner}>
        {categories.map((category) => (
          <button
            key={category.id}
            ref={activeCategory === category.id ? activeRef : null}
            className={`${styles.navItem} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className={styles.name}>
              {t(`categories.${category.id}.name`)}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
