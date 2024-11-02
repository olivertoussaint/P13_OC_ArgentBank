import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production', // Active les devTools en dev
});

export default store;
