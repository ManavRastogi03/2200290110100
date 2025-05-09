const express = require('express');
const axios = require('axios');
const { updateWindow, getAverage } = require('./window');

const app = express();
const PORT = 3000;

const BASE_URL = 'http://20.244.56.144/evaluation-service'; 
const endpoints = {
  p: '/primes',
  f: '/fibo',
  e: '/even',
  r: '/rand'
};

app.get('/numbers/:numberid', async (req, res) => {
  const id = req.params.numberid;
  const url = BASE_URL + endpoints[id]; 

  if (!url) {
    return res.status(400).json({ error: 'Invalid numberid' });
  }

  let numbers = [];

  try {
    const response = await axios.get(url, { timeout: 500 });
    numbers = response.data.numbers || [];
  } catch (err) {
    console.log("Error or timeout while fetching:", err.message);
  }

  const { prevState, currState } = updateWindow(numbers);
  const avg = getAverage();

  res.json({
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: numbers,
    avg: avg
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});