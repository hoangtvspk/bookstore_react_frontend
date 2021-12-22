import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressItems: JSON.parse(localStorage.getItem("address") || "[]"),
  },
  reducers: {
    updateAddressData: (state, payload) => {
      state.addressItems = payload.payload;
      localStorage.setItem("address", JSON.stringify(payload.payload));
    },
  },
});

export const { updateAddressData } = addressSlice.actions;
export default addressSlice.reducer;
