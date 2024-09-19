"use client";

import Link from "next/link";
import { Country } from "@/app/types/apiResponse";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <li className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg">
      {/* Country flag and name */}
      <Link
        href={`/country/${country.countryCode}`}
        className="flex items-center space-x-4 cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://flagcdn.com/48x36/${country.countryCode.toLowerCase()}.png`}
          alt={`${country.name} flag`}
          className="w-8 h-6 rounded-md"
        />
        <div className="text-gray-200">
          <p className="font-medium hover:text-teal-400">{country.name}</p>
        </div>
      </Link>
      <Link href={`/country/${country.countryCode}`} className="cursor-pointer">
        <p className="text-gray-400">+{country.dialingCode}</p>
      </Link>
    </li>
  );
};

export default CountryCard;
