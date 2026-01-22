import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

const SortDropdown = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="sort-dropdown-label">Sort By</InputLabel>
      <Select
        labelId="sort-dropdown-label"
        id="sort-dropdown"
        value={value}
        label="Sort By"
        onChange={(e) => onChange(e.target.value)}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortDropdown;

