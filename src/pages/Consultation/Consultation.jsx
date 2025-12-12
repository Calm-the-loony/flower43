import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Consultation.css';

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: '',
    budget: '',
    style: '',
    colors: '',
    message: '',
    urgency: 'standard'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const occasions = [
    'Свадьба',
    'День рождения',
    'Юбилей',
    '8 марта',
    '14 февраля',
    'Выпускной',
    'Свидание',
    'Бизнес-мероприятие',
    'Просто так',
    'Другое'
  ];

  const styles = [
    'Элегантный',
    'Романтический',
    'Современный',
    'Винтажный',
    'Минимализм',
    'Тропический',
    'Деревенский',
    'Роскошный',
    'Классический'
  ];

  const budgets = [
    'До 3 000 ₽',
    '3 000 - 5 000 ₽',
    '5 000 - 8 000 ₽',
    '8 000 - 15 000 ₽',
    'От 15 000 ₽',
    'Не важно'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки данных
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      occasion: '',
      budget: '',
      style: '',
      colors: '',
      message: '',
      urgency: 'standard'
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="consultation-page">
        <div className="consultation-container">
          <div className="consultation-success">
            <div className="consultation-success-animation">
              <div className="consultation-success-icon">💐</div>
              <div className="consultation-confetti">✨</div>
            </div>
            <h1>Заявка принята!</h1>
            <p className="consultation-success-message">
              Спасибо, {formData.name || 'дорогой клиент'}! Наш флорист свяжется с вами 
              в течение 2 часов для уточнения деталей и предложит несколько вариантов композиций.
            </p>
            <div className="consultation-success-details">
              <div className="consultation-detail-card">
                <span className="consultation-detail-icon">📞</span>
                <div>
                  <h4>Свяжемся с вами</h4>
                  <p>По телефону {formData.phone || 'или email'}</p>
                </div>
              </div>
              <div className="consultation-detail-card">
                <span className="consultation-detail-icon">💎</span>
                <div>
                  <h4>Подберем варианты</h4>
                  <p>Идеальные композиции под ваш запрос</p>
                </div>
              </div>
              <div className="consultation-detail-card">
                <span className="consultation-detail-icon">🎨</span>
                <div>
                  <h4>Учтем все пожелания</h4>
                  <p>Цвета, стиль и бюджет</p>
                </div>
              </div>
            </div>
            <div className="consultation-success-actions">
              <button onClick={resetForm} className="consultation-cta-button consultation-primary">
                Отправить еще одну заявку
              </button>
              <Link to="/compositions" className="consultation-cta-button consultation-secondary">
                Посмотреть готовые композиции
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="consultation-page">
      <div className="consultation-container">
        {/* Hero секция */}
        <section className="consultation-hero">
          <div className="consultation-hero-content">
            <h1>Персональная консультация флориста</h1>
            <p>Расскажите о вашем событии, а мы создадим идеальную цветочную композицию</p>
            <div className="consultation-hero-features">
              <div className="consultation-feature">
                <span className="consultation-feature-icon">🎯</span>
                <span className="consultation-feature-text">Подберем под ваш бюджет</span>
              </div>
              <div className="consultation-feature">
                <span className="consultation-feature-icon">💡</span>
                <span className="consultation-feature-text">Учтем все пожелания</span>
              </div>
              <div className="consultation-feature">
                <span className="consultation-feature-icon">⚡</span>
                <span className="consultation-feature-text">Ответим в течение 2 часов</span>
              </div>
            </div>
          </div>
          <div className="consultation-hero-visual">
            <div className="consultation-floating consultation-flower">🌷</div>
            <div className="consultation-floating consultation-leaf">🍃</div>
            <div className="consultation-floating consultation-sparkle">✨</div>
          </div>
        </section>

        {/* Основная форма */}
        <section className="consultation-form-section">
          <div className="consultation-form-container">
            <form onSubmit={handleSubmit} className="consultation-form">
              {/* Личная информация */}
              <div className="consultation-form-section-group">
                <h3>📋 Ваши контакты</h3>
                <div className="consultation-form-grid">
                  <div className="consultation-form-group">
                    <label htmlFor="name">Имя *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Как к вам обращаться?"
                      required
                    />
                  </div>
                  <div className="consultation-form-group">
                    <label htmlFor="phone">Телефон *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___)-___-__-__"
                      required
                    />
                  </div>
                  <div className="consultation-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Для отправки фото вариантов"
                    />
                  </div>
                  <div className="consultation-form-group">
                    <label htmlFor="urgency">Срочность</label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                    >
                      <option value="standard">Стандартная (1-2 дня)</option>
                      <option value="urgent">Срочная (в течение дня)</option>
                      <option value="express">Экспресс (2-4 часа)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Детали заказа */}
              <div className="consultation-form-section-group">
                <h3>🎊 Детали мероприятия</h3>
                <div className="consultation-form-grid">
                  <div className="consultation-form-group">
                    <label htmlFor="occasion">Повод</label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                    >
                      <option value="">Выберите повод</option>
                      {occasions.map(occasion => (
                        <option key={occasion} value={occasion}>{occasion}</option>
                      ))}
                    </select>
                  </div>
                  <div className="consultation-form-group">
                    <label htmlFor="budget">Бюджет</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Выберите бюджет</option>
                      {budgets.map(budget => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>
                  <div className="consultation-form-group">
                    <label htmlFor="style">Предпочтительный стиль</label>
                    <select
                      id="style"
                      name="style"
                      value={formData.style}
                      onChange={handleChange}
                    >
                      <option value="">Выберите стиль</option>
                      {styles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                  <div className="consultation-form-group">
                    <label htmlFor="colors">Предпочтительные цвета</label>
                    <input
                      type="text"
                      id="colors"
                      name="colors"
                      value={formData.colors}
                      onChange={handleChange}
                      placeholder="Например: пастельные, красные, белые..."
                    />
                  </div>
                </div>
              </div>

              {/* Дополнительная информация */}
              <div className="consultation-form-section-group">
                <h3>💬 Расскажите подробнее</h3>
                <div className="consultation-form-group consultation-full-width">
                  <label htmlFor="message">
                    Опишите вашу ситуацию, пожелания или проблему *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Например: Нужен букет для свадьбы в винтажном стиле, невесты любит пионы и пастельные тоны. Или: Хочу удивить девушку на годовщину, но не знаю что выбрать..."
                    rows="6"
                    required
                  />
                  <div className="consultation-character-count">
                    {formData.message.length}/500 символов
                  </div>
                </div>
              </div>

              {/* Чекбоксы */}
              <div className="consultation-form-section-group">
                <div className="consultation-checkbox-group">
                  <label className="consultation-checkbox">
                    <input type="checkbox" required />
                    <span className="consultation-checkmark"></span>
                    Согласен с обработкой персональных данных
                  </label>
                  <label className="consultation-checkbox">
                    <input type="checkbox" />
                    <span className="consultation-checkmark"></span>
                    Хочу получать уведомления о новых коллекциях
                  </label>
                </div>
              </div>

              {/* Кнопка отправки */}
              <div className="consultation-form-actions">
                <button 
                  type="submit" 
                  className={`consultation-submit-button ${isSubmitting ? 'consultation-submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="consultation-spinner"></div>
                      Отправляем...
                    </>
                  ) : (
                    <>
                      ✨ Получить консультацию
                    </>
                  )}
                </button>
                <p className="consultation-form-note">
                  Наш флорист свяжется с вами в течение 2 часов в рабочее время
                </p>
              </div>
            </form>

            {/* Боковая панель с подсказками */}
            <div className="consultation-sidebar">
              <div className="consultation-sidebar-card">
                <h4>💡 Советы для лучшего результата</h4>
                <ul>
                  <li>Опишите событие как можно подробнее</li>
                  <li>Укажите любимые цветы получателя</li>
                  <li>Сообщите о аллергиях на цветы</li>
                  <li>Укажите предпочтительные цвета</li>
                  <li>Расскажите о характере получателя</li>
                </ul>
              </div>
              <div className="consultation-sidebar-card">
                <h4>📞 Свяжитесь напрямую</h4>
                <p>Если нужна срочная консультация:</p>
                <div className="consultation-contact-info">
                  <a href="tel:+78001234567" className="consultation-contact-link">
                    📞 8 (800) 123-45-67
                  </a>
                  <a href="https://wa.me/78001234567" className="consultation-contact-link">
                    💬 WhatsApp
                  </a>
                  <a href="https://t.me/florist_support" className="consultation-contact-link">
                    📱 Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Доверие и гарантии */}
        <section className="consultation-trust-section">
          <h2>Почему выбирают нашу консультацию</h2>
          <div className="consultation-trust-grid">
            <div className="consultation-trust-card">
              <span className="consultation-trust-icon">🎨</span>
              <h4>Индивидуальный подход</h4>
              <p>Каждая композиция создается с учетом ваших пожеланий и особенностей события</p>
            </div>
            <div className="consultation-trust-card">
              <span className="consultation-trust-icon">💎</span>
              <h4>Профессионализм</h4>
              <p>Опытные флористы с художественным образованием и стажем от 5 лет</p>
            </div>
            <div className="consultation-trust-card">
              <span className="consultation-trust-icon">📸</span>
              <h4>Фотоотчет</h4>
              <p>Пришлем фото готовой композиции перед доставкой для подтверждения</p>
            </div>
            <div className="consultation-trust-card">
              <span className="consultation-trust-icon">🔄</span>
              <h4>Корректировки</h4>
              <p>Можем внести изменения в композицию до момента сборки</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}