import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './MenuItem.module.css';

export default function MenuItem({ item, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t, language } = useLanguage();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Get translated name or fallback to item data
  const getItemName = () => {
    const translated = t(`items.${item.id}.name`);
    if (translated === `items.${item.id}.name`) {
      // No translation found, use item's name based on language
      if (language === 'ar') {
        return item.nameAr || item.nameIt || item.name;
      } else if (language === 'he') {
        return item.nameHe || item.name;
      }
      return item.name;
    }
    return translated;
  };

  // Get translated description or fallback to item data
  const getItemDescription = () => {
    const translated = t(`items.${item.id}.description`);
    if (translated === `items.${item.id}.description`) {
      if (language === 'ar') {
        return item.descriptionAr || item.description || '';
      } else if (language === 'he') {
        return item.descriptionHe || item.description || '';
      }
      return item.description || '';
    }
    return translated;
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
            className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
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
              // If no translation, show the tag as-is
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
            <span className={styles.currency}>{t('currency')}</span>
            <span className={styles.amount}>{item.price}</span>
          </div>
        </div>
        
        <p className={styles.description}>{translatedDescription}</p>
      </div>
    </article>
  );
}
