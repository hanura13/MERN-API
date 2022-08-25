const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

//Create -> POST
router.post('/product', productController.createProduct);

// READ -> GET
router.get('/product', productController.getAllproduct);

module.exports = router;