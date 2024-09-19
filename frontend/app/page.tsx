import React from 'react';

// app/page.tsx
import CountryList from '../components/CountryList';

const HomePage: React.FC = () => {
  return (
    <main>
      <CountryList />
    </main>
  );
};

export default HomePage;
