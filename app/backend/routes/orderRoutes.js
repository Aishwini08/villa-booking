const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, customer, total } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required and must be a non-empty array' });
    }

    if (!customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({ message: 'Customer information (name, email, address) is required' });
    }

    if (!total || typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ message: 'Total must be a positive number' });
    }

    // Create new order
    const order = new Order({
      items,
      customer,
      total,
    });

    // Save order to database
    const savedOrder = await order.save();

    // Send the complete saved order back to frontend (required by Redux logic)
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({
      message: 'Failed to place order',
      error: error.message,
    });
  }
});

// GET /api/orders - Fetch all orders (for debugging and order history)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
});

// GET /api/orders/:id - Fetch a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error.message);
    res.status(500).json({
      message: 'Failed to fetch order',
      error: error.message,
    });
  }
});

module.exports = router;

