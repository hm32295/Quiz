import { axiosInstance } from "@/services/api";
import {  QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface joinQuizState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: joinQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const joinQuizAsyncThunk = createAsyncThunk(
  "joinQuiz/joinQuizAsyncThunk",
  async (data, { rejectWithValue }) => {
    
    try {
      const response = await axiosInstance.post(QUIZ_URL.JOIN,data);
     
      return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const joinQuizSlice = createSlice({
  name: "joinQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joinQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(joinQuizAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default joinQuizSlice.reducer;
