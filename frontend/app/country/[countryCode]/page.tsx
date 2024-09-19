// frontend/app/country/[countryCode]/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CountryInfoResponse } from '../../../types/apiResponse';
import { Chart } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface CountryInfoProps {}

const CountryInfo: React.FC<CountryInfoProps> = () => {
  const params = useParams();
  const countryCode = params.countryCode as string;
  const [countryInfo, setCountryInfo] = useState<CountryInfoResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/CountryInfo/${countryCode}`,
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch country info. Status: ${response.status}`,
          );
        }

        const data: { status: string; data: CountryInfoResponse } =
          await response.json();

        if (data.status !== 'success') {
          throw new Error('Backend reported failure in fetching country info.');
        }

        setCountryInfo(data.data);
      } catch (err: any) {
        console.error('Error fetching country info:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) {
    return <p className="text-center">Loading country information...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!countryInfo) {
    return (
      <p className="text-center">No information available for this country.</p>
    );
  }

  // Prepare data for the population chart
  const years = countryInfo.populationData.map((item) => item.year);
  const populations = countryInfo.populationData.map((item) => item.value);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Population',
        data: populations,
        borderColor: 'rgba(59, 130, 246, 1)', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Population Growth of ${countryInfo.commonName}`,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Country Name and Flag */}
      <div className="flex items-center mb-6">
        {countryInfo.flagURL && (
          <img
            src={countryInfo.flagURL}
            alt={`${countryInfo.commonName} flag`}
            className="w-16 h-10 mr-4 object-contain"
          />
        )}
        <h1 className="text-3xl font-bold">{countryInfo.commonName}</h1>
      </div>

      {/* Border Countries */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Border Countries</h2>
        {countryInfo.borders.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {countryInfo.borders.map((borderCountry, index) => (
              <li key={index}>
                <h1>{borderCountry.name}</h1>
                <Link
                  href={`/country/${borderCountry.countryCode}`}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {borderCountry.commonName}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bordering countries.</p>
        )}
      </div>

      {/* Population Chart */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Population Over Time</h2>
        {countryInfo.populationData.length > 0 ? (
          <div className="w-full max-w-2xl">
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p>No population data available.</p>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
