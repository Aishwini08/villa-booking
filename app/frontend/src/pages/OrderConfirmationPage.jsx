import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Divider, Chip } from '@mui/material';
import { CheckCircle, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrder } from '../features/order/orderSelectors';
import { formatPrice } from '../utils/helpers';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const order = useSelector(selectOrder);

  useEffect(() => {
    if (!order.orderId) {
      navigate('/');
    }
  }, [order.orderId, navigate]);

  if (!order.orderId) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
      <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Thank You For Your Order!
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Your booking has been confirmed
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Order Details
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Order ID:</strong> {order.orderId}
            </Typography>
            {order.orderDetails?.customer && (
              <>
                <Typography variant="body1" gutterBottom>
                  <strong>Name:</strong> {order.orderDetails.customer.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {order.orderDetails.customer.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Address:</strong> {order.orderDetails.customer.address}
                </Typography>
              </>
            )}
            <Typography variant="body1" gutterBottom>
              <strong>Total:</strong> {formatPrice(order.orderTotal)}
            </Typography>
            {order.orderDetails?.createdAt && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Order placed on: {new Date(order.orderDetails.createdAt).toLocaleString()}
              </Typography>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
            Booked Villas:
          </Typography>
          {order.orderDetails?.items?.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                p: 1,
                bgcolor: 'background.default',
                borderRadius: 1,
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity} night{item.quantity > 1 ? 's' : ''} × {formatPrice(item.price)}/night
                </Typography>
              </Box>
              <Chip
                label={formatPrice(item.price * item.quantity)}
                color="primary"
                size="small"
              />
            </Box>
          ))}
        </CardContent>
      </Card>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        A confirmation email has been sent to your email address.
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<Home />}
        onClick={() => navigate('/')}
        sx={{ px: 4, py: 1.5 }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderConfirmationPage;

