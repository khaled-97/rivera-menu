import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Language } from "@/data/translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = language;
    
    if (language === "ar") {
      document.documentElement.style.setProperty(
        "--font-display",
        "'Noto Naskh Arabic', 'Cormorant Garamond', Georgia, serif"
      );
      document.documentElement.style.setProperty(
        "--font-body",
        "'Noto Sans Arabic', 'Outfit', sans-serif"
      );
    } else {
      document.documentElement.style.setProperty(
        "--font-display",
        "'Heebo', 'Cormorant Garamond', Georgia, serif"
      );
      document.documentElement.style.setProperty(
        "--font-body",
        "'Heebo', 'Outfit', sans-serif"
      );
    }
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: unknown = translations[language];
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof result === "string" ? result : key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "he" : "ar"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
