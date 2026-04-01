-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3307
-- Время создания: Фев 16 2026 г., 13:35
-- Версия сервера: 5.7.39
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `floral_bliss`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bouquet_components`
--

CREATE TABLE `bouquet_components` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('flower','greenery','accessory','packaging') COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT '1',
  `seasonality` json DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `bouquet_components`
--

INSERT INTO `bouquet_components` (`id`, `name`, `type`, `price`, `image`, `color`, `in_stock`, `seasonality`, `description`, `is_active`) VALUES
(1, 'Красная роза', 'flower', '150.00', 'https://nflo.ru/upload/iblock/053/8ft4w988rscd99x1dfrk2umeendvicno.webp', 'red', 1, '[\"all\"]', 'Классическая красная роза', 1),
(2, 'Белая роза', 'flower', '140.00', 'https://million-buketov.ru/d/roza-belaya.jpg', 'white', 1, '[\"all\"]', 'Элегантная белая роза', 1),
(3, 'Розовая роза', 'flower', '145.00', 'https://sflower.ru/images/flowers/large/d6473500.jpg', 'pink', 1, '[\"all\"]', 'Нежная розовая роза', 1),
(4, 'Пион', 'flower', '200.00', 'https://nflo.ru/upload/iblock/3ca/q45dbf2648nkhkmphfyftoo2nwqt2p1f.webp', 'pink', 1, '[\"spring\", \"summer\"]', 'Пышный пион', 1),
(5, 'Тюльпан', 'flower', '80.00', 'https://flowers-nadym.ru/assets/cache_image/products/986/tyul-fiolet_1000x0_94b.jpg', 'multi', 1, '[\"spring\"]', 'Весенний тюльпан', 1),
(6, 'Гербера', 'flower', '120.00', 'https://flowers-yar.ru/assets/images/products/279/pinkgerbera.jpg', 'multi', 1, '[\"all\"]', 'Яркая гербера', 1),
(7, 'Орхидея фаленопсис', 'flower', '300.00', 'https://stroygreen.ru/files/products/16-0144.800x600w.png', 'white', 1, '[\"all\"]', 'Экзотическая орхидея', 1),
(8, 'Лилия', 'flower', '180.00', 'https://gardengrove.ru/upload/iblock/6ae/q0rwbsrc367zomsidao2y8qittb2q7yx/liliya_zheltaya_iskusstvennaya_8ja026yel.jpg', 'white', 1, '[\"summer\"]', 'Ароматная лилия', 1),
(9, 'Хризантема', 'flower', '90.00', 'https://foni.papik.pro/uploads/posts/2024-10/foni-papik-pro-anqa-p-kartinki-khrizantemi-belie-na-prozrachnom-2.png', 'multi', 1, '[\"autumn\"]', 'Пышная хризантема', 1),
(10, 'Гортензия', 'flower', '220.00', 'https://free-png.ru/wp-content/uploads/2021/05/free-png.ru-141.png', 'blue', 1, '[\"summer\"]', 'Объемная гортензия', 1),
(11, 'Подсолнух', 'flower', '100.00', 'https://img.freepik.com/free-vector/vibrant-sunflower-vector-illustration-with-detailed-petals_1308-180753.jpg?semt=ais_hybrid&w=740&q=80', 'yellow', 1, '[\"summer\"]', 'Солнечный подсолнух', 1),
(12, 'Лаванда', 'flower', '130.00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowg8rpEmtjQB59zXSc5fQ7IsJnPcsaoVYBw&s', 'purple', 1, '[\"summer\"]', 'Ароматная лаванда', 1),
(13, 'Альстромерия', 'flower', '110.00', 'https://millionroz.by/image/catalog/blog/entsiklopediya/alstromeria.png.png', 'multi', 1, '[\"all\"]', 'Долгостоящая альстромерия', 1),
(14, 'Ирис', 'flower', '95.00', 'https://thumbs.dreamstime.com/b/пурпурный-ирис-без-фона-изолировать-на-белом-фоне-158402877.jpg', 'purple', 1, '[\"spring\"]', 'Изящный ирис', 1),
(15, 'Антуриум', 'flower', '250.00', 'https://png.pngtree.com/png-clipart/20221231/original/pngtree-anthurium-andraeanum-png-image_8838021.png', 'red', 1, '[\"all\"]', 'Экзотический антуриум', 1),
(16, 'Эвкалипт', 'greenery', '70.00', 'https://cdn.lemanapro.ru/lmru/image/upload/f_auto/q_auto/dpr_1.0/c_pad/w_1000/h_1000/v1695938495/lmcode/ofpaabXkIEuLj4QekCuRIA/91400120.jpg', 'green', 1, '[\"all\"]', 'Ароматный эвкалипт', 1),
(17, 'Папоротник', 'greenery', '60.00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRarxxaGZsU406-s-majqdxEjxEiUMXOJYDpg&s', 'green', 1, '[\"all\"]', 'Ажурный папоротник', 1),
(18, 'Рускус', 'greenery', '65.00', 'https://magcvetov.ru/files/cms/common/111.600x600_frame.png', 'green', 1, '[\"all\"]', 'Декоративный рускус', 1),
(19, 'Салал', 'greenery', '55.00', 'https://nflo.ru/upload/iblock/eec/x39ti73tjecnmm4772s3xkdancxapsc8.webp', 'green', 1, '[\"all\"]', 'Универсальная зелень салал', 1),
(20, 'Бересклет', 'greenery', '75.00', 'https://rastenievod.com/wp-content/uploads/2016/12/14.jpg', 'green', 1, '[\"all\"]', 'Пестрый бересклет', 1),
(21, 'Декоративная лента', 'accessory', '50.00', 'https://cdn-icons-png.flaticon.com/512/9445/9445252.png', 'multi', 1, '[\"all\"]', 'Шелковая лента для оформления', 1),
(22, 'Праздничный бант', 'accessory', '80.00', 'https://cdn-icons-png.flaticon.com/512/1065/1065674.png', 'multi', 1, '[\"all\"]', 'Большой праздничный бант', 1),
(23, 'Блестки', 'accessory', '30.00', 'https://cdn-icons-png.flaticon.com/512/1534/1534952.png', 'gold', 0, '[\"all\"]', 'Декоративные блестки', 0),
(24, 'Жемчужные бусины', 'accessory', '100.00', 'https://img.freepik.com/free-vector/vector-icon-illustration-colorful-seashell-with-pearl_134830-1673.jpg', 'white', 1, '[\"all\"]', 'Нити жемчужных бусин', 1),
(25, 'Крафтовая бумага', 'packaging', '40.00', 'https://spck.ru/upload/iblock/1c3/1c3ccb126db9808ce6433a2ab3d2b6b0.jpg', 'brown', 1, '[\"all\"]', 'Экологичная крафтовая бумага', 1),
(26, 'Пленка для цветов', 'packaging', '25.00', 'https://cdn-sh1.vigbo.com/shops/179997/products/20906660/images/3-a246515e0056bf83b923d9f8f53b9100.jpg?version=undefined', 'clear', 1, '[\"all\"]', 'Защитная пленка', 1),
(27, 'Подарочная коробка', 'packaging', '150.00', 'https://www.mir-yarkiy.ru/upload/iblock/beb/beb5f2e77b9e07ea592d3589f4f10199.jpg', 'white', 1, '[\"all\"]', 'Элегантная подарочная коробка', 1),
(28, 'Стеклянная ваза', 'packaging', '200.00', 'https://kupikashpo.ru/upload/cssinliner_webp/iblock/ac3/yiulq1dkgtagsc9p16te2h37aaaf03yb/3af9ed41_eb5c_11ee_a2f6_506b4be1f2ab_4892cb3a_7f2d_11ef_8b89_d404e6c85c32.resize2.webp', 'clear', 1, '[\"all\"]', 'Стеклянная ваза в подарок', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(5, 2, 59, 1, '2025-12-06 12:53:35', '2025-12-17 07:36:35'),
(7, 1, 82, 1, '2026-02-15 12:14:35', '2026-02-15 12:14:35');

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `parent_id`, `is_active`, `created_at`) VALUES
(71, 'Романтические букеты', 'romantic-bouquets', 'Нежные букеты для особых моментов', 'https://hrodna.life/wp-content/uploads/2025/03/Floristika_2025_v_Grodno_glavnye_20250313102448131_0-800x800.png', NULL, 1, '2025-11-29 19:12:04'),
(72, 'Свадебные букеты', 'wedding-bouquets', 'Элегантные композиции для торжества', 'https://storage.florist.ru/f/get/supplier/654/products/bc/a5/_eb54cde86236735d58c6be129fe2/800x800/66b64a94645b9.jpg', NULL, 1, '2025-11-29 19:12:04'),
(73, 'Сезонные букеты', 'seasonal-bouquets', 'Букеты, отражающие красоту времени года', 'https://img.sharonline.ru/ProductImages/buket-cvetov-nezhnyj-moment-2-lg.jpg', NULL, 1, '2025-11-29 19:12:04'),
(74, 'Растения в горшках', 'potted-plants', 'Комнатные растения для уюта в доме', 'https://static.insales-cdn.com/r/h-1hUHxTeTc/rs:fit:480:480:1/plain/files/1/4279/13234359/original/s1200.jpg@jpg', NULL, 1, '2025-11-29 19:12:04'),
(75, 'Экзотические цветы', 'exotic-flowers', 'Редкие и необычные цветы из разных стран', 'https://butik-flowers.ru/d/20240402_100552_11zon.webp', NULL, 1, '2025-11-29 19:12:04'),
(76, 'Подарочные наборы', 'gift-sets', 'Готовые подарочные решения', 'https://www.dostavka-tsvetov.com/image/cache/catalog/11studioflor/katia/2023/sept/rosa-kustovaya-kupit-1100x1100.webp', NULL, 1, '2025-11-29 19:12:04'),
(77, 'Букеты невесты', 'bridal-bouquets', 'Специальные букеты для невесты', 'https://cdn-sh1.vigbo.com/shops/207232/products/22013558/images/2-a384169fd9a88782a8b28a5ea3b14920.jpg', NULL, 1, '2025-11-29 19:12:04'),
(78, 'Осенние композиции', 'autumn-compositions', 'Теплые осенние цвета и текстуры', 'https://hrodna.life/wp-content/uploads/2025/03/Floristika_2025_v_Grodno_glavnye_20250313102448131_0-800x800.png', NULL, 1, '2025-11-29 19:12:04'),
(79, 'Минимализм', 'minimalist', 'Лаконичные и стильные композиции', 'https://storage.florist.ru/f/get/supplier/654/products/bc/a5/_eb54cde86236735d58c6be129fe2/800x800/66b64a94645b9.jpg', NULL, 1, '2025-11-29 19:12:04'),
(80, 'Премиум букеты', 'premium-bouquets', 'Эксклюзивные композиции премиум-класса', 'https://img.sharonline.ru/ProductImages/buket-cvetov-nezhnyj-moment-2-lg.jpg', NULL, 1, '2025-11-29 19:12:04'),
(81, 'Композиции', 'compositions', 'Флористические композиции', NULL, NULL, 1, '2025-12-14 16:41:28'),
(82, 'Сезонные композиции', 'seasonal-compositions', 'Композиции по сезонам года', NULL, NULL, 1, '2025-12-14 16:41:28'),
(83, 'Романтические композиции', 'romantic-compositions', 'Романтические композиции', NULL, NULL, 1, '2025-12-14 16:41:28'),
(84, 'Современные композиции', 'modern-compositions', 'Современные стили композиций', NULL, NULL, 1, '2025-12-14 16:41:28'),
(85, 'Свадебные композиции', 'wedding-compositions', 'Композиции для свадеб и торжеств', NULL, NULL, 1, '2025-12-14 16:41:28');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) DEFAULT NULL,
  `images` text COLLATE utf8mb4_unicode_ci,
  `category_id` int(11) NOT NULL,
  `type` enum('bouquet','plant','custom_bouquet','composition') COLLATE utf8mb4_unicode_ci NOT NULL,
  `style` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` enum('small','medium','large') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `season` enum('spring','summer','autumn','winter','all') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT '1',
  `stock_quantity` int(11) DEFAULT '0',
  `is_customizable` tinyint(1) DEFAULT '0',
  `customization_options` json DEFAULT NULL,
  `care_instructions` text COLLATE utf8mb4_unicode_ci,
  `weight_grams` int(11) DEFAULT NULL,
  `height_cm` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `views_count` int(11) DEFAULT '0',
  `sales_count` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `price`, `original_price`, `images`, `category_id`, `type`, `style`, `size`, `season`, `tags`, `in_stock`, `stock_quantity`, `is_customizable`, `customization_options`, `care_instructions`, `weight_grams`, `height_cm`, `is_active`, `views_count`, `sales_count`, `created_at`, `updated_at`) VALUES
(59, 'Нежность в розовом', 'nezhnost-v-rozovom', 'Нежный букет из розовых пионов и белых роз в пастельной композиции, идеально подходящий для романтических моментов', '3200.00', '3500.00', '[\"https://butik-flowers.ru/d/20240402_100552_11zon.webp\", \"https://cdn-sh1.vigbo.com/shops/207232/products/22013558/images/2-a384169fd9a88782a8b28a5ea3b14920.jpg\"]', 71, 'bouquet', 'romantic', 'medium', 'spring', '[\"пионы\", \"розы\", \"романтика\", \"нежность\"]', 1, 5, 1, NULL, NULL, 1200, 45, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(60, 'Свадебная элегантность', 'svadebnaya-elegantnost', 'Белоснежная композиция с орхидеями и розами для торжества, символ чистоты и изящества', '5800.00', NULL, '[\"https://www.dostavka-tsvetov.com/image/cache/catalog/11studioflor/katia/2023/sept/rosa-kustovaya-kupit-1100x1100.webp\"]', 72, 'bouquet', 'elegant', 'large', 'all', '[\"орхидеи\", \"белые розы\", \"свадьба\", \"торжество\"]', 1, 3, 1, NULL, NULL, 1800, 55, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(61, 'Весеннее пробуждение', 'vesennee-probuzhdenie', 'Свежая композиция с тюльпанами, гиацинтами и ветками, наполненная ароматами весны', '2900.00', '3200.00', '[\"https://butik-flowers.ru/d/20240402_100552_11zon.webp\"]', 73, 'bouquet', 'natural', 'medium', 'spring', '[\"тюльпаны\", \"гиацинты\", \"весна\", \"свежесть\"]', 1, 8, 1, NULL, NULL, 1100, 40, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(62, 'Осенняя гармония', 'osennaya-garmoniya', 'Теплая композиция в осенних тонах с хризантемами, розами и декоративными ягодами', '4200.00', NULL, '[\"https://cdn-sh1.vigbo.com/shops/207232/products/22013558/images/2-a384169fd9a88782a8b28a5ea3b14920.jpg\"]', 78, 'bouquet', 'rustic', 'large', 'autumn', '[\"хризантемы\", \"осень\", \"ягоды\", \"теплые тона\"]', 1, 4, 1, NULL, NULL, 1500, 50, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(63, 'Минимализм в белом', 'minimalizm-v-belom', 'Лаконичная композиция с эвкалиптом и белыми розами в стеклянной вазе', '3500.00', NULL, '[\"https://www.dostavka-tsvetov.com/image/cache/catalog/11studioflor/katia/2023/sept/rosa-kustovaya-kupit-1100x1100.webp\"]', 79, 'bouquet', 'minimalist', 'small', 'all', '[\"эвкалипт\", \"минимализм\", \"белые розы\", \"стекло\"]', 1, 6, 1, NULL, NULL, 800, 35, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(64, 'Тропический рай', 'tropicheskiy-ray', 'Экзотическая композиция с антуриумами, орхидеями и тропической зеленью', '6200.00', '6800.00', '[\"https://butik-flowers.ru/d/20240402_100552_11zon.webp\"]', 75, 'bouquet', 'tropical', 'large', 'all', '[\"антуриумы\", \"орхидеи\", \"тропики\", \"экзотика\"]', 1, 2, 0, NULL, NULL, 2000, 60, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(65, 'Классика страсти', 'klassika-strasti', 'Букет из 25 алых роз в классическом стиле, символ страсти и любви', '4500.00', NULL, '[\"https://cdn-sh1.vigbo.com/shops/207232/products/22013558/images/2-a384169fd9a88782a8b28a5ea3b14920.jpg\"]', 71, 'bouquet', 'classic', 'large', 'all', '[\"алые розы\", \"классика\", \"страсть\", \"любовь\"]', 1, 7, 1, NULL, NULL, 1600, 50, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(66, 'Лавандовые грезы', 'lavandovye-grezy', 'Нежная композиция с лавандой, гортензией и белыми розами в фиолетовых тонах', '3800.00', '4200.00', '[\"https://www.dostavka-tsvetov.com/image/cache/catalog/11studioflor/katia/2023/sept/rosa-kustovaya-kupit-1100x1100.webp\"]', 71, 'bouquet', 'romantic', 'medium', 'summer', '[\"лаванда\", \"гортензия\", \"фиолетовый\", \"нежность\"]', 1, 5, 1, NULL, NULL, 1300, 45, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(67, 'Орхидея Фаленопсис белая', 'orkhideya-falenopsis-belaya', 'Элегантная белая орхидея в керамическом горшке, идеальна для украшения интерьера', '1800.00', '2000.00', '[\"https://static.insales-cdn.com/r/h-1hUHxTeTc/rs:fit:480:480:1/plain/files/1/4279/13234359/original/s1200.jpg@jpg\"]', 74, 'plant', 'elegant', 'medium', 'all', '[\"орхидея\", \"комнатное растение\", \"белый\", \"керамика\"]', 1, 10, 0, NULL, 'Полив 1 раз в неделю, рассеянный свет, температура 18-25°C', 1200, 35, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-12 16:34:53'),
(68, 'Суккулентный микс', 'sukkulentnyy-miks', 'Композиция из различных суккулентов в современном кашпо', '1200.00', NULL, '[\"https://ir.ozone.ru/s3/multimedia-1-u/c400/7761188442.jpg\"]', 74, 'plant', 'minimalist', 'small', 'all', '[\"суккуленты\", \"микс\", \"кашпо\", \"неприхотливые\"]', 1, 15, 0, NULL, 'Полив 1 раз в 2 недели, яркий свет, температура 15-30°C', 800, 20, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-13 13:54:15'),
(69, 'Фикус Бенджамина', 'fikus-bendzhamina', 'Популярное комнатное дерево с густой листвой, очищает воздух', '2200.00', '2500.00', '[\"https://luckygreen.ru/wa-data/public/shop/products/79/39/3979/images/9778/9778.650@2x.jpg\"]', 74, 'plant', 'natural', 'large', 'all', '[\"фикус\", \"дерево\", \"очистка воздуха\", \"неприхотливый\"]', 1, 6, 0, NULL, 'Полив 1 раз в неделю, рассеянный свет, регулярное опрыскивание', 5000, 80, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-13 14:12:12'),
(70, 'Монстера деликатесная', 'monstera-delikatesnaya', 'Модное растение с резными листьями для современного интерьера', '1900.00', NULL, '[\"https://static.insales-cdn.com/r/35wt9PJEEgQ/rs:fit:480:480:1/plain/images/collections/1/8169/72884201/large_5uufubite38ub37uehma80v_big.jpg@jpg\"]', 74, 'plant', 'tropical', 'medium', 'all', '[\"монстера\", \"тропическое\", \"резные листья\", \"модное\"]', 1, 8, 0, NULL, 'Полив 1 раз в 10 дней, полутень, высокая влажность', 3500, 45, 1, 0, 0, '2025-11-29 19:12:04', '2025-12-13 13:51:49'),
(81, 'Зимняя сказка', 'zimnyaya-skazka', 'Нежная зимняя композиция с белыми розами, эвкалиптом и ветками в серебристой вазе. Идеальна для новогодних праздников.', '6500.00', '7500.00', '[\"https://art-flo.ru/image/cache/catalog/kompozitsii-folder/zima%202025/photo_2025-02-17_16-49-28-600x600.jpg\"]', 82, 'composition', 'winter', 'large', 'winter', NULL, 1, 5, 1, NULL, 'Хранить в прохладном месте, подливать воду каждые 2 дня', 2500, 45, 1, 0, 0, '2025-12-14 16:48:52', '2025-12-14 16:48:52'),
(82, 'Розовый восторг', 'rozoviy-vostorg', 'Роскошная композиция из пионов, роз и гортензий в пастельных тонах. Создает атмосферу нежности и романтики.', '8200.00', '9500.00', '[\"https://content2.flowwow-images.com/data/flowers/1000x1000/20/1679596035_14629020.jpg\"]', 83, 'composition', 'romantic', 'large', 'all', NULL, 1, 3, 1, NULL, 'Избегать прямых солнечных лучей, менять воду каждые 3 дня', 3200, 55, 1, 0, 0, '2025-12-14 16:48:52', '2025-12-14 16:48:52'),
(83, 'Осенняя симфония', 'osennaya-simfoniya', 'Теплая осенняя композиция с хризантемами, георгинами, ягодами и сухоцветами в плетеной корзине.', '5800.00', '6800.00', '[\"https://cvety58.ru/wp-content/uploads/2020/11/25-500x500.jpg\"]', 82, 'composition', 'rustic', 'medium', 'autumn', NULL, 1, 7, 1, NULL, 'Сухоцветы не требуют полива. Хранить в сухом месте', 1800, 35, 1, 0, 0, '2025-12-14 16:48:52', '2025-12-14 16:48:52'),
(84, 'Элегантная классика', 'elegantnaya-klassika', 'Классическая композиция с красными розами, каллами и зеленью в стеклянной вазе. Идеальна для торжественных мероприятий.', '7200.00', '8500.00', '[\"https://gallery.forum-grad.ru/files/4/8/3/6/4/25_1.jpg\"]', 84, 'composition', 'classic', 'large', 'all', NULL, 1, 4, 1, NULL, 'Хранить вдали от отопительных приборов, менять воду ежедневно', 2800, 50, 1, 0, 0, '2025-12-14 16:48:52', '2025-12-14 16:48:52');

-- --------------------------------------------------------

--
-- Структура таблицы `product_components`
--

CREATE TABLE `product_components` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `component_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `is_required` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `product_components`
--

INSERT INTO `product_components` (`id`, `product_id`, `component_id`, `quantity`, `is_required`) VALUES
(80, 59, 116, 3, 1),
(81, 59, 115, 5, 1),
(82, 59, 114, 3, 1),
(83, 59, 128, 2, 1),
(84, 59, 137, 1, 0),
(85, 60, 119, 2, 1),
(86, 60, 114, 7, 1),
(87, 60, 120, 3, 1),
(88, 60, 129, 3, 1),
(89, 60, 136, 1, 0),
(90, 61, 117, 9, 1),
(91, 61, 128, 2, 1),
(92, 61, 130, 2, 1),
(93, 61, 137, 1, 0),
(94, 62, 121, 5, 1),
(95, 62, 113, 4, 1),
(96, 62, 131, 3, 1),
(97, 62, 137, 1, 0),
(98, 63, 114, 5, 1),
(99, 63, 128, 3, 1),
(100, 63, 140, 1, 0),
(101, 64, 127, 3, 1),
(102, 64, 119, 2, 1),
(103, 64, 129, 4, 1),
(104, 64, 131, 2, 1),
(105, 65, 113, 25, 1),
(106, 65, 128, 5, 1),
(107, 65, 133, 1, 0),
(108, 66, 124, 7, 1),
(109, 66, 122, 2, 1),
(110, 66, 114, 4, 1),
(111, 66, 128, 3, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `email`, `phone`, `password_hash`, `role`, `registration_date`, `last_login`, `is_active`) VALUES
(1, 'Валерия', 'Павлова', 'valeriya.p05@mail.ru', '89613244550', '$2a$10$/NgwNGhMBQ62pfWr09IA..mDk6DL8RhMnq9MmzL76mwSbNnVqdjU6', 'user', '2025-11-29 17:36:31', '2026-02-15 09:36:09', 1),
(2, 'Лера', 'Лера', 'valeriya.05@mail.ru', '+79613244559', '$2a$10$2NBo.F45fj3uD3BYFxmOOuz8N9L/Xg0hhO.QYDiIb1ykQ/cgEFne.', 'user', '2025-12-06 12:53:20', '2025-12-17 07:33:20', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `user_favorites`
--

CREATE TABLE `user_favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user_favorites`
--

INSERT INTO `user_favorites` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(1, 1, 81, '2025-12-16 14:44:25');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bouquet_components`
--
ALTER TABLE `bouquet_components`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_item` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `idx_categories_active` (`is_active`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_products_category` (`category_id`),
  ADD KEY `idx_products_type` (`type`),
  ADD KEY `idx_products_price` (`price`),
  ADD KEY `idx_products_stock` (`in_stock`,`stock_quantity`),
  ADD KEY `idx_products_active` (`is_active`);

--
-- Индексы таблицы `product_components`
--
ALTER TABLE `product_components`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `component_id` (`component_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_registration_date` (`registration_date`);

--
-- Индексы таблицы `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bouquet_components`
--
ALTER TABLE `bouquet_components`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT для таблицы `product_components`
--
ALTER TABLE `product_components`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Ограничения внешнего ключа таблицы `product_components`
--
ALTER TABLE `product_components`
  ADD CONSTRAINT `product_components_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_components_ibfk_2` FOREIGN KEY (`component_id`) REFERENCES `bouquet_components` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
