import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../features/cart/cartSelectors';
import { placeOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import { formatPrice } from '../utils/helpers';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'credit-card',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Construct order data
      const orderData = {
        items: cartItems,
        customer: {
          name: formData.name,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
          phone: formData.phone,
        },
        total: total,
      };

      // Make API call to backend
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const savedOrder = await response.json();

      // Dispatch Redux actions
      dispatch(placeOrder(savedOrder));
      dispatch(clearCart());

      // Navigate to confirmation page
      navigate('/order-confirmation');
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.message || 'Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button variant="contained" onClick={() => navigate('/shop')} sx={{ mt: 2 }}>
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Checkout
      </Typography>
      <Grid container spacing={3}>
        {/* Left Column - Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Shipping Details
              </Typography>
              <form onSubmit={handlePlaceOrder}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address *"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Payment Method</FormLabel>
                      <RadioGroup
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                      >
                        <FormControlLabel
                          value="credit-card"
                          control={<Radio />}
                          label="Credit Card (Simulated)"
                        />
                        <FormControlLabel
                          value="paypal"
                          control={<Radio />}
                          label="PayPal (Simulated)"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {error && (
                    <Grid item xs={12}>
                      <Alert severity="error">{error}</Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{ mt: 2, py: 1.5 }}
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="body1" fontWeight="medium">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.quantity} night{item.quantity > 1 ? 's' : ''} × {formatPrice(item.price)}/night
                    </Typography>
                  </Box>
                ))}
                <Box sx={{ mt: 2, pt: 2, borderTop: '2px solid #e0e0e0' }}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    Total: {formatPrice(total)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;

