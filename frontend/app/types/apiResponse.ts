import { ReactNode } from "react";

export interface Country {
  dialingCode: ReactNode;
  countryCode: string;
  name: string;
}

export interface AvailableCountriesResponse {
  status: string;
  results: number;
  data: {
    availableCountries: Country[];
  };
}

export interface PopulationCount {
  year: number;
  value: number;
}

export interface CountryInfoResponse {
  countryCode: string;
  commonName: string;
  officialName: string;
  region: string;
  borders: {
    commonName: ReactNode;
    countryCode: string;
    name: string;
  }[];
  populationData: PopulationCount[];
  flagURL: string;
}

export interface ApiResponse {
  status: string;
  data: {
    availableCountries: Country[];
  };
}
