// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageProxyController');

// Прокси для внешних изображений
router.get('/proxy', imageController.proxyImage);

// Получение изображения продукта
router.get('/product/:productId/:index?', imageController.getProductImageProxy);

// Placeholder изображение
router.get('/placeholder', imageController.getPlaceholderImage);

module.exports = router;