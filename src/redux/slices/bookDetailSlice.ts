import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../models/book";

export const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState: {
    value: {} as Book,
  },
  reducers: {
    loadBookDetail: (state, action) => {
        console.log(action.payload.nameBook);
      state.value = action.payload;
    },
  },
});

export const { loadBookDetail } = bookDetailSlice.actions;
export default bookDetailSlice.reducer;
