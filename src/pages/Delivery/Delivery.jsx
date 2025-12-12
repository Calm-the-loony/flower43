import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Delivery.css';

export default function Delivery() {
  const [activeTab, setActiveTab] = useState('rostov');

  const deliveryOptions = [
    {
      id: 'rostov',
      city: 'Ростов-на-Дону',
      time: '1-2 часа',
      price: 'Бесплатно',
      minOrder: 'от 1 500 ₽',
      description: 'Быстрая доставка по всему Ростову-на-Дону в пределах города',
      features: ['Курьерская доставка', 'СМС-уведомления', 'Фотоотчет', 'Выбор временного интервала']
    },
    {
      id: 'rostov-region',
      city: 'Ростовская область',
      time: '2-4 часа',
      price: 'от 250 ₽',
      minOrder: 'от 2 000 ₽',
      description: 'Доставка в ближайшие города Ростовской области',
      features: ['Курьерская доставка', 'Предварительный звонок', 'Точное время доставки']
    },
    {
      id: 'russia',
      city: 'По России',
      time: '1-3 дня',
      price: 'от 400 ₽',
      minOrder: 'от 2 500 ₽',
      description: 'Доставка в другие города России транспортными компаниями',
      features: ['СДЭК, Boxberry', 'Трек-номер для отслеживания', 'Страхование отправления']
    }
  ];

  const deliveryZones = [
    {
      zone: 'Центр города',
      time: '1-2 часа',
      price: 'Бесплатно',
      minOrder: '1 500 ₽'
    },
    {
      zone: 'Северный, Западный',
      time: '2-3 часа',
      price: '200 ₽',
      minOrder: '1 500 ₽'
    },
    {
      zone: 'Восточный, Александровка',
      time: '2-3 часа',
      price: '250 ₽',
      minOrder: '1 800 ₽'
    },
    {
      zone: 'Нахичевань, ЗЖМ',
      time: '2-3 часа',
      price: '200 ₽',
      minOrder: '1 500 ₽'
    }
  ];

  const workingHours = [
    { day: 'Понедельник - Пятница', hours: '8:00 - 22:00' },
    { day: 'Суббота', hours: '9:00 - 21:00' },
    { day: 'Воскресенье', hours: '9:00 - 20:00' }
  ];

  const faqItems = [
    {
      question: 'Можно ли заказать доставку в ночное время?',
      answer: 'Да, возможна доставка с 22:00 до 8:00 с доплатой 800 ₽. Заказ нужно оформить минимум за 24 часа.'
    },
    {
      question: 'Что если меня не будет дома в момент доставки?',
      answer: 'Курьер свяжется с вами за 30-60 минут до доставки. Если вас не будет, мы согласуем другое время или оставим букет соседям/консьержу.'
    },
    {
      question: 'Можно ли изменить адрес доставки после оформления заказа?',
      answer: 'Да, если заказ еще не передан курьеру. Позвоните нам по телефону +7 (863) 123-45-67 для изменения адреса.'
    },
    {
      question: 'Как сохраняется свежесть цветов при доставке?',
      answer: 'Мы используем специальные термоконтейнеры и влагоудерживающие материалы. Каждый букет упаковывается индивидуально для сохранения свежести.'
    }
  ];

  return (
    <div className="delivery-page">
      {/* Hero секция */}
      <section className="delivery-hero">
        <div className="container">
          <div className="delivery-hero-content">
            <h1>Доставка цветов в Ростове-на-Дону</h1>
            <p className="hero-subtitle">
              Быстрая и бережная доставка свежих цветов по всему Ростову-на-Дону и области. 
              Гарантируем сохранность и безупречный вид каждого букета.
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span className="feature-text">Бесплатная доставка от 1500 ₽</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⏰</span>
                <span className="feature-text">Доставка за 1-2 часа</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📸</span>
                <span className="feature-text">Фотоотчет о доставке</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-flower-decoration">
          <div className="flower">🌺</div>
          <div className="flower">🌷</div>
          <div className="flower">🌸</div>
        </div>
      </section>

      {/* Табы с вариантами доставки */}
      <section className="delivery-options">
        <div className="container">
          <h2>Варианты доставки</h2>
          <div className="tabs-container">
            <div className="tabs-header">
              {deliveryOptions.map(option => (
                <button
                  key={option.id}
                  className={`tab-button ${activeTab === option.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(option.id)}
                >
                  {option.city}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {deliveryOptions.map(option => (
                <div
                  key={option.id}
                  className={`tab-panel ${activeTab === option.id ? 'active' : ''}`}
                >
                  <div className="option-card">
                    <div className="option-header">
                      <div className="option-info">
                        <h3>Доставка в {option.city}</h3>
                        <p className="option-description">{option.description}</p>
                      </div>
                      <div className="option-stats">
                        <div className="stat">
                          <div className="stat-value">{option.time}</div>
                          <div className="stat-label">Время доставки</div>
                        </div>
                        <div className="stat">
                          <div className="stat-value">{option.price}</div>
                          <div className="stat-label">Стоимость</div>
                        </div>
                        <div className="stat">
                          <div className="stat-value">{option.minOrder}</div>
                          <div className="stat-label">Минимальный заказ</div>
                        </div>
                      </div>
                    </div>
                    <div className="option-features">
                      <h4>Что включено:</h4>
                      <div className="features-grid">
                        {option.features.map((feature, index) => (
                          <div key={index} className="feature-item">
                            <span className="check-icon">✓</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Зоны доставки по Ростову */}
      <section className="delivery-zones">
        <div className="container">
          <h2>Зоны доставки по Ростову-на-Дону</h2>
          <div className="zones-grid">
            {deliveryZones.map((zone, index) => (
              <div key={index} className="zone-card">
                <div className="zone-header">
                  <h3>{zone.zone}</h3>
                  <div className="zone-price">{zone.price}</div>
                </div>
                <div className="zone-details">
                  <div className="detail">
                    <span className="detail-label">Время:</span>
                    <span className="detail-value">{zone.time}</span>
                  </div>
                  <div className="detail">
                    <span className="detail-label">Мин. заказ:</span>
                    <span className="detail-value">{zone.minOrder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как работает доставка */}
      <section className="how-it-works">
        <div className="container">
          <h2>Как работает доставка</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Выберите букет</h3>
              <p>Подберите идеальный букет в нашем каталоге или создайте индивидуальную композицию</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Оформите заказ</h3>
              <p>Укажите адрес доставки в Ростове-на-Дону, получателя и желаемое время. Добавьте открытку к букету</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Подтверждение</h3>
              <p>Наш менеджер свяжется с вами для подтверждения заказа и уточнения деталей</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Доставка</h3>
              <p>Курьер доставит свежий букет в указанное время. Вы получите фотоотчет</p>
            </div>
          </div>
        </div>
      </section>

      {/* Время работы и контакты */}
      <section className="delivery-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>🕒 Время работы</h3>
              <div className="schedule">
                {workingHours.map((item, index) => (
                  <div key={index} className="schedule-item">
                    <span className="day">{item.day}</span>
                    <span className="hours">{item.hours}</span>
                  </div>
                ))}
              </div>
              <p className="note">
                * Доставка в ночное время (22:00-8:00) доступна с доплатой 800 ₽
              </p>
            </div>
            <div className="info-card">
              <h3>📞 Контакты</h3>
              <div className="contacts">
                <div className="contact-item">
                  <span className="contact-label">Телефон:</span>
                  <a href="tel:+78631234567" className="contact-value">+7 (863) 123-45-67</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href="mailto:delivery@floralbliss.ru" className="contact-value">delivery@floralbliss.ru</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Telegram:</span>
                  <a href="https://t.me/floralbliss_rostov" className="contact-value">@floralbliss_rostov</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Адрес:</span>
                  <span className="contact-value">г. Ростов-на-Дону, ул. Пушкинская, 150</span>
                </div>
              </div>
              <p className="note">
                Свяжитесь с нами для срочных заказов или особых пожеланий
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="delivery-faq">
        <div className="container">
          <h2>Частые вопросы</h2>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="delivery-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Готовы заказать доставку в Ростове?</h2>
            <p>
              Выберите свежий букет из нашего каталога, и мы доставим его в удобное для вас время по всему Ростову-на-Дону
            </p>
            <div className="cta-buttons">
              <Link to="/" className="cta-button primary">
                Смотреть каталог
              </Link>
              <Link to="/register" className="cta-button secondary">
                Создать аккаунт
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}