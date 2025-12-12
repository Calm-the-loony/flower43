import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './Compositions.css';

const allCompositions = [
  {
    id: 1,
    name: "Осенняя гармония",
    price: "4 200 ₽",
    description: "Композиция из сухоцветов, роз и ягод в деревянном ящике",
    image: "https://cdn-sh1.vigbo.com/shops/158573/products/22160120/images/3-3aa42ee4f3639c9978400966c0cf391d.jpg",
    category: "seasonal",
    style: "rustic",
    size: "medium",
    tags: ["сухоцветы", "осень", "деревянный ящик", "ягоды"]
  },
  {
    id: 2,
    name: "Свадебная элегантность", 
    price: "5 800 ₽",
    description: "Белоснежная композиция с орхидеями и розами для торжества",
    image: "https://allflow.ru/wa-data/public/shop/products/87/03/387/images/515/515.970.jpg",
    category: "wedding",
    style: "elegant",
    size: "large",
    tags: ["орхидеи", "белые розы", "свадьба", "торжество"]
  },
  {
    id: 3,
    name: "Весеннее пробуждение",
    price: "3 900 ₽",
    description: "Свежая композиция с тюльпанами, гиацинтами и ветками",
    image: "https://роза-мимоза.рф/image/cache/catalog/product/010/p206_1551168531_44760-1000x1000.jpg",
    category: "seasonal",
    style: "natural",
    size: "medium",
    tags: ["тюльпаны", "гиацинты", "весна", "свежесть"]
  },
  {
    id: 4,
    name: "Минимализм в стекле",
    price: "3 500 ₽", 
    description: "Лаконичная композиция с эвкалиптом в стеклянной вазе",
    image: "https://www.bloomr.com/cdn/shop/files/26922-90-1.jpg?v=1736245596",
    category: "modern",
    style: "minimalist",
    size: "small",
    tags: ["эвкалипт", "минимализм", "стекло"]
  },
  {
    id: 5,
    name: "Тропический рай",
    price: "6 200 ₽",
    description: "Экзотическая композиция с антуриумами и папоротником",
    image: "https://flowmagic.ru/wa-data/public/shop/products/50/09/950/images/1753/1753.750.jpg",
    category: "exotic",
    style: "tropical",
    size: "large",
    tags: ["антуриумы", "папоротник", "тропики", "экзотика"]
  },
  {
    id: 6,
    name: "Романтический шепот",
    price: "4 800 ₽",
    description: "Нежная композиция с пионами и гортензиями в пастельных тонах",
    image: "https://letoflowers.ru/upload/resize_cache/iblock/72f/1396_1396_1/qvrgjr35r456v202saox32faa30zknxj.jpeg",
    category: "romantic",
    style: "elegant",
    size: "medium",
    tags: ["пионы", "гортензии", "романтика", "пастель"]
  }
];

const categories = [
  { id: 'all', name: 'Все композиции', count: allCompositions.length },
  { id: 'seasonal', name: 'Сезонные', count: allCompositions.filter(c => c.category === 'seasonal').length },
  { id: 'wedding', name: 'Свадебные', count: allCompositions.filter(c => c.category === 'wedding').length },
  { id: 'modern', name: 'Современные', count: allCompositions.filter(c => c.category === 'modern').length },
  { id: 'romantic', name: 'Романтические', count: allCompositions.filter(c => c.category === 'romantic').length },
  { id: 'exotic', name: 'Экзотические', count: allCompositions.filter(c => c.category === 'exotic').length },
  { id: 'natural', name: 'Природные', count: allCompositions.filter(c => c.category === 'natural').length },
  { id: 'thematic', name: 'Тематические', count: allCompositions.filter(c => c.category === 'thematic').length },
  { id: 'vintage', name: 'Винтажные', count: allCompositions.filter(c => c.category === 'vintage').length },
  { id: 'celebration', name: 'Праздничные', count: allCompositions.filter(c => c.category === 'celebration').length }
];

const styles = [
  { id: 'all', name: 'Все стили' },
  { id: 'elegant', name: 'Элегантный' },
  { id: 'rustic', name: 'Деревенский' },
  { id: 'minimalist', name: 'Минимализм' },
  { id: 'tropical', name: 'Тропический' },
  { id: 'natural', name: 'Природный' },
  { id: 'urban', name: 'Урбанистический' },
  { id: 'luxury', name: 'Роскошный' },
  { id: 'oriental', name: 'Восточный' },
  { id: 'classic', name: 'Классический' }
];

const sizes = [
  { id: 'all', name: 'Любой размер' },
  { id: 'small', name: 'Маленький' },
  { id: 'medium', name: 'Средний' },
  { id: 'large', name: 'Большой' }
];

const priceRanges = [
  { id: 'all', name: 'Любая цена', min: 0, max: Infinity },
  { id: 'budget', name: 'До 4 000 ₽', min: 0, max: 4000 },
  { id: 'medium', name: '4 000 - 5 000 ₽', min: 4000, max: 5000 },
  { id: 'premium', name: 'От 5 000 ₽', min: 5000, max: Infinity }
];

export default function Compositions() {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredCompositions = useMemo(() => {
    let filtered = allCompositions;

    // Фильтрация по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(comp => comp.category === selectedCategory);
    }

    // Фильтрация по стилю
    if (selectedStyle !== 'all') {
      filtered = filtered.filter(comp => comp.style === selectedStyle);
    }

    // Фильтрация по размеру
    if (selectedSize !== 'all') {
      filtered = filtered.filter(comp => comp.size === selectedSize);
    }

    // Фильтрация по цене
    if (selectedPrice !== 'all') {
      const priceRange = priceRanges.find(range => range.id === selectedPrice);
      filtered = filtered.filter(comp => {
        const price = parseInt(comp.price.replace(/\s/g, '').replace('₽', ''));
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    // Поиск по названию и тегам
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comp => 
        comp.name.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query) ||
        comp.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/\s/g, '').replace('₽', ''));
          const priceB = parseInt(b.price.replace(/\s/g, '').replace('₽', ''));
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/\s/g, '').replace('₽', ''));
          const priceB = parseInt(b.price.replace(/\s/g, '').replace('₽', ''));
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Оставляем исходный порядок
        break;
    }

    return filtered;
  }, [selectedCategory, selectedStyle, selectedSize, selectedPrice, searchQuery, sortBy]);

  const handleAddToCart = (composition) => {
    const price = parseInt(composition.price.replace(/\s/g, '').replace('₽', ''));
    
    addToCart({
      id: composition.id,
      name: composition.name,
      price: price,
      image: composition.image,
      description: composition.description,
      category: 'composition'
    });

    // Визуальная обратная связь
    const button = document.querySelector(`[data-composition-id="${composition.id}"]`);
    if (button) {
      button.classList.add('added');
      setTimeout(() => {
        button.classList.remove('added');
      }, 1000);
    }
  };

  const handleToggleFavorite = (composition, e) => {
    e.stopPropagation();
    toggleFavorite(composition);
    
    const heartBtn = e.currentTarget;
    heartBtn.classList.add('heart-animate');
    setTimeout(() => {
      heartBtn.classList.remove('heart-animate');
    }, 600);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSelectedSize('all');
    setSelectedPrice('all');
    setSearchQuery('');
    setSortBy('default');
  };

  const getSizeIcon = (size) => {
    switch (size) {
      case 'small': return '🟢';
      case 'medium': return '🟡';
      case 'large': return '🔴';
      default: return '';
    }
  };

  const getStyleIcon = (style) => {
    switch (style) {
      case 'elegant': return '💎';
      case 'rustic': return '🌾';
      case 'minimalist': return '⬜';
      case 'tropical': return '🌴';
      case 'natural': return '🌿';
      case 'urban': return '🏙️';
      case 'luxury': return '👑';
      case 'oriental': return '🎎';
      case 'classic': return '🏛️';
      default: return '';
    }
  };

  return (
    <div className="compositions-page">
      <div className="container">
        {/* Hero секция */}
        <section className="compositions-hero">
          <div className="compositions-hero-content">
            <h1>Флористические композиции</h1>
            <p>Уникальные работы наших флористов для особых моментов</p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🎨</span>
                <span className="feature-text">Индивидуальный дизайн</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💐</span>
                <span className="feature-text">Свежие цветы</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span className="feature-text">Бережная доставка</span>
              </div>
            </div>
          </div>
        </section>

        {/* Фильтры и поиск */}
        <section className="compositions-filters">
          <div className="filters-header">
            <h2>Подберите идеальную композицию</h2>
            <p>Используйте фильтры для точного поиска</p>
          </div>

          <div className="filters-grid">
            {/* Поиск */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Поиск по названию, описанию или тегам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Основные фильтры */}
            <div className="main-filters">
              <div className="filter-group">
                <label className="filter-label">Категория</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Стиль</label>
                <select 
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="filter-select"
                >
                  {styles.map(style => (
                    <option key={style.id} value={style.id}>
                      {style.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Размер</label>
                <select 
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="filter-select"
                >
                  {sizes.map(size => (
                    <option key={size.id} value={size.id}>
                      {size.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Цена</label>
                <select 
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="filter-select"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Сортировка и сброс */}
            <div className="filter-actions">
              <div className="filter-group">
                <label className="filter-label">Сортировка</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="default">По умолчанию</option>
                  <option value="name">По названию</option>
                  <option value="price-asc">По цене (сначала дешевые)</option>
                  <option value="price-desc">По цене (сначала дорогие)</option>
                </select>
              </div>

              <button 
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                Сбросить все фильтры
              </button>
            </div>
          </div>

          {/* Результаты фильтрации */}
          <div className="filter-results">
            <p>Найдено композиций: <strong>{filteredCompositions.length}</strong></p>
            {(selectedCategory !== 'all' || selectedStyle !== 'all' || selectedSize !== 'all' || selectedPrice !== 'all' || searchQuery) && (
              <button 
                className="clear-filters-mobile"
                onClick={clearFilters}
              >
                × Сбросить фильтры
              </button>
            )}
          </div>
        </section>

        {/* Сетка композиций */}
        <section className="compositions-grid-section">
          {filteredCompositions.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🎨</div>
              <h3>Композиции не найдены</h3>
              <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
              <button 
                className="cta-button primary"
                onClick={clearFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="compositions-grid">
              {filteredCompositions.map((composition) => (
                <div key={composition.id} className="composition-card">
                  <div className="composition-image">
                    <img 
                      src={composition.image} 
                      alt={composition.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGN0Y3Ii8+CjxwYXRoIGQ9Ik0xNTAgODBDMTMwIDgwIDExNCA5NiAxMTQgMTE2QzExNCAxMzYgMTMwIDE1MiAxNTAgMTUyQzE3MCAxNTIgMTg2IDEzNiAxODYgMTE2QzE4NiA5NiAxNzAgODAgMTUwIDgwWiIgZmlsbD0iIzhCQzlBMSIvPgo8cGF0aCBkPSJNMTcwIDE0MEMxNjAgMTUwIDE0MCAxNTAgMTMwIDE0MEMxMjAgMTMwIDEyMCAxMTAgMTMwIDEwMEMxNDAgOTAgMTYwIDkwIDE3MCAxMDBDMTgwIDExMCAxODAgMTMwIDE3MCAxNDBaIiBmaWxsPSIjQzdBN0U3Ii8+CjxwYXRoIGQ9Ik0xNDAgMTYwTDE0MCAyMjBMMTYwIDIyMEwxNjAgMTYwIiBmaWxsPSIjODhDQThBIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                    <button 
                      className={`favorite-heart ${isFavorite(composition.id) ? 'active' : ''}`}
                      onClick={(e) => handleToggleFavorite(composition, e)}
                      title={isFavorite(composition.id) ? "Удалить из избранного" : "Добавить в избранное"}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
                      </svg>
                    </button>
                    <div className="composition-badges">
                      <span className="composition-badge category">{composition.category}</span>
                      <span className="composition-badge size">
                        {getSizeIcon(composition.size)} {composition.size}
                      </span>
                    </div>
                  </div>
                  
                  <div className="composition-info">
                    <div className="composition-header">
                      <h3 className="composition-name">{composition.name}</h3>
                      <span className="composition-style">
                        {getStyleIcon(composition.style)} {composition.style}
                      </span>
                    </div>
                    <p className="composition-description">{composition.description}</p>
                    <div className="composition-tags">
                      {composition.tags.map((tag, index) => (
                        <span key={index} className="composition-tag">#{tag}</span>
                      ))}
                    </div>
                    <div className="composition-footer">
                      <span className="composition-price">{composition.price}</span>
                      <button 
                        className="composition-add-to-cart"
                        onClick={() => handleAddToCart(composition)}
                        data-composition-id={composition.id}
                      >
                        <span>В корзину</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M8 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA секция */}
        <section className="compositions-cta">
          <div className="cta-content">
            <h2>Хотите уникальную композицию?</h2>
            <p>Наши флористы создадут эксклюзивную работу специально для вас</p>
            <div className="cta-buttons">
              <Link to="/custom-composition" className="cta-button primary">
  Заказать индивидуальную композицию
</Link>
              <Link to="/consultation" className="cta-button secondary">
                Получить консультацию
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}