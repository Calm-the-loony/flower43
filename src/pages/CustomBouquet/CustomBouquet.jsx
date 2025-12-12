import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CustomBouquet.css';

const flowerOptions = [
  {
    id: 1,
    name: "Розы",
    price: 150,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&h=200&fit=crop&crop=center",
    colors: ["красный", "белый", "розовый", "желтый"]
  },
  {
    id: 2,
    name: "Тюльпаны",
    price: 120,
    image: "https://images.unsplash.com/photo-1570024583994-0e85714aaaa6?w=200&h=200&fit=crop&crop=center",
    colors: ["красный", "желтый", "белый", "фиолетовый"]
  },
  {
    id: 3,
    name: "Лилии",
    price: 200,
    image: "https://images.unsplash.com/photo-1487070183333-13a19e8d7195?w=200&h=200&fit=crop&crop=center",
    colors: ["белый", "розовый", "оранжевый"]
  },
  {
    id: 4,
    name: "Хризантемы",
    price: 100,
    image: "https://images.unsplash.com/photo-1573992554016-98caa5b89ed6?w=200&h=200&fit=crop&crop=center",
    colors: ["белый", "желтый", "розовый", "фиолетовый"]
  },
  {
    id: 5,
    name: "Герберы",
    price: 130,
    image: "https://images.unsplash.com/photo-1585004349397-bf8c4074ab9c?w=200&h=200&fit=crop&crop=center",
    colors: ["красный", "желтый", "оранжевый", "розовый"]
  },
  {
    id: 6,
    name: "Пионы",
    price: 250,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&h=200&fit=crop&crop=center",
    colors: ["розовый", "белый", "красный"]
  },
  {
    id: 7,
    name: "Орхидеи",
    price: 300,
    image: "https://images.unsplash.com/photo-1487070183333-13a19e8d7195?w=200&h=200&fit=crop&crop=center",
    colors: ["белый", "фиолетовый", "розовый"]
  },
  {
    id: 8,
    name: "Гортензии",
    price: 180,
    image: "https://images.unsplash.com/photo-1570024583994-0e85714aaaa6?w=200&h=200&fit=crop&crop=center",
    colors: ["голубой", "розовый", "белый", "фиолетовый"]
  }
];

const greeneryOptions = [
  {
    id: 1,
    name: "Эвкалипт",
    price: 50,
    image: "https://images.unsplash.com/photo-1573992554016-98caa5b89ed6?w=200&h=200&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Папоротник",
    price: 40,
    image: "https://images.unsplash.com/photo-1585004349397-bf8c4074ab9c?w=200&h=200&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Рускус",
    price: 60,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&h=200&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Монстера",
    price: 70,
    image: "https://images.unsplash.com/photo-1487070183333-13a19e8d7195?w=200&h=200&fit=crop&crop=center"
  }
];

const packagingOptions = [
  {
    id: 1,
    name: "Крафтовая бумага",
    price: 100,
    image: "https://images.unsplash.com/photo-1573992554016-98caa5b89ed6?w=200&h=200&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Пленка",
    price: 80,
    image: "https://images.unsplash.com/photo-1585004349397-bf8c4074ab9c?w=200&h=200&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Шляпная коробка",
    price: 300,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&h=200&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Стеклянная ваза",
    price: 500,
    image: "https://images.unsplash.com/photo-1487070183333-13a19e8d7195?w=200&h=200&fit=crop&crop=center"
  }
];

const sizeOptions = [
  { id: 'small', name: 'Маленький (5-7 цветков)', multiplier: 1 },
  { id: 'medium', name: 'Средний (9-11 цветков)', multiplier: 1.5 },
  { id: 'large', name: 'Большой (13-15 цветков)', multiplier: 2 }
];

export default function CustomBouquet() {
  const { addToCart } = useCart();
  
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedGreenery, setSelectedGreenery] = useState([]);
  const [selectedPackaging, setSelectedPackaging] = useState(null);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [bouquetName, setBouquetName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const addFlower = (flower) => {
    setSelectedFlowers(prev => {
      const existing = prev.find(f => f.id === flower.id);
      if (existing) {
        return prev.map(f => 
          f.id === flower.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      return [...prev, { ...flower, quantity: 1, selectedColor: flower.colors[0] }];
    });
  };

  const removeFlower = (flowerId) => {
    setSelectedFlowers(prev => prev.filter(f => f.id !== flowerId));
  };

  const updateFlowerQuantity = (flowerId, quantity) => {
    if (quantity < 1) {
      removeFlower(flowerId);
      return;
    }
    setSelectedFlowers(prev =>
      prev.map(f => f.id === flowerId ? { ...f, quantity } : f)
    );
  };

  const updateFlowerColor = (flowerId, color) => {
    setSelectedFlowers(prev =>
      prev.map(f => f.id === flowerId ? { ...f, selectedColor: color } : f)
    );
  };

  const toggleGreenery = (greenery) => {
    setSelectedGreenery(prev => {
      const exists = prev.find(g => g.id === greenery.id);
      if (exists) {
        return prev.filter(g => g.id !== greenery.id);
      }
      return [...prev, greenery];
    });
  };

  const calculateTotalPrice = () => {
    const sizeMultiplier = sizeOptions.find(s => s.id === selectedSize)?.multiplier || 1;
    
    const flowersPrice = selectedFlowers.reduce((total, flower) => {
      return total + (flower.price * flower.quantity * sizeMultiplier);
    }, 0);

    const greeneryPrice = selectedGreenery.reduce((total, greenery) => {
      return total + greenery.price;
    }, 0);

    const packagingPrice = selectedPackaging ? selectedPackaging.price : 0;

    return flowersPrice + greeneryPrice + packagingPrice;
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotalPrice();
    
    const customBouquet = {
      id: `custom-${Date.now()}`,
      name: bouquetName || `Индивидуальный букет`,
      price: totalPrice,
      image: selectedFlowers[0]?.image || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=400&fit=crop&crop=center',
      description: `Индивидуальная композиция: ${selectedFlowers.map(f => `${f.name} (${f.selectedColor})`).join(', ')}`,
      isCustom: true,
      customDetails: {
        flowers: selectedFlowers,
        greenery: selectedGreenery,
        packaging: selectedPackaging,
        size: selectedSize,
        instructions: specialInstructions
      }
    };

    addToCart(customBouquet);
    
    // Показываем уведомление об успехе
    alert('Ваш индивидуальный букет добавлен в корзину!');
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedFlowers.length > 0;
      case 2:
        return true; // Зелень опциональна
      case 3:
        return selectedPackaging !== null;
      case 4:
        return true; // Размер всегда выбран
      case 5:
        return true; // Инструкции опциональны
      default:
        return false;
    }
  };

  return (
    <div className="custom-bouquet-page">
      <div className="container">
        {/* Хлебные крошки */}
        <nav className="breadcrumbs">
          <Link to="/">Главная</Link>
          <span> / </span>
          <span>Создать букет</span>
        </nav>

        {/* Заголовок */}
        <section className="custom-hero">
          <div className="custom-hero-content">
            <h1>Создайте свой идеальный букет</h1>
            <p>Выберите цветы, зелень и упаковку для уникальной композиции</p>
          </div>
        </section>

        {/* Прогресс бар */}
        <section className="progress-section">
          <div className="progress-bar">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className="progress-step">
                <div className={`step-circle ${currentStep >= step ? 'active' : ''}`}>
                  {step}
                </div>
                <span className="step-label">
                  {step === 1 && 'Цветы'}
                  {step === 2 && 'Зелень'}
                  {step === 3 && 'Упаковка'}
                  {step === 4 && 'Размер'}
                  {step === 5 && 'Детали'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="custom-bouquet-layout">
          {/* Основной контент */}
          <div className="custom-content">
            {/* Шаг 1: Выбор цветов */}
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Выберите цветы</h2>
                <p>Добавьте основные цветы для вашего букета</p>
                
                <div className="flowers-grid">
                  {flowerOptions.map(flower => (
                    <div key={flower.id} className="flower-card">
                      <div className="flower-image">
                        <img src={flower.image} alt={flower.name} />
                      </div>
                      <div className="flower-info">
                        <h4>{flower.name}</h4>
                        <p className="flower-price">{flower.price} ₽/шт</p>
                        <div className="flower-colors">
                          {flower.colors.map(color => (
                            <span 
                              key={color}
                              className="color-dot"
                              style={{ 
                                backgroundColor: getColorHex(color),
                                border: color === 'белый' ? '1px solid #ccc' : 'none'
                              }}
                              title={color}
                            />
                          ))}
                        </div>
                        <button 
                          className="add-flower-btn"
                          onClick={() => addFlower(flower)}
                        >
                          Добавить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Выбранные цветы */}
                {selectedFlowers.length > 0 && (
                  <div className="selected-flowers">
                    <h3>Выбранные цветы</h3>
                    {selectedFlowers.map(flower => (
                      <div key={flower.id} className="selected-flower">
                        <div className="flower-details">
                          <span className="flower-name">{flower.name}</span>
                          <select 
                            value={flower.selectedColor}
                            onChange={(e) => updateFlowerColor(flower.id, e.target.value)}
                            className="color-select"
                          >
                            {flower.colors.map(color => (
                              <option key={color} value={color}>{color}</option>
                            ))}
                          </select>
                        </div>
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateFlowerQuantity(flower.id, flower.quantity - 1)}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="quantity">{flower.quantity}</span>
                          <button 
                            onClick={() => updateFlowerQuantity(flower.id, flower.quantity + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFlower(flower.id)}
                            className="remove-btn"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Шаг 2: Выбор зелени */}
            {currentStep === 2 && (
              <div className="step-content">
                <h2>Добавьте зелень</h2>
                <p>Зелень придает букету объем и естественность (опционально)</p>
                
                <div className="greenery-grid">
                  {greeneryOptions.map(greenery => (
                    <div 
                      key={greenery.id} 
                      className={`greenery-card ${selectedGreenery.find(g => g.id === greenery.id) ? 'selected' : ''}`}
                      onClick={() => toggleGreenery(greenery)}
                    >
                      <div className="greenery-image">
                        <img src={greenery.image} alt={greenery.name} />
                      </div>
                      <div className="greenery-info">
                        <h4>{greenery.name}</h4>
                        <p className="greenery-price">{greenery.price} ₽</p>
                        <div className="selection-indicator">
                          {selectedGreenery.find(g => g.id === greenery.id) ? '✓ Выбрано' : 'Выбрать'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Шаг 3: Выбор упаковки */}
            {currentStep === 3 && (
              <div className="step-content">
                <h2>Выберите упаковку</h2>
                <p>Как будет оформлен ваш букет</p>
                
                <div className="packaging-grid">
                  {packagingOptions.map(packaging => (
                    <div 
                      key={packaging.id} 
                      className={`packaging-card ${selectedPackaging?.id === packaging.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPackaging(packaging)}
                    >
                      <div className="packaging-image">
                        <img src={packaging.image} alt={packaging.name} />
                      </div>
                      <div className="packaging-info">
                        <h4>{packaging.name}</h4>
                        <p className="packaging-price">{packaging.price} ₽</p>
                        <div className="selection-indicator">
                          {selectedPackaging?.id === packaging.id ? '✓ Выбрано' : 'Выбрать'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Шаг 4: Выбор размера */}
            {currentStep === 4 && (
              <div className="step-content">
                <h2>Выберите размер букета</h2>
                <p>Размер влияет на количество цветов и общую стоимость</p>
                
                <div className="size-options">
                  {sizeOptions.map(size => (
                    <div 
                      key={size.id}
                      className={`size-option ${selectedSize === size.id ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      <div className="size-info">
                        <h4>{size.name}</h4>
                        <p>Коэффициент цены: {size.multiplier}x</p>
                      </div>
                      <div className="selection-indicator">
                        {selectedSize === size.id ? '✓ Выбрано' : 'Выбрать'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Шаг 5: Детали заказа */}
            {currentStep === 5 && (
              <div className="step-content">
                <h2>Детали заказа</h2>
                <p>Добавьте персональные пожелания</p>
                
                <div className="order-details">
                  <div className="form-group">
                    <label htmlFor="bouquetName">Название букета (опционально)</label>
                    <input
                      type="text"
                      id="bouquetName"
                      value={bouquetName}
                      onChange={(e) => setBouquetName(e.target.value)}
                      placeholder="Например: Букет для мамы"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="specialInstructions">Особые пожелания</label>
                    <textarea
                      id="specialInstructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Любые особые пожелания по составу или оформлению..."
                      rows="4"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Навигация по шагам */}
            <div className="step-navigation">
              {currentStep > 1 && (
                <button className="nav-btn secondary" onClick={prevStep}>
                  ← Назад
                </button>
              )}
              
              {currentStep < 5 ? (
                <button 
                  className="nav-btn primary" 
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Далее →
                </button>
              ) : (
                <button 
                  className="nav-btn success" 
                  onClick={handleAddToCart}
                  disabled={selectedFlowers.length === 0}
                >
                  Добавить в корзину за {calculateTotalPrice().toLocaleString()} ₽
                </button>
              )}
            </div>
          </div>

          {/* Боковая панель с предпросмотром */}
          <div className="preview-sidebar">
            <div className="preview-card">
              <h3>Ваш букет</h3>
              
              <div className="preview-content">
                {selectedFlowers.length === 0 ? (
                  <div className="empty-preview">
                    <div className="empty-icon">💐</div>
                    <p>Выберите цветы для предпросмотра</p>
                  </div>
                ) : (
                  <>
                    <div className="preview-image">
                      <img 
                        src={selectedFlowers[0]?.image} 
                        alt="Предпросмотр букета" 
                      />
                    </div>
                    
                    <div className="preview-details">
                      <h4>{bouquetName || 'Индивидуальный букет'}</h4>
                      
                      <div className="preview-items">
                        <strong>Цветы:</strong>
                        {selectedFlowers.map(flower => (
                          <div key={flower.id} className="preview-item">
                            {flower.name} ({flower.selectedColor}) × {flower.quantity}
                          </div>
                        ))}
                      </div>

                      {selectedGreenery.length > 0 && (
                        <div className="preview-items">
                          <strong>Зелень:</strong>
                          {selectedGreenery.map(greenery => (
                            <div key={greenery.id} className="preview-item">
                              {greenery.name}
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedPackaging && (
                        <div className="preview-items">
                          <strong>Упаковка:</strong>
                          <div className="preview-item">{selectedPackaging.name}</div>
                        </div>
                      )}

                      <div className="preview-items">
                        <strong>Размер:</strong>
                        <div className="preview-item">
                          {sizeOptions.find(s => s.id === selectedSize)?.name}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="preview-total">
                <div className="total-price">
                  Итого: <span>{calculateTotalPrice().toLocaleString()} ₽</span>
                </div>
              </div>
            </div>

            {/* Подсказки */}
            <div className="tips-card">
              <h4>💡 Советы</h4>
              <ul className="tips-list">
                <li>Начните с 3-5 основных цветов</li>
                <li>Добавьте зелень для объема</li>
                <li>Учитывайте сочетание цветов</li>
                <li>Размер влияет на впечатление</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательная функция для цветов
function getColorHex(color) {
  const colorMap = {
    'красный': '#ff4444',
    'белый': '#ffffff',
    'розовый': '#ff99cc',
    'желтый': '#ffcc00',
    'фиолетовый': '#cc99ff',
    'оранжевый': '#ff9966',
    'голубой': '#66ccff'
  };
  return colorMap[color] || '#cccccc';
}