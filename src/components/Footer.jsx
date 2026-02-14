import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.ornament}>✦</div>
        <p className={styles.tagline}>{t('bonAppetit')}</p>
        <div className={styles.info}>
          <p className={styles.note}>
            {t('priceNote')}
          </p>
          <p className={styles.allergen}>
            {t('allergenNote')}
          </p>
        </div>
        <div className={styles.brand}>
          <span className={styles.name}>{t('restaurantName')}</span>
          <span className={styles.separator}>·</span>
          <span className={styles.type}>{t('restaurantTagline')}</span>
        </div>
      </div>
    </footer>
  );
}
