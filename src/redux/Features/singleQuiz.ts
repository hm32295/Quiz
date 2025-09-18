import { axiosInstance } from "@/services/api";
import {  QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface singleQuizState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: singleQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const singleQuizAsyncThunk = createAsyncThunk(
  "singleQuiz/singleQuizAsyncThunk",
  async (id:string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(QUIZ_URL.WITHOUT_ANSWERS(id));
    
      
      return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const singleQuizSlice = createSlice({
  name: "singleQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(singleQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(singleQuizAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default singleQuizSlice.reducer;
