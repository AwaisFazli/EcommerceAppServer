import { createSlice } from "@reduxjs/toolkit";

const cartProductSlice = createSlice({
  name: "cartProducts",
  initialState: {
    product: [],
    isOpen: false,
  },
  reducers: {
    addCartProduct(state, action) {
      state.product.push(action.payload);
    },
    setOpenCart(state, action) {
      state.isOpen = action.payload;
    },
    clearCart(state, action) {
      state.product = [];
    },
  },
});

export default cartProductSlice.reducer;

export const { addCartProduct, setOpenCart, clearCart } =
  cartProductSlice.actions;
