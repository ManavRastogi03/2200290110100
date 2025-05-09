const express = require('express');
const router = express.Router();
const { getAveragePrice, getStockCorrelation } = require('../controllers/stockController');

router.get('/stocks/:ticker', getAveragePrice);
router.get('/stockcorrelation', getStockCorrelation);

module.exports = router;
