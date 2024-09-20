## Backend - Country Info App

**Tech Stack**
Node.js with Express.js

**Packages Used**
- axios: For making API requests.
- dotenv: For managing environment variables.
- cors: To enable Cross-Origin Resource Sharing.
- express: For building the API routes.

**Running the Backend**
- Install Dependencies:
- npm install
  
**Set Up Environment Variables:**
1. Create a .env file based on the provided .env.example.
2. Define the following variables:
- DATA_NAGER_API_BASE_URL
- COUNTRIES_NOW_API_BASE_URL
- PORT
- FRONTEND_PORT
- FRONTEND_BASE_URL

**Run the Server:**
- npm run dev

**API Endpoints**
- GET /api/v1/AvailableCountries: -> Retrieves a list of available countries.
- GET /api/v1/CountryInfo/:countryCode -> Fetches specific country information, including border countries, population, and flag.

**Scripts:**
- npm run start: Runs the app in production mode.
- npm run dev: Starts the app with Nodemon for automatic restarts during development.
- npm run lint: Runs ESLint to check for code quality.
- npm run format: Formats the code using Prettier.
