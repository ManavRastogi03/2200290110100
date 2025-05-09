const axios = require('axios');


exports.fetchStockHistory = async (ticker, minutes) => {
  const url = `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch stock data');
  }
};
