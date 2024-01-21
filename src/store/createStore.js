import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slice/userSlice";

//create store
export const store = configureStore({
  devTools: true, //if we define devTools false we cant see any data in browser redux devtools//data  security
  reducer: {
    users: userReducer,
  },
});
