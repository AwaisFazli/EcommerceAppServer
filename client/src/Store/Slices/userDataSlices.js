import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    personalData: {},
    reload: 1,
  },
  reducers: {
    addUserData(state, action) {
      state.personalData = action.payload;
    },
    removeUserData(state, action) {
      state.personalData = {};
    },
    setReload(state, action) {
      state.reload = state.reload + 1;
    },
  },
});

export default userDataSlice.reducer;
export const { addUserData, removeUserData, setReload } = userDataSlice.actions;
