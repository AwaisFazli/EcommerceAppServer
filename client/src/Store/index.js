import { configureStore } from "@reduxjs/toolkit";
import cartProductSlice from "./Slices/cartSlices";

const store = configureStore({
  reducer: {
    cartProducts: cartProductSlice,
  },
});

export default store;
