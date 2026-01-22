import React from 'react';
import { Box, Button, Typography, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFilteredAndSortedProducts } from '../features/products/productSelectors';
import ProductCard from '../components/ProductCard/ProductCard';

const HomePage = () => {
  const navigate = useNavigate();
  const allProducts = useSelector(selectFilteredAndSortedProducts);

  // Get top rated products (sorted by rating)
  const topRated = [...allProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Get latest arrivals (first 4 products)
  const latestArrivals = allProducts.slice(0, 4);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '500px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 6,
          borderRadius: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Discover Your Dream Villa
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Luxury villas in the world's most beautiful destinations
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/shop')}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Explore Villas
          </Button>
        </Box>
      </Box>

      {/* Top Rated Products Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          Top Rated Villas
        </Typography>
        <Grid container spacing={3}>
          {topRated.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest Arrivals Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          Latest Arrivals
        </Typography>
        <Grid container spacing={3}>
          {latestArrivals.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

