const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config()
const {STATUS_CODES, API_ROUTES} = require('./config/constants');

// Connect to database
connectDB();

// Initialize express
const app = express();
const port = process.env.PORT || 5000;

// Routes
app.use(express.json());
app.use(`/api/v1/shoppinglist`, require('./routes/shoppingListRoutes'));
app.use(`/api/v1/users`, require('./routes/usersRoutes'));
app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

