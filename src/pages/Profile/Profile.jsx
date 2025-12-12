import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, updateUser } = useAuth();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    
    setUserData(user);
    setEditForm(user);
  }, [user, isLoggedIn, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm(userData);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...userData,
        ...editForm
      };
      
      setUserData(updatedUser);
      updateUser(updatedUser);
      setIsEditing(false);
      
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  const handleCancel = () => {
    setEditForm(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!userData) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Хедер профиля */}
        <div className="profile-hero">
          <div className="profile-avatar">
            {userData.firstName?.charAt(0)}{userData.lastName?.charAt(0)}
          </div>
          <div className="profile-info">
            <h1>{userData.firstName} {userData.lastName}</h1>
            <p className="profile-email">{userData.email}</p>
            {userData.phone && (
              <p className="profile-phone">{userData.phone}</p>
            )}
          </div>
          <button 
            className="edit-profile-btn"
            onClick={handleEditToggle}
          >
            {isEditing ? 'Отменить' : 'Редактировать'}
          </button>
        </div>

        {/* Навигация */}
        <div className="profile-nav">
          <button 
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Профиль
          </button>
          <button 
            className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Мои заказы
          </button>
          <button 
            className={`nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Избранное
          </button>
        </div>

        {/* Контент */}
        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="content-section">
              <div className="info-card">
                <h2>Личная информация</h2>
                <div className="info-grid">
                  <div className="info-field">
                    <label>Имя</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={editForm.firstName || ''}
                        onChange={handleEditChange}
                        className="input-field"
                      />
                    ) : (
                      <span className="info-value">{userData.firstName}</span>
                    )}
                  </div>
                  
                  <div className="info-field">
                    <label>Фамилия</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={editForm.lastName || ''}
                        onChange={handleEditChange}
                        className="input-field"
                      />
                    ) : (
                      <span className="info-value">{userData.lastName}</span>
                    )}
                  </div>
                  
                  <div className="info-field">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email || ''}
                        onChange={handleEditChange}
                        className="input-field"
                      />
                    ) : (
                      <span className="info-value">{userData.email}</span>
                    )}
                  </div>
                  
                  <div className="info-field">
                    <label>Телефон</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone || ''}
                        onChange={handleEditChange}
                        className="input-field"
                        placeholder="+7 (999) 999-99-99"
                      />
                    ) : (
                      <span className="info-value">{userData.phone || 'Не указан'}</span>
                    )}
                  </div>

                  {userData.registrationDate && (
                    <div className="info-field">
                      <label>Дата регистрации</label>
                      <span className="info-value">
                        {new Date(userData.registrationDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="action-buttons">
                    <button className="btn primary" onClick={handleSave}>
                      Сохранить изменения
                    </button>
                    <button className="btn secondary" onClick={handleCancel}>
                      Отмена
                    </button>
                  </div>
                )}
              </div>

              <div className="stats-card">
                <h2>Статистика</h2>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">5</div>
                    <div className="stat-label">Заказов</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">12</div>
                    <div className="stat-label">Избранное</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">3</div>
                    <div className="stat-label">Года с нами</div>
                  </div>
                </div>
              </div>

              <div className="action-card">
                <button className="btn logout" onClick={handleLogout}>
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'favorites' && <FavoritesTab />}
        </div>
      </div>
    </div>
  );
}

// Компонент вкладки заказов
const OrdersTab = () => {
  const orders = [
    {
      id: 'FL-001',
      date: '2024-01-15',
      status: 'delivered',
      statusText: 'Доставлен',
      items: [
        { name: 'Романтический букет роз', price: 3500, quantity: 1 },
        { name: 'Шоколадные конфеты', price: 800, quantity: 1 }
      ],
      total: 4300,
    },
    {
      id: 'FL-002',
      date: '2024-01-10',
      status: 'processing',
      statusText: 'В обработке',
      items: [
        { name: 'Весенняя композиция', price: 2800, quantity: 1 }
      ],
      total: 2800,
    }
  ];

  return (
    <div className="content-section">
      <div className="orders-card">
        <h2>История заказов</h2>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <div className="order-info">
                  <h3>Заказ #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <span className={`order-status ${order.status}`}>
                  {order.statusText}
                </span>
              </div>
              
              <div className="order-details">
                {order.items.map((item, index) => (
                  <div key={index} className="order-product">
                    <span className="product-name">{item.name}</span>
                    <span className="product-quantity">×{item.quantity}</span>
                    <span className="product-price">{item.price} ₽</span>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-total">
                  Итого: <strong>{order.total} ₽</strong>
                </div>
                {order.status === 'delivered' && (
                  <button className="btn secondary">
                    Повторить заказ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент вкладки избранного
const FavoritesTab = () => {
  const favorites = [
    {
      id: 1,
      name: 'Букет нежных пионов',
      price: 3200,
      category: 'Букеты',
      inStock: true
    },
    {
      id: 2,
      name: 'Орхидея фаленопсис',
      price: 1800,
      category: 'Растения',
      inStock: true
    },
    {
      id: 3,
      name: 'Лавандовый букет',
      price: 2700,
      category: 'Букеты',
      inStock: false
    }
  ];

  return (
    <div className="content-section">
      <div className="favorites-card">
        <h2>Избранные товары</h2>
        <div className="favorites-list">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <div className="favorite-info">
                <span className="favorite-category">{item.category}</span>
                <h3 className="favorite-name">{item.name}</h3>
                <div className="favorite-price">{item.price} ₽</div>
              </div>
              <div className="favorite-actions">
                <button 
                  className={`btn primary ${!item.inStock ? 'disabled' : ''}`}
                  disabled={!item.inStock}
                >
                  {item.inStock ? 'В корзину' : 'Нет в наличии'}
                </button>
                <button className="btn icon">
                  ♡
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};