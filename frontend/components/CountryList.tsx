// frontend/components/CountryList.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Country, ApiResponse } from '../types/apiResponse'; // frontend/components/CountryList.tsx
import CountryCard from './CountryCard'; // Importing the component

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

  if (loading) {
    return <p className="text-center">Loading countries...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!Array.isArray(countries) || countries.length === 0) {
    return <p className="text-center">No countries available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Available Countries</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.countryCode} country={country} /> // Using typed props
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
