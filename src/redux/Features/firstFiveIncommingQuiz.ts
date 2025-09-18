import { axiosInstance } from "@/services/api";
import {  QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface firstFiveInComingState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: firstFiveInComingState = {
  isLoading: false,
  error: null,
  data: [],
};

export const firstFiveInCommingAsyncThunk = createAsyncThunk(
  "firstFiveInComing/firstFiveInComingAsyncThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(QUIZ_URL.INCOMING);
    
      return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const firstFiveInComingSlice = createSlice({
  name: "firstFiveInComming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(firstFiveInCommingAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(firstFiveInCommingAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(firstFiveInCommingAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default firstFiveInComingSlice.reducer;
