import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './Plants.css';

const allPlants = [
  {
    id: 1,
    name: "Монстера",
    price: "1 800 ₽",
    description: "Крупное тропическое растение с резными листьями. Идеально для просторных помещений.",
    image: "https://sun.pilea.ru/2018/02/monstera-17-teelt.psdLayer-0_1024x1024.png",
    category: "large",
    care: "легкий уход",
    light: "рассеянный свет",
    height: "100-150 см",
    tags: ["тропическое", "крупное", "декоративное"]
  },
  {
    id: 2,
    name: "Фикус Бенджамина", 
    price: "2 200 ₽",
    description: "Элегантное дерево с мелкими глянцевыми листьями. Очищает воздух в помещении.",
    image: "https://floragrowing.com/sites/default/files/img-plants/unnamed.jpg",
    category: "medium",
    care: "средний уход",
    light: "яркий свет",
    height: "80-120 см",
    tags: ["дерево", "очищает воздух", "элегантный"]
  },
  {
    id: 3,
    name: "Суккуленты набор",
    price: "1 500 ₽",
    description: "Набор из 3 суккулентов в керамических горшках. Идеально для начинающих.",
    image: "https://rosestar.ru/image/cache/catalog/import_yml/TT-/000/013/82/tt-00001382-1-550x550.jpg",
    category: "small",
    care: "легкий уход",
    light: "прямой свет",
    height: "10-15 см",
    tags: ["набор", "неприхотливый", "миниатюрный"]
  },
  {
    id: 4,
    name: "Орхидея Фаленопсис",
    price: "2 800 ₽", 
    description: "Нежная орхидея с продолжительным цветением. Элегантное украшение интерьера.",
    image: "https://rozavam.ru/uploads/photos/4910/4910_file_671fbfa4a6867.jfif",
    category: "flowering",
    care: "сложный уход",
    light: "рассеянный свет",
    height: "40-60 см",
    tags: ["цветущая", "элегантная", "тропическая"]
  },
  {
    id: 5,
    name: "Замиокулькас",
    price: "1 900 ₽",
    description: "Неприхотливое растение с глянцевыми темно-зелеными листьями. Выживает в любых условиях.",
    image: "https://cyber-flora.ru/wa-data/public/photos/37/16/1637/1637.970.jpg",
    category: "easycare",
    care: "очень легкий уход",
    light: "любой свет",
    height: "50-70 см",
    tags: ["неприхотливый", "для офиса", "современный"]
  },
  {
    id: 6,
    name: "Спатифиллум",
    price: "1 600 ₽",
    description: "Народное название 'Женское счастье'. Цветет белыми цветами и очищает воздух.",
    image: "https://greenisland.ru/upload/iblock/952/952f46e404ff45db6bbf21f271c95304.jpg",
    category: "flowering",
    care: "легкий уход",
    light: "полутень",
    height: "40-60 см",
    tags: ["цветущий", "очищает воздух", "неприхотливый"]
  },
];

const categories = [
  { id: 'all', name: 'Все растения', count: allPlants.length },
  { id: 'large', name: 'Крупные растения', count: allPlants.filter(p => p.category === 'large').length },
  { id: 'medium', name: 'Средние растения', count: allPlants.filter(p => p.category === 'medium').length },
  { id: 'small', name: 'Маленькие растения', count: allPlants.filter(p => p.category === 'small').length },
  { id: 'flowering', name: 'Цветущие', count: allPlants.filter(p => p.category === 'flowering').length },
  { id: 'succulents', name: 'Суккуленты', count: allPlants.filter(p => p.category === 'succulents').length },
  { id: 'easycare', name: 'Неприхотливые', count: allPlants.filter(p => p.category === 'easycare').length }
];

const careLevels = [
  { id: 'all', name: 'Любой уход' },
  { id: 'very-easy', name: 'Очень легкий' },
  { id: 'easy', name: 'Легкий' },
  { id: 'medium', name: 'Средний' },
  { id: 'hard', name: 'Сложный' }
];

const priceRanges = [
  { id: 'all', name: 'Любая цена', min: 0, max: Infinity },
  { id: 'budget', name: 'До 1 500 ₽', min: 0, max: 1500 },
  { id: 'medium', name: '1 500 - 2 500 ₽', min: 1500, max: 2500 },
  { id: 'premium', name: 'От 2 500 ₽', min: 2500, max: Infinity }
];

export default function Plants() {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedCare, setSelectedCare] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredPlants = useMemo(() => {
    let filtered = allPlants;

    // Фильтрация по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(plant => plant.category === selectedCategory);
    }

    // Фильтрация по цене
    if (selectedPrice !== 'all') {
      const priceRange = priceRanges.find(range => range.id === selectedPrice);
      filtered = filtered.filter(plant => {
        const price = parseInt(plant.price.replace(/\s/g, '').replace('₽', ''));
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    // Фильтрация по сложности ухода
    if (selectedCare !== 'all') {
      filtered = filtered.filter(plant => {
        switch (selectedCare) {
          case 'very-easy':
            return plant.care.includes('очень легкий');
          case 'easy':
            return plant.care.includes('легкий') && !plant.care.includes('очень');
          case 'medium':
            return plant.care.includes('средний');
          case 'hard':
            return plant.care.includes('сложный');
          default:
            return true;
        }
      });
    }

    // Поиск по названию и тегам
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(plant => 
        plant.name.toLowerCase().includes(query) ||
        plant.description.toLowerCase().includes(query) ||
        plant.tags.some(tag => tag.toLowerCase().includes(query))
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
      case 'height':
        filtered.sort((a, b) => {
          const heightA = parseInt(a.height.split('-')[0]);
          const heightB = parseInt(b.height.split('-')[0]);
          return heightA - heightB;
        });
        break;
      default:
        // Оставляем исходный порядок
        break;
    }

    return filtered;
  }, [selectedCategory, selectedPrice, selectedCare, searchQuery, sortBy]);

  const handleAddToCart = (plant) => {
    const price = parseInt(plant.price.replace(/\s/g, '').replace('₽', ''));
    
    addToCart({
      id: plant.id,
      name: plant.name,
      price: price,
      image: plant.image,
      description: plant.description,
      category: 'plant'
    });

    // Визуальная обратная связь
    const button = document.querySelector(`[data-plant-id="${plant.id}"]`);
    if (button) {
      button.classList.add('added');
      setTimeout(() => {
        button.classList.remove('added');
      }, 1000);
    }
  };

  const handleToggleFavorite = (plant, e) => {
    e.stopPropagation();
    toggleFavorite(plant);
    
    const heartBtn = e.currentTarget;
    heartBtn.classList.add('heart-animate');
    setTimeout(() => {
      heartBtn.classList.remove('heart-animate');
    }, 600);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSelectedCare('all');
    setSearchQuery('');
    setSortBy('default');
  };

  const getCareLevelIcon = (careLevel) => {
    switch (careLevel) {
      case 'очень легкий уход':
        return '🌱';
      case 'легкий уход':
        return '🍃';
      case 'средний уход':
        return '🌿';
      case 'сложный уход':
        return '🌸';
      default:
        return '🌱';
    }
  };

  const getLightIcon = (light) => {
    if (light.includes('прямой')) return '☀️';
    if (light.includes('яркий')) return '🔆';
    if (light.includes('рассеянный')) return '⛅';
    if (light.includes('полутень')) return '🌤️';
    return '💡';
  };

  return (
    <div className="plants-page">
      <div className="container">
        {/* Hero секция */}
        <section className="plants-hero">
          <div className="plants-hero-content">
            <h1>Комнатные растения</h1>
            <p>Создайте уют в вашем доме с нашими зелеными друзьями</p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🌿</span>
                <span className="feature-text">Свежие и здоровые растения</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span className="feature-text">Бережная доставка</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📚</span>
                <span className="feature-text">Консультации по уходу</span>
              </div>
            </div>
          </div>
        </section>

        {/* Фильтры и поиск */}
        <section className="plants-filters">
          <div className="filters-grid">
            {/* Поиск */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Поиск по названию растения..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Категории */}
            <div className="filter-group">
              <label className="filter-label">Категория растений</label>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Дополнительные фильтры */}
            <div className="filter-row">
              <div className="filter-group">
                <label className="filter-label">Сложность ухода</label>
                <select 
                  value={selectedCare}
                  onChange={(e) => setSelectedCare(e.target.value)}
                  className="filter-select"
                >
                  {careLevels.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.name}
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
                  <option value="height">По высоте</option>
                </select>
              </div>

              <button 
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          </div>

          {/* Результаты фильтрации */}
          <div className="filter-results">
            <p>Найдено растений: <strong>{filteredPlants.length}</strong></p>
            {(selectedCategory !== 'all' || selectedPrice !== 'all' || selectedCare !== 'all' || searchQuery) && (
              <button 
                className="clear-filters-mobile"
                onClick={clearFilters}
              >
                × Сбросить
              </button>
            )}
          </div>
        </section>

        {/* Сетка растений */}
        <section className="plants-grid-section">
          {filteredPlants.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🌵</div>
              <h3>Растения не найдены</h3>
              <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
              <button 
                className="cta-button primary"
                onClick={clearFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="plants-grid">
              {filteredPlants.map((plant) => (
                <div key={plant.id} className="plant-card">
                  <div className="plant-image">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGN0Y3Ii8+CjxwYXRoIGQ9Ik0xNTAgODBDMTMwIDgwIDExNCA5NiAxMTQgMTE2QzExNCAxMzYgMTMwIDE1MiAxNTAgMTUyQzE3MCAxNTIgMTg2IDEzNiAxODYgMTE2QzE4NiA5NiAxNzAgODAgMTUwIDgwWiIgZmlsbD0iIzhCQzlBMSIvPgo8cGF0aCBkPSJNMTcwIDE0MEMxNjAgMTUwIDE0MCAxNTAgMTMwIDE0MEMxMjAgMTMwIDEyMCAxMTAgMTMwIDEwMEMxNDAgOTAgMTYwIDkwIDE3MCAxMDBDMTgwIDExMCAxODAgMTMwIDE3MCAxNDBaIiBmaWxsPSIjQzdBN0U3Ii8+CjxwYXRoIGQ9Ik0xNDAgMTYwTDE0MCAyMjBMMTYwIDIyMEwxNjAgMTYwIiBmaWxsPSIjODhDQThBIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                    <button 
                      className={`favorite-heart ${isFavorite(plant.id) ? 'active' : ''}`}
                      onClick={(e) => handleToggleFavorite(plant, e)}
                      title={isFavorite(plant.id) ? "Удалить из избранного" : "Добавить в избранное"}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
                      </svg>
                    </button>
                    <div className="plant-badge">{plant.category}</div>
                  </div>
                  
                  <div className="plant-info">
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-description">{plant.description}</p>
                    
                    {/* Характеристики растения */}
                    <div className="plant-specs">
                      <div className="spec">
                        <span className="spec-icon">{getCareLevelIcon(plant.care)}</span>
                        <span className="spec-text">{plant.care}</span>
                      </div>
                      <div className="spec">
                        <span className="spec-icon">{getLightIcon(plant.light)}</span>
                        <span className="spec-text">{plant.light}</span>
                      </div>
                      <div className="spec">
                        <span className="spec-icon">📏</span>
                        <span className="spec-text">{plant.height}</span>
                      </div>
                    </div>

                    <div className="plant-tags">
                      {plant.tags.map((tag, index) => (
                        <span key={index} className="plant-tag">#{tag}</span>
                      ))}
                    </div>
                    
                    <div className="plant-footer">
                      <span className="plant-price">{plant.price}</span>
                      <button 
                        className="plant-add-to-cart"
                        onClick={() => handleAddToCart(plant)}
                        data-plant-id={plant.id}
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
        <section className="plants-cta">
          <div className="cta-content">
            <h2>Нужна помощь с выбором?</h2>
            <p>Наши консультанты помогут подобрать идеальное растение для ваших условий</p>
            <div className="cta-buttons">
              <Link to="/consultation" className="cta-button primary">
                Получить консультацию
              </Link>
              <Link to="/care" className="cta-button secondary">
                Узнать об уходе
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}