const express = require('express');
const app = express();
const userRoutes = require('./routes/User');
const sauceRoutes = require('./routes/Sauce');
const path = require('path');
const cors = require('cors');
app.use(cors());


app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth/', userRoutes);

app.use('/api/sauces/', sauceRoutes);

module.exports = app;