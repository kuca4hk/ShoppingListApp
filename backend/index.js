const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config()

// Connect to database
connectDB();

// Initialize express
const app = express();
const port = process.env.PORT || 5000;

// Routes
app.use(express.json());
app.use(`/api/v1/shoppinglist`, require('./routes/shoppingListRoutes'));
app.use(`/api/v1/items`, require('./routes/itemRoutes'));
//app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

