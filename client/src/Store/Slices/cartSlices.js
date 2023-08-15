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
    removeCartProduct(state, action) {
      console.log("Working");
      const productIdToRemove = action.payload;
      const index = state.product.findIndex(
        (item) => item._id === productIdToRemove._id
      );
      console.log(index);
      if (index !== -1) {
        state.product.splice(index, 1);
      }
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

export const { addCartProduct, setOpenCart, clearCart, removeCartProduct } =
  cartProductSlice.actions;
