# Villa Booking Frontend

A modern React application for browsing and booking luxury villas, built with React, Redux Toolkit, Material-UI, and React Router.

## Features

- 🏖️ Browse luxury villas with real images
- 🔍 Search and filter villas by category, location, and price
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🎨 Modern UI with Material-UI components
- ✅ Order confirmation with backend integration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **The app will open in your browser at:**
   - URL: `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── app/
│   │   └── store.js             # Redux store configuration
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   ├── QuantitySelector/
│   │   ├── CategoryFilter/
│   │   ├── SortDropdown/
│   │   └── MessageDialog/
│   ├── data/
│   │   └── products.js          # Villa data with real images
│   ├── features/
│   │   ├── cart/                # Cart Redux slice
│   │   ├── products/            # Products Redux slice
│   │   └── order/               # Order Redux slice
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ShopNowPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   ├── AboutUsPage.jsx
│   │   └── ContactUsPage.jsx
│   ├── styles/
│   │   ├── theme.js
│   │   └── global.css
│   ├── utils/
│   │   └── helpers.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## Backend Integration

The frontend is configured to connect to the backend API running on `http://localhost:5000`. Make sure the backend server is running before placing orders.

## Technologies Used

- React 18
- Redux Toolkit
- React Router DOM
- Material-UI (MUI) v5
- React Scripts

