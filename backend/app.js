const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const countryRoutes = require('./routes/countryRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Route
app.use('/api/v1', countryRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
