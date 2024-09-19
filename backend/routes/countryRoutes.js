const express = require('express');
const router = express.Router();

const {
  getAvailableCountries,
  getCountryInfo,
} = require('../controllers/countryController');

// API endpoint created to get available countries from Date Nager API
router.get('/AvailableCountries', getAvailableCountries);

// API Endpoint cretaed to get detailed information about a specific country
router.get('/CountryInfo/:countryCode', getCountryInfo);

module.exports = router;
