import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiUrl } from '../utils/apiConfig';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children, userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка избранного с сервера
  const loadFavorites = async () => {
    if (!userId) {
      console.log('⚠️ userId не предоставлен, пропускаем загрузку избранного');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Загрузка избранного для пользователя ${userId}...`);
      const response = await fetch(`${apiUrl}/favorites/user/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setFavorites(result.data);
        console.log(`✅ Загружено ${result.data.length} товаров в избранном`);
      } else {
        throw new Error(result.message || 'Ошибка при загрузке избранного');
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки избранного:', error);
      setError(error.message);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка избранного при монтировании и изменении userId
  useEffect(() => {
    loadFavorites();
  }, [userId]);

  // Добавить в избранное
  const addToFavorites = async (product) => {
    if (!userId) {
      console.warn('⚠️ Пользователь не авторизован, нельзя добавить в избранное');
      setError('Для добавления в избранное необходимо авторизоваться');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`➕ Добавление товара ${product.id} в избранное...`);
      const response = await fetch(`${apiUrl}/favorites/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.id
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setFavorites(prev => {
          const existingItem = prev.find(item => item.id === product.id);
          if (!existingItem) {
            return [...prev, { 
              ...product, 
              added_date: new Date().toISOString() 
            }];
          }
          return prev;
        });
        
        console.log(`✅ Товар "${product.name}" добавлен в избранное`);
        return true;
      } else {
        throw new Error(result.message || 'Ошибка при добавлении в избранное');
      }
    } catch (error) {
      console.error('❌ Ошибка добавления в избранное:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Удалить из избранного
  const removeFromFavorites = async (productId) => {
    if (!userId) {
      console.warn('⚠️ Пользователь не авторизован, нельзя удалить из избранного');
      setError('Для управления избранным необходимо авторизоваться');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`➖ Удаление товара ${productId} из избранного...`);
      const response = await fetch(`${apiUrl}/favorites/remove`, {
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
        setFavorites(prev => prev.filter(item => item.id !== productId));
        
        console.log(`✅ Товар удален из избранного`);
        return true;
      } else {
        throw new Error(result.message || 'Ошибка при удалении из избранного');
      }
    } catch (error) {
      console.error('❌ Ошибка удаления из избранного:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (product) => {
    const isCurrentlyFavorite = favorites.some(item => item.id === product.id);
    
    if (isCurrentlyFavorite) {
      return await removeFromFavorites(product.id);
    } else {
      return await addToFavorites(product);
    }
  };

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  // Очистить избранное
  const clearFavorites = async () => {
    if (!userId) {
      console.warn('⚠️ Пользователь не авторизован, нельзя очистить избранное');
      setError('Для управления избранным необходимо авторизоваться');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🗑️ Очистка всего избранного...`);
      
      // Удаляем все товары по одному
      const deletePromises = favorites.map(item => 
        fetch(`${apiUrl}/favorites/remove`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            productId: item.id
          })
        })
      );
      
      await Promise.all(deletePromises);
      
      setFavorites([]);
      
      console.log(`✅ Все избранное очищено`);
      return true;
    } catch (error) {
      console.error('❌ Ошибка очистки избранного:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Получить количество избранных товаров
  const getFavoritesCount = () => {
    return favorites.length;
  };

  const refreshFavorites = () => {
    loadFavorites();
  };

  // Очистить ошибки
  const clearError = () => {
    setError(null);
  };

  const value = {
    // Состояние
    favorites,
    loading,
    error,
    
    // Основные действия
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearFavorites,
    refreshFavorites,
    clearError,
    userId
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};