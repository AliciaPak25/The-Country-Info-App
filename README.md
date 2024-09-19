# The Country Info App

This project is a Full-Stack JavaScript application that provides country information, including border countries, population data, and flag images. It consists of a backend API built with Node.js and Express.js and a frontend built with Next.js.

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
