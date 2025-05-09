const { fetchStockHistory } = require('../services/stockService');
const { calculateAverage, calculateCorrelation } = require('../utils/stats');

exports.getAveragePrice = async (req, res) => {
  const { ticker } = req.params;
  const minutes = parseInt(req.query.minutes);

  try {
    const prices = await fetchStockHistory(ticker, minutes);
    const avg = calculateAverage(prices);

    res.json({
      averageStockPrice: avg,
      priceHistory: prices
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock prices' });
  }
};

// Get the correlation between two stocks over the given time window
exports.getStockCorrelation = async (req, res) => {
  const { minutes } = req.query;
  const [t1, t2] = req.query.ticker;

  try {
    const prices1 = await fetchStockHistory(t1, minutes);
    const prices2 = await fetchStockHistory(t2, minutes);
    const correlation = calculateCorrelation(prices1, prices2);

    res.json({
      correlation,
      stocks: {
        [t1]: {
          averagePrice: calculateAverage(prices1),
          priceHistory: prices1
        },
        [t2]: {
          averagePrice: calculateAverage(prices2),
          priceHistory: prices2
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating correlation' });
  }
};
