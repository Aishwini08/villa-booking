# Villa Booking Backend API

A Node.js, Express, and MongoDB backend API for handling villa booking orders.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (running locally or MongoDB Atlas account)

## Setup Instructions

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend directory:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/villa-booking
   ```
   
   For MongoDB Atlas, use:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/villa-booking?retryWrites=true&w=majority
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

5. **The server will be running on:**
   - URL: `http://localhost:5000`
   - Health Check: `http://localhost:5000/api/health`
   - Orders API: `http://localhost:5000/api/orders`

## API Endpoints

### POST `/api/orders`
Create a new villa booking order.

**Request Body:**
```json
{
  "items": [
    {
      "id": "villa-1",
      "name": "Luxury Beach Villa",
      "price": 500,
      "quantity": 2,
      "nights": 3
    }
  ],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, Country"
  },
  "total": 3000
}
```

**Response:** 201 Created with the saved order object

### GET `/api/orders`
Fetch all orders (for debugging and order history).

**Response:** 200 OK with array of all orders

### GET `/api/orders/:id`
Fetch a single order by ID.

**Response:** 200 OK with order object, or 404 if not found

## Project Structure

```
backend/
├── models/
│   └── Order.js         # Mongoose schema for orders
├── routes/
│   └── orderRoutes.js   # API routes for /api/orders
├── .env                 # Environment variables (not committed)
├── .gitignore
├── package.json
├── server.js            # Main server entry point
└── README.md
```

