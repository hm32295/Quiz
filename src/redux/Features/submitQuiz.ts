import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface Answer {
  question: string;
  answer: string;
}

export interface SubmitQuizState {
  id: string;
  data: Answer[];
}

export interface SubmitQuizResponse {
  message: string;
  score?: number; // أضف أي حقول إضافية تأتي من الـ API
}

interface SubmitQuizSliceState {
  isLoading: boolean;
  error: string | null;
  data: SubmitQuizResponse | null;
}

const initialState: SubmitQuizSliceState = {
  isLoading: false,
  error: null,
  data: null,
};

export const submitQuizAsyncThunk = createAsyncThunk<
  SubmitQuizResponse,
  SubmitQuizState,
  { rejectValue: string }
>(
  "submitQuiz/submitQuizAsyncThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(QUIZ_URL.SUBMIT(data.id), {
        answers: data.data,
      });
      return response.data as SubmitQuizResponse;
    }catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
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
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(
        submitQuizAsyncThunk.fulfilled,
        (state, action: PayloadAction<SubmitQuizResponse>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      );
  },
});

export default submitQuizSlice.reducer;
