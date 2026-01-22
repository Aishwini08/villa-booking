import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        bgcolor: 'primary.dark',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              🏖️ Luxury Villa Booking
            </Typography>
            <Typography variant="body2">
              Your gateway to the world's most luxurious villa experiences.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none', mb: 1 }}>
                Home
              </Link>
              <Link href="/shop" color="inherit" sx={{ textDecoration: 'none', mb: 1 }}>
                Browse Villas
              </Link>
              <Link href="/about" color="inherit" sx={{ textDecoration: 'none', mb: 1 }}>
                About Us
              </Link>
              <Link href="/contact" color="inherit" sx={{ textDecoration: 'none' }}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2">Email: info@luxuryvillas.com</Typography>
            <Typography variant="body2">Phone: +1 (555) 123-4567</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Luxury Villa Booking. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

