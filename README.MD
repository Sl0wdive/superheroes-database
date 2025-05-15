# Superheroes Database

A full-stack application for managing superhero information with React (TypeScript) frontend and Node.js backend.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sl0wdive/superheroes-database
   cd superheroes-database
   ```

2. **Set up environment variables**
   Create `.env` files in both `client` and `server` directories with the following content:

   **client/.env**
   ```
   VITE_API_URL="http://localhost:4444"
   ```

   **server/.env**
   ```
   MONGO_URI='mongodb+srv://<username>:<password>@cluster0.mongodb.net/superheroes?retryWrites=true&w=majority'
   PORT=4444
   ```

   Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

3. **Install dependencies**
   Run in both directories:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

## Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend application**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   * Frontend will be available at: `http://localhost:5173`
   * Backend API will be available at: `http://localhost:4444`

## Features

* View list of superheroes with pagination
* View superhero details
* Create new superhero entries
* Edit existing superhero information
* Upload multiple images for each superhero

## Technologies Used

* Frontend:
   * React (TypeScript)
   * Redux Toolkit
   * Material-UI (MUI)
   * Vite
* Backend:
   * Node.js
   * Express
   * MongoDB (with Mongoose)
   * Multer (for file uploads)