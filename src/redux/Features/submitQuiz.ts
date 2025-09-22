import { axiosInstance } from "@/services/api";
import {  QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface submitQuizState { id: string; data: { question: string; answer: string; }[]; }

export const submitQuizAsyncThunk = createAsyncThunk(
  "submitQuiz/submitQuizAsyncThunk",
  async (data:submitQuizState, { rejectWithValue }) => {
 
   
    try {
      const response = await axiosInstance.post(QUIZ_URL.SUBMIT(data.id),{answers:data.data});
       
      return response.data;
      
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const submitQuizSlice = createSlice({
  name: "submitQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(submitQuizAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default submitQuizSlice.reducer;
