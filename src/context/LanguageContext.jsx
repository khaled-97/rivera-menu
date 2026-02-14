import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar'); // Arabic as default

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = 'rtl'; // Both Arabic and Hebrew are RTL
    document.documentElement.lang = language;
    
    // Update font family based on language
    if (language === 'ar') {
      document.documentElement.style.setProperty('--font-display', "'Noto Naskh Arabic', 'Cormorant Garamond', Georgia, serif");
      document.documentElement.style.setProperty('--font-body', "'Noto Sans Arabic', 'Outfit', sans-serif");
    } else {
      document.documentElement.style.setProperty('--font-display', "'Heebo', 'Cormorant Garamond', Georgia, serif");
      document.documentElement.style.setProperty('--font-body', "'Heebo', 'Outfit', sans-serif");
    }
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }
    return result || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'he' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
