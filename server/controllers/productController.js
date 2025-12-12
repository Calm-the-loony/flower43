const pool = require('../config/db');

// Получить только букеты (type = 'bouquet')
const getBouquets = async (req, res) => {
  try {
    console.log('💐 Получение букетов из БД...');
    
    const [products] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.original_price,
        p.description,
        p.images,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        p.created_at,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.in_stock = TRUE AND p.type = 'bouquet'
      ORDER BY p.created_at DESC
    `);

    const formattedProducts = products.map(product => {
      let images = ['/images/placeholder-flower.jpg'];
      try {
        if (product.images) {
          if (Array.isArray(product.images)) {
            images = product.images;
          } else if (typeof product.images === 'string') {
            const parsed = JSON.parse(product.images);
            images = Array.isArray(parsed) ? parsed : [parsed];
          }
        }
      } catch (e) {
        console.log('Ошибка парсинга images:', e.message);
      }

      return {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        original_price: product.original_price ? parseFloat(product.original_price) : null,
        description: product.description || 'Красивый букет для особого момента',
        images: images,
        category: { 
          id: product.category_id,
          name: product.category_name || "Букеты",
          slug: product.category_slug
        },
        category_id: product.category_id,
        type: product.type || 'bouquet',
        in_stock: Boolean(product.in_stock),
        is_customizable: Boolean(product.is_customizable),
        created_at: product.created_at
      };
    });

    console.log(`✅ Найдено ${formattedProducts.length} букетов`);
    res.json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length
    });

  } catch (error) {
    console.error('❌ Ошибка получения букетов:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении букетов: ' + error.message
    });
  }
};

// Получить только растения (type = 'plant')
const getPlants = async (req, res) => {
  try {
    console.log('🌿 Получение растений из БД...');
    
    const [products] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.original_price,
        p.description,
        p.images,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        p.created_at,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.in_stock = TRUE AND p.type = 'plant'
      ORDER BY p.created_at DESC
    `);

    const formattedProducts = products.map(product => {
      let images = ['/images/placeholder-flower.jpg'];
      try {
        if (product.images) {
          if (Array.isArray(product.images)) {
            images = product.images;
          } else if (typeof product.images === 'string') {
            const parsed = JSON.parse(product.images);
            images = Array.isArray(parsed) ? parsed : [parsed];
          }
        }
      } catch (e) {
        console.log('Ошибка парсинга images:', e.message);
      }

      return {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        original_price: product.original_price ? parseFloat(product.original_price) : null,
        description: product.description || 'Красивое комнатное растение',
        images: images,
        category: { 
          id: product.category_id,
          name: product.category_name || "Растения"
        },
        category_id: product.category_id,
        type: product.type || 'plant',
        in_stock: Boolean(product.in_stock),
        is_customizable: Boolean(product.is_customizable),
        created_at: product.created_at
      };
    });

    console.log(`✅ Найдено ${formattedProducts.length} растений`);
    res.json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length
    });

  } catch (error) {
    console.error('❌ Ошибка получения растений:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении растений: ' + error.message
    });
  }
};

// Получить только композиции (type = 'composition')
const getCompositions = async (req, res) => {
  try {
    console.log('🎨 Получение композиций из БД...');
    
    const [products] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.original_price,
        p.description,
        p.images,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        p.created_at,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.in_stock = TRUE AND p.type = 'composition'
      ORDER BY p.created_at DESC
    `);

    const formattedProducts = products.map(product => {
      let images = ['/images/placeholder-flower.jpg'];
      try {
        if (product.images) {
          if (Array.isArray(product.images)) {
            images = product.images;
          } else if (typeof product.images === 'string') {
            const parsed = JSON.parse(product.images);
            images = Array.isArray(parsed) ? parsed : [parsed];
          }
        }
      } catch (e) {
        console.log('Ошибка парсинга images:', e.message);
      }

      return {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        original_price: product.original_price ? parseFloat(product.original_price) : null,
        description: product.description || 'Красивая цветочная композиция',
        images: images,
        category: { 
          id: product.category_id,
          name: product.category_name || "Композиции"
        },
        category_id: product.category_id,
        type: product.type || 'composition',
        in_stock: Boolean(product.in_stock),
        is_customizable: Boolean(product.is_customizable),
        created_at: product.created_at
      };
    });

    console.log(`✅ Найдено ${formattedProducts.length} композиций`);
    res.json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length
    });

  } catch (error) {
    console.error('❌ Ошибка получения композиций:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении композиций: ' + error.message
    });
  }
};

// Получить все товары (для каталога)
const getAllProducts = async (req, res) => {
  try {
    console.log('📦 Получение всех товаров из БД...');
    
    const [products] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.original_price,
        p.description,
        p.images,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        p.created_at,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.in_stock = TRUE
      ORDER BY p.created_at DESC
    `);

    const formattedProducts = products.map(product => {
      let images = ['/images/placeholder-flower.jpg'];
      try {
        if (product.images) {
          if (Array.isArray(product.images)) {
            images = product.images;
          } else if (typeof product.images === 'string') {
            const parsed = JSON.parse(product.images);
            images = Array.isArray(parsed) ? parsed : [parsed];
          }
        }
      } catch (e) {
        console.log('Ошибка парсинга images:', e.message);
      }

      return {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        original_price: product.original_price ? parseFloat(product.original_price) : null,
        description: product.description || 'Красивый продукт',
        images: images,
        category: { 
          id: product.category_id,
          name: product.category_name || "Без категории"
        },
        category_id: product.category_id,
        type: product.type || 'bouquet',
        in_stock: Boolean(product.in_stock),
        is_customizable: Boolean(product.is_customizable),
        created_at: product.created_at
      };
    });

    console.log(`✅ Найдено ${formattedProducts.length} товаров`);
    res.json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length
    });

  } catch (error) {
    console.error('❌ Ошибка получения товаров:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении товаров: ' + error.message
    });
  }
};

// Получить featured товары
const getFeaturedProducts = async (req, res) => {
  try {
    console.log('⭐ Получение featured товаров...');
    
    const [products] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.original_price,
        p.description,
        p.images,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.in_stock = TRUE
      ORDER BY p.created_at DESC
      LIMIT 6
    `);

    const formattedProducts = products.map(product => {
      let images = ['/images/placeholder-flower.jpg'];
      try {
        if (product.images) {
          if (Array.isArray(product.images)) {
            images = product.images;
          } else if (typeof product.images === 'string') {
            const parsed = JSON.parse(product.images);
            images = Array.isArray(parsed) ? parsed : [parsed];
          }
        }
      } catch (e) {
        console.log('Ошибка парсинга images:', e.message);
      }

      return {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        original_price: product.original_price ? parseFloat(product.original_price) : null,
        description: product.description || 'Красивый букет для особого момента',
        images: images,
        category: { name: product.category_name || "Букеты" },
        type: product.type || 'bouquet',
        in_stock: Boolean(product.in_stock),
        is_customizable: Boolean(product.is_customizable)
      };
    });

    res.json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length
    });

  } catch (error) {
    console.error('❌ Ошибка получения товаров:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении товаров: ' + error.message
    });
  }
};

module.exports = {
  getBouquets,
  getPlants,
  getCompositions,
  getAllProducts,
  getFeaturedProducts,
  getTestProducts: (req, res) => res.json({ success: true, message: 'Тестовый маршрут' }),
  getStaticProducts: (req, res) => res.json({ success: true, message: 'Статические данные' })
};