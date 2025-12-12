const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Маршруты для избранного
router.post('/add', favoritesController.addToFavorites);
router.post('/remove', favoritesController.removeFromFavorites);
router.get('/user/:userId', favoritesController.getFavorites);
router.get('/check/:userId/:productId', favoritesController.checkFavorite);

module.exports = router;