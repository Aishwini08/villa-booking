import { createSelector } from '@reduxjs/toolkit';

const selectProducts = (state) => state.products.items;
const selectCategoryFilter = (state) => state.products.categoryFilter;
const selectSortOrder = (state) => state.products.sortOrder;
const selectSearchQuery = (state) => state.products.searchQuery;

export const selectFilteredAndSortedProducts = createSelector(
  [selectProducts, selectCategoryFilter, selectSortOrder, selectSearchQuery],
  (products, categoryFilter, sortOrder, searchQuery) => {
    // Filter by category
    let filtered = products;
    if (categoryFilter !== 'All Products') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query)
      );
    }

    // Sort products
    let sorted = [...filtered];
    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }
);

