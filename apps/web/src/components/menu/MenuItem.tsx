import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { MenuItem as MenuItemType } from "@/data/menuData";
import styles from "./MenuItem.module.css";

interface MenuItemProps {
  item: MenuItemType;
  index: number;
  categoryId: string;
}

export default function MenuItem({ item, index, categoryId }: MenuItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t, language } = useLanguage();
  
  const isDrink = categoryId === "drinks";

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const getItemName = (): string => {
    if (language === "ar") {
      return item.nameAr || "";
    } else if (language === "he") {
      return item.nameHe || "";
    }
    return item.nameAr || "";
  };

  const getItemDescription = (): string => {
    if (language === "ar") {
      return item.descriptionAr || "";
    } else if (language === "he") {
      return item.descriptionHe || "";
    }
    return item.descriptionAr || "";
  };

  const translatedName = getItemName();
  const translatedDescription = getItemDescription();

  return (
    <article 
      className={styles.item}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.imageContainer}>
        {!imageLoaded && (
          <div className={styles.imagePlaceholder}>
            <div className={styles.shimmer}></div>
          </div>
        )}
        {item.image && !imageError ? (
          <img
            src={`/images/${item.image}`}
            alt={translatedName}
            className={`${styles.image} ${imageLoaded ? styles.loaded : ""} ${isDrink ? styles.drinkImage : ""}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className={styles.noImage}>
            <span>✦</span>
          </div>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            {item.tags.slice(0, 2).map((tag) => {
              const translatedTag = t(`tags.${tag}`);
              return (
                <span key={tag} className={styles.tag}>
                  {translatedTag === `tags.${tag}` ? tag : translatedTag}
                </span>
              );
            })}
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.names}>
            <h3 className={styles.name}>{translatedName}</h3>
          </div>
          <div className={styles.price}>
            <span className={styles.currency}>{t("currency")}</span>
            <span className={styles.amount}>{item.price}</span>
          </div>
        </div>
        
        <p className={styles.description}>{translatedDescription}</p>
      </div>
    </article>
  );
}
