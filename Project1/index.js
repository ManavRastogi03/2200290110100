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

  if (!endpoints[id]) {
    return res.status(400).json({ error: 'Invalid numberid' });
  }

  let numbers = [];

  try {
    console.log("Fetching from:", url);
   const response = await axios.get(url, {
  timeout: 500,
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2Nzk5OTY4LCJpYXQiOjE3NDY3OTk2NjgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFmYTIyNzM1LTkyNzktNDkwZC1hZDRhLTRiOGVmNWEwMTc0MCIsInN1YiI6Im1hbmF2LjIyMjZjc2l0MTA0NkBraWV0LmVkdSJ9LCJlbWFpbCI6Im1hbmF2LjIyMjZjc2l0MTA0NkBraWV0LmVkdSIsIm5hbWUiOiJtYW5hdiByYXN0b2dpIiwicm9sbE5vIjoiMjIwMDI5MDExMDEwMCIsImFjY2Vzc0NvZGUiOiJTeFZlamEiLCJjbGllbnRJRCI6IjFmYTIyNzM1LTkyNzktNDkwZC1hZDRhLTRiOGVmNWEwMTc0MCIsImNsaWVudFNlY3JldCI6Ik1ya1hTU2Zzc2pGVEpVZmQifQ.RkbULvRLGdmemNYMZ6dnL-toSxSpe_TwNEoXg12C_xc'
  }
});
    console.log("Response data:", response.data);

    numbers = response.data?.numbers || [];
  } catch (err) {
    console.error("Error fetching numbers:", err.message);
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