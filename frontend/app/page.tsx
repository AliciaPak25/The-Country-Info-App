import React from 'react';

import CountryList from '../components/CountryList';

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-900 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8 text-teal-400">
          The Country Info App
        </h1>
        <CountryList />
      </div>
    </main>
  );
};

export default HomePage;
