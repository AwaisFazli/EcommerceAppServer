import { createSlice } from "@reduxjs/toolkit";

const urlStateSlice = createSlice({
  name: "urlState",
  initialState: "",
  reducers: {
    addUrlState(state, action) {
      return (state = action.payload);
    },
  },
});

export default urlStateSlice.reducer;
export const { addUrlState } = urlStateSlice.actions;
