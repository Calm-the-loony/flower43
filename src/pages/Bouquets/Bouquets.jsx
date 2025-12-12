import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Bouquets.css';

// Используем правильные категории на основе данных из БД
const categories = [
  { id: 'all', name: 'Все букеты', dbField: null },
  { id: 'romantic-bouquets', name: 'Романтические', dbField: 'romantic' },
  { id: 'wedding-bouquets', name: 'Свадебные', dbField: 'wedding' },
  { id: 'seasonal-bouquets', name: 'Сезонные', dbField: 'seasonal' },
  { id: 'exotic-flowers', name: 'Экзотические', dbField: 'exotic' },
  { id: 'autumn-compositions', name: 'Осенние', dbField: 'autumn' },
  { id: 'minimalist', name: 'Минимализм', dbField: 'minimalist' }
];

const priceRanges = [
  { id: 'all', name: 'Любая цена', min: 0, max: Infinity },
  { id: 'budget', name: 'До 3 000 ₽', min: 0, max: 3000 },
  { id: 'medium', name: '3 000 - 4 000 ₽', min: 3000, max: 4000 },
  { id: 'premium', name: 'От 4 000 ₽', min: 4000, max: Infinity }
];

export default function Bouquets() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
        
        const response = await fetch('http://localhost:5000/api/products/all');
        
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          // Фильтруем только букеты и композиции, исключаем растения
          const bouquetsOnly = result.data.filter(product => 
            product.type === 'bouquet' || product.type === 'composition'
          );
          
          setProducts(bouquetsOnly);
        } else {
          throw new Error(result.message || 'Ошибка при загрузке товаров');
        }
      } catch (error) {
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Фильтрация и сортировка
  useEffect(() => {
    if (!products.length) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    // Фильтрация по категории
    if (selectedCategory !== 'all') {
      const selectedCat = categories.find(cat => cat.id === selectedCategory);
      if (selectedCat && selectedCat.dbField) {
        filtered = filtered.filter(product => {
          const categorySlug = product.category?.slug;
          const categoryName = product.category?.name?.toLowerCase();
          const productType = product.type;
          
          return (
            categorySlug === selectedCat.id ||
            categoryName === selectedCat.dbField ||
            productType === selectedCat.dbField ||
            (selectedCat.dbField === 'exotic' && categoryName?.includes('экзотич'))
          );
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
    if (searchQuery.trim()) {
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
        // Сортировка по дате создания (новые первыми)
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    setFilteredProducts(filtered);
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
    alert(`Быстрый просмотр: ${product.name}\nЦена: ${product.price} ₽`);
  };

  const getDisplayedProductsCount = () => {
    if (loading) return 'Загрузка...';
    if (error) return `Ошибка: ${error}`;
    return `Найдено ${filteredProducts.length} букетов`;
  };

  return (
    <div className="bouquets-page">
      <div className="container">
        {/* Hero секция */}
        <section className="bouquets-hero">
          <div className="bouquets-hero-content">
            <h1>Каталог букетов</h1>
            <p>Свежие цветы и прекрасные композиции для особых моментов</p>
          </div>
        </section>

        {/* Фильтры и поиск */}
        <section className="bouquets-filters">
          <div className="filters-grid">
            {/* Поиск */}
            <div className="search-box-wide">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Поиск букетов по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-wide"
                />
                {searchQuery && (
                  <button 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Очистить поиск"
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
                    aria-pressed={selectedCategory === category.id}
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
                      aria-pressed={selectedPrice === range.id}
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
                    aria-pressed={sortBy === 'default'}
                  >
                    По умолчанию
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'price-asc' ? 'active' : ''}`}
                    onClick={() => setSortBy('price-asc')}
                    aria-pressed={sortBy === 'price-asc'}
                  >
                    По цене ↑
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'price-desc' ? 'active' : ''}`}
                    onClick={() => setSortBy('price-desc')}
                    aria-pressed={sortBy === 'price-desc'}
                  >
                    По цене ↓
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'name' ? 'active' : ''}`}
                    onClick={() => setSortBy('name')}
                    aria-pressed={sortBy === 'name'}
                  >
                    По названию
                  </button>
                </div>
              </div>

              <button 
                className="clear-filters-btn"
                onClick={clearFilters}
                disabled={selectedCategory === 'all' && selectedPrice === 'all' && !searchQuery && sortBy === 'default'}
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
                {getDisplayedProductsCount()}
                {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
                  <span className="no-match"> (ничего не соответствует фильтрам)</span>
                )}
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
              <p>Загружаем букеты...</p>
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
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
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