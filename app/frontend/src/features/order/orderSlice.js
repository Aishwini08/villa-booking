import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: null,
  orderDetails: null,
  orderTotal: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orderId = action.payload._id || action.payload.id;
      state.orderDetails = action.payload;
      state.orderTotal = action.payload.total || 0;
    },
    clearOrder: (state) => {
      state.orderId = null;
      state.orderDetails = null;
      state.orderTotal = 0;
    },
  },
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

