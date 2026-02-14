import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './MenuItem.module.css';

export default function MenuItem({ item, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const translatedName = t(`items.${item.id}.name`);
  const translatedDescription = t(`items.${item.id}.description`);

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
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className={styles.tag}>
                {t(`tags.${tag}`)}
              </span>
            ))}
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
