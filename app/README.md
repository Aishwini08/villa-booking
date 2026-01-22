# Luxury Villa Booking Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for browsing and booking luxury villas. The application features a React frontend with real villa images and a Node.js/Express backend API for order processing.

## Project Structure

```
villa-booking-app/
├── backend/          # Node.js/Express API
├── frontend/        # React application
└── README.md        # This file
```

## Features

- 🏖️ Browse 18+ luxury villas with real images from Unsplash
- 🔍 Search and filter villas by category, location, and price
- 🛒 Shopping cart with quantity management
- 💳 Checkout process with order submission
- 📧 Order confirmation with backend integration
- 📱 Fully responsive design
- 🎨 Modern UI with Material-UI components

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally or MongoDB Atlas account)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/villa-booking
   ```
   
   For MongoDB Atlas, use:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/villa-booking?retryWrites=true&w=majority
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The server will run on `http://localhost:5000`

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
   
   The app will open in your browser at `http://localhost:3000`

## Running the Application

You need to run both the backend and frontend simultaneously:

1. **Terminal 1** - Backend:
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2** - Frontend:
   ```bash
   cd frontend
   npm start
   ```

## API Endpoints

### Backend API (http://localhost:5000)

- `POST /api/orders` - Create a new villa booking order
- `GET /api/orders` - Fetch all orders
- `GET /api/orders/:id` - Fetch a single order by ID
- `GET /api/health` - Health check endpoint

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Frontend
- React 18
- Redux Toolkit
- React Router DOM
- Material-UI (MUI) v5
- React Scripts

## Features Overview

### Villa Categories
- Beach
- Mountain
- Tropical
- Urban
- Desert
- Lake
- Countryside
- Historic

### Villa Information
Each villa includes:
- High-quality images from Unsplash
- Location
- Price per night
- Rating
- Bedrooms, bathrooms, and guest capacity
- Availability status
- Detailed description

## Development

### Backend Development
- Uses nodemon for automatic server restarts
- Environment variables for configuration
- MongoDB connection with error handling

### Frontend Development
- Hot module replacement
- Redux DevTools support
- Responsive design
- Material-UI theming

## Notes

- The frontend stores villa data locally in `src/data/products.js`
- The backend only handles order processing
- Real villa images are sourced from Unsplash
- All orders are stored in MongoDB with timestamps

## License

This project is for educational purposes.

