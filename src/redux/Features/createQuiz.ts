import { createSlice } from "@reduxjs/toolkit";
interface Quiz {
  _id: string;
  title: string;
  questions: string[];
  difficulty: string;
  schadule: string;
}
interface dataType{
  value:boolean;
  isEdit:boolean;
  data:Quiz | undefined
}
const initialState:dataType = {
  value :false,
  isEdit:false,
  data:undefined
}
const createQuiz = createSlice({
  name: "createQuiz",
  initialState,
  reducers: {
    setData: (state,actions) => {
     
      state.data = actions.payload
    },
    show: (state) => {
      state.value = true;
      state.data = undefined;
      state.isEdit = false;
    },
    showEdit: (state) => {
      state.isEdit = true;
      state.value = true;
    },
    hidden: (state) => {
      state.value = false;
      state.isEdit = false;
      state.data = undefined;
    },
  },
});

export const { show, hidden,showEdit,setData } = createQuiz.actions; 
export default createQuiz.reducer;
