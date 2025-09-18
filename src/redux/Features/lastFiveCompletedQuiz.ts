import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface lastFiveCompletedQuizState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: lastFiveCompletedQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const lastFiveCompletedQuizAsyncThunk = createAsyncThunk(
  "lastFiveCompletedQuiz/lastFiveCompletedQuizAsyncThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(QUIZ_URL.COMPLETED);
      return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const lastFiveCompletedQuizSlice = createSlice({
  name: "lastFiveCompletedQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(lastFiveCompletedQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(lastFiveCompletedQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(lastFiveCompletedQuizAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default lastFiveCompletedQuizSlice.reducer;
