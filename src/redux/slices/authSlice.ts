import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: !!localStorage.getItem("userInfo"),
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  },
  reducers: {
    userLogIn: (state, payload) => {
      state.isAuth = true;
      state.userInfo = payload.payload;
      localStorage.setItem("token", payload.payload.token)
      localStorage.setItem("userInfo", JSON.stringify(payload.payload));
    },
    userLogOut: (state) => {
      state.isAuth = false;
      state.userInfo = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
});

export const { userLogIn, userLogOut } = authSlice.actions;
export default authSlice.reducer;
