import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './slice/toolSlice.ts';
import userReducer from './slice/userSlice.ts';
import imagesReducer from './slice/imageSlice.ts';

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    user: userReducer,
    images: imagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
