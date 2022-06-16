import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressItems: JSON.parse(localStorage.getItem("address") || "{}"),
    addressesList: JSON.parse(localStorage.getItem("addressesList") || "[]"),
  },
  reducers: {
    updateAddressData: (state, payload) => {
      state.addressItems = payload.payload;
      localStorage.setItem("address", JSON.stringify(payload.payload));
    },
    updateAddressListData: (state, payload) => {
      state.addressesList = payload.payload;
      localStorage.setItem("addressesList", JSON.stringify(payload.payload));
    },
  },
});

export const { updateAddressData,updateAddressListData } = addressSlice.actions;
export default addressSlice.reducer;
