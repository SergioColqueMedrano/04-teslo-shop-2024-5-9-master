// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definición del estado del mundo
interface WorldState {
  terrain: Array<any>;
}

// Estado inicial
const initialState: WorldState = {
  terrain: [],
};

// Slice para el estado del mundo
const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    setTerrain(state, action: PayloadAction<Array<any>>) {
      state.terrain = action.payload;
    },
  },
});

export const { setTerrain } = worldSlice.actions;

const store = configureStore({
  reducer: {
    world: worldSlice.reducer,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
