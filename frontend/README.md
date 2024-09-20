### Frontend - Country Info App

### Tech Stack
React.js (Next.js)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Packages Used
- axios: For making API requests.
- chart.js: For rendering population data in a chart.
- next/router: For handling dynamic navigation between pages.
- recharts: For additional data visualization features.
- tailwindcss: For styling and responsive design.
- typescript: For static type checking and improved developer experience.

### Set Up Environment Variables:

1. Create a .env.local file based on the provided .env.local.example.
2. Define the following variable:
- NEXT_PUBLIC_BACKEND_API_BASE_URL
  
## Getting Started: Running the Frontend
- Install Dependencies:
- npm install

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  
### Main Components
- Country List Page: Displays a list of countries fetched from the backend. (CountryList.tsx) 
- Country Info Page: Shows detailed information about a selected country, including: country name and flag, border countries, and a population chart (/country/[countryCode]/page.tsx).
