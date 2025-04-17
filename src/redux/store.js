import { configureStore } from "@reduxjs/toolkit";
import ShoppingSlice from './ShoppingSlice'
import UserSlice from './UserSlice'

export const store = configureStore({
  reducer: {
    shopping: ShoppingSlice,
    user:UserSlice,
  },
});
