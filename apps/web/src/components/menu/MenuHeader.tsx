import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Header.module.css";

export default function MenuHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled((prev) => {
        if (prev) {
          return scrollY > 20;
        }
        return scrollY > 80;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.switcherContainer}>
        <LanguageSwitcher />
      </div>
      <div className={styles.logoContainer}>
        <img src="/pictures/logosvg.svg" alt="Rivera" className={styles.logo} />
      </div>
      <div className={styles.leftLinks}>
        <Link to="/menu-dashboard" className={styles.dashboardLink} title="Manager Dashboard">
          ⚙️
        </Link>
      </div>
    </header>
  );
}
