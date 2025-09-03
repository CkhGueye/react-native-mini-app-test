import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    modal: modalReducer,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
