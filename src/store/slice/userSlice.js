import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "userSliceName",
  initialState,
  // initialState:initialState
  reducers: {
    addUser(state, action) {
      // data will passed by the action payload
      state.push(action.payload);
    },
    deleteUser(state, action) {
      const deleteIndex = action.payload;
      return state.filter((data, index) => index !== deleteIndex);
    },
  },
});
// action creator for the reducer slice
export const { addUser, deleteUser } = userSlice.actions;
//export slice reducer
export default userSlice.reducer;
