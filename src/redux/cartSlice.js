import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) || [] : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cart.some((item) => item.id === action.payload.id);
      if (!itemExists) {
        state.cart.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    
  },
});

export const { addToCart, removeFromCart, productCount } = cartSlice.actions;
export default cartSlice.reducer;