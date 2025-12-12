const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Определяем маршруты
router.get('/featured', productController.getFeaturedProducts);
router.get('/bouquets', productController.getBouquets);
router.get('/plants', productController.getPlants);
router.get('/compositions', productController.getCompositions);
router.get('/all', productController.getAllProducts);
router.post('/save', productController.createOrUpdateProduct);

// Экспортируем router
module.exports = router;