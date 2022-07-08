import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: !!localStorage.getItem("userInfo"),
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
    isAccountManage: false,
    
  },
  reducers: {
    userLogIn: (state, payload) => {
      state.isAuth = true;
      state.userInfo = payload.payload;
      localStorage.setItem("token", payload.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(payload.payload));
      
    },
    userLogOut: (state) => {
      state.isAuth = false;
      state.userInfo = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
      localStorage.removeItem("address");
      localStorage.removeItem("addressesList");
    },
    updateUserInfo: (state, payload) => {
      state.userInfo = payload.payload;
      localStorage.setItem("userInfo", JSON.stringify(payload.payload));
    },
    openAccountManage: (state)=> {
      state.isAccountManage = true
    },
    closeAccountManage: (state)=> {
      state.isAccountManage = false
    }
  },
});

export const { userLogIn, userLogOut, updateUserInfo, openAccountManage,closeAccountManage } = authSlice.actions;
export default authSlice.reducer;
