import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/logosvg.svg';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.switcherContainer}>
        <LanguageSwitcher />
      </div>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Rivera" className={styles.logo} />
      </div>
      <a href="/dashboard" className={styles.dashboardLink} title="Manager Dashboard">
        ⚙️
      </a>
    </header>
  );
}
