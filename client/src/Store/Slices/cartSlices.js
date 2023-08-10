import { createSlice } from "@reduxjs/toolkit";

const cartProductSlice = createSlice({
  name: "cartProducts",
  initialState: {
    product: {},
    isOpen: false,
  },
  reducers: {
    addCartProduct(state, action) {
      state.product = action.payload;
    },
    setOpenCart(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export default cartProductSlice.reducer;

export const { addCartProduct, setOpenCart } = cartProductSlice.actions;
