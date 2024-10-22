import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from './Types/State';
import { getAnswer, getGame } from './api';

export interface CheckAnswerPayload {
  id: number;
  correctly: boolean;
  points: number;
  questionId: number;
}

export const checkAnswer = createAsyncThunk(
  'game/checkAnswer',
  async ({ id, correctly, points, questionId }: CheckAnswerPayload) => {
    const response = await getAnswer(id, correctly, points, questionId);
    return response;
  },
);

export const getGameAsync = createAsyncThunk('game', async (id: number) => {
  const response = await getGame(id);
  return response;
});



const initialState: State = {
  game: { id: 0, total: 0, answers: { questions: [] } },
  error: undefined,
};

const tableSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAnswer.fulfilled, (state, action) => {
        state.game = action.payload;
      })
      .addCase(checkAnswer.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getGameAsync.fulfilled, (state, action) => {
        state.game = action.payload;
      })
      .addCase(getGameAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tableSlice.reducer;
