import { createSlice } from "@reduxjs/toolkit";

const createQuiz = createSlice({
  name: "createQuiz",
  initialState: { value: false ,isEdit :false, data:{}},
  reducers: {
    setData: (state,actions) => {
     
      state.data = actions.payload
    },
    show: (state) => {
      state.value = true;
      state.data = {};
      state.isEdit = false;
    },
    showEdit: (state) => {
      state.isEdit = true;
      state.value = true;
    },
    hidden: (state) => {
      state.value = false;
      state.isEdit = false;
      state.data = {};
    },
  },
});

export const { show, hidden,showEdit,setData } = createQuiz.actions; 
export default createQuiz.reducer;
