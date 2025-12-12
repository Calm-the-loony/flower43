// services/ImageLoaderService.js
class ImageLoaderService {
  constructor() {
    this.imageCache = new Map(); // Кэш загруженных изображений
    this.loadingQueue = []; // Очередь загрузки
    this.maxConcurrentLoads = 3; // Максимальное одновременных загрузок
    this.currentLoads = 0; // Текущие загрузки
  }

  // Получить URL для загрузки (с поддержкой прокси)
  getImageUrl(imagePath) {
    if (!imagePath || imagePath.trim() === '') {
      return '/api/images/placeholder';
    }

    // Если уже полный URL
    if (imagePath.startsWith('http')) {
      // Для внешних URL всегда используем прокси
      return `/api/images/proxy?url=${encodeURIComponent(imagePath)}`;
    }

    // Если локальный путь
    if (imagePath.startsWith('/')) {
      return imagePath;
    }

    // Для всего остального используем placeholder
    return '/api/images/placeholder';
  }

  // Парсинг массива изображений из БД
  parseImages(imagesData) {
    if (!imagesData) return [];
    
    try {
      if (Array.isArray(imagesData)) {
        return imagesData.filter(img => img && img.trim() !== '');
      }
      
      if (typeof imagesData === 'string') {
        try {
          const parsed = JSON.parse(imagesData);
          if (Array.isArray(parsed)) {
            return parsed.filter(img => img && img.trim() !== '');
          }
        } catch {
          // Если это просто строка
          return [imagesData];
        }
      }
    } catch (error) {
      console.error('Ошибка парсинга изображений:', error);
    }
    
    return [];
  }

  // Загрузка одного изображения
  async loadSingleImage(imagePath) {
    const cacheKey = imagePath;
    
    // Проверяем кэш
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey);
    }

    const imageUrl = this.getImageUrl(imagePath);
    
    // Создаем промис для загрузки
    const loadPromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        console.log('✅ Изображение загружено:', imagePath);
        this.imageCache.set(cacheKey, img.src);
        this.currentLoads--;
        this.processQueue(); // Обрабатываем следующую в очереди
        resolve(img.src);
      };
      
      img.onerror = (error) => {
        console.warn('❌ Ошибка загрузки изображения:', imagePath, error);
        this.currentLoads--;
        this.processQueue();
        
        // Пробуем загрузить placeholder
        const placeholderUrl = '/api/images/placeholder';
        const placeholderImg = new Image();
        placeholderImg.onload = () => {
          this.imageCache.set(cacheKey, placeholderUrl);
          resolve(placeholderUrl);
        };
        placeholderImg.onerror = () => {
          this.imageCache.set(cacheKey, '');
          resolve('');
        };
        placeholderImg.src = placeholderUrl;
      };
      
      img.src = imageUrl;
    });

    // Добавляем в кэш сразу с промисом
    this.imageCache.set(cacheKey, loadPromise);
    
    return loadPromise;
  }

  // Добавление в очередь загрузки
  enqueueImageLoad(imagePath) {
    return new Promise((resolve) => {
      const task = async () => {
        try {
          const result = await this.loadSingleImage(imagePath);
          resolve(result);
        } catch (error) {
          resolve('/api/images/placeholder');
        }
      };
      
      this.loadingQueue.push(task);
      this.processQueue();
    });
  }

  // Обработка очереди
  processQueue() {
    while (this.loadingQueue.length > 0 && this.currentLoads < this.maxConcurrentLoads) {
      this.currentLoads++;
      const task = this.loadingQueue.shift();
      task();
    }
  }

  // Предварительная загрузка нескольких изображений
  async preloadImages(imagePaths) {
    const uniquePaths = [...new Set(imagePaths.filter(path => path && path.trim() !== ''))];
    
    // Загружаем первые 3 изображения сразу, остальные в очередь
    const immediateLoads = uniquePaths.slice(0, 3);
    const queuedLoads = uniquePaths.slice(3);
    
    const results = {};
    
    // Немедленная загрузка первых изображений
    await Promise.allSettled(
      immediateLoads.map(async (path) => {
        try {
          results[path] = await this.loadSingleImage(path);
        } catch {
          results[path] = '/api/images/placeholder';
        }
      })
    );
    
    // Остальные в очередь
    queuedLoads.forEach(path => {
      this.enqueueImageLoad(path).then(url => {
        results[path] = url;
      });
    });
    
    return results;
  }

  // Очистка кэша (опционально)
  clearCache() {
    this.imageCache.clear();
  }
}

// Синглтон экземпляр
const imageLoaderService = new ImageLoaderService();
export default imageLoaderService;