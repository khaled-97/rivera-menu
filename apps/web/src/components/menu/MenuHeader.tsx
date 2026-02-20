import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Header.module.css";

export default function MenuHeader() {
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.switcherContainer}>
        <LanguageSwitcher />
      </div>
      <div className={styles.logoContainer}>
        <img src="/images/logosvg.svg" alt="Rivera" className={styles.logo} />
      </div>
      <div className={styles.leftLinks}>
        <Link to="/menu-dashboard" className={styles.dashboardLink} title="Manager Dashboard">
          ⚙️
        </Link>
      </div>
    </header>
  );
}
