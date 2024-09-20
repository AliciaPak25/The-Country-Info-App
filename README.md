# The Country Info App

This project is a Full-Stack JavaScript application that provides country information, including border countries, population data, and flag images. It consists of a backend API built with Node.js and Express.js and a frontend built with Next.js.

## Project Goal
This project was created as part of a test assessment for a selection process. Its purpose is to demonstrate Full-Stack JavaScript development skills, focusing on API integration, backend development with Node.js (Express) and frontend development with React (Next.js). to showcase the ability to build responsive, data-driven applications.

## Features

- **Country List Page**: Displays a list of countries fetched from the backend.
- **Country Info Page**: Shows detailed information about a specific country, including:
  - Country name and flag
  - List of border countries (clickable)
  - Population data displayed on a chart

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Next.js

## Prerequisites

- Node.js (v14+)
- npm or yarn package manager

## Project Setup

### 1. Clone the repository

- git clone https://github.com/AliciaPak25/The-Country-Info-App.git
- cd The-Country-Info-App

### 2. Install dependencies

**Backend**: Node.js with Express.js 
- cd backend
- npm install

**Frontend**: Next.js
- cd frontend
- npm install

### 3. Environment Variables Setup
You need to create .env files in both the backend and frontend folders. There are .env.example files provided that list all the environment variable names used in this project. You need to complete the values for these variables.

**Backend .env.example**:
- DATA_NAGER_API_BASE_URL= (Base URL for the Nager.Date API)
- COUNTRIES_NOW_API_BASE_URL= (Base URL for the Countries Now API)
  
- PORT= (Refer to the value in the app.js file)
- FRONTEND_PORT= (Refer to the value in the app.js file)
- FRONTEND_BASE_URL= http://localhost:(FRONTEND_PORT)

**Frontend .env.local.example**:
- NEXT_PUBLIC_BACKEND_API_BASE_URL= (Backend API base URL for this project: http://127.0.0.1:(port)/api/v1)

### 4. Running the Application on Dev Mode
Start Backend
- cd backend
- npm run dev

Start Frontend
- cd frontend
- npm run dev

Make sure to run both frontend and backend simultaneously in separate terminals in order to view or test the application.

### Testing Comments
Since I focused on completing the core functionalities and the UI within the given timeframe, this application does not include automated tests. However, it was manually tested using Postman for the backend, and the frontend was tested through the browser, and you can do the same by following these steps:

**1.	Backend Testing:**
o	Use Postman to test the API endpoints.
o	Test the /api/v1/AvailableCountries endpoint to fetch the list of available countries.
o	Test the /api/v1/CountryInfo/:countryCode endpoint to retrieve specific country details.

**2.	Frontend Testing:**
o	Start the application, navigate to the country list page, and interact with the UI by clicking on a country to view its details and population chart.

Thank you for taking the time to check out this project! If you have any feedback or suggestions, feel free to reach out.
