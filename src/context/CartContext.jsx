import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка корзины с сервера
  const loadCart = async () => {
    if (!userId) {
      console.log('⚠️ userId не предоставлен, пропускаем загрузку корзины');
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Загрузка корзины для пользователя ${userId}...`);
      const response = await fetch(`http://localhost:5000/api/cart/user/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setCartItems(result.data);
        console.log(`✅ Загружено ${result.totalItems} товаров в корзине`);
      } else {
        throw new Error(result.message || 'Ошибка при загрузке корзины');
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки корзины:', error);
      setError(error.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка корзины при монтировании и изменении userId
  useEffect(() => {
    loadCart();
  }, [userId]);

  // Добавить в корзину
  const addToCart = async (product, quantity = 1) => {
    if (!userId) {
      console.warn('⚠️ Пользователь не авторизован, нельзя добавить в корзину');
      setError('Для добавления в корзину необходимо авторизоваться');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`➕ Добавление товара ${product.id} в корзину...`);
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.id,
          quantity: quantity
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Перезагружаем корзину для синхронизации
        await loadCart();
        
        console.log(`✅ Товар "${product.name}" добавлен в корзину`);
        return true;
      } else {
        throw new Error(result.message || 'Ошибка при добавлении в корзину');
      }
    } catch (error) {
      console.error('❌ Ошибка добавления в корзину:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Обновить количество
  const updateQuantity = async (productId, quantity) => {
    if (!userId) {
      console.warn('⚠️ Пользователь не авторизован, нельзя обновить корзину');
      setError('Для управления корзиной необходимо авторизоваться');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`📊 Обновление количества товара ${productId} до ${quantity}...`);
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          quantity: quantity
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Обновляем локальное состояние
        setCartItems(prev => {
          if (quantity <= 0) {
            return prev.filter(item => item.id !== productId);
          }
          return prev.map(item => 
            item.id === productId ? { ...item, quantity: quantity } : item
          );
        });
        
        console.log(`✅ Количество обновлено`);
        return true;
      } else {
        throw new Error(result.message || 'Ошибка при обновлении количества');
      }
    } catch (error) {
      console.error('❌ Ошибка обновления количества:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Удалить из корзины
  const removeFromCart = async (productId) => {
    if (!userId) {
      console.warn('⚠️ Пользователь не авторизован, нельзя удалить из корзины');
      setError('Для управления корзиной необходимо авторизоваться');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`➖ Удаление товара ${productId} из корзины...`);
      const response = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Обновляем локальное состояние
        setCartItems(prev => prev.filter(item => item.id !== productId));
        
        console.log(`✅ Товар удален из корзины`);
        return true;
      } else {
        throw new Error(result.message || 'Ошибка при удалении из корзины');
      }
    } catch (error) {
      console.error('❌ Ошибка удаления из корзины:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Очистить корзину
  const clearCart = async () => {
    if (!userId) {
      console.warn('⚠️ Пользователь не авторизован, нельзя очистить корзину');
      setError('Для управления корзиной необходимо авторизоваться');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🗑️ Очистка корзины...`);
      const response = await fetch('http://localhost:5000/api/cart/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Очищаем локальное состояние
        setCartItems([]);
        
        console.log(`✅ Корзина очищена`);
        return true;
      } else {
        throw new Error(result.message || 'Ошибка при очистке корзины');
      }
    } catch (error) {
      console.error('❌ Ошибка очистки корзины:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Рассчитать сумму
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Получить общее количество товаров (это то, что нужно для Header)
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Получить общее количество товаров (альтернативное название)
  const getTotalItems = () => {
    return getCartItemsCount();
  };

  // Проверить, есть ли товар в корзине
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Получить количество конкретного товара
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Обновить корзину (принудительная перезагрузка)
  const refreshCart = () => {
    loadCart();
  };

  // Очистить ошибки
  const clearError = () => {
    setError(null);
  };

  const value = {
    // Состояние
    cartItems,
    loading,
    error,
    
    // Основные действия
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    
    // Вспомогательные функции
    calculateSubtotal,
    getCartItemsCount, // Добавьте эту функцию
    getTotalItems,
    isInCart,
    getItemQuantity,
    refreshCart,
    clearError,
    
    // Информация о пользователе
    userId
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};