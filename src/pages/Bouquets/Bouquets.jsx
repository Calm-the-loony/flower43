import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Bouquets.css';

const categories = [
  { id: 'all', name: 'Все букеты', dbField: null },
  { id: 'romantic', name: 'Романтические', dbField: 'romantic' },
  { id: 'wedding', name: 'Свадебные', dbField: 'wedding' },
  { id: 'birthday', name: 'На день рождения', dbField: 'birthday' },
  { id: 'luxury', name: 'Премиум', dbField: 'luxury' },
  { id: 'bouquet', name: 'Букеты', dbField: 'bouquet' },
  { id: 'plant', name: 'Растения', dbField: 'plant' },
  { id: 'composition', name: 'Композиции', dbField: 'composition' }
];

const priceRanges = [
  { id: 'all', name: 'Любая цена', min: 0, max: Infinity },
  { id: 'budget', name: 'До 3 000 ₽', min: 0, max: 3000 },
  { id: 'medium', name: '3 000 - 4 000 ₽', min: 3000, max: 4000 },
  { id: 'premium', name: 'От 4 000 ₽', min: 4000, max: Infinity }
];

export default function Bouquets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Загрузка товаров из БД
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Загрузка товаров из БД...');
        const response = await fetch('http://localhost:5000/api/products/bouquets');
        
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('📦 Ответ от сервера:', result);
        
        if (result.success) {
          setProducts(result.data);
          console.log(`✅ Данные загружены из БД: ${result.data.length} товаров`);
        } else {
          throw new Error(result.message || 'Ошибка при загрузке товаров');
        }
      } catch (error) {
        console.error('❌ Ошибка загрузки товаров:', error);
        setError(error.message);
        // В случае ошибки показываем пустой список
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    let filtered = [...products];

    // Фильтрация по категории (используем поле type из БД)
    if (selectedCategory !== 'all') {
      const selectedCat = categories.find(cat => cat.id === selectedCategory);
      if (selectedCat?.dbField) {
        filtered = filtered.filter(product => {
          // Проверяем поле type из БД или category_id
          return product.type === selectedCat.dbField || 
                 product.category?.name?.toLowerCase() === selectedCat.dbField ||
                 product.category_id?.toString() === selectedCat.dbField;
        });
      }
    }

    // Фильтрация по цене
    if (selectedPrice !== 'all') {
      const priceRange = priceRanges.find(range => range.id === selectedPrice);
      filtered = filtered.filter(product => {
        const productPrice = typeof product.price === 'number' ? product.price : 
                            parseFloat(product.price) || 0;
        return productPrice >= priceRange.min && productPrice <= priceRange.max;
      });
    }

    // Поиск по названию и описанию
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.name?.toLowerCase().includes(query)
      );
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
          const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
          const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        // Оставляем исходный порядок из БД
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedPrice, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSearchQuery('');
    setSortBy('default');
  };

  const handleQuickView = (product) => {
    // Реализация быстрого просмотра
    console.log('Быстрый просмотр:', product);
    // Здесь можно открыть модальное окно с деталями товара
  };

  return (
    <div className="bouquets-page">
      <div className="container">
        {/* Hero секция */}
        <section className="bouquets-hero">
          <div className="bouquets-hero-content">
            <h1>Каталог букетов</h1>
            <p>Свежие цветы и растения из нашего магазина</p>
          </div>
        </section>

        {/* Фильтры и поиск */}
        <section className="bouquets-filters">
          <div className="filters-grid">
            {/* Поиск - расширенный */}
            <div className="search-box-wide">
              <div className="search-container">
                <span className="search-icon"></span>
                <input
                  type="text"
                  placeholder="Поиск букетов по названию, описанию или категории..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-wide"
                />
                {searchQuery && (
                  <button 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Категории */}
            <div className="filter-group">
              <label className="filter-label">Категория</label>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-dot"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Цена и сортировка */}
            <div className="filter-row">
              <div className="filter-group price-group">
                <label className="filter-label">Ценовой диапазон</label>
                <div className="price-options">
                  {priceRanges.map(range => (
                    <button
                      key={range.id}
                      className={`price-option ${selectedPrice === range.id ? 'active' : ''}`}
                      onClick={() => setSelectedPrice(range.id)}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Сортировка</label>
                <div className="sort-options">
                  <button 
                    className={`sort-option ${sortBy === 'default' ? 'active' : ''}`}
                    onClick={() => setSortBy('default')}
                  >
                    По умолчанию
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'price-asc' ? 'active' : ''}`}
                    onClick={() => setSortBy('price-asc')}
                  >
                    По цене ↑
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'price-desc' ? 'active' : ''}`}
                    onClick={() => setSortBy('price-desc')}
                  >
                    По цене ↓
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'name' ? 'active' : ''}`}
                    onClick={() => setSortBy('name')}
                  >
                    По названию
                  </button>
                </div>
              </div>

              <button 
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                <span className="clear-icon">↻</span>
                Сбросить все
              </button>
            </div>
          </div>

          {/* Результаты фильтрации */}
          <div className="filter-results">
            <div className="results-info">
              <p className="results-count">
                Найдено <strong>{filteredProducts.length}</strong> товаров
                {loading && ' (загрузка...)'}
                {error && ` (ошибка: ${error})`}
              </p>
              {searchQuery && (
                <p className="search-query">
                  По запросу: "<strong>{searchQuery}</strong>"
                </p>
              )}
            </div>
            {(selectedCategory !== 'all' || selectedPrice !== 'all' || searchQuery) && (
              <button 
                className="clear-filters-mobile"
                onClick={clearFilters}
              >
                × Сбросить фильтры
              </button>
            )}
          </div>
        </section>

        {/* Сетка товаров */}
        <section className="bouquets-grid-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Загружаем товары...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-icon">❌</div>
              <h3>Ошибка загрузки</h3>
              <p>{error}</p>
              <button 
                className="cta-button primary"
                onClick={() => window.location.reload()}
              >
                Попробовать снова
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🌺</div>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
              <button 
                className="cta-button primary"
                onClick={clearFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          )}
        </section>

        {/* CTA секция */}
        <section className="bouquets-cta">
          <div className="cta-content">
            <h2>Не нашли подходящий букет?</h2>
            <p>Мы можем создать уникальную композицию специально для вас</p>
            <div className="cta-buttons">
              <a href="/custom-bouquet" className="cta-button primary">
                Создать свой букет
              </a>
              <a href="/delivery" className="cta-button secondary">
                Узнать о доставке
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}