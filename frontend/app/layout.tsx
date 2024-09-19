import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Country Info App',
  description: 'Information about countries',
  icons: {
    icon: './countries.png',
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
