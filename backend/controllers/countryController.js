require('dotenv').config();
const axios = require('axios');

const DATA_NAGER_API_BASE_URL = process.env.DATA_NAGER_API_BASE_URL;
const COUNTRIES_NOW_API_BASE_URL = process.env.COUNTRIES_NOW_BASE_URL;

// Get available countries from Date Nager API
const getAvailableCountries = async (req, res) => {
  try {
    // Get data from Date Nager API
    const response = await axios.get(
      `${DATA_NAGER_API_BASE_URL}/AvailableCountries`
    );

    // Send the data to the frontend
    res.status(200).json({
      status: 'success',
      results: response.data.length,
      data: { availableCountries: response.data },
    });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error getting available countries:', error);
    res.status(500).json({ message: 'Failed to get available countries' });
  }
};

const getCountryInfo = async (req, res) => {
  try {
    const { countryCode } = req.params;

    // Check the value of DATA_NAGER_API_BASE_URL
    console.log(
      'DATA_NAGER_API_BASE_URL:',
      process.env.DATA_NAGER_API_BASE_URL
    );
    console.log(
      'COUNTRIES_NOW_API_BASE_URL:',
      process.env.COUNTRIES_NOW_API_BASE_URL
    );

    // Make sure you use the environment variables correctly here:
    const response = await axios.get(
      `${process.env.DATA_NAGER_API_BASE_URL}/CountryInfo/${countryCode}`
    );

    const countryInfo = response.data;

    const availableCountriesResponse = await axios.get(
      `${process.env.DATA_NAGER_API_BASE_URL}/AvailableCountries`
    );

    const availableCountries = availableCountriesResponse.data;

    const borderCountries = countryInfo.borders.map((code) => {
      const country = availableCountries.find((c) => c.countryCode === code);
      return country ? country.name : code;
    });

    const populationResponse = await axios.post(
      `${process.env.COUNTRIES_NOW_API_BASE_URL}/countries/population`,
      { country: countryInfo.commonName }
    );

    let populationData = [];
    if (
      populationResponse.data &&
      populationResponse.data.data &&
      populationResponse.data.data.populationCounts
    ) {
      populationData = populationResponse.data.data.populationCounts;
    } else {
      console.warn(`Population data not found for ${countryInfo.commonName}`);
    }

    const flagResponse = await axios.post(
      `${process.env.COUNTRIES_NOW_API_BASE_URL}/countries/flag/images`,
      { country: countryInfo.commonName }
    );

    let flagURL = '';
    if (
      flagResponse.data &&
      flagResponse.data.data &&
      flagResponse.data.data.flag
    ) {
      flagURL = flagResponse.data.data.flag;
    } else {
      console.warn(`Flag URL not found for ${countryInfo.commonName}`);
    }

    res.status(200).json({
      status: 'success',
      data: {
        countryCode: countryInfo.countryCode,
        commonName: countryInfo.commonName,
        officialName: countryInfo.officialName,
        region: countryInfo.region,
        borders: borderCountries,
        populationData,
        flagURL,
      },
    });
  } catch (error) {
    console.error('Error getting country info:', error.message);
    res.status(500).json({ message: 'Failed to get country info' });
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};
