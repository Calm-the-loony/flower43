import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './ProductCard.css';

const ProductCard = ({ 
  product, 
  onQuickView 
}) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [imageUrl, setImageUrl] = useState('/images/placeholder-flower.jpg');
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
    name,
    price,
    original_price,
    images,
    description,
    category,
    in_stock
  } = product;

  // Обработка изображений из БД
  useEffect(() => {
    console.log('🔍 Product data from DB:', { 
      id, 
      name, 
      images 
    });

    const processImageFromDB = () => {
      try {
        // Если images уже массив - используем первый элемент
        if (Array.isArray(images)) {
          return images[0] || '/images/placeholder-flower.jpg';
        }
        
        // Если images - JSON строка, парсим её
        if (typeof images === 'string') {
          // Пробуем распарсить JSON
          if (images.startsWith('[') || images.startsWith('"')) {
            try {
              const parsed = JSON.parse(images);
              if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed[0];
              }
            } catch (e) {
              console.log('❌ JSON parse failed, using as string:', images);
              return images;
            }
          }
          // Если это обычная строка с путем
          return images;
        }
        
        return '/images/placeholder-flower.jpg';
      } catch (error) {
        console.error('Error processing image:', error);
        return '/images/placeholder-flower.jpg';
      }
    };

    const finalImage = processImageFromDB();
    console.log('🖼️ Final image URL:', finalImage);
    setImageUrl(finalImage);
    setImageLoaded(false);
  }, [product, images, id]);

  const isOnSale = original_price && original_price > price;

  const normalizePrice = (priceValue) => {
    if (typeof priceValue === 'number') {
      return priceValue;
    }
    
    if (typeof priceValue === 'string') {
      const cleaned = priceValue.toString().replace(/\s/g, '').replace('₽', '');
      return parseFloat(cleaned) || 0;
    }
    
    return 0;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price: normalizePrice(price),
      image: imageUrl,
      description,
      category: category?.name || category
    });

    // Визуальная обратная связь
    const button = e.currentTarget;
    button.classList.add('added');
    setTimeout(() => {
      button.classList.remove('added');
    }, 1000);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite(product);
    
    const heartBtn = e.currentTarget;
    heartBtn.classList.add('heart-animate');
    setTimeout(() => {
      heartBtn.classList.remove('heart-animate');
    }, 600);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const formatPrice = (priceValue) => {
    const normalized = normalizePrice(priceValue);
    return new Intl.NumberFormat('ru-RU').format(normalized) + ' ₽';
  };

  const handleImageError = (e) => {
    console.error('❌ Image failed to load:', imageUrl);
    e.target.src = '/images/placeholder-flower.jpg';
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', imageUrl);
    setImageLoaded(true);
  };

  return (
    <div className={`product-card ${!in_stock ? 'out-of-stock' : ''}`}>
      <div className="product-card__content-wrapper">
        <Link to={`/product/${id}`} className="product-card__image-link">
          <div className="product-card__image">
            <img 
              src={imageUrl}
              alt={name}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={imageLoaded ? 'loaded' : 'loading'}
            />
            
            {/* Бейджи */}
            <div className="product-card__badges">
              {!in_stock && (
                <span className="badge badge-out-of-stock">Нет в наличии</span>
              )}
              {isOnSale && (
                <span className="badge badge-sale">Скидка</span>
              )}
            </div>

            {/* Действия */}
            <div className="product-card__actions">
              <button 
                className={`favorite-btn ${isFavorite(id) ? 'active' : ''}`}
                onClick={handleToggleFavorite}
                title={isFavorite(id) ? "Удалить из избранного" : "Добавить в избранное"}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
                </svg>
              </button>

              {in_stock && (
                <button 
                  className="quick-view-btn"
                  onClick={handleQuickView}
                  title="Быстрый просмотр"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </Link>

        <div className="product-card__content">
          {/* Название и описание */}
          <Link to={`/product/${id}`} className="product-card__text-link">
            <h3 className="product-card__name">{name}</h3>
            <p className="product-card__description">
              {description || 'Красивый букет для особого момента'}
            </p>
          </Link>

          {/* Цена и кнопка */}
          <div className="product-card__footer">
            <div className="product-price">
              {isOnSale && original_price && (
                <span className="original-price">
                  {formatPrice(original_price)}
                </span>
              )}
              <span className="current-price">
                {formatPrice(price)}
              </span>
            </div>

            <button 
              className={`add-to-cart-btn ${!in_stock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!in_stock}
              data-product-id={id}
            >
              {!in_stock ? 'Нет в наличии' : 'В корзину'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;