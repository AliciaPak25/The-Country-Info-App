'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!countryInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-teal-400 text-xl">
          No information available for this country.
        </p>
      </div>
    );
  }

  const years = countryInfo.populationData.map((item) => item.year);
  const populations = countryInfo.populationData.map((item) => item.value);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Population',
        data: populations,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(16, 185, 129, 1)',
        },
      },
      title: {
        display: true,
        text: `Population Growth of ${countryInfo.commonName}`,
        color: 'rgba(255, 255, 255, 1)',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)',
        },
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-gray-200">
      {/* Country Name and Flag */}
      <div className="flex items-center mb-6">
        {countryInfo.flagURL && (
          <img
            src={countryInfo.flagURL}
            alt={`${countryInfo.commonName} flag`}
            className="w-16 h-10 mr-4 object-contain rounded-md"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-200">
          {countryInfo.commonName}
        </h1>
      </div>

      {/* Border Countries */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-teal-400 mb-2">
          Border Countries
        </h2>
        {countryInfo.borders.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-2">
            {countryInfo.borders.map((borderCountry, index) => (
              <li key={index} className="text-gray-200">
                <Link
                  href={`/country/${borderCountry.countryCode}`}
                  className="px-3 py-1 bg-teal-600 text-gray-100 rounded hover:bg-teal-700"
                >
                  {borderCountry.commonName}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No bordering countries.</p>
        )}
      </div>

      {/* Population Chart */}
      <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-teal-400 mb-4 text-center">
          Population Over Time
        </h2>
        {countryInfo.populationData.length > 0 ? (
          <Chart type="line" data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-400 text-center">
            No population data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
