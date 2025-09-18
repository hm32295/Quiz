import { axiosInstance } from "@/services/api";
import {  QUIZ_URL, STUDENT_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface topStudentState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: topStudentState = {
  isLoading: false,
  error: null,
  data: [],
};

export const topStudentAsyncThunk = createAsyncThunk(
  "topStudent/topStudentAsyncThunk",
  async ({ rejectWithValue }) => {
 
   
    try {
      const response = await axiosInstance.get(STUDENT_URL.TOP_FIVE);
      
      return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const topStudentSlice = createSlice({
  name: "topStudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topStudentAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topStudentAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(topStudentAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default topStudentSlice.reducer;
