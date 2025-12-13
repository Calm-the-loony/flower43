import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

export default function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      name: "Анна Иванова",
      position: "Основатель и флорист",
      image: "https://content.onliner.by/news/1200x5616/de5ce5e0dc9a6b9f1add4146b8207233.jpg",
      description: "Создает уникальные композиции с 2015 года. Специализируется на свадебной флористике."
    },
    {
      id: 2,
      name: "Мария Петрова",
      position: "Ведущий флорист",
      image: "https://kartin.papik.pro/uploads/posts/2023-06/thumbs/1687158647_kartin-papik-pro-p-kartinki-florist-s-tsvetami-1.jpg",
      description: "Эксперт в создании современных флористических решений и букетов в стиле минимализм."
    },
    {
      id: 3,
      name: "Елена Сидорова",
      position: "Менеджер по работе с клиентами",
      image: "https://avatars.mds.yandex.net/get-altay/14920824/2a00000195d7acd4ff2cacc9f781bc2c2912/orig",
      description: "Помогает клиентам выбрать идеальный букет и организует доставку в любой уголок города."
    }
  ];

  const stats = [
    { number: "5+", label: "Лет на рынке" },
    { number: "2,500+", label: "Довольных клиентов" },
    { number: "15,000+", label: "Созданных букетов" },
    { number: "98%", label: "Положительных отзывов" }
  ];

  const values = [
    {
      icon: "🌿",
      title: "Свежесть",
      description: "Работаем только со свежими цветами от проверенных поставщиков"
    },
    {
      icon: "💝",
      title: "Качество",
      description: "Гарантируем высочайшее качество каждой композиции"
    },
    {
      icon: "⚡",
      title: "Скорость",
      description: "Доставляем букеты в течение 2 часов по городу"
    },
    {
      icon: "🎨",
      title: "Креативность",
      description: "Создаем уникальные дизайны для особых моментов"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero секция */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>О нас</h1>
          <p className="hero-subtitle">
            Создаем эмоции через цветы с 2019 года. Наша миссия — дарить радость 
            и вдохновение с помощью прекрасных флористических композиций.
          </p>
        </div>
        <div className="hero-flower-decoration">
          <div className="flower">🌺</div>
          <div className="flower">🌷</div>
          <div className="flower">🌸</div>
        </div>
      </section>

      {/* История */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Наша история</h2>
              <p>
                Всё началось с маленькой цветочной лавки в центре Ростова-на-Дону, где основательница Анна Иванова 
                создавала уникальные букеты для своих друзей и знакомых. Её страсть к цветам и внимание 
                к деталям быстро завоевали сердца клиентов.
              </p>
              <p>
                Сегодня Floral Bliss — это команда профессиональных флористов, которые продолжают 
                традиции качества и креативного подхода. Мы выросли, но сохранили теплую атмосферу 
                и индивидуальный подход к каждому клиенту.
              </p>
              <div className="story-features">
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <span className="feature-text">Индивидуальный подход к каждому заказу</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <span className="feature-text">Бесплатная доставка по городу</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💎</span>
                  <span className="feature-text">Только премиальные сорта цветов</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img 
                src="https://fd8f3b0d-a4a5-424f-9d57-1156ad7104f7.selcdn.net/uploads/images/95170/large_29-11-2021_14-19-41.jpg" 
                alt="Наша мастерская"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="about-stats">
        <div className="container">
          <h2>Floral Bliss в цифрах</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="about-values">
        <div className="container">
          <h2>Наши ценности</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="about-team">
        <div className="container">
          <h2>Наша команда</h2>
          <p className="team-subtitle">
            Талантливые флористы и менеджеры, которые делают каждый ваш день ярче
          </p>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    <div className="social-links">
                      <button className="social-btns">📱</button>
                      <button className="social-btns">💌</button>
                    </div>
                  </div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-position">{member.position}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
     {/* CTA секция - финальная версия */}
<section className="about-cta">
  <div className="about-cta-container">
    <div className="about-cta-content">
      <h2>Готовы создать что-то прекрасное вместе?</h2>
      <p className="about-cta-subtitle">
        Обращайтесь к нам для создания идеального букета для любого события — 
        от романтического свидания до корпоративного мероприятия.
      </p>
      <div className="about-cta-buttons">
        <Link to="/bouquets" className="about-cta-button primary">
          Смотреть каталог
        </Link>
        <Link to="/custom" className="about-cta-button secondary">
          Заказать дизайн
        </Link>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}