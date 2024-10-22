import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from './Types/State';
import * as api from './api';

export const getRoomsAsync = createAsyncThunk('rooms', async () => {
  const response = await api.getRooms();
  return response;
});

export const addRoomsAsync = createAsyncThunk('rooms/add', async () => {
  const response = await api.addRoom();
  return response;
});

export const removeRoomsAsync = createAsyncThunk('rooms/remove', async (id: number) => {
  await api.removeRoom(id);
  return id;
});

const initialState: State = {
  rooms: [],
  error: undefined,
};

const tableSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsAsync.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(getRoomsAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addRoomsAsync.fulfilled, (state, action) => {
        state.rooms = [...state.rooms, action.payload];
      })
      .addCase(addRoomsAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeRoomsAsync.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      })
      .addCase(removeRoomsAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tableSlice.reducer;
