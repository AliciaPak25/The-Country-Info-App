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

// Get Country Info
const getCountryInfo = async (req, res) => {
  try {
    // Extract countryCode from request parameters
    const { countryCode } = req.params;

    // Get specific country information from Date Nager API
    const response = await axios.get(
      `${DATA_NAGER_API_BASE_URL}/CountryInfo/${countryCode}`
    );
    const countryInfo = response.data;

    // Fetch the list of available countries
    const availableCountriesResponse = await axios.get(
      `${DATA_NAGER_API_BASE_URL}/AvailableCountries`
    );
    const availableCountries = availableCountriesResponse.data;

    // Map border country codes to country names
    const borderCountries = countryInfo.borders.map((code) => {
      const country = availableCountries.find((c) => c.countryCode === code);
      return country ? country.name : code;
    });

    // Fetch Population Data from CountriesNow API
    const countryName = countryInfo.commonName;

    const populationResponse = await axios.post(
      `${COUNTRIES_NOW_API_BASE_URL}/countries/population`,
      {
        country: countryName,
      }
    );

    let populationData = [];
    if (
      populationResponse.data &&
      populationResponse.data.data &&
      populationResponse.data.data.populationCounts
    ) {
      populationData = populationResponse.data.data.populationCounts;
    } else {
      console.warn(`Population data not found for ${countryName}`);
    }

    // Fetch Flag URL from CountriesNow API
    const flagResponse = await axios.post(
      `${COUNTRIES_NOW_API_BASE_URL}/countries/flag/images`,
      {
        country: countryName,
      }
    );

    let flagURL = '';
    if (
      flagResponse.data &&
      flagResponse.data.data &&
      flagResponse.data.data.flag
    ) {
      flagURL = flagResponse.data.data.flag;
    } else {
      console.warn(`Flag URL not found for ${countryName}`);
    }

    // Send the response to the frontend
    res.status(200).json({
      status: 'success',
      results: {
        listOfBorderCountries: borderCountries.length,
        populationData: populationData.length,
      },
      data: {
        countryCode: countryInfo.countryCode,
        commonName: countryInfo.commonName,
        officialName: countryInfo.officialName,
        region: countryInfo.region,
        borders: borderCountries,
        populationData: populationData,
        flagURL: flagURL,
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
