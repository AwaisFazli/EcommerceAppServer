import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    personalData: {},
  },
  reducers: {
    addUserData(state, action) {
      state.personalData = action.payload;
    },
    removeUserData(state, action) {
      state.personalData = {};
    },
  },
});

export default userDataSlice.reducer;
export const { addUserData, removeUserData } = userDataSlice.actions;
