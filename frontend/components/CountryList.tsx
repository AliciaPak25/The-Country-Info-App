'use client';

import { useEffect, useState } from 'react';
import { Country, ApiResponse } from '../types/apiResponse';
import CountryCard from './CountryCard';

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/AvailableCountries`,
        );
        console.log('Response Status:', response.status);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch countries. Status: ${response.status}`,
          );
        }

        const data: ApiResponse = await response.json();

        if (data.status !== 'success') {
          throw new Error('Backend reported failure in fetching countries.');
        }

        setCountries(data.data.availableCountries);
      } catch (err: any) {
        console.error('Error fetching countries:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid"></div>
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  // No countries available message
  if (!Array.isArray(countries) || countries.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-teal-400 text-2xl font-semibold mb-2">
            No countries available
          </p>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-200 mb-6">
        List of Available Countries
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <CountryCard key={country.countryCode} country={country} />
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
