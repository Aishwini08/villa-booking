import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  Card,
  CardMedia,
  Divider,
} from '@mui/material';
import { LocationOn, Bed, Bathroom, People } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';
import MessageDialog from '../components/MessageDialog/MessageDialog';
import { formatPrice } from '../utils/helpers';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Villa not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/shop')} sx={{ mt: 2 }}>
          Browse Villas
        </Button>
      </Box>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    setShowMessage(true);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={product.imageUrl}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary">
              {product.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {product.rating} ({Math.floor(Math.random() * 50 + 10)} reviews)
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            {formatPrice(product.price)}/night
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Chip
              icon={<Bed />}
              label={`${product.bedrooms} Bedrooms`}
              variant="outlined"
            />
            <Chip
              icon={<Bathroom />}
              label={`${product.bathrooms} Bathrooms`}
              variant="outlined"
            />
            <Chip
              icon={<People />}
              label={`Up to ${product.guests} Guests`}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Chip
              label={product.stock > 0 ? 'Available' : 'Unavailable'}
              color={product.stock > 0 ? 'success' : 'error'}
              sx={{ mb: 2 }}
            />
            {product.stock > 0 && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  Number of Nights:
                </Typography>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={30}
                />
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            sx={{ py: 1.5, mb: 3 }}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
          </Button>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>
        </Grid>
      </Grid>
      <MessageDialog
        open={showMessage}
        message="Villa added to cart!"
        onClose={() => setShowMessage(false)}
      />
    </Box>
  );
};

export default ProductDetailPage;

