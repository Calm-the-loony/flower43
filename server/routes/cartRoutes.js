const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Маршруты для корзины
router.post('/add', cartController.addToCart);
router.post('/update', cartController.updateQuantity);
router.post('/remove', cartController.removeFromCart);
router.get('/user/:userId', cartController.getCart);
router.post('/clear', cartController.clearCart);

module.exports = router;