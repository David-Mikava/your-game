import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tableSlice from '../components/Table/tableSlice';
import authSlice from '../components/Auth/authSlice';
import roomsSlice from '../components/Rooms/roomsSlice';
import gameSlice from '../components/Game/gameSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    tables: tableSlice,
    rooms: roomsSlice,
    game: gameSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type rootState = ReturnType<typeof store.getState>;
export default store;
