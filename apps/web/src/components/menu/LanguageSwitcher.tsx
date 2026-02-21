import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { toggleLanguage, language } = useLanguage();

  return (
    <button 
      className={styles.switcher} 
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === "ar" ? "Hebrew" : "Arabic"}`}
    >
      🌐
    </button>
  );
}
