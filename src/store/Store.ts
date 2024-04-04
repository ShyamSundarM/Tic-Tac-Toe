import { configureStore } from "@reduxjs/toolkit";
import GamePadSlice from "./GamePadSlice";

const store = configureStore({
  reducer: GamePadSlice.reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
