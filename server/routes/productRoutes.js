const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Определяем маршруты
router.get('/featured', productController.getFeaturedProducts);
router.get('/bouquets', productController.getBouquets); // Этот маршрут
router.get('/all', productController.getBouquets); // Альтернативный маршрут
router.get('/test-db', productController.getTestProducts);
router.get('/static', productController.getStaticProducts);

// Экспортируем router
module.exports = router;