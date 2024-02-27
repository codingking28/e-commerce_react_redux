import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  data: [],
  error: false,
};

export const getRecordsAPI = createAsyncThunk("getRecordsAPI", async (body) => {
  const resdata = await axios.post("http://localhost:3010/app/getData", body);
  return resdata.data.data;
});

const fileSlice = createSlice({
  name: "fileSliceName",
  initialState,
  // initialState:initialState
  reducers: {
    getDashboardData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecordsAPI.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRecordsAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getRecordsAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});
// export const { getRecords } = fileSlice.actions;

export default fileSlice.reducer;
