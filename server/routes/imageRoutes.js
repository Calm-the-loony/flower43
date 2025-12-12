const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageProxyController');

// Прокси для загрузки изображений
router.get('/proxy', imageController.proxyImage);

// Получить метаданные изображения
router.get('/metadata', imageController.getImageMetadata);

// Создать превью/миниатюру
router.get('/thumbnail', imageController.createThumbnail);

// Проверить доступность изображения
router.get('/check', imageController.checkImageAvailability);

// Скачать и сохранить изображение
router.post('/download', imageController.downloadImage);

module.exports = router;