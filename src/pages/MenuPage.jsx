import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';
import { menuData as initialMenuData } from '../data/menuData';
import styles from './MenuPage.module.css';

function MenuPage() {
  const [menuData, setMenuData] = useState(initialMenuData);
  const [activeCategory, setActiveCategory] = useState(initialMenuData.categories[0]?.id);

  // Load menu data from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('menuData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setMenuData(parsedData);
        setActiveCategory(parsedData.categories[0]?.id);
      } catch (error) {
        console.error('Error loading menu data:', error);
      }
    }
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className={styles.app}>
      <Header />
      <CategoryNav
        categories={menuData.categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <main className={styles.main}>
        {menuData.categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default MenuPage;
