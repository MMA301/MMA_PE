import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebaseApp } from "../utils/firebaseHelper";
import { getDatabase, ref, get, set, remove, child } from "firebase/database";

// Fetch bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const app = getFirebaseApp();
    const db = getDatabase(app);
    const dbRef = ref(db);

    const snapshot = await get(child(dbRef, "bookings"));

    if (!snapshot.exists()) {
      return [];
    }

    const bookingsData = snapshot.val();
    return Object.keys(bookingsData).map((key) => ({
      id: key,
      ...bookingsData[key],
    }));
  }
);

// Cancel booking
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (bookingId) => {
    const app = getFirebaseApp();
    const db = getDatabase(app);
    const dbRef = ref(db, `bookings/${bookingId}`);

    await remove(dbRef);
    return bookingId; // Return the canceled booking ID
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
      });
  },
});

export const selectBookings = (state) => state.bookings.bookings;
export const selectBookingsStatus = (state) => state.bookings.status;
export const selectBookingsError = (state) => state.bookings.error;

export default bookingsSlice.reducer;
