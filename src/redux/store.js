import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import dataReducer from './slices/dataSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: userReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;