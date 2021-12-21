import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
    total: JSON.parse(localStorage.getItem("cart") || "[]").length,
  },
  reducers: {
    updateCartData: (state, actions) => {
      state.cartItems = actions.payload;
      state.total = actions.payload.length;
      localStorage.setItem("cart", JSON.stringify(actions.payload));
    },
  },
});

export const { updateCartData } = cartSlice.actions;
export default cartSlice.reducer;
