import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebaseApp } from "../utils/firebaseHelper";
import { getDatabase, ref, get, child } from "firebase/database";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const app = getFirebaseApp();
  const db = getDatabase(app);
  const dbRef = ref(db);

  const snapshot = await get(child(dbRef, "rooms"));

  if (!snapshot.exists()) {
    throw new Error("Không có dữ liệu có sẵn");
  }

  const roomsData = snapshot.val();

  return Object.keys(roomsData).map((key) => ({ id: key, ...roomsData[key] }));
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoomsStatus = (state) => state.rooms.status;
export const selectRoomsError = (state) => state.rooms.error;

export default roomsSlice.reducer;
