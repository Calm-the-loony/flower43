const pool = require('../config/db');
const {localeSeason, localeSize, localeStyle} = require('../utils/index');

const processImages = (images) => {
  if (!images) return ['/images/placeholder-flower.jpg'];
  
  try {
    if (Array.isArray(images)) {
      return images.length > 0 ? images : ['/images/placeholder-flower.jpg'];
    }
    
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        } else if (typeof parsed === 'string' && parsed.trim() !== '') {
          return [parsed];
        }
      } catch (parseError) {
        if (images.trim() !== '') {
          return [images];
        }
      }
    }
    
    return ['/images/placeholder-flower.jpg'];
  } catch (error) {
    console.error('Ошибка обработки изображений:', error);
    return ['/images/placeholder-flower.jpg'];
  }
};

const getDetailProductData = async (slug = '') => {
  const query = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        p.original_price,
        p.description,
        p.images,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        p.created_at,
        p.tags,
        p.style,
        p.size,
        p.season,
        p.weight_grams,
        p.height_cm,
        p.in_stock,
        p.stock_quantity,
        p.is_customizable,
        p.care_instructions,
        p.sales_count,
        c.name as category_name,
        c.slug as category_slug,
        pc.quantity as quantity_comp,
        pc.is_required as quantity_required_comp,
        bc.name as name_comp,
        bc.type as type_comp,
        bc.price as price_comp,
        bc.color as color_comp,
        bc.description as description_comp,
        bc.image as image_comp,
        bc.seasonality seasonality_comp
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_components pc ON pc.product_id = p.id
      LEFT JOIN bouquet_components bc ON bc.id = pc.component_id
      WHERE p.slug = ?
    `;

    const [product] = await pool.query(query, [slug]);

    return { 
      product: {
        name: product[0]?.name ?? '',
        slug: product[0].slug,
        price: product[0].price,
        original_price: product[0].original_price,
        description: product[0].description,
        images: processImages(product[0].images),
        type: product[0].type,
        in_stock: product[0].in_stock,
        is_customizable: product[0].is_customizable,
        created_at: product[0].created_at,
        tags: product[0].tags,
        style: localeStyle(product[0].style),
        size: localeStyle(product[0].size),
        season: localeSeason(product[0].season),
        weight: product[0].weight_grams,
        height: product[0].height_cm,
        stock_quantity: product[0].stock_quantity,
        care_instructions: product[0].care_instructions,
        sales_count: product[0].sales_count,
        category_name: product[0].category_name
      },
      components: product.map(pr => ({
        quantity: pr.quantity_comp,
        is_required: pr.quantity_required_comp,
        name: pr.name_comp,
        type: pr.type_comp,
        price: pr.price_comp,
        color: pr.color_comp,
        description: pr.description_comp,
        image: pr.image_comp,
        seasonality: pr.seasonality_comp
      }))
    }
}

const getProductsByType = async (type = null) => {
  try {
    let query = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        p.original_price,
        p.description,
        p.images,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        p.created_at,
        p.tags,
        p.style,
        p.size,
        p.season,
        p.weight_grams,
        p.height_cm,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.in_stock = TRUE
    `;
    
    const params = [];
    
    if (type) {
      query += ` AND p.type = ?`;
      params.push(type);
    }
    
    query += ` ORDER BY p.created_at DESC`;
    
    const [products] = await pool.query(query, params);
    
    return products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price) || 0,
      original_price: product.original_price ? parseFloat(product.original_price) : null,
      description: product.description || `Красивый ${type === 'plant' ? 'растение' : type === 'composition' ? 'композиция' : 'букет'} для особого момента`,
      images: processImages(product.images),
      category: { 
        id: product.category_id,
        name: product.category_name || "Без категории",
        slug: product.category_slug
      },
      category_id: product.category_id,
      type: product.type || 'bouquet',
      in_stock: Boolean(product.in_stock),
      is_customizable: Boolean(product.is_customizable),
      created_at: product.created_at,
      tags: product.tags ?? [],
      style: localeStyle(product.style),
      size: localeSize(product.size),
      season: localeSeason(product.season),
      weight: product.weight_grams,
      height: product.height_cm
    }));
  } catch (error) {
    console.error('Ошибка получения продуктов:', error);
    throw error;
  }
};

const getBouquets = async (req, res) => {
  try {
    console.log('💐 Получение букетов из БД...');
    
    const formattedProducts = await getProductsByType('bouquet');
    
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

const getPlants = async (req, res) => {
  try {
    console.log('🌿 Получение растений из БД...');
    
    const formattedProducts = await getProductsByType('plant');
    
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

const getDetailProductDataController = async (req, res) => {
  const productData = await getDetailProductData(req.params.slug);

  if (productData) {
    return res.json(productData);
  } else {
    res.status(404).json({
      message: 'Продукт не был найден'
    })
  }
}

const getCompositions = async (req, res) => {
  try {
    console.log('🎨 Получение композиций из БД...');
    
    const formattedProducts = await getProductsByType('composition');
    
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

const getAllProducts = async (req, res) => {
  try {
    console.log('📦 Получение всех товаров из БД...');
    
    const formattedProducts = await getProductsByType();
    
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
        p.slug,
        p.weight_grams,
        p.height_cm,
        p.style,
        p.season,
        p.size,
        p.tags,
        p.category_id,
        p.type,
        p.in_stock,
        p.is_customizable,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.in_stock = TRUE
      ORDER BY p.created_at DESC
      LIMIT 6
    `);

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price) || 0,
      original_price: product.original_price ? parseFloat(product.original_price) : null,
      description: product.description || 'Красивый продукт',
      images: processImages(product.images),
      category: { 
        id: product.category_id,
        name: product.category_name || "Без категории",
        slug: product.category_slug
      },
      type: product.type || 'bouquet',
      in_stock: Boolean(product.in_stock),
      is_customizable: Boolean(product.is_customizable),
      tags: product.tags ?? [],
      style: localeStyle(product.style),
      size: localeSize(product.size),
      season: localeSeason(product.season),
      weight: product.weight_grams,
      height: product.height_cm,
      slug: product.slug,
    }));

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

const createOrUpdateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      original_price,
      description,
      images,
      category_id,
      type = 'bouquet',
      in_stock = true,
      is_customizable = false
    } = req.body;

    let imagesToStore = null;
    if (images && Array.isArray(images) && images.length > 0) {
      const validImages = images.filter(img => {
        if (typeof img === 'string' && img.trim() !== '') {
          return img.startsWith('http') || img.startsWith('/') || img.startsWith('data:image');
        }
        return false;
      });
      
      if (validImages.length > 0) {
        imagesToStore = JSON.stringify(validImages);
      }
    }

    const [result] = await pool.query(
      `INSERT INTO products (name, price, original_price, description, images, category_id, type, in_stock, is_customizable)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       price = VALUES(price),
       original_price = VALUES(original_price),
       description = VALUES(description),
       images = VALUES(images),
       category_id = VALUES(category_id),
       type = VALUES(type),
       in_stock = VALUES(in_stock),
       is_customizable = VALUES(is_customizable)`,
      [
        name,
        price,
        original_price || null,
        description || null,
        imagesToStore,
        category_id || null,
        type,
        in_stock,
        is_customizable
      ]
    );

    res.json({
      success: true,
      data: { id: result.insertId || req.body.id },
      message: 'Продукт успешно сохранен'
    });
  } catch (error) {
    console.error('❌ Ошибка сохранения продукта:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при сохранении продукта: ' + error.message
    });
  }
};

module.exports = {
  getBouquets,
  getPlants,
  getCompositions,
  getAllProducts,
  getFeaturedProducts,
  createOrUpdateProduct,
  getDetailProductDataController
};
