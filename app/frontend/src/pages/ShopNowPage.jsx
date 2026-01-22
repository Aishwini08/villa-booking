import React from 'react';
import { Grid, Box, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter, setSortOrder, setSearchQuery } from '../features/products/productSlice';
import { selectFilteredAndSortedProducts } from '../features/products/productSelectors';
import ProductCard from '../components/ProductCard/ProductCard';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import SortDropdown from '../components/SortDropdown/SortDropdown';

const ShopNowPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredAndSortedProducts);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const sortOrder = useSelector((state) => state.products.sortOrder);
  const searchQuery = useSelector((state) => state.products.searchQuery);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Browse All Villas
      </Typography>
      <Grid container spacing={3}>
        {/* Left Column - Filters */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Search Villas"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search by name, location, or description..."
            />
            <CategoryFilter
              value={categoryFilter}
              onChange={(value) => dispatch(setCategoryFilter(value))}
            />
          </Box>
        </Grid>

        {/* Right Column - Products */}
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {products.length} {products.length === 1 ? 'villa' : 'villas'} found
            </Typography>
            <Box sx={{ width: 250 }}>
              <SortDropdown
                value={sortOrder}
                onChange={(value) => dispatch(setSortOrder(value))}
              />
            </Box>
          </Box>
          {products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No villas found. Try adjusting your filters.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopNowPage;

