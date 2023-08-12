import { configureStore } from "@reduxjs/toolkit";
import cartProductSlice from "./Slices/cartSlices";
import userDataSlices from "./Slices/userDataSlices";

const store = configureStore({
  reducer: {
    cartProducts: cartProductSlice,
    userData: userDataSlices,
  },
});

export default store;
