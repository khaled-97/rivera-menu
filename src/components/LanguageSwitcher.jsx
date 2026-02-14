import { useLanguage } from '../context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <button 
      className={styles.switcher} 
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'ar' ? 'Hebrew' : 'Arabic'}`}
    >
      <span className={styles.icon}>🌐</span>
      <span className={styles.label}>{t('switchLang')}</span>
    </button>
  );
}
