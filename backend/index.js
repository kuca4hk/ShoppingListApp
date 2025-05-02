const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {errorHandler} = require('./middleware/errorHandler');

// Connect to database
connectDB();

// Initialize express
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
   origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
   credentials: true,
   optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/v1/shoppinglist', require('./routes/shoppingListRoutes'));
app.use('/api/v1/items', require('./routes/itemRoutes'));
app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});