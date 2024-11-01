import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import roomsReducer from "./roomsSlice";
import bookingsReducer from "./bookingsSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    rooms: roomsReducer,
    bookings: bookingsReducer,
  },
});
