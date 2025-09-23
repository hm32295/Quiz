import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface Quiz {
  _id?: string;
  title: string;
  description: string;
  group: string;
  questions_number: number;
  difficulty: "easy" | "medium" | "hard" | "";
  type: "FE" | "BE" | "DO" | "";
  duration: string;
  schadule: string;
  score_per_question: string;
  code?: string; // لو السيرفر بيرجع كود بعد الإنشاء
}

interface SetQuizState {
  isLoading: boolean;
  error: string | null;
  data: Quiz[];
}

const initialState: SetQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const setQuizAsyncThunk = createAsyncThunk<Quiz, Quiz, { rejectValue: string }>(
  "setQuiz/setQuizAsyncThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(QUIZ_URL.CREATE, data);
      return response.data as Quiz;
    } catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
  }
);

const setQuizSlice = createSlice({
  name: "setQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(setQuizAsyncThunk.fulfilled, (state, action: PayloadAction<Quiz>) => {
        state.isLoading = false;
        state.data.push(action.payload);
      });
  },
});

export default setQuizSlice.reducer;
