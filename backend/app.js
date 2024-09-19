const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const countryRoutes = require('./routes/countryRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.use('/api/v1', countryRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
