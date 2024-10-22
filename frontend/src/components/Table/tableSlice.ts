import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from './Types/State';
import { getTable } from './api';

export const getTableAsync = createAsyncThunk('table', async () => {
  const response = await getTable();
  return response;
});

const initialState: State = {
  tables: [],
  error: undefined,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTableAsync.fulfilled, (state, action) => {
        state.tables = action.payload;
      })
      .addCase(getTableAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export default tableSlice.reducer;
