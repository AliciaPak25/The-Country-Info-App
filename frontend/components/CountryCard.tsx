// frontend/components/CountryCard.tsx

'use client';

import Link from 'next/link';
import { Country } from '../types/apiResponse';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <li className="border rounded p-4 hover:shadow-lg transition">
      <Link
        href={`/country/${country.countryCode}`}
        className="text-lg font-semibold text-blue-600 hover:underline"
      >
        {country.name}
      </Link>
    </li>
  );
};

export default CountryCard;
