import { configureStore } from "@reduxjs/toolkit";
import cartProductSlice from "./Slices/cartSlices";
import userDataSlices from "./Slices/userDataSlices";
import urlStateSlices from "./Slices/urlStateSlices";

const store = configureStore({
  reducer: {
    cartProducts: cartProductSlice,
    userData: userDataSlices,
    urlState: urlStateSlices,
  },
});

export default store;
