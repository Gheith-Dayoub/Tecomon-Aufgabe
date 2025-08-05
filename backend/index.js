require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dataBase');
// const mongoose = require('mongoose');
const cors = require('cors');

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', weatherRoutes);

connectDB();
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
