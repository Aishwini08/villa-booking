import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const QuantitySelector = ({ quantity, onQuantityChange, min = 1, max = 10, disabled = false }) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        size="small"
        color="primary"
      >
        <Remove />
      </IconButton>
      <TextField
        type="number"
        value={quantity}
        onChange={handleInputChange}
        inputProps={{
          min,
          max,
          style: { textAlign: 'center', width: '60px' },
        }}
        disabled={disabled}
        size="small"
        sx={{ width: '80px' }}
      />
      <IconButton
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        size="small"
        color="primary"
      >
        <Add />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;

