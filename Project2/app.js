const express = require('express');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
app.use(express.json());  // To parse incoming JSON requests
app.use('/api', stockRoutes);  // Use the stock routes for API calls

module.exports = app;
