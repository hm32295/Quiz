import { createSlice } from "@reduxjs/toolkit";

const createQuiz = createSlice({
  name: "createQuiz",
  initialState: { value: false },
  reducers: {
    show: (state) => {
      state.value = true;
    },
    hidden: (state) => {
      state.value = false;
    },
  },
});

export const { show, hidden } = createQuiz.actions; 
export default createQuiz.reducer;
