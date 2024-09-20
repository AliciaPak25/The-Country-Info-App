const express = require('express');
const cors = require('cors');
require('dotenv').config();
const countryRoutes = require('./routes/countryRoutes');

const app = express();
const port = process.env.PORT || 4000;
const frontend_port = process.env.FRONTEND_PORT || 3000;
const frontend_base_url = process.env.FRONTEND_BASE_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: frontend_base_url, // Frontend URL
    methods: ['GET'],
    credentials: true,
  })
);

// Route
app.use('/api/v1', countryRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(`Frontend is running on port ${frontend_port}...`);
});
