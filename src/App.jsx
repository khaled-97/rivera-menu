import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import { menuData } from './data/menuData';
import './App.css';

function MenuApp() {
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="app">
      <Header />
      <CategoryNav
        categories={menuData.categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <main className="main">
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

function App() {
  return (
    <LanguageProvider>
      <MenuApp />
    </LanguageProvider>
  );
}

export default App;
