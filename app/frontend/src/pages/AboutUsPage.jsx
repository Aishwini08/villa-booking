import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { BeachAccess, Star, Support } from '@mui/icons-material';

const AboutUsPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" align="center" sx={{ mb: 4 }}>
          About Us
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          Welcome to Luxury Villa Booking, your premier destination for discovering and booking the world's most
          exquisite villas. We are passionate about connecting travelers with exceptional accommodations that
          create unforgettable memories.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <BeachAccess sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Premium Selection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We carefully curate our collection to include only the finest villas in the most
                  sought-after destinations worldwide.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Star sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Exceptional Service
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our dedicated team is committed to providing you with personalized service and
                  ensuring your stay exceeds expectations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Support sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We're here for you around the clock to assist with any questions or concerns
                  before, during, and after your stay.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            To make luxury villa experiences accessible and unforgettable for travelers around the world,
            while maintaining the highest standards of quality, service, and customer satisfaction.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUsPage;

