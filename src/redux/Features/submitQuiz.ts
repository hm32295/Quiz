import { axiosInstance } from "@/services/api";
import {  QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface submitQuizState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: submitQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const submitQuizAsyncThunk = createAsyncThunk(
  "submitQuiz/submitQuizAsyncThunk",
  async (data, { rejectWithValue }) => {
 
   
    try {
      const response = await axiosInstance.post(QUIZ_URL.SUBMIT(data.id),{answers:data.data});
       
      return response.data;
      
    } catch (error: any) {
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
