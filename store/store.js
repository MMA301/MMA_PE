import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import roomsReducer from "./roomsSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    rooms: roomsReducer,
  },
});
